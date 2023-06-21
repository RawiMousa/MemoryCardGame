// let imagesTabCreated = false;

// function toggleImagesTab() {

//     const imagesTab = document.getElementById('ImagesTab');
//     const myImages = document.getElementById('myImages');

//     if (!imagesTabCreated) {
//         const uploadImages = document.createElement('button');
//         uploadImages.textContent = 'Upload images';
//         uploadImages.className = 'upload-button';
//         uploadImages.id = 'UploadImages';
//         imagesTab.appendChild(uploadImages);

//         const getMyImages = document.createElement('button');
//         getMyImages.textContent = 'My images';
//         getMyImages.className = 'myImages-button';
//         getMyImages.id = 'GetMyImages';
//         myImages.appendChild(getMyImages);


//         // createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');
//         uploadImages.addEventListener('click', CreateUploadForm);
//         getMyImages.addEventListener('click', handleMyImagesClick);
//         // imagesTabCreated = true;
//     }

//     if (imagesTab.style.display === 'none') {
//         imagesTab.style.display = 'block';
//     }

//     if (myImages.style.display === 'none'){
//         myImages.style.display = 'block';
//     }
// }





// let inputFile;

// function CreateUploadForm() {
//   imagesTabCreated = false;


//   const questionIconContainer = document.getElementById('questionIconContainer');

//   const imageForm = document.createElement('form');
//   imageForm.id = 'UploadForm';

//   inputFile = document.createElement('input');
//   inputFile.type = 'file';
//   inputFile.name = 'FileName';
//   inputFile.id = 'imageInput'; // Modify the ID here
//   inputFile.accept = 'image/*';
//   imageForm.appendChild(inputFile);

//   const uploadButton = document.createElement('button');
//   uploadButton.id = 'UploadButton';
//   uploadButton.textContent = 'Upload';
//   imageForm.appendChild(uploadButton);
//   createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');


//   uploadButton.addEventListener('click', handleImageUpload);

//   const imagesTab = document.getElementById('ImagesTab');
//   imagesTab.appendChild(imageForm);
// }


// let uploadFormCreated = false;
// let inputFile;

// function toggleUploadImages() {
//   const imagesTab = document.getElementById('ImagesTab');

//   if (!uploadFormCreated) {
//     const uploadImages = document.createElement('button');
//     uploadImages.textContent = 'Upload images';
//     uploadImages.className = 'upload-button';
//     uploadImages.id = 'UploadImages';
//     imagesTab.appendChild(uploadImages);

//     uploadImages.addEventListener('click', createUploadForm);
//   }

//   imagesTab.style.display = 'block';
// }


// function toggleMyImages() {
//     const myImages = document.getElementById('myImages');

//     const getMyImages = document.createElement('button');
//     getMyImages.textContent = 'My images';
//     getMyImages.className = 'myImages-button';
//     getMyImages.id = 'GetMyImages';
//     myImages.appendChild(getMyImages);
//     getMyImages.addEventListener('click', handleMyImagesClick);
//     myImages.style.display = 'block';
  
// }

// let uploadFormCreated = false;

// function createUploadForm() {
//     const questionIconContainer = document.getElementById('questionIconContainer');

//     const imageForm = document.createElement('form');
//     imageForm.id = 'UploadForm';

//     inputFile = document.createElement('input');
//     inputFile.type = 'file';
//     inputFile.name = 'FileName';
//     inputFile.id = 'imageInput'; // Modify the ID here
//     inputFile.accept = 'image/*';
//     imageForm.appendChild(inputFile);

//     const uploadButton = document.createElement('button');
//     uploadButton.id = 'UploadButton';
//     uploadButton.textContent = 'Upload';
//     imageForm.appendChild(uploadButton);
//     createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');

//     uploadButton.addEventListener('click', handleImageUpload);

//     const imagesTab = document.getElementById('ImagesTab');
//     imagesTab.appendChild(imageForm);
//     imagesTab.style.display = 'block';
// }


// let uploadFormCreated = false;

// function createUploadForm() {
//     if (uploadFormCreated) {
//         return; // Form already created, exit the function
//     }
//     const questionIconContainer = document.getElementById('questionIconContainer');

//     const imageForm = document.createElement('form');
//     imageForm.id = 'UploadForm';

//     const inputFile = document.createElement('input');
//     inputFile.type = 'file';
//     inputFile.name = 'FileName';
//     inputFile.id = 'imageInput'; // Modify the ID here
//     inputFile.accept = 'image/*';
//     imageForm.appendChild(inputFile);

//     const uploadButton = document.createElement('button');
//     uploadButton.id = 'UploadButton';
//     uploadButton.textContent = 'Upload';
//     imageForm.appendChild(uploadButton);
//     createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');

