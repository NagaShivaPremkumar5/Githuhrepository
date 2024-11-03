import React, { useEffect, useState } from 'react';

function FacebookLoginComponent({ onLogin }) {
    const [userName, setUserName] = useState(null); // State to store the user's name

    useEffect(() => {
        // Initialize the SDK
        window.fbAsyncInit = function() {
            FB.init({
                appId: '8579868722091795', // Replace with your Facebook App ID
                cookie: true,
                xfbml: true,
                version: 'v12.0'
            });

            FB.AppEvents.logPageView();
        };

        // Load the SDK asynchronously
        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s);
            js.id = id;
            js.src = "https://connect.facebook.net/en_US/sdk.js";
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }, []);

    const checkLoginState = () => {
        FB.getLoginStatus(function(response) {
            statusChangeCallback(response);
        });
    };

    const statusChangeCallback = (response) => {
        if (response.status === 'connected') {
            fetchUserInfo();
            onLogin(response); // Call the onLogin callback to update the authenticated state in RootComponent
        } else {
            console.log('Not authenticated');
            setUserName(null);
        }
    };

    const fetchUserInfo = () => {
        FB.api('/me', { fields: 'name' }, function(response) {
            setUserName(response.name);
        });
    };

    const handleLoginClick = () => {
        FB.login(checkLoginState, { scope: 'public_profile,email' });
    };

    return (
        <div>
            {userName ? (
                <p>Welcome, {userName}!</p>
            ) : (
                <button onClick={handleLoginClick}>Login with Facebook</button>
            )}
        </div>
    );
}

export default FacebookLoginComponent;
