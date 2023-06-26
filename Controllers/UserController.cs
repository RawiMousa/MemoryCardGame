using Microsoft.AspNetCore.Mvc;
using MemoryCardGame.Repositories;
using MemoryCardGame.Entities;
using MemoryCardGame.Services;
using Microsoft.AspNetCore.Identity;


namespace MemoryCardGame.Controllers
{
    [Route("users")]
    [ApiController]

    public class UserController : ControllerBase
    {
        private readonly UserRepository _userRepository;

        private readonly IPasswordHasher<User> _passwordHasher;

        private readonly SignupService _signupService;

        private readonly GenerateTokenService _generateTokenService;


        public UserController(UserRepository userRepository, IPasswordHasher<User> passwordHasher, SignupService signupService, GenerateTokenService generateTokenService)
        {
            _userRepository = userRepository;
            _passwordHasher = passwordHasher;
            _signupService = signupService;
            _generateTokenService = generateTokenService;
        }


        // GET: /users
        [HttpGet]
        public IActionResult GetAllUsers()
        {
            var users = _userRepository.GetAllUsers();
            return Ok(users);
        }


        // GET: /users/{id}
        [HttpGet("{id}")]
        public IActionResult GetUserById(int id)
        {
            var userById = _userRepository.GetUserById(id);
            if (userById == null)
            {
                return NotFound();
            }
            return Ok(userById);
        }


        // POST: /users/signup
        [HttpPost("signup")]
        public IActionResult Signup([FromBody] User user)
        {
            try
            {
                // Perform any necessary validation on the user data
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }
                // Validating the book details using the custom validation module BookValidation
                List<string> validationErrors = SignupService.ValidateSignup(user, _userRepository);
                if (validationErrors.Count > 0)
                {
                    foreach (var error in validationErrors)
                    {
                        ModelState.AddModelError("", error);
                    }
                    return BadRequest(ModelState);
                }
                // Hash the user's password before saving it
                user.Password = _passwordHasher.HashPassword(user, user.Password);
                // Setting the admin to false 
                user.IsAdmin = false;
                // Save the user to the database
                _userRepository.CreateUser(user);
                // Return a success response
                return Ok("Signup successful");
                // return RedirectToPage("/Index");
            }
            catch (Exception ex)
            {
                // Return an error response if any exception occurs
                return StatusCode(500, "An error occurred during signup");
            }
        }

        // Declaring this class and using it in the Login API Post request.
        public class LoginRequest
        {
            public string Username { get; set; }
            public string Password { get; set; }
        }


        // POST : /users/login
        [HttpPost("login")]
        public IActionResult Login([FromBody] LoginRequest loginRequest)
        {
            try
            {
                // Performing any necessary validation on the login request
                if (string.IsNullOrEmpty(loginRequest.Username) || string.IsNullOrEmpty(loginRequest.Password))
                {
                    return BadRequest("Username and password are required.");
                }
                // Retrieve the user from the database based on the provided username or email
                var user = _userRepository.Login(loginRequest.Username, loginRequest.Password);

                if (user != null)
                {
                // Authentication successful - generating a token for the logged in user.
                var token = _generateTokenService.GenerateToken(user.Id.ToString());

                // Return the token as a response
                return Ok(new { Token = token, UserId = user.Id });
                }
                else
                {
                    // Authentication failed
                    return Unauthorized("Invalid username or password");
                }
            }
            catch (Exception ex)
            {
                // Return an error response if any exception occurs
                return StatusCode(500, "An error occurred during login");
            }
        }


        // Declaring this class and using it in the Logout API Post request.
        public class LogoutRequest
        {
            public int UserId { get; set; }
        }


        // POST: /users/logout
        [HttpPost("logout")]
        public IActionResult Logout([FromBody] LogoutRequest request)
        {
            var user = _userRepository.Logout(request.UserId);
            if (user != null)
            {                
                return Ok("Logged out successfully");
            }
            else
            {
                return NotFound("User not found");
            }
        }

        // PUT: /users/{id}
        [HttpPut("{id}")]
        public IActionResult UpdateUser(int id, [FromBody] User updatedUser)
        {
            var existingUser = _userRepository.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }

            existingUser.Username = updatedUser.Username;
            existingUser.Password = updatedUser.Password; 

            _userRepository.UpdateUser(existingUser);

            return NoContent();
        }
        

        // DELETE: /users/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteUser(int id)
        {
            var existingUser = _userRepository.GetUserById(id);
            if (existingUser == null)
            {
                return NotFound();
            }
            _userRepository.DeleteUser(existingUser);
            return NoContent();
        }
    }
}
