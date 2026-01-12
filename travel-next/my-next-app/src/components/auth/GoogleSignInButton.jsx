'use client'; 

import { useEffect } from 'react';

// IMPORTANT: These MUST match the configuration of your backend (UserService)
const GOOGLE_CLIENT_ID = '988044046003-kk5cish28f87e8tjq8s23d8p196itust.apps.googleusercontent.com'; 
const BACKEND_CALLBACK_URL = 'http://localhost:4000/api/auth/google/callback'; 

export default function GoogleSignInButton() {
  
  useEffect(() => {
    if (window.google) {
      window.google.accounts.id.initialize({
        client_id: GOOGLE_CLIENT_ID,
        // This callback is generally not needed when using UX_MODE 'popup' and login_uri
        callback: () => {}, 
      });
      
      // Render the button programmatically
      window.google.accounts.id.renderButton(
        document.getElementById("google-sign-in-button"),
        { 
          theme: "outline", 
          size: "large", 
          text: "signin_with", 
          width: 300 
        } 
      );
      
      // !!! REMOVED THE CONFLICTING window.google.accounts.id.prompt() CALL !!!
      // The button itself now handles initiating the popup flow on click.
    }
  }, []); // Run only once

  return (
    <div id="google-sign-in-button" 
         data-client_id={GOOGLE_CLIENT_ID}
         data-context="signin"
         data-ux_mode="popup"
         data-login_uri={BACKEND_CALLBACK_URL} // The URL Google POSTS the code to
         data-type="standard">
    </div>
  );
}