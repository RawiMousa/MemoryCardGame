// This function creates the '?' icon , which when clicking it, it will display the rules/credentials,
// For fields to be filled. This function recieves the container id for the field which will have the '?' propertiy.
// And the description for the field.

function createQuestionIcon(containerId, description) {
    const container = document.getElementById(containerId);
  
    // Creating the question mark icon element
    const questionIcon = document.createElement('i');
    questionIcon.classList.add('fa', 'fa-question-circle');
    questionIcon.classList.add('question-icon');
  
    // Creating the pop-up window element
    const popupWindow = document.createElement('div');
    popupWindow.classList.add('popup-window');
    popupWindow.textContent = description;
    console.log(popupWindow.textContent);
  
    // Appending the icon and pop-up window to the container
    container.appendChild(questionIcon);
    container.appendChild(popupWindow);
  
    // Adding hover behavior
    questionIcon.addEventListener('mouseenter', () => {
      popupWindow.classList.add('show');
    });
    questionIcon.addEventListener('mouseleave', () => {
      popupWindow.classList.remove('show');
    });
  }
  
