// Getting the nessecary elements from the Index.cshtml which contains the login form.
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
        let Username;

        // Checking if the token is in the response headers
        if (response.headers.has('Authorization')) {
            token = response.headers.get('Authorization');
        } else {
            // Assuming the token is returned in the response body as 'token'
            const responseData = await response.json();
            token = responseData.token;
            userId = responseData.userId;
            Username = responseData.username;
        }
        
        // Storing the token and the userId in localStorage.
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', Username);

        msg.textContent = 'Logged in successfully!'; // Displaying success message upon logging in.
        msg.style.display = 'block';
        // Hiding the success message after 3 seconds
        setTimeout(() => {
            // Hiding the success message
            msg.style.display = 'none';
            // Redirecting to the home page
            window.location.href = '/HomePage';
        }, 1000);

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
