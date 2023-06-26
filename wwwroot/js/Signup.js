// This mini function redirects to the Index.cshtml page
function redirectToLogin() {
    window.location.href = '/Index';
}


// This function serves the signup form in Signup.cshtml.
const form = document.querySelector('form');
// Setting the error fields
const usernameError = form.querySelector('.username-error');
const emailError = form.querySelector('.email-error');
const passwordError = form.querySelector('.password-error');

usernameError.textContent = '';
emailError.textContent = '';
passwordError.textContent = '';

form.addEventListener('submit', (event) => {
  event.preventDefault();
  // Getting the data from the form.
  const formData = new FormData(form);
  const jsonPayload = JSON.stringify(Object.fromEntries(formData));
    // Fetching the API endpoint and sending the data from the form to the server
    fetch('/users/signup', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: jsonPayload
    })
    .then(response => {
        if (response.ok || response.status === 204) {
                // Displaying the success message.
                const successMsgElement = document.getElementById('successMsg');
                if (successMsgElement) {
                successMsgElement.textContent = 'Signed up successfully!';
                successMsgElement.style.display = 'block';
                // Hiding the success message after 3 seconds
                setTimeout(() => {
                    successMsgElement.style.display = 'none';
                    window.location.href = '/Index';
                }, 2000); 
                }        } else if (response.status === 400) {
                    // Error signing up
                    response.json().then(data => {

                    // The data that returns from the server when the status is 400, is a string which describes the field and the problem
                    if (data[""]) {
                    const errorMessage = data[""][0];
                    // Setting the proper error message
                    if (errorMessage.includes("Username")) {
                        usernameError.textContent = errorMessage;
                    }
                    if (errorMessage.includes("Email")) {
                        emailError.textContent = errorMessage;
                    }
                    if (errorMessage.includes("Password")) {
                        passwordError.textContent = errorMessage;
                    }
                    if (errorMessage.includes("Passwords")) {
                        passwordError.textContent = errorMessage;
                    }}
                    });
        } else {
            // Error removing the book
            console.log('Error signing up:', response.status);
        }
    })
    .catch(error => {
        // Handle the error
    });
});

  

// Creating the '?' icon for the fields and adding the discreption for each field using the createQuestionIcon, 
// which is defined in the PopUpIcon.js module.
createQuestionIcon('usernamePopUp','Username should contain only English letters and Numbers, and be 6-12 characters in total.');
createQuestionIcon('emailPopUp', 'Enter a valid email');
createQuestionIcon('passwordPopUp', 'Password should contain 8-20 characters, English letters and numbers only');