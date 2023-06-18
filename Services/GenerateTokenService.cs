using System;
using System.IO;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;

namespace MemoryCardGame.Services
{
    public class GenerateTokenService
    {
        private readonly string _secretKey;

        public GenerateTokenService()
        {
            _secretKey = ReadSecretKeyFromFile();
        }

        public string GenerateToken(string userId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Convert.FromBase64String(_secretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, userId)
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            var tokenString = tokenHandler.WriteToken(token);

            return tokenString;
        }

        private string ReadSecretKeyFromFile()
        {
            var filePath = "secretkey.txt";
            if (File.Exists(filePath))
            {
                return File.ReadAllText(filePath).Trim();
            }

            // Handling the case when the secret key file is not found
            throw new FileNotFoundException("Secret key file not found.");
        }
    }
}
