namespace KokoType.User.DAL.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }

        public List<UserModel> Users { get; set; }
    }
}
