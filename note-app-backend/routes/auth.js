const express = require('express');
const { check } = require('express-validator');
const router = express.Router();

const {
    requestOtp,
    signup,
    login,
    googleSignIn
} = require('../controllers/authController');

// @route   POST api/auth/request-otp
// @desc    Send OTP to user's email
// @access  Public
router.post('/request-otp', [
    check('email', 'Please include a valid email').isEmail()
], requestOtp);


// @route   POST api/auth/signup
// @desc    Register a user
// @access  Public
router.post('/signup', [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('otp', 'OTP is required').isLength({ min: 6, max: 6 })
], signup);

// @route   POST api/auth/login
// @desc    Authenticate user & get token
// @access  Public
router.post('/login', [
    check('email', 'Please include a valid email').isEmail(),
    check('otp', 'OTP is required').isLength({ min: 6, max: 6 })
], login);


// @route   POST api/auth/google
// @desc    Authenticate user with Google
// @access  Public
router.post('/google', googleSignIn);

module.exports = router;
