// This module is responsible for generating a secret key. This is usually done once , and the key is saved safely.
// The key is used to generate token for the logged in user.
using System.Security.Cryptography;
namespace MemoryCardGame.Services
{
    public class SecretKeyGenerator
    {
        public static string _secretKey;

        public static string GetSecretKey()
        {
            if (string.IsNullOrEmpty(_secretKey))
            {
                _secretKey = ReadSecretKeyFromFile();
            }

            if (string.IsNullOrEmpty(_secretKey))
            {
                _secretKey = GenerateRandomSecretKey();
                SaveSecretKeyToFile(_secretKey);
            }

            return _secretKey;
        }

        public static string GenerateRandomSecretKey()
        {
            var secretKeyBytes = new byte[32];
            using (var rng = new RNGCryptoServiceProvider())
            {
                rng.GetBytes(secretKeyBytes);
            }

            return Convert.ToBase64String(secretKeyBytes);
        }

        private static string ReadSecretKeyFromFile()
        {
            var filePath = "secretkey.txt";
            if (File.Exists(filePath))
            {
                return File.ReadAllText(filePath).Trim();
            }

            return string.Empty;
        }

        private static void SaveSecretKeyToFile(string secretKey)
        {
            var filePath = "secretkey.txt";
            File.WriteAllText(filePath, secretKey);
        }
    }
}

