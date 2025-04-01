
namespace KokoType.TestService.DAL.Models
{
    public class Statistic
    {
        public Guid Id { get; set; }
        public float Accuracy { get; set; }
        public float Speed { get; set; }
        public string Description { get; set; }
        public string Errors { get; set; }
        public float ExpCount { get; set; }

        public DateTime DateTime { get; set; }
        public Guid UserId { get; set; }
    }
}
