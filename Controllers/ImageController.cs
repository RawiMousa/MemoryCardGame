// This module represents the API for the Image entity.
// This module interacts with the ImageRepository module which is responsible for direct actions with the Database.

using Microsoft.AspNetCore.Mvc;
using MemoryCardGame.Repositories;
using MemoryCardGame.Entities;
using MemoryCardGame.Services;

namespace MemoryCardGame.Controllers
{
    [Route("images")]
    [ApiController]

    public class ImageController : ControllerBase
    {
        private readonly ImageRepository _imageRepository;

        private readonly UserRepository _userRepository;

        public ImageController(ImageRepository imageRepository, UserRepository userRepository)
        {
            _imageRepository = imageRepository;
            _userRepository = userRepository;
        }


        // GET: /images
        [HttpGet]
        public IActionResult GetAllImages()
        {
            var images = _imageRepository.GetAllImages();
            return Ok(images);
        }


        // GET: /images/{id}
        [HttpGet("{id}")]
        public IActionResult GetImageById(int id)
        {
            var imageById = _imageRepository.GetImageById(id);
            if (imageById == null)
            {
                return NotFound();
            }
            return Ok(imageById);
        }


        // GET: /images/{userId}
        [HttpGet("user/{userId}")]
        public IActionResult GetImagesByUserId(int userId)
        {
            var imageByUserId = _imageRepository.GetImagesByUserId(userId);
            if (imageByUserId == null)
            {
                return NotFound();
            }
            return Ok(imageByUserId);  
        }


        // // POST: /images
        // [HttpPost]
        // public IActionResult CreateImage()
        // {
        //     // Getting the form data from the request
        //     var imageFile = Request.Form.Files.GetFile("FileName");
        //     var userId = Request.Form["UserId"];

        //     // Checking if the required data is present
        //     if (imageFile == null || imageFile.Length <= 0)
        //     {
        //         return BadRequest("No image file was provided.");
        //     }
        //     // Checking if the field is empty or has only namespace.
        //     if (string.IsNullOrEmpty(userId))
        //     {
        //         return BadRequest("No user ID was provided.");
        //     }
        //     // Validating the image file using the ImageService
        //     var imageService = new ImageService(_imageRepository);
        //     var UserId = int.Parse(userId);
        //     var imageValidationErrors = imageService.ValidateImage(imageFile, UserId);
        //     if (imageValidationErrors.Count > 0)
        //     {
        //         return BadRequest(imageValidationErrors);
        //     }
        //     // Saving the image file to a specific location on the server
        //     var filePath = Path.Combine("Uploads", imageFile.FileName);
        //     using (var stream = new FileStream(filePath, FileMode.Create))
        //     {
        //         imageFile.CopyTo(stream);
        //     }
        //     // Creating a new Image entity and set its properties
        //     var image = new Image
        //     {
        //         FileName = imageFile.FileName,
        //         UserId = int.Parse(userId)
        //     };
        //     // Adding the image to the database
        //     _imageRepository.CreateImage(image);
        //     return Ok();
        // }





        // POST: /images
        [HttpPost]
        public IActionResult CreateImage()
        {
            var imageFile = Request.Form.Files.GetFile("FileName");
            var userId = Request.Form["UserId"];

            if (imageFile == null || imageFile.Length <= 0)
            {
                return BadRequest("No image file was provided.");
            }

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("No user ID was provided.");
            }

            var imageService = new ImageService(_imageRepository);
            var parsedUserId = int.Parse(userId);
            var imageValidationErrors = imageService.ValidateImage(imageFile, parsedUserId);

            if (imageValidationErrors.Count > 0)
            {
                return BadRequest(imageValidationErrors);
            }

            var user = _userRepository.GetUserById(parsedUserId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            var fileName = imageFile.FileName;
            var userUploadsFolder = Path.Combine("Uploads", user.Username);

            Directory.CreateDirectory(userUploadsFolder);

            var filePath = Path.Combine(userUploadsFolder, fileName);

            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            var image = new Image
            {
                FileName = fileName,
                UserId = parsedUserId,
                FilePath = filePath // Set the FilePath property to the file path
            };

            _imageRepository.CreateImage(image);

            return Ok();
        }


        // // POST: /images/folder/{userId}
        // [HttpPost("folder/{userId}")]
        // public IActionResult CreateFolder(int userId)
        // {
        //     var userById = _userRepository.GetUserById(userId);
        //     if (userById == null)
        //     {
        //         return NotFound();
        //     }

        //     var username = userById.Username;
        //     _imageRepository.CreateFolder(username);

        //     return Ok();
        // }


        // POST: /images/folder/{username}
        [HttpPost("folder/{username}")]
        public IActionResult CreateFolder(string username)
        {
            var userByUsername = _userRepository.GetUserByUsername(username);
            if (userByUsername == null)
            {
                return NotFound();
            }

            _imageRepository.CreateFolder(username);

            return Ok();
        }

        // DELETE: /images/{id}
        [HttpDelete("{id}")]
        public IActionResult DeleteImage(int id)
        {
            var existingImage = _imageRepository.GetImageById(id);
            if (existingImage == null)
            {
                return NotFound();
            }
            _imageRepository.DeleteImage(existingImage);
            return NoContent();
        }
    }
}
