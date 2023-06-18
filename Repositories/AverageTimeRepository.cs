using MemoryCardGame.Data;
using MemoryCardGame.Entities;

namespace MemoryCardGame.Repositories
{
    public class AverageTimeRepository
    {
        private readonly GameDbContext _dbContext;

        public AverageTimeRepository(GameDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<AverageTime> GetAllAverageTimes()
        {
            return _dbContext.AverageTime.ToList();
        }

        public AverageTime GetAverageTimeById(int id)
        {
            return _dbContext.AverageTime.FirstOrDefault(avgTime => avgTime.Id == id);
        }

        public AverageTime GetAverageTimeByUserId(int id)
        {
            return _dbContext.AverageTime.FirstOrDefault(avgTimeByUserId => avgTimeByUserId.UserId == id);
        }

        public void CreateAverageTime(AverageTime averageTime)
        {
            _dbContext.AverageTime.Add(averageTime);
            _dbContext.SaveChanges();
        }

        public void DeleteAverageTime(AverageTime averageTime)
        {
            _dbContext.AverageTime.Remove(averageTime);
            _dbContext.SaveChanges();
        }
    }
}