//     uploadButton.addEventListener('click', handleImageUpload);

//     const imagesTab = document.getElementById('ImagesTab');
//     imagesTab.appendChild(imageForm);
//     imagesTab.style.display = 'block';

//     uploadFormCreated = true;
// }





// function handleMyImagesClick() {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');
//     const imagesTab = document.getElementById('ImagesTab');

//     fetch(`/images/user/${userId}`, {
//       method: 'GET',
//       headers: {
//         'Authorization': `Bearer ${token}`
//         // Add any other headers required by your API
//       }
//     })
//       .then(response => {
//         if (response.ok) {
//           // Handle successful response
//           return response.json(); // Assuming the response contains JSON data
//         } else {
//           // Handle error response
//           throw new Error('Failed to fetch user images');
//         }
//       })
//       .then(data => {
//         const galleryContainer = document.getElementById('galleryContainer');
//         // Clear the existing content in the gallery container
//         galleryContainer.innerHTML = '';
    
//         if (data.length === 0) {
//             const noImagesMessage = document.createElement('p');
//             noImagesMessage.textContent = 'No added images';
//             noImagesMessage.id = 'noImages';
//             galleryContainer.appendChild(noImagesMessage);
//         } else {
//             data.forEach(imageData => {
//                 const imageElement = document.createElement('div');
//                 imageElement.classList.add('gallery-image');
    
//                 const image = document.createElement('img');
//                 image.src = `/Uploads/${imageData.fileName}`;
    
//                 const imageCaption = document.createElement('p');
//                 imageCaption.textContent = imageData.imageName;
    
//                 imageElement.appendChild(image);
//                 imageElement.appendChild(imageCaption);
    
//                 galleryContainer.appendChild(imageElement);
//             });
//         }   
//         // Display the gallery container
//         galleryContainer.style.display = 'block';
//       })
//       .catch(error => {
//         // Handle any errors that occurred during the fetch
//         console.error(error);
//       });
//   }



