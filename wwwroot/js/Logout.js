// Fetching the element from the HTML page HomePage.cshtml.
const msg = document.getElementById('LogoutMsg');

// Adding an event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', async (event) => {
    event.preventDefault(); // Prevent the default behavior of the anchor tag

// Retrieving the user ID from local storage
const userId = localStorage.getItem('userId');
const token = localStorage.getItem('token');

// Sending the logout API request with the user ID
try {
const response = await fetch(`/users/logout?userId=${userId}`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}` // Include the token in the request headers
    },
    body: JSON.stringify({ userId: userId })
});

if (response.ok) {
    localStorage.removeItem('token'); //Removing the token from the local storage upon logging out.
    localStorage.removeItem('userId'); //Removing the userId from the local storage upon logging out.
    console.log('Logged out successfully');
    // Redirecting to the landing page.
    window.location.href = '/Index';

} else {
    console.log('Error logging out:', response.status);
}
} catch (error) {
console.log(error);
// Handle the error
} 
});
