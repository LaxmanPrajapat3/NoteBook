const { validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const User = require('../models/User.js');

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to generate JWT
const generateToken = (user) => {
    // --- THIS IS THE FIX ---
    // The payload now includes the user's name and email, which will be
    // available on the frontend after decoding the token.
    const payload = { 
        user: { 
            id: user.id,
            name: user.name,
            email: user.email
        } 
    };
    // ----------------------
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Request OTP for email
// @route   POST /api/auth/request-otp
exports.requestOtp = async (req, res) => {
    const { email } = req.body;
    try {
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpires = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        let user = await User.findOne({ email });

        if (user) {
            // Update OTP for existing user
            user.otp = otp;
            user.otpExpires = otpExpires;
            await user.save();
        } else {
            // Let's create a temporary record or update if exists.
            await User.findOneAndUpdate(
                { email },
                { otp, otpExpires, name: 'temp' }, // temporary name
                { upsert: true, new: true, setDefaultsOnInsert: true }
            );
        }
        
        // For this demo, we will log it to the console for you to use.
        console.log(`\n--- OTP FOR ${email}: ${otp} ---\n`);
        
        res.status(200).json({ success: true, message: "OTP sent successfully!" });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

// @desc    Sign up with email and OTP
// @route   POST /api/auth/signup
exports.signup = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, otp } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "Please request an OTP for this email first." });
        }

        if (user.name !== 'temp') {
            return res.status(400).json({ message: "A user with this email already exists." });
        }
        
        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }
        
        // If we get here, the OTP is correct for a temporary user. Finalize registration.
        user.name = name;
        user.otp = undefined;       // Clear OTP
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user);
        res.status(201).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// @desc    Login with email and OTP
// @route   POST /api/auth/login
exports.login = async (req, res) => {
    const { email, otp } = req.body;

    try {
        let user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: "User not found. Please sign up." });
        }

        if (user.otp !== otp || user.otpExpires < Date.now()) {
            return res.status(400).json({ message: "Invalid or expired OTP." });
        }
        
        // Clear OTP after successful login
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ token });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};


// @desc    Authenticate with Google
// @route   POST /api/auth/google
exports.googleSignIn = async (req, res) => {
    const { token } = req.body;
    try {
        const ticket = await googleClient.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });
        const { name, email, sub } = ticket.getPayload(); // 'sub' is the unique Google ID

        let user = await User.findOne({ googleId: sub });

        if (!user) {
            // If no user with this googleId, check if one exists with the same email
            user = await User.findOne({ email });
            if (user) {
                // Link Google account to existing email account
                user.googleId = sub;
            } else {
                // Create a new user
                user = new User({
                    name,
                    email,
                    googleId: sub,
                });
            }
            await user.save();
        }

        const jwtToken = generateToken(user);
        res.status(200).json({ token: jwtToken });

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Google Sign-In failed.' });
    }
};

