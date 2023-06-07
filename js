// Initialize the Google Sign-In API with your client ID
function initGoogleSignIn() {
  google.accounts.id.initialize({
    client_id: 'YOUR_CLIENT_ID',
    callback: handleGoogleSignIn,
  });
  
  // Render the Google Sign-In button
  google.accounts.id.renderButton(
    document.getElementById('google-signin-button'),
    { theme: 'filled_blue', size: 'large' }
  );
}

// Handle the Google Sign-In callback
function handleGoogleSignIn(response) {
  // Get the user's Google ID token
  const idToken = response.credential;

  // Send the token to your backend server for registration
  // You can make an AJAX request or handle it as per your requirements
  registerUserWithGoogle(idToken);
}

// Register the user with the received Google ID token
function registerUserWithGoogle(idToken) {
  // Send the ID token to your backend server for user registration
  // Example AJAX request using fetch:
  fetch('/register/google', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ idToken: idToken }),
  })
    .then(response => {
      // Handle the response from your server
      if (response.ok) {
        // User registered successfully
        console.log('User registered via Google Account.');
      } else {
        // Registration failed
        console.error('Failed to register user via Google Account.');
      }
    })
    .catch(error => {
      console.error('An error occurred during user registration:', error);
    });
}

// Call the initialization function on page load
initGoogleSignIn();
