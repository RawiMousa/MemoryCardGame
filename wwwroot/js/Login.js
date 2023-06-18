const form = document.querySelector('form');
const msg = document.getElementById('Msg');
const fail = document.getElementById('fail');

form.addEventListener('submit', async (event) => {
  event.preventDefault();
  
  const formData = new FormData(form);
  const username = formData.get('Username');
  const password = formData.get('Password');

  const data = {
    username: username,
    password: password
  };

  try {
    const response = await fetch('/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    if (response.ok || response.status === 204) {
        console.log(response.status);
      let token;

      // Check if the token is in the response headers
      if (response.headers.has('Authorization')) {
        token = response.headers.get('Authorization');
      } else {
        // Assuming the token is returned in the response body as 'token'
        const responseData = await response.json();
        token = responseData.token;
        userId = responseData.userId;
      }
    
      // Store the token in localStorage or sessionStorage
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);

      msg.textContent = 'Signed up successfully!';
      msg.style.display = 'block';
      // Hiding the success message after 3 seconds
      setTimeout(() => {
        // Hide the success message
        msg.style.display = 'none';
    
        // Redirect to the home page
        window.location.href = '/HomePage';
      }, 2000);

    } else {
      fail.textContent = 'One of the details is incorrect';
      fail.style.display = 'block';
      // Hiding the success message after 3 seconds
      setTimeout(() => {
        fail.style.display = 'none';
      }, 2000); 
      console.log(data);
      console.log('Error logging in:', response.status);
    }
  } catch (error) {
    console.log(error);
    // Handle the error
  }
});
