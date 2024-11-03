import React, { useState } from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';
import './index.css';
import App from './App.jsx';
import FacebookLoginComponent from './FacebookLoginComponent';
import GoogleLoginComponent from './GoogleLoginComponent';
import SignOutComponent from './SignOutComponent';
import store from './store.js';

function RootComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login status

    // Callback function for Facebook login status
    const handleFacebookLogin = (response) => {
        if (response.status === 'connected') {
            setIsAuthenticated(true); // Set authenticated to true on successful login
        }
    };

    // Callback function for Google login status
    const handleGoogleLogin = (response) => {
        if (response.credential) { // Check if response contains a credential
            setIsAuthenticated(true); // Set authenticated to true on successful Google login
        }
    };

    const handleSignOut = () => {
        setIsAuthenticated(false); // Reset authentication state
    };

    return (
        <StrictMode>
            <Provider store={store}>
                {isAuthenticated ? (
                    <div>
                        <App /> {/* Show App only if user is authenticated */}
                        <SignOutComponent onSignOut={handleSignOut} /> {/* Sign Out button */}
                    </div>
                ) : (
                    <>  <img src="src/Images/facebook.png" alt="Description of my image" />
                        <FacebookLoginComponent onLogin={handleFacebookLogin} />

                        
                        <GoogleOAuthProvider clientId="186063314066-supj9fb9bg0bqv76lnm61efu13o1dnip.apps.googleusercontent.com">
                            <GoogleLoginComponent onLoginSuccess={handleGoogleLogin} />
                        </GoogleOAuthProvider>
                        <img src="src/Images/download.png" alt="Description of my image" />
                    </>
                )}
            </Provider>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<RootComponent />);
