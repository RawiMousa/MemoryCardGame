namespace MemoryCardGame.Entities
{
    public class Image
    {
        public int Id { get; set; }
        public string FileName { get; set; }
        public int UserId { get; set; } // Foreign key property

    }

}