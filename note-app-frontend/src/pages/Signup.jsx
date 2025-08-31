import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../hooks/useAuth';

import AuthLayout from '../components/auth/AuthLayout';
import Input from '../components/auth/Input';
import Button from '../components/core/Button';
// import GoogleIcon from '../assets/google-icon.svg';

const Signup = () => {
    const [formData, setFormData] = useState({ name: '', email: '', otp: '' });
    const [errors, setErrors] = useState({});
    const [isOtpSent, setIsOtpSent] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    
    const { requestOtp, signup, googleSignIn } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        setErrors(prev => ({ ...prev, [name]: '' })); // Clear error when typing
    };

    const handleGetOtp = async () => {
        let currentErrors = {};
        if (!formData.name.trim()) {
            currentErrors.name = 'Name is required.';
        }
        if (!validateEmail(formData.email)) {
            currentErrors.email = 'Please enter a valid email address.';
        }

        if (Object.keys(currentErrors).length > 0) {
            setErrors(currentErrors);
            return;
        }

        setErrors({}); // Clear all errors before API call
        setIsLoading(true);
        try {
            await requestOtp(formData.email);
            toast.success('OTP has been sent to your email!');
            setIsOtpSent(true);
        } catch (error) {
            toast.error(error.message || 'Failed to send OTP.');
            setErrors({ api: error.message || 'Failed to send OTP.' });
        } finally {
            setIsLoading(false);
        }
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.otp.trim()) {
            setErrors({ otp: 'OTP is required.' });
            return;
        }
        setIsLoading(true);
        try {
            await signup(formData.name, formData.email, formData.otp);
            toast.success('Signed up successfully!');
            navigate('/');
        } catch (error) {
            toast.error(error.message || 'Signup failed. Please try again.');
            setErrors({ api: error.message || 'Signup failed. Please try again.' });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <AuthLayout title="Create an Account" subtitle="Start your journey with us today.">
            <form onSubmit={handleSubmit} className="space-y-4">
                {!isOtpSent ? (
                    <>
                        <Input id="name" name="name" type="text" placeholder="Your Name" value={formData.name} onChange={handleInputChange} error={errors.name} />
<Input id="DOB" name="DOB" type="date" placeholder="Date of Birth" value={formData.DOB} onChange={handleInputChange} error={errors.DOB} />

                        <Input id="email" name="email" type="email" placeholder="Email Address" value={formData.email} onChange={handleInputChange} error={errors.email} />
                        {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}
                        <Button type="button" onClick={handleGetOtp} isLoading={isLoading}>
                            Get OTP
                        </Button>
                    </>
                ) : (
                    <>
                        <div className="text-center text-sm text-gray-600">
                            <p>An OTP has been sent to <strong>{formData.email}</strong>.</p>
                            <button 
                                type="button" 
                                onClick={() => setIsOtpSent(false)} 
                                className="text-indigo-600 hover:text-indigo-500 font-medium text-xs mt-1"
                            >
                                Change Email
                            </button>
                        </div>
                        <Input id="otp" name="otp" type="text" placeholder="Enter 6-digit OTP" value={formData.otp} onChange={handleInputChange} error={errors.otp} />
                        {errors.api && <p className="text-red-500 text-xs mt-1">{errors.api}</p>}
                        <Button type="submit" isLoading={isLoading}>
                            Sign Up
                        </Button>
                    </>
                )}
            </form>
             <div className="relative my-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-gray-500">Or continue with</span>
                </div>
            </div>

            <Button variant="secondary" onClick={googleSignIn}>
                {/* <img src={GoogleIcon} alt="Google" className="w-5 h-5 mr-2" /> */}
                Sign Up with Google
            </Button>

            <p className="text-center text-sm text-gray-600 mt-4">
                Already have an account?{' '}
                <Link to="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                    Log in
                </Link>
            </p>
        </AuthLayout>
    );
};

export default Signup;