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

        public List<Image> GetImagesByUserId(int userId)
        {
            return _dbContext.Images.Where(image => image.UserId == userId).ToList();
        }


        public void CreateImage(Image image)
        {
            _dbContext.Images.Add(image);
            _dbContext.SaveChanges();
        }

        public bool ImageExists(string imageName)
        {
            return _dbContext.Images.Any(image => image.FileName == imageName);
        }

        public void DeleteImage(Image image)
        {
            _dbContext.Images.Remove(image);
            _dbContext.SaveChanges();
        }
    }
}
