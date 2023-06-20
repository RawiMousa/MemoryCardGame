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
        public List<string> ValidateImage(IFormFile imageFile)
        {   
            // _imageRepository = imageRepository;

            var errors = new List<string>();

            // Check if an image file was provided
            if (imageFile == null || imageFile.Length == 0)
            {
                errors.Add("Image file is missing.");
                return errors;
            }

            // Check file size (500 KB maximum)
            const int maxFileSize = 500 * 1024; // 500 KB
            if (imageFile.Length > maxFileSize)
            {
                errors.Add("Image file size exceeds the limit (500 KB).");
            }

            // Check file extension
            var fileExtension = Path.GetExtension(imageFile.FileName);
            if (!IsSupportedExtension(fileExtension))
            {
                errors.Add("Unsupported file extension. Only PNG and JPEG files are allowed.");
            }

            //Check image name uniqueness
            if (_imageRepository.ImageExists(imageFile.FileName))
            {
                errors.Add("An image with the same name already exists.");
            }

            // Check image name length (200 characters maximum)
            const int maxImageNameLength = 200;
            if (imageFile.FileName.Length > maxImageNameLength)
            {
                errors.Add("Image file name exceeds the limit (200 characters).");
            }

            return errors;
        }


        private bool IsSupportedExtension(string fileExtension)
        {
            var supportedExtensions = new[] { ".png", ".jpeg", ".jpg" };
            return Array.IndexOf(supportedExtensions, fileExtension.ToLower()) >= 0;
        }
    }
}
