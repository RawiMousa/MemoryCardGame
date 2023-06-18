using MemoryCardGame.Entities;
using MemoryCardGame.Repositories;
using System.Text.RegularExpressions;

// namespace MemoryCardGame.Services
// {
//     public class SignupService
//     {
//         private readonly UserRepository _userRepository;

//         public SignupService(UserRepository userRepository)
//         {
//             _userRepository = userRepository;
//         }

//         public bool IsUsernameAvailable(string username)
//         {
//             // Check if the username is already taken
//             var existingUser = _userRepository.GetUserByUsername(username);
//             return existingUser == null;
//         }

//         public bool IsEmailAvailable(string email)
//         {
//             // Check if the email is already registered
//             var existingUser = _userRepository.GetUserByEmail(email);
//             return existingUser == null;
//         }

//         public bool ValidatePassword(string password)
//         {
//             // Implement your password validation logic here
//             // Return true if the password meets your criteria, false otherwise
//             return true;
//         }

//         // Add more validation methods as per your requirements

//         public async Task<bool> SignupUser(User user)
//         {
//             // Perform additional validation checks before creating the user
//             if (!IsUsernameAvailable(user.Username))
//             {
//                 // Username is already taken
//                 return false;
//             }

//             if (!IsEmailAvailable(user.Email))
//             {
//                 // Email is already registered
//                 return false;
//             }

//             if (!ValidatePassword(user.Password))
//             {
//                 // Password does not meet the required criteria
//                 return false;
//             }

//             return true;
//         }
//     }
// }








namespace MemoryCardGame.Services
{

    public class SignupService
    {
        private static bool IsUsernameAvailable(string username, UserRepository userRepository)
        {
            // Checking if the username is already taken
            var existingUser = userRepository.GetUserByUsername(username);
            return existingUser == null;
        }

        private static bool IsEmailAvailable(string email, UserRepository userRepository)
        {
            // Checking if the email is already taken
            var existingEmail = userRepository.GetUserByEmail(email);
            return existingEmail == null;
        }

        public static List<string> ValidateSignup(User user, UserRepository userRepository)
        {
            List<string> errors = new List<string>();

            // Validating the username
            if (string.IsNullOrEmpty(user.Username))
            {
                errors.Add("Username is required.");
            }
            else if (user.Username.Length < 6 || user.Username.Length > 12)
            {
                errors.Add("Username should contain only English letters and Numbers, and be 6-12 characters in total.");
            }
            else if (!Regex.IsMatch(user.Username, "^[A-Za-z0-9]+$"))
            {
                errors.Add("Username should contain only English letters and Numbers, and be 6-12 characters in total.");
            }
            else if (!IsUsernameAvailable(user.Username, userRepository))
            {
                errors.Add("Username is already taken.");
            }



            // Validating the email
            string emailPattern = @"^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9\-\.]+$";
            if (string.IsNullOrEmpty(user.Email))
            {
                errors.Add("Email is required");
            }
            else if (!Regex.IsMatch(user.Email, emailPattern))
            {
                errors.Add("Email is invalid");
            }
            else if (!IsEmailAvailable(user.Email, userRepository))
            {
                errors.Add("Email is already registered");
            }



            // Validating the password
            string passwordPattern = @"^[A-Za-z0-9]{8,20}$";
            if (string.IsNullOrEmpty(user.Password))
            {
                errors.Add("Password is required");
            }
            else if(!Regex.IsMatch(user.Password, passwordPattern))
            {
                errors.Add("Password should contain 8-20 characters, English letters and numbers only");
            }
            else if(user.Password != user.ConfirmPassword)
            {
                errors.Add("Passwords do not match");
            }
            // Add your password validation logic here

            return errors;
        }
    }
}

