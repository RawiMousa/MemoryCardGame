// This mini function redirects to the Play.cshtml page
function redirectToPlay() {
    window.location.href = '/Play';
}


// This mini function redirects to the HomePage.cshtml page
function QuitGame() {
    window.location.href = '/HomePage';
}


// The function generateCards , generates the 50 cell matrix , and fetches the images of the logged in user,
// And distributes the images to the cells randomly . 
const rows = 5;
const columns = 10;
function generateCards() {
    // Getting the element from the HTML page.
    const gameBoard = document.getElementById('gameBoard');

    // Getting the userId and the token from the local storage.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token'); 
    // Fetching the user image via the API endpoint.
    fetch(`/images/user/${userId}`, {
        method: 'GET',
        headers: {
        'Authorization': `Bearer ${token}`
        }
    })
        .then(response => {
        if (response.ok) {
            // Handling successful response
            return response.json(); // Assuming the response contains JSON data
        } else {
            // Handling error response
            throw new Error('Failed to fetch user images');
        }
        })
        .then(data => {
        // Total cells of the matrix
        const totalCards = rows * columns;
        // Ensuring that the number of required images does not exceed the total available images or the maximum number of card pairs possible in the game.
        const requiredImages = Math.min(data.length, totalCards / 2);

        // Duplicating the images for matching pairs
        const cardImages = data.slice(0, requiredImages);
        const duplicatedImages = [...cardImages, ...cardImages];

        const remainingCards = totalCards - duplicatedImages.length;
        // Generating colors for the remaining cards
        const colors = getRandomColors(remainingCards);

        let cardsData = [];

        // Creating an array with combined image and color data
        for (let i = 0; i < duplicatedImages.length; i++) {
            cardsData.push({
            type: 'image',
            data: duplicatedImages[i].fileName
            });
        }

        for (let i = 0; i < colors.length; i++) {
            cardsData.push({
            type: 'color',
            data: colors[i]
            });
        }

        // Randomly shuffling the cardsData array
        shuffleArray(cardsData);
        // The dataIndex variable ensures that each card element in the matrix,
        // is synchronized with the corresponding data from the cardsData array. 
        // It ensures that the data assigned to each card, whether it is an image file name or a color value, 
        // matches the order in which the cards are being generated and displayed.
        let dataIndex = 0;
        // Generating the matrix
        for (let i = 0; i < rows; i++) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = 0; j < columns; j++) {
            const card = document.createElement('div');
            card.classList.add('card');

            const cardData = cardsData[dataIndex];
            
            if (cardData.type === 'image') {
                card.setAttribute('data-image', cardData.data);  // Setting the attribute
                card.addEventListener('click', flipCard);   // Adding an eventListener to the flipCard function

                const image = document.createElement('img');  // Creating the element for the constant back image of the Card
                image.classList.add('card-image');  // Setting a class
                image.src = '/images/card2.jpg';   // Setting the image

                card.appendChild(image);  // Adding the image to the card container
            } else {
                card.style.backgroundColor = cardData.data;  // Setting the background color of the cell/card
                card.setAttribute('data-data', cardData.data); 

                card.addEventListener('click', flipCard);
                const image = document.createElement('img');
                image.classList.add('card-image');
                image.src = '/images/card2.jpg'; 

                card.appendChild(image);
            }
            //The dataIndex variable ensures that each card element in the matrix,
            // is synchronized with the corresponding data from the cardsData array.
            // It ensures that the data assigned to each card, whether it is an image file name or a color value,
            // matches the order in which the cards are being generated and displayed.
            dataIndex++;
            // Appendiing the cards to the row
            row.appendChild(card);
        }   // Appending the row to the main div
            gameBoard.appendChild(row);
        }
        })
        .catch(error => {
        console.error('Error fetching images:', error);
        });
}


// Function to generate random colors
function getRandomColors(count) {
  const colors = [];
  for (let i = 0; i < count / 2; i++) {
    const color = getRandomColor();
    colors.push(color, color);
  }
  return colors;
}


