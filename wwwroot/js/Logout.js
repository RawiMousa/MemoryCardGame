const msg = document.getElementById('LogoutMsg');

// Add an event listener to the logout button
document.getElementById('logoutButton').addEventListener('click', async (event) => {
  event.preventDefault(); // Prevent the default behavior of the anchor tag

  // Retrieve the user ID from local storage
  const userId = localStorage.getItem('userId');
  const token = localStorage.getItem('token');

  // Make the logout API request with the user ID
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
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      console.log('Logged out successfully');
     // Redirect to the home page
        window.location.href = '/Index';

    } else {
      console.log('Error logging out:', response.status);
    }
  } catch (error) {
    console.log(error);
    // Handle the error
  }
});
