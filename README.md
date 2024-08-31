Project Description:
myFlix is a frontend application for the movie database myFlix. This application allows users to look at a list of movies, view detailed information about each movie they click, update and manage their profile, and add to or remove movies to their favorite movies list. The application is built using React and React Bootstrap, with React Router for client-side routing.

Features:
User Authentication: Users can signup, login, and logout
Movie Browsing: Browsing through a collection of movies fetched from the vackend API
Movie Details: View detailed information about specific movies
User Profile: View and updare user profile information
Favorite Movies: Add or remove movies from a list of favorites
Search Functionality: Search for movies by title using a seach bar in the navigation

Dependencies:
React
React Router
React Bootsrap
Bootstrap
Fetch API for HTTP requests

Components:

MainView
Returns ALL movies to the user (each movie item with an image, title, and director)

MovieCard
The MovieCard component displays individual movie information and allows users to add or remove movies from their favorites.

LoginView 
Allows users to log in with a username and password 

SignupView 
Allows new users to register (username, password, email, date of birth)

ProfileView
Displays user registration details and the users favorite movies list

Usage:

Signup: Navigate to signup page to create new account

Login: Navigate to the login page to login with account info to access your account

Browse Movies: View the list of all of the movies available

View Movie Details: Click on the "see more" button in a movie card to see details about the movie

Manage Favorites: Add or remove movies from your favorite movies list, it'll populate your profile

Update Profile: Update user profile information (username, password, email, birthday) from the profile page. Also the ability to remove movies from your favorites.

Search: Use the search bar to filter movies by title

Deployment:
Build the application for production:
npm run build
Deploy the build directory to your preferred web server or hosting service.


Hosting:
This project is hosted on Netlify: https://shareif-flix.netlify.app/