// Function to generate a random color
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}


// Function to shuffle an array using the Fisher-Yates algorithm.
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}


// Varibales that will be used in a few function. declared outside the functions so they can be global.
let lentgh = 0;
let turnTimes = 0;
let turnStartTime; 
let turnEndTime;
let timerInterval;
let isTimerRunning = false;
let seconds = 0;
// A function that starts the timer when flipping the first card/starting to play.
function startTimer() {
    isTimerRunning = true;
    // A timestamp which is synched with the timer, to provide the average time for each 2 cards match.
    turnStartTime = performance.now();
    console.log(turnStartTime);
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById('Timer').textContent = formatTime(seconds);
    }, 1000);
}
  

// A function which stops the timer when 2 cards match.
function stopTimer() {
    clearInterval(timerInterval);
    isTimerRunning = false;
    seconds = 0;
    document.getElementById('Timer').textContent = formatTime(seconds);
    turnEndTime = performance.now();
    const turnDuration = (turnEndTime - turnStartTime)/1000; // Calculate the duration of the turn

    turnTimes += turnDuration;
    length += 1;
}
  

// A function is used to convert a duration in seconds into a formatted time string in the format "MM:SS" (minutes:seconds).
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}


// A function to handle card click event
let moveCount = 0;
let totalMoveCount = 0;
let flippedCards = [];
function flipCard() {
  if (this.classList.contains('flipped')) {
    // Card is already flipped, do nothing
    return;
  }

  this.classList.add('flipped');
  const flippedImage = this.querySelector('.card-image');
  flippedImage.src = `/Uploads/${this.getAttribute('data-image')}`;
  flippedCards.push(flippedImage);

  if (!isTimerRunning) {
    startTimer();
  }

  if (flippedCards.length < 2){
      return;
  }
  else if(flippedCards.length === 2){
    checkIfMatchOrNot(flippedCards);
    moveCount ++ ;
    const moves = document.getElementById('Moves').querySelector('#MovesNumber');
    const stringMoves = moves.textContent;
    const intMoves = parseInt(stringMoves);
    const intAddAMove = intMoves + 1;
    const stringAddAMove = intAddAMove.toString();
    moves.textContent = stringAddAMove;
    flippedCards = [];
  }
}


// A function that checks if the cards match or not , and performs other sub actions and functions accordingly.
function checkIfMatchOrNot(array) {
    const card1 = array[0].parentNode;
    const card2 = array[1].parentNode;
    // Checking if all cards are flipped/the game if completed, and displaying the message and other details
    const allFlipped = document.querySelectorAll('.flipped');
    if (allFlipped.length === 50) {
    displayMessage('Congratulations! Well done!');
    }

 
    // Check if both cards are color cards
    if (card1.hasAttribute('data-data') && card2.hasAttribute('data-data')) {
      const data1 = card1.getAttribute('data-data');
      const data2 = card2.getAttribute('data-data');
  
      if (data1 === data2) {
        // Incrementing the points
        const points = document.getElementById('pointCounter').querySelector('#Points');
        const stringPoints = points.textContent;
        const intPoints = parseInt(stringPoints);
        const intAddAPoint = intPoints + 1;
        const stringAddAPoint = intAddAPoint.toString();
        points.textContent = stringAddAPoint;

        const moves = document.getElementById('Moves').querySelector('#MovesNumber');
        moves.textContent = '-1';

        totalMoveCount += moveCount;
        moveCount = 0;

        stopTimer();
        dissolveCards(array[0], array[1]);
        
      } else {
        // If cards don't match it flips back
        flipBackCards(array[0], array[1]);
      }
    } else {
      // Check if both cards are image cards
      if (array[0].src === array[1].src) {
        // Incrementing the points
        const points = document.getElementById('pointCounter').querySelector('#Points');
        const stringPoints = points.textContent;
        const intPoints = parseInt(stringPoints);
        const intAddAPoint = intPoints + 1;
        const stringAddAPoint = intAddAPoint.toString();
        points.textContent = stringAddAPoint;

        const moves = document.getElementById('Moves').querySelector('#MovesNumber');
        moves.textContent = '-1';

        totalMoveCount += moveCount;
        moveCount = 0;

        stopTimer();
        dissolveCards(array[0], array[1]);

      } else {
        // If cards don't match it flips back
        flipBackCards(array[0], array[1]);
      }
    }
}
  

