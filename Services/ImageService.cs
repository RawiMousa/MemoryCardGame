// This module is used in the ImageController in the images API endpoints, to validate the fields.

using MemoryCardGame.Repositories;

namespace MemoryCardGame.Services
{
    public class ImageService
    {
        private readonly ImageRepository _imageRepository;


        public ImageService(ImageRepository imageRepository)
        {
            _imageRepository = imageRepository;

        }
        public List<string> ValidateImage(IFormFile imageFile, int userId)
        {   
            var errors = new List<string>();

            // Checking if an image file was provided
            if (imageFile == null || imageFile.Length == 0)
            {
                errors.Add("Image file is missing.");
                return errors;
            }

            // Checking file size (500 KB maximum)
            const int maxFileSize = 500 * 1024; // 500 KB
            if (imageFile.Length > maxFileSize)
            {
                errors.Add("Image file size exceeds the limit (500 KB).");
            }

            // Checking file extension/file type
            var fileExtension = Path.GetExtension(imageFile.FileName);
            if (!IsSupportedExtension(fileExtension))
            {
                errors.Add("Unsupported file extension. Only PNG and JPEG files are allowed.");
            }

            //Check image name uniqueness
            if (_imageRepository.ImageExists(imageFile.FileName, userId))
            {
                errors.Add("An image with the same name already exists.");
            }


            // Checking image name length (200 characters maximum)
            const int maxImageNameLength = 200;
            if (imageFile.FileName.Length > maxImageNameLength)
            {
                errors.Add("Image file name exceeds the limit (200 characters).");
            }

            // Checking maximum number of uploaded photos (25 maximum)
            var totalImageCount = _imageRepository.GetTotalImageCount(userId); // Pass the userId
            const int maxImageCount = 25;
            if (totalImageCount >= maxImageCount)
            {
                errors.Add("You have reached the maximum limit of uploaded photos.");
            }

            return errors;
        }

        // A helper bool that checks the type of file, attepmting to upload.
        private bool IsSupportedExtension(string fileExtension)
        {
            var supportedExtensions = new[] { ".png", ".jpeg", ".jpg" };
            return Array.IndexOf(supportedExtensions, fileExtension.ToLower()) >= 0;
        }
    }
}
