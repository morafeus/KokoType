
using System.Text.Json.Serialization;

namespace KokoType.UserService.DAL.Models
{
    public class Achivement
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public string Condition { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public List<UserModel> Users { get; set; }
    }
}
