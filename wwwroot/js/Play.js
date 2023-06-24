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

// Function to handle card click event
let flippedCards = [];
function flipCard() {
  if (this.classList.contains('flipped')) {
    // Card is already flipped, do nothing
    return;
  }

  this.classList.add('flipped');
  const flippedImage = this.querySelector('.card-image');
  flippedImage.src = `/Uploads/${this.getAttribute('data-image')}`;
  console.log(flippedImage);
  flippedCards.push(flippedImage);

  if (flippedCards.length < 2){
      return;
  }
  else if(flippedCards.length === 2){
    checkIfMatchOrNot(flippedCards);
    flippedCards = [];
  }
}



function checkIfMatchOrNot(array) {
    const card1 = array[0].parentNode;
    const card2 = array[1].parentNode;
  
    // Check if both cards are color cards
    if (card1.hasAttribute('data-data') && card2.hasAttribute('data-data')) {
      const data1 = card1.getAttribute('data-data');
      const data2 = card2.getAttribute('data-data');
  
      if (data1 === data2) {
        console.log(true);

        const points = document.getElementById('pointCounter').querySelector('#Points');
        const stringPoints = points.textContent;
        const intPoints = parseInt(stringPoints);
        const intAddAPoint = intPoints + 1;
        const stringAddAPoint = intAddAPoint.toString();
        points.textContent = stringAddAPoint;

        dissolveCards(array[0], array[1]);
        
      } else {
        console.log(false);
        flipBackCards(array[0], array[1]);
      }
    } else {
      // Check if both cards are image cards
      if (array[0].src === array[1].src) {
        console.log(true);
        dissolveCards(array[0], array[1]);
      } else {
        console.log(false);
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
    }, 1000); // Delay of 1 second before flipping back the cards
    }

// function pointCounter
      
// Call the generateCards function to create the cards on page load
generateCards();