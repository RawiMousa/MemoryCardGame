function createQuestionIcon(containerId, description) {
    const container = document.getElementById(containerId);
    console.log(containerId);
  
    // Create the question mark icon element
    const questionIcon = document.createElement('i');
    questionIcon.classList.add('fa', 'fa-question-circle');
    questionIcon.classList.add('question-icon');
  
    // Create the pop-up window element
    const popupWindow = document.createElement('div');
    popupWindow.classList.add('popup-window');
    popupWindow.textContent = description;
    console.log(popupWindow.textContent);
  
    // Append the icon and pop-up window to the container
    container.appendChild(questionIcon);
    container.appendChild(popupWindow);
  
    // Add hover behavior
    questionIcon.addEventListener('mouseenter', () => {
      popupWindow.classList.add('show');
    });
    questionIcon.addEventListener('mouseleave', () => {
      popupWindow.classList.remove('show');
    });
  }
  
