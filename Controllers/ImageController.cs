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

        public ImageController(ImageRepository imageRepository)
        {
            _imageRepository = imageRepository;
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



        [HttpPost]
        public IActionResult CreateImage()
        {
            // Get the form data from the request
            var imageFile = Request.Form.Files.GetFile("FileName");
            var userId = Request.Form["UserId"];

            // Check if the required data is present
            if (imageFile == null || imageFile.Length <= 0)
            {
                return BadRequest("No image file was provided.");
            }

            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("No user ID was provided.");
            }

            // Validate the image file using the ImageService
            var imageService = new ImageService(_imageRepository);
            var imageValidationErrors = imageService.ValidateImage(imageFile);
            if (imageValidationErrors.Count > 0)
            {
                return BadRequest(imageValidationErrors);
            }

            // Save the image file to a specific location on the server
            // You can customize the file path and file name as per your requirement
            var filePath = Path.Combine("Uploads", imageFile.FileName);
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                imageFile.CopyTo(stream);
            }

            // Create a new Image entity and set its properties
            var image = new Image
            {
                FileName = imageFile.FileName,
                UserId = int.Parse(userId)
            };

            // Add the image to the database
            _imageRepository.CreateImage(image);
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
