using MemoryCardGame.Data;
using MemoryCardGame.Entities;

namespace MemoryCardGame.Repositories
{
    public class ImageRepository
    {
        private readonly GameDbContext _dbContext;

        public ImageRepository(GameDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public List<Image> GetAllImages()
        {
            return _dbContext.Images.ToList();
        }

        public Image GetImageById(int id)
        {
            return _dbContext.Images.FirstOrDefault(image => image.Id == id);
        }

        public Image GetImageByUserId(int userId)
        {
            return _dbContext.Images.FirstOrDefault(image => image.UserId == userId);
        }

        public void CreateImage(Image image)
        {
            _dbContext.Images.Add(image);
            _dbContext.SaveChanges();
        }

        public void DeleteImage(Image image)
        {
            _dbContext.Images.Remove(image);
            _dbContext.SaveChanges();
        }
    }
}
