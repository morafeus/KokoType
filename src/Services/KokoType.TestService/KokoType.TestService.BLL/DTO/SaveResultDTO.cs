
namespace KokoType.TestService.BLL.DTO
{
    public class SaveResultDTO
    {
        public Guid UserId { get; set; }
        public float Accuracy { get; set; }
        public float Speed { get; set; }
        public string Description { get; set; }
        public string Errors { get; set; }
    }
}
