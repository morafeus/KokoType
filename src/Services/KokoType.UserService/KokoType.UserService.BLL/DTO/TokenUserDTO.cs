
namespace KokoType.UserService.BLL.DTO
{
    public class TokenUserDTO
    { 
        public Guid Id { get; set; }
        public string UserName { get; set; }
        public int UserLvl { get; set; }
        public int UserExp { get; set; }
        public string Role { get; set; }
    }
}
