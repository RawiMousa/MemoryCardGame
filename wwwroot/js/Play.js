function redirectToPlay() {
    window.location.href = '/Play';
}

function QuitGame() {
    window.location.href = '/HomePage';
}


// // Define the number of cards
// const totalCards = 50;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   for (let i = 0; i < totalCards; i++) {
//     const card = document.createElement('div');
//     card.classList.add('card');
//     card.textContent = i + 1; // Display the card number for testing

//     gameBoard.appendChild(card);
//   }
// }

// // Call the generateCards function to create the cards on page load
// generateCards();



// const rows = 5;
// const columns = 10;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   for (let i = 0; i < rows; i++) {
//     const row = document.createElement('div');
//     row.classList.add('row');

//     for (let j = 0; j < columns; j++) {
//       const card = document.createElement('div');
//       card.classList.add('card');
//       card.textContent = i * columns + j + 1; // Display the card number for testing

//       row.appendChild(card);
//     }

//     gameBoard.appendChild(row);
//   }
// }

// // Call the generateCards function to create the cards on page load
// generateCards();



// const rows = 5;
// const columns = 10;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   // Fetch the user's images from the API
//   const userId = localStorage.getItem('userId');
//   fetch(`/images/user/${userId}`)
//     .then(response => response.json())
//     .then(images => {
//         console.log(images);
//       // Ensure that we have enough images for the cards
//       if (images.length < (rows * columns) / 2) {
//         console.error('Insufficient number of images');
//         return;
//       }

//       // Duplicate the images for matching pairs
//       const cardImages = images.slice(0, (rows * columns) / 2);
//       const duplicatedImages = [...cardImages, ...cardImages];

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');

//           // Create an image element for the card
//           const image = document.createElement('img');
//           image.classList.add('card-image');
//           image.src = duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0];

//           card.appendChild(image);
//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Call the generateCards function to create the cards on page load
// generateCards();







// const rows = 5;
// const columns = 10;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   // Fetch the user's images from the API
//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token') // Replace with the actual token
//   fetch(`/images/user/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//       // Add any other headers required by your API
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         // Handle successful response
//         return response.json(); // Assuming the response contains JSON data
//       } else {
//         // Handle error response
//         throw new Error('Failed to fetch user images');
//       }
//     })
//     .then(data => {
//       // Ensure that we have enough images for the cards
//       if (data.length < (rows * columns) / 2) {
//         console.error('Insufficient number of images');
//         return;
//       }

//       // Duplicate the images for matching pairs
//       const cardImages = data.slice(0, (rows * columns) / 2);
//       const duplicatedImages = [...cardImages, ...cardImages];

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');
          

//           // Create an image element for the card
//           const image = document.createElement('img');
//           image.classList.add('card-image');
//           image.src = `/Uploads/${duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName}`;

//           card.appendChild(image);
//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Call the generateCards function to create the cards on page load
// generateCards();








// const rows = 5;
// const columns = 10;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   // Fetch the user's images from the API
//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token'); // Replace with the actual token
//   fetch(`/images/user/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//       // Add any other headers required by your API
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         // Handle successful response
//         return response.json(); // Assuming the response contains JSON data
//       } else {
//         // Handle error response
//         throw new Error('Failed to fetch user images');
//       }
//     })
//     .then(data => {
//       // Ensure that we have enough images for the cards
//       if (data.length < (rows * columns) / 2) {
//         console.error('Insufficient number of images');
//         return;
//       }

//       // Duplicate the images for matching pairs
//       const cardImages = data.slice(0, (rows * columns) / 2);
//       const duplicatedImages = [...cardImages, ...cardImages];

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');
//           card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//           card.addEventListener('click', flipCard);

//           // Create an image element for the card
//           const image = document.createElement('img');
//           image.classList.add('card-image');
//           image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//           card.appendChild(image);
//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Function to handle card click event
// function flipCard() {
//   if (this.classList.contains('flipped')) {
//     // Card is already flipped, do nothing
//     return;
//   }

//   this.classList.add('flipped');
//   const image = this.querySelector('.card-image');
//   image.src = `/Uploads/${this.getAttribute('data-image')}`;
// }

// // Call the generateCards function to create the cards on page load
// generateCards();















// const rows = 5;
// const columns = 10;

// // Generate the card elements dynamically
// function generateCards() {
//   const gameBoard = document.getElementById('gameBoard');

//   // Fetch the user's images from the API
//   const userId = localStorage.getItem('userId');
//   const token = localStorage.getItem('token'); // Replace with the actual token
//   fetch(`/images/user/${userId}`, {
//     method: 'GET',
//     headers: {
//       'Authorization': `Bearer ${token}`
//       // Add any other headers required by your API
//     }
//   })
//     .then(response => {
//       if (response.ok) {
//         // Handle successful response
//         return response.json(); // Assuming the response contains JSON data
//       } else {
//         // Handle error response
//         throw new Error('Failed to fetch user images');
//       }
//     })
//     .then(data => {
//       const totalCards = rows * columns;
//       const requiredImages = Math.min(data.length, totalCards / 2);

//       // Duplicate the images for matching pairs
//       const cardImages = data.slice(0, requiredImages);
//       const duplicatedImages = [...cardImages, ...cardImages];

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');
//           card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//           card.addEventListener('click', flipCard);

//           // Create an image element for the card
//           const image = document.createElement('img');
//           image.classList.add('card-image');
//           image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//           card.appendChild(image);
//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }

//       // Fill remaining slots with random colored cards
//       const remainingSlots = totalCards - requiredImages * 2;
//       for (let i = 0; i < remainingSlots; i++) {
//         const card = document.createElement('div');
//         card.classList.add('card');
//         card.style.backgroundColor = getRandomColor();
//         gameBoard.appendChild(card);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Function to generate a random color
// function getRandomColor() {
//   const letters = '0123456789ABCDEF';
//   let color = '#';
//   for (let i = 0; i < 6; i++) {
//     color += letters[Math.floor(Math.random() * 16)];
//   }
//   return color;
// }

// // Function to handle card click event
// function flipCard() {
//   if (this.classList.contains('flipped')) {
//     // Card is already flipped, do nothing
//     return;
//   }

//   this.classList.add('flipped');
//   const image = this.querySelector('.card-image');
//   image.src = `/Uploads/${this.getAttribute('data-image')}`;
// }

// // Call the generateCards function to create the cards on page load
// generateCards();














const rows = 5;
const columns = 10;

// Generate the card elements dynamically
function generateCards() {
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

      for (let i = 0; i < rows; i++) {
        const row = document.createElement('div');
        row.classList.add('row');

        for (let j = 0; j < columns; j++) {
          const card = document.createElement('div');
          card.classList.add('card');

          if (duplicatedImages.length > 0) {
            card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
            card.addEventListener('click', flipCard);

            // Create an image element for the card
            const image = document.createElement('img');
            image.classList.add('card-image');
            image.src = '/images/card2.jpg'; // Replace with the path to your static back image

            card.appendChild(image);
          } else {
            // Fill remaining slots with random colored cards
            card.style.backgroundColor = getRandomColor();
          }

          row.appendChild(card);
        }

        gameBoard.appendChild(row);
      }
    })
    .catch(error => {
      console.error('Error fetching images:', error);
    });
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

// Function to handle card click event
function flipCard() {
  if (this.classList.contains('flipped')) {
    // Card is already flipped, do nothing
    return;
  }

  this.classList.add('flipped');
  const image = this.querySelector('.card-image');
  image.src = `/Uploads/${this.getAttribute('data-image')}`;
}

// Call the generateCards function to create the cards on page load
generateCards();










