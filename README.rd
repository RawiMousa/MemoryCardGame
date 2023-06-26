Memory Card Game
MemoryCardGame is a small gaming app based on the classic memory card game. The app allows users to play the game by matching pairs of cards to test and improve their memory skills. Users can sign up and log in to track their progress and compete with others.

Features
Sign up and Login: Users can create an account and log in to the app to access personalized features and track their game progress.
Game Modes: Users can choose to play the game using their uploaded images, randomly generated colors, or a combination of both. The game adapts based on the user's preferences.
Image Upload: Users can upload their own images to be used as card images in the game. The app supports up to 25 image uploads.
Random Color Cards: If the user uploads fewer than 25 images, the remaining card slots are filled with randomly generated color cards.
Matrix-based Gameplay: The game is played on a matrix of 50 cells, with cards randomly distributed for each gameplay session.
Gameplay Controls: Users can flip cards by clicking on them and attempt to match pairs. The game tracks the number of moves and time taken to complete the game.
Leaderboard: The app keeps track of high scores and displays a leaderboard to showcase the top players.
Technologies Used
The MemoryCardGame app is built using the following technologies:

ASP.NET Core: The backend of the app is developed using ASP.NET Core framework, providing a robust and scalable foundation.
Entity Framework Core: Entity Framework Core is used for database access and management, allowing seamless integration with the app's models and database.
Razor Pages: The frontend of the app is built using Razor Pages, providing a clean and maintainable approach to creating dynamic web pages.
JavaScript: JavaScript is used to handle user interactions, game logic, and dynamic content updates.
SQLite: The app utilizes SQLite as the database engine for storing user data and game statistics.
HTML/CSS: HTML and CSS are used for structuring and styling the web pages, providing an engaging and visually appealing user interface.


Installation and Setup
To run the MemoryCardGame app locally on your machine, follow these steps:
1 - Clone the repository: git clone <repository-url>
2 - Navigate to the project directory: cd MemoryCardGame
3 - Restore dependencies: dotnet restore
4 - Build the project: dotnet build
5 - Apply database migrations: dotnet ef database update
6 - Run the app: dotnet run
**Make sure you have the .NET Core SDK installed on your machine before running the app.

Usage
Open your web browser and go to http://localhost:<port> (replace <port> with the appropriate port number).
Sign up for a new account or log in if you already have one.
Upload your images.
Start playing the Memory Card Game by flipping cards and trying to match pairs.
The game will keep track of your moves and time taken to complete the game.


Contributing
We welcome contributions to the MemoryCardGame app. If you find any issues or have suggestions for improvement, please feel free to open an issue or submit a pull request.


Contact
For any inquiries or questions, please contact rawi.mousa@gmail.com.






