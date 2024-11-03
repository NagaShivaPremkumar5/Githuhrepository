import React, { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import SignOutComponent from './SignOutComponent'; // Import the SignOutComponent

function GoogleLoginComponent({ onLoginSuccess, onSignOut }) {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userName, setUserName] = useState('');

    const handleSuccess = (credentialResponse) => {
        console.log('Login Success:', credentialResponse);
        const userProfile = decodeJwt(credentialResponse.credential);
        setUserName(userProfile.name);
        setIsLoggedIn(true);

        // Call the parent component's callback if provided
        if (onLoginSuccess) {
            onLoginSuccess(credentialResponse);
        }
    };

    const handleFailure = (error) => {
        console.error('Google login failed:', error);
    };

    const handleSignOut = () => {
        // Reset state
        setIsLoggedIn(false);
        setUserName('');
        
        // Call the sign out callback provided by the parent component
        if (onSignOut) {
            onSignOut();
        }
    };

    // Function to decode JWT token to get user information
    const decodeJwt = (token) => {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        return JSON.parse(window.atob(base64));
    };

    return (
        <>
            {!isLoggedIn ? (
                <GoogleLogin
                    onSuccess={handleSuccess}
                    onFailure={handleFailure}
                />
            ) : (
                <div>
                    <h2>Welcome, {userName}!</h2> {/* Display user name upon successful login */}
                    <SignOutComponent onSignOut={handleSignOut} /> {/* Use the SignOutComponent */}
                </div>
            )}
        </>
    );
}

export default GoogleLoginComponent;
