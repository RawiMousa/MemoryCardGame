using Microsoft.EntityFrameworkCore;
using MemoryCardGame.Data;
using MemoryCardGame.Entities;
using Microsoft.AspNetCore.Identity;


namespace MemoryCardGame.Repositories
{
    public class UserRepository
    {
        private readonly GameDbContext _dbContext;

        public UserRepository(GameDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<User> GetAllUsers()
        {
            return _dbContext.Users.ToList();
        }

        public User GetUserById(int id)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Id == id);
        }

        public User GetUserByUsername(string username)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Username == username);
        }

        public User GetUserByEmail(string email)
        {
            return _dbContext.Users.FirstOrDefault(user => user.Email == email);
        }

        public void CreateUser(User user)
        {
            _dbContext.Users.Add(user);
            _dbContext.SaveChanges();
        }

        public void UpdateUser(User user)
        {
            _dbContext.Entry(user).State = EntityState.Modified;
            _dbContext.SaveChanges();
        }

        public void DeleteUser(User user)
        {
            _dbContext.Users.Remove(user);
            _dbContext.SaveChanges();
        }

        
        public User Login(string username, string password)
        {
            // Retrieve the user based on the provided username or email
            var user = GetUserByUsername(username);

            // Check if the user exists and the password matches
            if (user != null && VerifyPassword(user.Password, password))
            {
                return user;
            }
            return null; // Login failed
        }

        private bool VerifyPassword(string hashedPassword, string password)
        {
            var passwordHasher = new PasswordHasher<User>();

            // Verify the provided password against the hashed password
            var passwordVerificationResult = passwordHasher.VerifyHashedPassword(null, hashedPassword, password);

            return passwordVerificationResult == PasswordVerificationResult.Success;

        }

        public User Logout(int userId)
        {
            var user = GetUserById(userId);

            if(user != null)
            {
                return user;
            }
            return null;
        }
    }        
}