async function handleImageUpload(event) {
    event.preventDefault();
  
    const inputElement = document.getElementById('imageInput'); // Modify the ID here
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const imageFile = inputElement.files[0];

    const formData = new FormData();
    formData.append('FileName', imageFile);
    formData.append('UserId', userId);
  
    try {
      const response = await fetch(`/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        console.log('Image uploaded successfully');
        const ImageUploadStatus = document.getElementById('UploadImageSuccess');
        ImageUploadStatus.textContent = 'Image uploaded successfully';
        ImageUploadStatus.style.display = 'block';
        setTimeout(() => {
            // Hide the success message
            ImageUploadStatus.style.display = 'none';
          }, 2000);
      } else {
        console.log('Error uploading image:', response.status);
        const ImageUploadStatus = document.getElementById('UploadImageFail');
        response.json().then(data => {
            console.log(data);
            // The data that returns from the server when the status is 400, is a string which describes the field and the problem
                ImageUploadStatus.textContent = data;
                ImageUploadStatus.style.display = 'block';
                setTimeout(() => {
                    // Hide the success message
                    ImageUploadStatus.style.display = 'none';
                }, 2000);
          });
        
      }
    } catch (error) {
      console.log('Error:', error);
    }
    inputElement.value = ''; // Reset the input element value
  }
  






  
  // Attach the onclick event listener to the "My Images" button
//   const myImagesButton = document.getElementById('myImagesButton');
//   myImagesButton.addEventListener('click', handleMyImagesClick);
  


// let uploadFormCreated = false;

// function createUploadForm() {
//     const imagesTab = document.getElementById('ImagesTab');
//     const galleryContainer = document.getElementById('galleryContainer');
    
//     // Hide the gallery container if it was previously displayed
//     galleryContainer.style.display = 'none';

//     if (uploadFormCreated) {
//         // If the upload form is already created, hide the images tab
//         imagesTab.style.display = 'none';
//     } else {
//         const questionIconContainer = document.getElementById('questionIconContainer');

//         const imageForm = document.createElement('form');
//         imageForm.id = 'UploadForm';

//         const inputFile = document.createElement('input');
//         inputFile.type = 'file';
//         inputFile.name = 'FileName';
//         inputFile.id = 'imageInput'; // Modify the ID here
//         inputFile.accept = 'image/*';
//         imageForm.appendChild(inputFile);

//         const uploadButton = document.createElement('button');
//         uploadButton.id = 'UploadButton';
//         uploadButton.textContent = 'Upload';
//         imageForm.appendChild(uploadButton);
//         createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');

//         uploadButton.addEventListener('click', handleImageUpload);

//         // Clear the existing content in the gallery container
//         galleryContainer.innerHTML = '';

//         // Append the upload form to the images tab
//         imagesTab.innerHTML = '';
//         imagesTab.appendChild(imageForm);
//         imagesTab.style.display = 'block';

//         // Hide the gallery container
//         galleryContainer.style.display = 'none';

//         uploadFormCreated = true;
//     }
// }

// function handleMyImagesClick() {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');
//     const imagesTab = document.getElementById('ImagesTab');
//     const galleryContainer = document.getElementById('galleryContainer');
    
//     // Hide the upload form if it was previously displayed
//     imagesTab.style.display = 'none';

//     fetch(`/images/user/${userId}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//             // Add any other headers required by your API
//         }
//     })
//     .then(response => {
//         if (response.ok) {
//             // Handle successful response
//             return response.json(); // Assuming the response contains JSON data
//         } else {
//             // Handle error response
//             throw new Error('Failed to fetch user images');
//         }
//     })
//     .then(data => {
//         // Clear the existing content in the gallery container
//         galleryContainer.innerHTML = '';

//         if (data.length === 0) {
//             const noImagesMessage = document.createElement('p');
//             noImagesMessage.textContent = 'No added images';
//             noImagesMessage.id = 'noImages';
//             galleryContainer.appendChild(noImagesMessage);
//         } else {
//             data.forEach(imageData => {
//                 const imageElement = document.createElement('div');
//                 imageElement.classList.add('gallery-image');

//                 const image = document.createElement('img');
//                 image.src = `/Uploads/${imageData.fileName}`;

//                 const imageCaption = document.createElement('p');
//                 imageCaption.textContent = imageData.imageName;

//                 imageElement.appendChild(image);
//                 imageElement.appendChild(imageCaption);

//                 galleryContainer.appendChild(imageElement);
//             });
//         }
//         // Display the gallery container
//         galleryContainer.style.display = 'block';
//     })
//     .catch(error => {
//         // Handle any errors that occurred during the fetch
//         console.error(error);
//     });
// }


// Check if the questionIconContainer already exists
let questionIconContainer = document.getElementById('questionIconContainer');
if (!questionIconContainer) {
    questionIconContainer = document.createElement('div');
    questionIconContainer.id = 'questionIconContainer';
    document.body.appendChild(questionIconContainer);
}

function createUploadForm() {
    const imagesTab = document.getElementById('ImagesTab');
    const galleryContainer = document.getElementById('galleryContainer');
    const uploadForm = document.getElementById('UploadForm');

    // Hide the gallery container if it was previously displayed
    galleryContainer.style.display = 'none';

    const imageForm = document.createElement('form');
    imageForm.id = 'UploadForm';

    const inputFile = document.createElement('input');
    inputFile.type = 'file';
    inputFile.name = 'FileName';
    inputFile.id = 'imageInput'; // Modify the ID here
    inputFile.accept = 'image/*';
    imageForm.appendChild(inputFile);

    const uploadButton = document.createElement('button');
    uploadButton.id = 'UploadButton';
    uploadButton.textContent = 'Upload';
    imageForm.appendChild(uploadButton);

    // Check if the question icon is already added
    if (!questionIconContainer.querySelector('.question-icon')) {
        createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');
    }

    uploadButton.addEventListener('click', handleImageUpload);

    // Clear the existing content in the gallery container
    galleryContainer.innerHTML = '';

    // Append the upload form to the images tab
    imagesTab.innerHTML = '';
    imagesTab.appendChild(imageForm);
    imagesTab.style.display = 'block';

    questionIconContainer.style.display = 'block';

}

// function handleMyImagesClick() {
//     const userId = localStorage.getItem('userId');
//     const token = localStorage.getItem('token');
//     const imagesTab = document.getElementById('ImagesTab');
//     const questionIconContainer = document.getElementById('questionIconContainer');
//     const galleryContainer = document.getElementById('galleryContainer');
//     const uploadForm = document.getElementById('UploadForm');

//     if (uploadForm) {
//         // If the upload form exists, hide it
//         uploadForm.style.display = 'none';
//         questionIconContainer.style.display = 'none';
//     }

//     fetch(`/images/user/${userId}`, {
//         method: 'GET',
//         headers: {
//             'Authorization': `Bearer ${token}`
//             // Add any other headers required by your API
//         }
//     })
//         .then(response => {
//             if (response.ok) {
//                 // Handle successful response
//                 return response.json(); // Assuming the response contains JSON data
//             } else {
//                 // Handle error response
//                 throw new Error('Failed to fetch user images');
//             }
//         })
//         .then(data => {
//             // Clear the existing content in the gallery container
//             galleryContainer.innerHTML = '';

//             if (data.length === 0) {
//                 const noImagesMessage = document.createElement('p');
//                 noImagesMessage.textContent = 'No added images';
//                 noImagesMessage.id = 'noImages';
//                 galleryContainer.appendChild(noImagesMessage);
//             } else {
//                 data.forEach(imageData => {
//                     const imageElement = document.createElement('div');
//                     imageElement.classList.add('gallery-image');

//                     const image = document.createElement('img');
//                     image.src = `/Uploads/${imageData.fileName}`;

//                     const imageCaption = document.createElement('p');
//                     imageCaption.textContent = imageData.imageName;

//                     imageElement.appendChild(image);
//                     imageElement.appendChild(imageCaption);

//                     galleryContainer.appendChild(imageElement);
//                 });
//             }
//             // Display the gallery container
//             galleryContainer.style.display = 'block';
//         })
//         .catch(error => {
//             // Handle any errors that occurred during the fetch
//             console.error(error);
//         });
// }




function handleMyImagesClick() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const imagesTab = document.getElementById('ImagesTab');
    const questionIconContainer = document.getElementById('questionIconContainer');
    const galleryContainer = document.getElementById('galleryContainer');
    const uploadForm = document.getElementById('UploadForm');

    if (uploadForm) {
        // If the upload form exists, hide it
        uploadForm.style.display = 'none';
        questionIconContainer.style.display = 'none';
    }

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
            // Clear the existing content in the gallery container
            galleryContainer.innerHTML = '';

            if (data.length === 0) {
                const noImagesMessage = document.createElement('p');
                noImagesMessage.textContent = 'No added images';
                noImagesMessage.id = 'noImages';
                galleryContainer.appendChild(noImagesMessage);
            } else {
                data.forEach(imageData => {
                    const imageElement = document.createElement('div');
                    imageElement.classList.add('gallery-image');

                    const image = document.createElement('img');
                    image.src = `/Uploads/${imageData.fileName}`;

                    const imageCaption = document.createElement('p');
                    imageCaption.textContent = imageData.imageName;

                    const deleteIcon = document.createElement('span');
                    deleteIcon.textContent = 'x';
                    deleteIcon.classList.add('delete-icon');
                    deleteIcon.addEventListener('click', () => {
                        // Call a function here to handle image deletion
                        deleteImage(imageData.id);
                    });

                    imageElement.appendChild(image);
                    imageElement.appendChild(deleteIcon);

                    galleryContainer.appendChild(imageElement);
                });
            }
            // Display the gallery container
            galleryContainer.style.display = 'block';
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error(error);
        });
}

