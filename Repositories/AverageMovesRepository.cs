using MemoryCardGame.Data;
using MemoryCardGame.Entities;

namespace MemoryCardGame.Repositories
{
    public class AverageMovesRepository
    {
        private readonly GameDbContext _dbContext;

        public AverageMovesRepository(GameDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<AverageMoves> GetAllAverageMoves()
        {
            return _dbContext.AverageMoves.ToList();
        }

        public AverageMoves GetAverageMovesById(int id)
        {
            return _dbContext.AverageMoves.FirstOrDefault(avgMoves => avgMoves.Id == id);
        }

        public AverageMoves GetAverageMovesByUserId(int id)
        {
            return _dbContext.AverageMoves.FirstOrDefault(avgMovesByUserId => avgMovesByUserId.UserId == id);
        }

        public void CreateAverageMoves(AverageMoves averageMoves)
        {
            _dbContext.AverageMoves.Add(averageMoves);
            _dbContext.SaveChanges();
        }

        public void DeleteAverageMoves(AverageMoves averageMoves)
        {
            _dbContext.AverageMoves.Remove(averageMoves);
            _dbContext.SaveChanges();
        }
    }
}
