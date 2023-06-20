let imagesTabCreated = false;

function toggleImagesTab() {

    const imagesTab = document.getElementById('ImagesTab');
    const myImages = document.getElementById('myImages');
    // const questionIconContainer = document.getElementById('questionIconContainer');

    if (!imagesTabCreated) {
        const uploadImages = document.createElement('button');
        uploadImages.textContent = 'Upload images';
        uploadImages.className = 'upload-button';
        uploadImages.id = 'UploadImages';
        imagesTab.appendChild(uploadImages);

        const getMyImages = document.createElement('button');
        getMyImages.textContent = 'My images';
        getMyImages.className = 'myImages-button';
        getMyImages.id = 'GetMyImages';
        myImages.appendChild(getMyImages);


        // createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');
        uploadImages.addEventListener('click', CreateUploadForm);
        getMyImages.addEventListener('click', handleMyImagesClick);
        imagesTabCreated = true;
    }

    if (imagesTab.style.display === 'none') {
        imagesTab.style.display = 'block';
    }

    if (myImages.style.display === 'none'){
        myImages.style.display = 'block';
    }
}





let inputFile;

function CreateUploadForm() {

  const questionIconContainer = document.getElementById('questionIconContainer');

  const imageForm = document.createElement('form');
  imageForm.id = 'UploadForm';

  inputFile = document.createElement('input');
  inputFile.type = 'file';
  inputFile.name = 'FileName';
  inputFile.id = 'imageInput'; // Modify the ID here
  inputFile.accept = 'image/*';
  imageForm.appendChild(inputFile);

  const uploadButton = document.createElement('button');
  uploadButton.id = 'UploadButton';
  uploadButton.textContent = 'Upload';
  imageForm.appendChild(uploadButton);
  createQuestionIcon(questionIconContainer.id, 'Maximum size: 500x500 pixels.\n File format: PNG or JPEG.\n Up to 25 images max.\n An image cannot be uploaded twice.');


  uploadButton.addEventListener('click', handleImageUpload);

  const imagesTab = document.getElementById('ImagesTab');
  imagesTab.appendChild(imageForm);
}





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
  







// Event handler for the "My Images" button click
function handleMyImagesClick() {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('token');
    
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
        // Handle the retrieved images data
        console.log(data); // Do something with the images
        
        const galleryContainer = document.getElementById('galleryContainer');
    
        // Clear the existing content in the gallery container
        galleryContainer.innerHTML = '';
    
        // Iterate over each image data and create the HTML element for the gallery view
        data.forEach(imageData => {
          const imageElement = document.createElement('div');
          imageElement.classList.add('gallery-image');
          
          const image = document.createElement('img');
          image.src = imageData.imageUrl;
          image.alt = imageData.imageName;
          
          const imageCaption = document.createElement('p');
          imageCaption.textContent = imageData.imageName;
          
          imageElement.appendChild(image);
          imageElement.appendChild(imageCaption);
          
          galleryContainer.appendChild(imageElement);
        });
    
        // Display the gallery container
        galleryContainer.style.display = 'block';
      })
      .catch(error => {
        // Handle any errors that occurred during the fetch
        console.error(error);
      });
  }
  
  
  // Attach the onclick event listener to the "My Images" button
  const myImagesButton = document.getElementById('myImagesButton');
  myImagesButton.addEventListener('click', handleMyImagesClick);
  