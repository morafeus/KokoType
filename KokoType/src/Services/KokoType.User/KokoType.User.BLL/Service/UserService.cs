using KokoType.User.BLL.DTO;
using KokoType.User.BLL.Interfaces;
using KokoType.User.DAL.Interfaces;
using KokoType.User.DAL.Models;

namespace KokoType.User.BLL.Service
{
    public class UserService : IUserService
    {
        private IUnitOfWork _unitOfWork;
        private IHashService _hashService;

        public UserService(IUnitOfWork unitOfWork, IHashService hashService)
        {
            this._unitOfWork = unitOfWork;
            this._hashService = hashService;
        }

        public async Task CreateUserAsync(UserModelDTO userModel)
        {
            var password = _hashService.HashPassword(userModel.Password, out var salt);
            UserModel user = new UserModel()
            {
                Id = Guid.NewGuid(),
                UserName = userModel.UserName,
                Password = password,
                Email = userModel.Email,
                UserLvl = 0,
                UserExp = 0,
                RegistrateDate = DateTime.Now,
                About = String.Empty,
                ImageUrl = String.Empty,
                RefreshToken = String.Empty
            };
            await _unitOfWork.UserRepository.Add(user);
        }
    }
}
