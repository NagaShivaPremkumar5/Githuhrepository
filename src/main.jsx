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

function LoginPopup({ onFacebookLogin, onGoogleLogin, onClose }) {
    return (
        <div className="popup">
            <button onClick={onClose} className="close-popup">Close</button>
            <h3>Login</h3>
            <FacebookLoginComponent onLogin={onFacebookLogin} />
            <GoogleOAuthProvider clientId="186063314066-supj9fb9bg0bqv76lnm61efu13o1dnip.apps.googleusercontent.com">
                <GoogleLoginComponent onLoginSuccess={onGoogleLogin} />
            </GoogleOAuthProvider>
        </div>
    );
}

function RootComponent() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);

    const handleFacebookLogin = (response) => {
        if (response.status === 'connected') {
            setIsAuthenticated(true);
            setShowLoginPopup(false); // Close popup on successful login
        }
    };

    const handleGoogleLogin = (response) => {
        if (response.credential) {
            setIsAuthenticated(true);
            setShowLoginPopup(false); // Close popup on successful login
        }
    };

    const handleSignOut = () => {
        setIsAuthenticated(false);
    };

    return (
        <StrictMode>
            <Provider store={store}>
                {isAuthenticated ? (
                    <div>
                        <App />
                        <SignOutComponent onSignOut={handleSignOut} />
                    </div>
                ) : (
                    <div>
                        <button onClick={() => setShowLoginPopup(true)}>Login</button>
                        {showLoginPopup && (
                            <LoginPopup 
                                onFacebookLogin={handleFacebookLogin} 
                                onGoogleLogin={handleGoogleLogin} 
                                onClose={() => setShowLoginPopup(false)}
                            />
                        )}
                    </div>
                )}
            </Provider>
        </StrictMode>
    );
}

createRoot(document.getElementById('root')).render(<RootComponent />);
