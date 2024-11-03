import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";

const GitHubLoginComponent = ({ onLoginSuccess }) => {
  const GITHUB_CLIENT_ID = "Ov23licsmhWFazF2LNbh"; // Replace with your GitHub Client ID
  const REDIRECT_URI = "http://localhost:5173/github-callback"; // Make sure this matches your GitHub app settings

  // GitHub login button click handler
  const handleGitHubLogin = () => {
    const githubAuthUrl = `https://github.com/login/oauth/authorize?client_id=${GITHUB_CLIENT_ID}&redirect_uri=${REDIRECT_URI}`;
    window.location.href = githubAuthUrl;
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const code = searchParams.get("code");

    if (code) {
      console.log("GitHub authorization code:", code);
      // Here you can exchange the code for an access token (ideally on the server-side)
      onLoginSuccess(); // Call the onLoginSuccess prop to update authentication state
    }
  }, [onLoginSuccess]);

  return (
    <div>
      <button onClick={handleGitHubLogin} className="github-login">
        <FaGithub /> Login with GitHub
      </button>
    </div>
  );
};

export default GitHubLoginComponent;
