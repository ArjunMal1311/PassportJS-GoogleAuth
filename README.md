# PassportJS-GoogleAuth
This Node.js application uses the passport-google-oauth strategy package to implement Google OAuth authentication. The user can log in using their Google credentials, and their profile information is saved to a local MongoDB database. The project includes a basic home page and profile page that display the user's name, email, and profile picture.

# Installation
1. Install the dependencies!
2. Set up the Google OAuth client credentials!
3. The application will be available at http://localhost:3000

# Setting up the environment variables
Create .env in the root folder
connectionString=[MongoDB]
SECRET=[Your Secret]
GOOGLE_CLIENT_ID=[Google Client ID]
GOOGLE_CLIENT_SECRET=[Google Client Secret]

# Usage
To use the application, simply visit http://localhost:3000 and click the "Login with Google" button. You'll be redirected to the Google authentication page where you can log in using your Google credentials. Once you've logged in, you'll be redirected back to the application and your profile information will be displayed on the profile page.

# References
PassportJS documentation: http://www.passportjs.org/docs/google/
Google OAuth 2.0 documentation: https://developers.google.com/identity/protocols/oauth2
