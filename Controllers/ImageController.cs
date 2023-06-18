using Microsoft.AspNetCore.Mvc;
using MemoryCardGame.Repositories;
using MemoryCardGame.Entities;

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
        [HttpGet("{userId}")]
        public IActionResult GetImageByUserId(int userId)
        {
            var imageByUserId = _imageRepository.GetImageByUserId(userId);
            if (imageByUserId == null)
            {
                return NotFound();
            }
            return Ok(imageByUserId);  
        }


        // POST: /images
        [HttpPost]
        public IActionResult CreateImage([FromBody] Image image)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _imageRepository.CreateImage(image);
            return CreatedAtAction(nameof(GetImageByUserId), new { userId = image.UserId }, image);

        }
        

        // DELETE: /images/{id}
        [HttpDelete("{userId}")]
        public IActionResult DeleteImage(int userId)
        {
            var existingImage = _imageRepository.GetImageByUserId(userId);
            if (existingImage == null)
            {
                return NotFound();
            }
            _imageRepository.DeleteImage(existingImage);
            return NoContent();
        }
    }
}
