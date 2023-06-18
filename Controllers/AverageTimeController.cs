using Microsoft.AspNetCore.Mvc;
using MemoryCardGame.Repositories;
using MemoryCardGame.Entities;

namespace MemoryCardGame.Controllers
{
    [Route("averagetime")]
    [ApiController]

    public class AverageTimeController : ControllerBase
    {
        private readonly AverageTimeRepository _averageTimeRepository;

        public AverageTimeController(AverageTimeRepository averageTimeRepository)
        {
            _averageTimeRepository = averageTimeRepository;
        }


        // GET: /averagetime
        [HttpGet]
        public IActionResult GetAllAverageTimes()
        {
            var averageTime = _averageTimeRepository.GetAllAverageTimes();
            return Ok(averageTime);
        }


        // GET: /averagetime/{id}
        [HttpGet("{id}")]
        public IActionResult GetAverageTimeById(int id)
        {
            var averageTimeById = _averageTimeRepository.GetAverageTimeById(id);
            if (averageTimeById == null)
            {
                return NotFound();
            }
            return Ok(averageTimeById);
        }


        // GET: /averagemoves/{userId}
        [HttpGet("{userId}")]
        public IActionResult GetAverageTimeByUserId(int userId)
        {
            var averageTimeByUserId = _averageTimeRepository.GetAverageTimeByUserId(userId);
            if (averageTimeByUserId == null)
            {
                return NotFound();
            }
            return Ok(averageTimeByUserId);  
        }


        // POST: /averagemoves
        [HttpPost]
        public IActionResult CreateAverageTime([FromBody] AverageTime averageTime)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            _averageTimeRepository.CreateAverageTime(averageTime);
            return CreatedAtAction(nameof(GetAverageTimeByUserId), new { userId = averageTime.UserId }, averageTime);

        }
        

        // DELETE: /averagetime/{id}
        [HttpDelete("{userId}")]
        public IActionResult DeleteAverageTime(int userId)
        {
            var existingAverageTime = _averageTimeRepository.GetAverageTimeByUserId(userId);
            if (existingAverageTime == null)
            {
                return NotFound();
            }
            _averageTimeRepository.DeleteAverageTime(existingAverageTime);
            return NoContent();
        }
    }
}