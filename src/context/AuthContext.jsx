import { createContext, useState, useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { requestOtpApi, verifyOtpAndLoginApi, verifyOtpAndSignupApi } from '../utils/mockApi';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
      }
    }
    setLoading(false);
  }, [token]);

  const handleLogin = async (email, otp) => {
    const { token } = await verifyOtpAndLoginApi(email, otp);
    localStorage.setItem('token', token);
    setToken(token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const handleSignup = async (name, email, otp) => {
    const { token } = await verifyOtpAndSignupApi(name, email, otp);
    localStorage.setItem('token', token);
    setToken(token);
    const decodedUser = jwtDecode(token);
    setUser(decodedUser);
  };

  const handleGoogleSignIn = () => {
    // In a real app, this would redirect to Google's OAuth screen.
    // For this demo, we'll simulate a successful Google sign-in.
    console.log("Simulating Google Sign-In...");
    const mockGoogleUserToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnb29nbGUtMTIzNDUiLCJuYW1lIjoiR29vZ2xlIFVzZXIiLCJlbWFpbCI6Imdvb2dsZUBleGFtcGxlLmNvbSIsImlhdCI6MTUxNjIzOTAyMiwicGljdHVyZSI6Imh0dHBzOi8vaS5pYmIuY28vMlpoaG5ZcC9hdmF0YXIucG5nIn0.lqV2S8L7k_M4Jsoqn1dJ0yFpZ31s_xK1aB8yJtX_zZc";
    localStorage.setItem('token', mockGoogleUserToken);
    setToken(mockGoogleUserToken);
    const decodedUser = jwtDecode(mockGoogleUserToken);
    setUser(decodedUser);
  };

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    token,
    loading,
    requestOtp: requestOtpApi,
    login: handleLogin,
    signup: handleSignup,
    googleSignIn: handleGoogleSignIn,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};