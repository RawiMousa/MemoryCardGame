function redirectToPlay() {
    window.location.href = '/Play';
}

function QuitGame() {
    window.location.href = '/HomePage';
}




const rows = 5;
const columns = 10;

// Generate the card elements dynamically
function generateCards() {

  const pointCounter = document.getElementById('pointCounter'); 

  const gameBoard = document.getElementById('gameBoard');

  // Fetch the user's images from the API
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token'); // Replace with the actual token
  fetch(`/images/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
      // Add any other headers required by your API
    }
  })
    .then(response => {
      if (response.ok) {
        // Handle successful response
        return response.json(); // Assuming the response contains JSON data
      } else {
        // Handle error response
        throw new Error('Failed to fetch user images');
      }
    })
    .then(data => {
      const totalCards = rows * columns;
      const requiredImages = Math.min(data.length, totalCards / 2);

      // Duplicate the images for matching pairs
      const cardImages = data.slice(0, requiredImages);
      const duplicatedImages = [...cardImages, ...cardImages];

      const remainingCards = totalCards - duplicatedImages.length;

      const colors = getRandomColors(remainingCards);

      let cardsData = [];

      // Create an array with combined image and color data
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

      // Randomly shuffle the cardsData array
      shuffleArray(cardsData);

      let dataIndex = 0;

      for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < columns; j++) {
          const card = document.createElement('div');
          card.classList.add('card');

          const cardData = cardsData[dataIndex];

          if (cardData.type === 'image') {
            card.setAttribute('data-image', cardData.data);
            card.addEventListener('click', flipCard);

            const image = document.createElement('img');
            image.classList.add('card-image');
            image.src = '/images/card2.jpg'; // Replace with the path to your static back image

            card.appendChild(image);
          } else {
            card.style.backgroundColor = cardData.data;
            card.setAttribute('data-data', cardData.data); // Add this line to set the data attribute

            card.addEventListener('click', flipCard);
            const image = document.createElement('img');
            image.classList.add('card-image');
            image.src = '/images/card2.jpg'; // Replace with the path to your static back image

            card.appendChild(image);

          }

          dataIndex++;

          row.appendChild(card);
        }

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






// Function to shuffle an array using the Fisher-Yates algorithm
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}




let lentgh = 0;
let turnTimes = 0;
let turnStartTime; 
let turnEndTime;
let timerInterval;
let isTimerRunning = false;
let seconds = 0;
function startTimer() {
    isTimerRunning = true;
    turnStartTime = performance.now();
    console.log(turnStartTime);
    timerInterval = setInterval(() => {
      seconds++;
      document.getElementById('Timer').textContent = formatTime(seconds);
    }, 1000);
  }
  

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
  
function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
}






// Function to handle card click event
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








function checkIfMatchOrNot(array) {
    const card1 = array[0].parentNode;
    const card2 = array[1].parentNode;

    const allFlipped = document.querySelectorAll('.flipped');
    if (allFlipped.length === 50) {
    displayMessage('Congratulations! Well done!');
    }

 
    // Check if both cards are color cards
    if (card1.hasAttribute('data-data') && card2.hasAttribute('data-data')) {
      const data1 = card1.getAttribute('data-data');
      const data2 = card2.getAttribute('data-data');
  
      if (data1 === data2) {

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
        flipBackCards(array[0], array[1]);
      }
    } else {
      // Check if both cards are image cards
      if (array[0].src === array[1].src) {

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
        flipBackCards(array[0], array[1]);
      }
    }
  }
  
  
  

function dissolveCards(img1 , img2) {
    const card1 = img1.parentNode;
    const card2 = img2.parentNode;
    
    // Create new image elements with the "back" image source
    const backImage1 = document.createElement('img');
    backImage1.classList.add('card-image');
    backImage1.src = '/images/Vsign.jpeg'; // Replace with the path to your static back image
    
    const backImage2 = document.createElement('img');
    backImage2.classList.add('card-image');
    backImage2.src = '/images/Vsign.jpeg'; // Replace with the path to your static back image
    
    // Replace the existing image elements with the new "back" image elements
    card1.replaceChild(backImage1, img1);
    card2.replaceChild(backImage2, img2);
    
    }
      




function flipBackCards(img1, img2) {
    setTimeout(() => {
        const card1 = img1.parentNode;
        const card2 = img2.parentNode;
    
        card1.classList.remove('flipped');
        card2.classList.remove('flipped');
        img1.src = '/images/card2.jpg'; // Replace with the path to your static back image
        img2.src = '/images/card2.jpg'; // Replace with the path to your static back image
    
        card1.addEventListener('click', flipCard);
        card2.addEventListener('click', flipCard);
    }, 500); // Delay of 1 second before flipping back the cards
    }


function calculateAverageTime(timesLength, times) {
    const averageSeconds = times / timesLength;
    return averageSeconds;
    }

function calculateAverageMoves(totalMoves) {
    const averageMoves = totalMoves/25;
    const roundedAverageMoves = Math.ceil(averageMoves);
    return roundedAverageMoves;
}


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
      
// Call the generateCards function to create the cards on page load
generateCards();