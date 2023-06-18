using Microsoft.AspNetCore.Mvc;
using MemoryCardGame.Repositories;
using MemoryCardGame.Entities;

namespace MemoryCardGame.Controllers
{
    [Route("averagemoves")]
    [ApiController]

    public class AverageMovesController : ControllerBase
    {
        private readonly AverageMovesRepository _averageMovesRepository;

        public AverageMovesController(AverageMovesRepository averageMovesRepository)
        {
            _averageMovesRepository = averageMovesRepository;
        }


        // GET: /averagemoves
        [HttpGet]
        public IActionResult GetAllAverageMoves()
        {
            var averageMoves = _averageMovesRepository.GetAllAverageMoves();
            return Ok(averageMoves);
        }


        // GET: /averagemoves/{id}
        [HttpGet("{id}")]
        public IActionResult GetAverageMovesById(int id)
        {
            var averageMovesById = _averageMovesRepository.GetAverageMovesById(id);
            if (averageMovesById == null)
            {
                return NotFound();
            }
            return Ok(averageMovesById);
        }


        // GET: /averagemoves/{userId}
        [HttpGet("{userId}")]
        public IActionResult GetAverageMovesByUserId(int userId)
        {
            var averageMovesByUserId = _averageMovesRepository.GetAverageMovesByUserId(userId);
            if (averageMovesByUserId == null)
            {
                return NotFound();
            }
            return Ok(averageMovesByUserId);  
        }


        // POST: /averagemoves
        [HttpPost]
        public IActionResult CreateAverageMoves([FromBody] AverageMoves averageMoves)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _averageMovesRepository.CreateAverageMoves(averageMoves);
            return CreatedAtAction(nameof(GetAverageMovesByUserId), new { userId = averageMoves.UserId }, averageMoves);

        }
        

        // DELETE: /averagemoves/{id}
        [HttpDelete("{userId}")]
        public IActionResult DeleteAverageMoves(int userId)
        {
            var existingAverageMoves = _averageMovesRepository.GetAverageMovesByUserId(userId);
            if (existingAverageMoves == null)
            {
                return NotFound();
            }
            _averageMovesRepository.DeleteAverageMoves(existingAverageMoves);
            return NoContent();
        }
    }
}
