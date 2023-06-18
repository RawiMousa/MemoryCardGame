namespace MemoryCardGame.Entities
{
    public class AverageTime
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public TimeSpan Time { get; set; }
    }
}