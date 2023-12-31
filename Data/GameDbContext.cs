// This is the database module , which upon migrating creates the actual database.
using Microsoft.EntityFrameworkCore;
using MemoryCardGame.Entities;


namespace MemoryCardGame.Data
{
    public class GameDbContext : DbContext
    {
        public GameDbContext(DbContextOptions<GameDbContext> options) : base(options)
        {
        }
        public DbSet<User> Users { get; set; }

        public DbSet<Image> Images { get; set; }
    }
}