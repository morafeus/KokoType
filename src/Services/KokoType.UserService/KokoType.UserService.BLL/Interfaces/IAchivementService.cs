
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.Interfaces
{
    public interface IAchivementService
    {
        public Task<Achivement> AddAchivement(AchivementDTO achivementdto);
        public Task<Achivement> AddUserAchivement(AchivementUserDTO achivementUser);
    }
}
