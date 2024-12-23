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
        private ITokenService _tokenService;

        public UserService(IUnitOfWork unitOfWork, IHashService hashService, ITokenService tokenService)
        {
            this._unitOfWork = unitOfWork;
            this._hashService = hashService;
            _tokenService = tokenService;
        }

        public async Task CreateUserAsync(UserModelDTO userModel)
        {
            var password = _hashService.HashPassword(userModel.Password, out var salt);
            UserModel user = new UserModel()
            {
                Id = Guid.NewGuid(),
                UserName = userModel.UserName,
                Password = password,
                Salt = salt,
                Email = userModel.Email,
                UserLvl = 0,
                UserExp = 0,
                RegistrateDate = DateTime.Now,
                About = String.Empty,
                ImageUrl = String.Empty,
                RefreshToken = String.Empty
            };
            try
            {
                await _unitOfWork.UserRepository.Add(user);
            }
            catch (Exception ex)
            {
                throw new Exception("this username is already exist");
            }
            Role role = new Role()
            {
                Id = Guid.NewGuid(),
                User = user,
                RoleName = "User"
            };
            await _unitOfWork.RoleRepository.Add(role);

        }

        public async Task DeleteUserAsync(DeleteUserModelDTO userModel)
        {
            var user = await _unitOfWork.UserRepository.GetById(userModel.Id);
            await _unitOfWork.UserRepository.Delete(user);
        }

        public async Task<TokenModel> SignIn(LoginUserModelDTO userModel)
        {
            var user = await _unitOfWork.UserRepository.GetByName(userModel.UserName);
            if (user == null)
            {
                throw new Exception("invalid name.");
            }

            if (!_hashService.VerifyPassword(userModel.Password, user.Password, user.Salt))
            {
                throw new Exception("invalid password");
            }

            Role role = await _unitOfWork.RoleRepository.GetRoleByUserAsync(user.Id);
            TokenModel tokens = _tokenService.GenerateTokens(new TokenUserDTO() {
                Id = user.Id,
                UserName = userModel.UserName, 
                UserLvl = user.UserLvl,
                UserExp = user.UserExp,
                Role = role.RoleName
            });
            user.RefreshToken = tokens.RefreshToken;
            await _unitOfWork.UserRepository.Update(user);

            return tokens;
        }

        public async Task<TokenModel> RefreshToken(RefreshDTO refreshDTO)
        {
            var user = await _unitOfWork.UserRepository.GetById(refreshDTO.Id);
            bool check = _tokenService.ValidateRefreshToken(refreshDTO.RefreshToken);
            if (user == null || !check)
            {
                throw new Exception("Invalid refresh token.");
            }

            try
            {
                var role = await _unitOfWork.RoleRepository.GetRoleByUserAsync(user.Id);
                var tokens = _tokenService.GenerateTokens(new TokenUserDTO
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    UserLvl = user.UserLvl,
                    UserExp = user.UserExp,
                    Role = role.RoleName
                });

                user.RefreshToken = tokens.RefreshToken;
                await _unitOfWork.UserRepository.Update(user);
                return tokens;
            }
            catch (Exception ex)
            {
                throw new Exception("invalid token");
            }

           
        }

        public async Task LogoutUser(DeleteUserModelDTO user)
        {
            try
            {
                UserModel userModel = await _unitOfWork.UserRepository.GetById(user.Id);
                userModel.RefreshToken = String.Empty;
                await _unitOfWork.UserRepository.Update(userModel);
            }
            catch (Exception ex)
            {
                throw new Exception("cant logout this user");
            }
        }

        public async Task<UserModel> UpdateLvl(UpdateUserLvlDTO user)
        {
            try
            {
                UserModel userModel = await _unitOfWork.UserRepository.GetById(user.Id);
                if (userModel.UserExp + user.Exp > userModel.UserLvl * 1000 + 1000)
                {
                    userModel.UserExp = userModel.UserExp + user.Exp - (userModel.UserLvl * 1000 + 1000);
                    userModel.UserLvl += 1;
                }
                else
                {
                    userModel.UserExp += user.Exp;
                }
                await _unitOfWork.UserRepository.Update(userModel);
                return userModel;
            }
            catch (Exception ex)
            {
                throw new Exception("invalid user lvl");
            }
        }

        public async Task<UserModel> UpdateUser(UpdateUserDTO user)
        {
            UserModel userModel = await _unitOfWork.UserRepository.GetById(user.Id);
            userModel.UserName = user.UserName;
            await _unitOfWork.UserRepository.Update(userModel);
            return userModel;
        }

        public async Task<UserModel> GetMe(DeleteUserModelDTO user)
        {
            try
            {
                UserModel userModel = await _unitOfWork.UserRepository.GetById(user.Id);
                return userModel;
            }
            catch (Exception ex)
            {
                throw new Exception("invalid user lvl");
            }
        }

        public async Task<List<UserModel>> GetUsers()
        {
            try
            {
                var users = await _unitOfWork.UserRepository.GetAll();
                return users.ToList();
            }
            catch (Exception ex)
            {
                throw new Exception("invalid user lvl");
            }
        }
    }
}
