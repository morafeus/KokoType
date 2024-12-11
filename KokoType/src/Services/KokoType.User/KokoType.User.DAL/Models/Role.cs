namespace KokoType.User.DAL.Models
{
    public class Role
    {
        public Guid Id { get; set; }
        public string RoleName { get; set; }
        public UserModel User { get; set; }
    }
}
