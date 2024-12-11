namespace KokoType.User.DAL.Models
{
    public class UserModel // добавить xp
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public byte[] Salt { get; set; }
        public string UserName { get; set; }
        public string About { get; set; }
        public string ImageUrl { get; set; }
        public DateTime RegistrateDate { get; set; }
        public int UserLvl { get; set; }
        public int UserExp { get; set; }
        public string RefreshToken { get; set; }

        public List<Role> Roles { get; set; }
        public List<Achivement> Achives { get; set; }
    }
}
