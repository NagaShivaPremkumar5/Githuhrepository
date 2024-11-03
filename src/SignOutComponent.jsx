import React from 'react';

function SignOutComponent({ onSignOut }) {
    const handleSignOut = () => {
        // Call the sign out callback provided by the parent component
        if (onSignOut) {
            onSignOut(); // This will notify the parent component to update its state
        }
    };

    return (
        <button onClick={handleSignOut}>Sign Out</button> // Only a single button to handle sign out
    );
}

export default SignOutComponent;