function deleteImage(imageId) {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const imagesTab = document.getElementById('ImagesTab');
    const galleryContainer = document.getElementById('galleryContainer');
    const questionIconContainer = document.getElementById('questionIconContainer');
    const uploadForm = document.getElementById('UploadForm');

    // Hide the images tab and question icon container
    imagesTab.style.display = 'none';
    questionIconContainer.style.display = 'none';
    console.log(imageId);

    fetch(`/images/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
            // Add any other headers required by your API
        }
    })
        .then(response => {
            if (response.ok) {
                // Image deleted successfully

                // Fetch the user's images again
                return fetch(`/images/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                        // Add any other headers required by your API
                    }
                });
            } else {
                // Handle error response
                throw new Error('Failed to delete image');
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
            // Clear the existing content in the gallery container
            galleryContainer.innerHTML = '';

            if (data.length === 0) {
                const noImagesMessage = document.createElement('p');
                noImagesMessage.textContent = 'No added images';
                noImagesMessage.id = 'noImages';
                galleryContainer.appendChild(noImagesMessage);
            } else {
                data.forEach(imageData => {
                    const imageElement = document.createElement('div');
                    imageElement.classList.add('gallery-image');

                    const image = document.createElement('img');
                    image.src = `/Uploads/${imageData.fileName}`;

                    const imageCaption = document.createElement('p');
                    imageCaption.textContent = imageData.imageName;

                    const deleteIcon = document.createElement('span');
                    deleteIcon.textContent = 'x';
                    deleteIcon.classList.add('delete-icon');
                    deleteIcon.addEventListener('click', () => {
                        // Call a function here to handle image deletion
                        deleteImage(imageData.id);
                    });

                    imageElement.appendChild(image);
                    imageElement.appendChild(deleteIcon);

                    galleryContainer.appendChild(imageElement);
                });
            }
            // Display the gallery container
            galleryContainer.style.display = 'block';
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error(error);
        });
}
