// This function handles the image upload attempt.
async function handleImageUpload(event) {
    event.preventDefault();
  
    const inputElement = document.getElementById('imageInput'); 
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    const imageFile = inputElement.files[0];

    const formData = new FormData();
    formData.append('FileName', imageFile);
    formData.append('UserId', userId);
  
    try { // Sending a request to the API endpoint including the data in order to upload an image.
      const response = await fetch(`/images`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });
  
      if (response.ok) {
        // Handling a successfull upload.
        console.log('Image uploaded successfully');
        const ImageUploadStatus = document.getElementById('UploadImageSuccess');
        ImageUploadStatus.textContent = 'Image uploaded successfully';
        ImageUploadStatus.style.display = 'block';
        setTimeout(() => {
            // Hiding the success message
            ImageUploadStatus.style.display = 'none';
          }, 1000);
      } else {
        console.log('Error uploading image:', response.status);
        const ImageUploadStatus = document.getElementById('UploadImageFail');
        response.json().then(data => {
            // The data that returns from the server when the status is 400, is a string which describes the field and the problem
                ImageUploadStatus.textContent = data;
                ImageUploadStatus.style.display = 'block';
                setTimeout(() => {
                    // Hiding the fail message
                    ImageUploadStatus.style.display = 'none';
                }, 2000);
          });
        
      }
    } catch (error) {
      console.log('Error:', error);
    }
    inputElement.value = ''; // Reset the input element value
}
  

// Check if the questionIconContainer already exists
let questionIconContainer = document.getElementById('questionIconContainer');
if (!questionIconContainer) {
    questionIconContainer = document.createElement('div');
    questionIconContainer.id = 'questionIconContainer';
    document.body.appendChild(questionIconContainer);
}


// A function which creates the upload form for an image, upon clicking 'Upload images' tab in the Navbar in HomePage.cshtml
function createUploadForm() {
    // Getting the nessacary elements.
    const imagesTab = document.getElementById('ImagesTab');
    const galleryContainer = document.getElementById('galleryContainer');

    // Hide the gallery container if it was previously displayed
    galleryContainer.style.display = 'none';
    // Creating the form element for the upload form
    const imageForm = document.createElement('form');
    imageForm.id = 'UploadForm';
    // Creating the input tag.
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
    // Adding an event lister to the upload button to handle the action using the 'handleImageUpload' which is declared.
    uploadButton.addEventListener('click', handleImageUpload);

    // Clearing the existing content in the gallery container
    galleryContainer.innerHTML = '';

    // Appending the upload form to the images tab
    imagesTab.innerHTML = '';
    imagesTab.appendChild(imageForm);
    imagesTab.style.display = 'block';

    questionIconContainer.style.display = 'block';
}


// A function that handles the 'My Images' tab in the NAvbar in the HomePage.cshtml
function handleMyImagesClick() {
    // Getting the userId and token from the local storage.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    // Fetching the nessacary elements for display the images
    const questionIconContainer = document.getElementById('questionIconContainer');
    const galleryContainer = document.getElementById('galleryContainer');
    const uploadForm = document.getElementById('UploadForm');

    if (uploadForm) {
        // If the upload form exists, hide it and hide the '?' .
        uploadForm.style.display = 'none';
        questionIconContainer.style.display = 'none';
    }
    // Sending a request to the API endpoint including the userId in order to fetch his images.
    fetch(`/images/user/${userId}`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(response => {
            if (response.ok) {
                // Handling successful response
                return response.json(); // Assuming the response contains JSON data
            } else {
                // Handle error response
                throw new Error('Failed to fetch user images');
            }
        })
        .then(data => {
            // Clearing the existing content in the gallery container
            galleryContainer.innerHTML = '';

            if (data.length === 0) {
                // Handling if there are no images.
                const noImagesMessage = document.createElement('p');
                noImagesMessage.textContent = 'No added images';
                noImagesMessage.id = 'noImages';
                galleryContainer.appendChild(noImagesMessage);
            } else {
                // Iterating over the data and setting the images in proper elements for display.
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
                        // Calling a function here to handle image deletion
                        deleteImage(imageData.id);
                    });

                    imageElement.appendChild(image);
                    imageElement.appendChild(deleteIcon);

                    galleryContainer.appendChild(imageElement);
                });}
            // Display the gallery container
            galleryContainer.style.display = 'block';
        })
        .catch(error => {
            // Handle any errors that occurred during the fetch
            console.error(error);
        });
}


// A function that handles deleting a specific image. this function recieves the specific image ID.
function deleteImage(imageId) {
    // Getting the userId and tokne.
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    // Getting the appropriate elements.
    const imagesTab = document.getElementById('ImagesTab');
    const galleryContainer = document.getElementById('galleryContainer');
    const questionIconContainer = document.getElementById('questionIconContainer');
    const uploadForm = document.getElementById('UploadForm');

    // Hiding the images tab and question icon container
    imagesTab.style.display = 'none';
    questionIconContainer.style.display = 'none';
    console.log(imageId);
    // Sending a request to the API endpoint to delete a specific image.
    fetch(`/images/${imageId}`, {
        method: 'DELETE',
        headers: {
            'Authorization': `Bearer ${token}`
        }})
        .then(response => {
            if (response.ok) {
                // Image deleted successfully

                // Fetch the user's images again to display the updated images list
                return fetch(`/images/user/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }});
            } else {
                // Handle error response
                throw new Error('Failed to delete image');
            }
        })
        .then(response => {
            if (response.ok) {
                // Handling successful response
                return response.json(); // Assuming the response contains JSON data
            } else {
                // Handle error response
                throw new Error('Failed to fetch user images');
            }
        })
        .then(data => {
            // Clearing the existing content in the gallery container
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
                        // Calling a function here to handle image deletion
                        deleteImage(imageData.id);
                    });

                    imageElement.appendChild(image);
                    imageElement.appendChild(deleteIcon);

                    galleryContainer.appendChild(imageElement);
                });}
            // Displaying the gallery container
            galleryContainer.style.display = 'block';
        })
        .catch(error => {
            // Handling any errors that occurred during the fetch
            console.error(error);
        });
}