// A help function that dissolve the cards if they match , by dissolving it means to give them a 'V' image which means the pair match.
function dissolveCards(img1 , img2) {
    const card1 = img1.parentNode;
    const card2 = img2.parentNode;
    
    // Creating new image elements with the "back" image source
    const backImage1 = document.createElement('img');
    backImage1.classList.add('card-image');
    backImage1.src = '/images/Vsign.jpeg'; // Replace with the path to your static back image
    
    const backImage2 = document.createElement('img');
    backImage2.classList.add('card-image');
    backImage2.src = '/images/Vsign.jpeg'; // Replace with the path to your static back image
    
    // Replacing the existing image elements with the new "back" image elements
    card1.replaceChild(backImage1, img1);
    card2.replaceChild(backImage2, img2);
    
}
      

// A function that flips back the 2 pair of cards if they do not match.
function flipBackCards(img1, img2) {
    setTimeout(() => {
        const card1 = img1.parentNode;
        const card2 = img2.parentNode;
    
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        img1.src = '/images/card2.jpg'; 
        img2.src = '/images/card2.jpg'; 
    
        card1.addEventListener('click', flipCard);
        card2.addEventListener('click', flipCard);
    }, 500); // Delay of 0.5 second before flipping back the cards
}


// A function that calculates the avergae time for each 'turn' , meaning each 2 matching pair.
function calculateAverageTime(timesLength, times) {
    const averageSeconds = times / timesLength;
    return averageSeconds;
}


// A function that calculates the avergae moves for each 'turn' , meaning each 2 matching pair.
function calculateAverageMoves(totalMoves) {
    const averageMoves = totalMoves/25;
    const roundedAverageMoves = Math.ceil(averageMoves);
    return roundedAverageMoves;
}


// A function that displays a message when the game is completed. it displays "Congratulations" , 
// The avergae time for matching pairs , the average moves for matching pairs,
// And displays an option to play the game again or quit to the home page.
function displayMessage(message) {

    const averageTime = calculateAverageTime(length, turnTimes);
    const averageTimeDisplay = document.createElement('div');
    averageTimeDisplay.classList.add('averageTimeDisplay');
    averageTimeDisplay.textContent = `Average time per 2 cards match : ${averageTime} seconds`;

    const averageMoves = calculateAverageMoves(totalMoveCount);
    const averageMovesDisplay = document.createElement('div');
    averageMovesDisplay.classList.add('averageMovesDisplay');
    averageMovesDisplay.textContent = `Average moves per 2 cards match : ${averageMoves} moves`;

    const messageElement = document.createElement('div');
    messageElement.classList.add('message');
    messageElement.textContent = message;

    const questionElement = document.createElement('p');
    questionElement.classList.add('question');
    questionElement.textContent = 'Would you like to play again?';
    
    const playAgainOrNot = document.createElement('div');
    playAgainOrNot.classList.add('play-again');
    
    const yesButton = document.createElement('button');
    yesButton.textContent = 'Yes!';
    yesButton.addEventListener('click', function () {
        window.location.href = '/Play';
    });
    
    const noButton = document.createElement('button');
    noButton.textContent = 'I had enough';
    noButton.addEventListener('click', function () {
        window.location.href = '/HomePage';
    });
    
    playAgainOrNot.appendChild(yesButton);
    playAgainOrNot.appendChild(noButton);

    messageElement.appendChild(averageTimeDisplay);
    messageElement.appendChild(averageMovesDisplay);
    messageElement.appendChild(questionElement);
    messageElement.appendChild(playAgainOrNot);
    
    document.body.appendChild(messageElement);
}
      
// Call the generateCards function to generate the game and start playing it.
generateCards();