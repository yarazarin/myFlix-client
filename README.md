#myFlix React App:

This is the client-side for myFlix project, a movie app that lets users access information about different movies and save their favorites. The client-side is built using React and works with the existing server-side code, which includes a REST API and database.


Installation:
Clone this repository: git clone https://github.com/yara/myFlix-client.git
Navigate to the project directory: cd myFlix-client
Install dependencies: npm install


Usage:
To start the development server, run npm start. The app will be available at http://localhost:1234.

To build the app for production, run npm run build. The output will be in the dist directory.


Essential Views & Features:
-Main view
● Returns ALL movies to the user (each movie item with an image, title, and description)
● Filtering the list of movies with a “search” feature
● Ability to select a movie for more details
● Ability to log out
● Ability to navigate to Profile view

-Single Movie view
● Returns data (description, genre, director, image) about a single movie to the user
● Allows users to add a movie to their list of favorites

-Login view
● Allows users to log in with a username and password

-Signup view
● Allows new users to register (username, password, email, date of birth)

-Profile view
● Displays user registration details
● Allows users to update their info (username, password, email, date of birth)
● Displays favorite movies
● Allows users to remove a movie from their list of favorites
● Allows existing users to deregister


