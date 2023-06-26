// The purpose of this module is to provide an alternative way of generating and initializing the secret key. Instead of directly using the SecretKeyGenerator module,
// the SecretKeyInitializer module handles the generation and initialization process.
namespace MemoryCardGame.Services
{
    public class SecretKeyInitializer
    {
        private static string GenerateAndSaveSecretKey()
        {
            string secretKey = SecretKeyGenerator.GenerateRandomSecretKey();
            var filePath = "secretkey.txt";
            File.WriteAllText(filePath, secretKey);
            return secretKey;
        }

        public static string InitializeSecretKey()
        {
            string secretKey = string.Empty;
            var filePath = "secretkey.txt";

            if (File.Exists(filePath))
            {
                secretKey = File.ReadAllText(filePath);
            }
            else
            {
                secretKey = GenerateAndSaveSecretKey();
            }

            return secretKey;
        }
    }
}
