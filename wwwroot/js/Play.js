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

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);
//           } else {
//             // Fill remaining slots with random colored cards
//             card.style.backgroundColor = getRandomColor();
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
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

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);
//           } else {
//             // Fill remaining slots with random colored cards
//             card.style.backgroundColor = getRandomColor();
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
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

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);
//           } else {
//             // console.log(totalCards);
//             // console.log(cardImages.length);
//             const remainingCards = (totalCards/2) - cardImages.length;
//             // console.log(remainingCards);
//             const color = getRandomColor();
            

//             card.style.backgroundColor = color;
//             //   card.setAttribute('data-color', color);
//             card.addEventListener('click', flipCard);
          
            
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg';
            
//             card.appendChild(image);
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
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

//       const remainingCards = totalCards - duplicatedImages.length;

//       const colors = getRandomColors(remainingCards);

//       let colorIndex = 0;

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);
//           } else {
//             card.style.backgroundColor = colors[colorIndex];
//             colorIndex++;
//             card.addEventListener('click', flipCard);

//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg';

//             card.appendChild(image);
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Function to generate random colors
// function getRandomColors(count) {
//   const colors = [];
//   for (let i = 0; i < count / 2; i++) {
//     const color = getRandomColor();
//     colors.push(color, color);
//   }
//   return colors;
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

//       const remainingCards = totalCards - duplicatedImages.length;

//       const colors = getRandomColors(remainingCards);

//       // Randomly shuffle the colors array
//       shuffleArray(colors);

//       let colorIndex = 0;

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages.splice(Math.floor(Math.random() * duplicatedImages.length), 1)[0].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);
//           } else {
//             card.style.backgroundColor = colors[colorIndex];
//             colorIndex++;
//             card.addEventListener('click', flipCard);

//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg';

//             card.appendChild(image);
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Function to generate random colors
// function getRandomColors(count) {
//   const colors = [];
//   for (let i = 0; i < count / 2; i++) {
//     const color = getRandomColor();
//     colors.push(color, color);
//   }
//   return colors;
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

// // Function to shuffle an array using the Fisher-Yates algorithm
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
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

//       const remainingCards = totalCards - duplicatedImages.length;

//       const colors = getRandomColors(remainingCards);

//       // Randomly shuffle the images and colors arrays
//       shuffleArray(duplicatedImages);
//       shuffleArray(colors);

//       let imageIndex = 0;
//       let colorIndex = 0;

//       for (let i = 0; i < rows; i++) {
//         const row = document.createElement('div');
//         row.classList.add('row');

//         for (let j = 0; j < columns; j++) {
//           const card = document.createElement('div');
//           card.classList.add('card');

//           if (duplicatedImages.length > 0) {
//             card.setAttribute('data-image', duplicatedImages[imageIndex].fileName);
//             card.addEventListener('click', flipCard);

//             // Create an image element for the card
//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg'; // Replace with the path to your static back image

//             card.appendChild(image);

//             imageIndex++;
//           } else {
//             card.style.backgroundColor = colors[colorIndex];
//             colorIndex++;
//             card.addEventListener('click', flipCard);

//             const image = document.createElement('img');
//             image.classList.add('card-image');
//             image.src = '/images/card2.jpg';

//             card.appendChild(image);
//           }

//           row.appendChild(card);
//         }

//         gameBoard.appendChild(row);
//       }
//     })
//     .catch(error => {
//       console.error('Error fetching images:', error);
//     });
// }

// // Function to generate random colors
// function getRandomColors(count) {
//   const colors = [];
//   for (let i = 0; i < count / 2; i++) {
//     const color = getRandomColor();
//     colors.push(color, color);
//   }
//   return colors;
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

// // Function to shuffle an array using the Fisher-Yates algorithm
// function shuffleArray(array) {
//   for (let i = array.length - 1; i > 0; i--) {
//     const j = Math.floor(Math.random() * (i + 1));
//     [array[i], array[j]] = [array[j], array[i]];
//   }
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
