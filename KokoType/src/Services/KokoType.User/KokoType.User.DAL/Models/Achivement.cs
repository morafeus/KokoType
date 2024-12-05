namespace KokoType.User.DAL.Models
{
    public class Achivement
    {
        public Guid Id { get; set; }
        public string ImageUrl { get; set; }
        public string Condition { get; set; }
        public string Description { get; set; }
        public string Name { get; set; }

        public List<UserModel> Users { get; set; }
    }
}
