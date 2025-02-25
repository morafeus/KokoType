using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.BLL.Interfaces;
using KokoType.UserService.DAL.Interfaces;
using KokoType.UserService.DAL.Models;
using KokoType.UserService.DAL.ViewModels;

namespace KokoType.UserService.BLL.Service
{
    public class UserService : IUserService
    {
        private IUnitOfWork _unitOfWork;
        private IHashService _hashService;
        private ITokenService _tokenService;
        private IMapper _mapper;

        public UserService(IUnitOfWork unitOfWork, IHashService hashService, ITokenService tokenService, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._hashService = hashService;
            this._tokenService = tokenService;
            this._mapper = mapper;
        }

        public async Task CreateUserAsync(UserModelDTO userModel)
        {
            UserModel user = _mapper.Map<UserModel>(userModel);
            var password = _hashService.HashPassword(userModel.Password, out var salt);

            user.Password = password;
            user.Salt = salt;
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

            var user = _mapper.Map<UserModel>(userModel);
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

            TokenUserDTO tokenUserDTO = _mapper.Map<TokenUserDTO>(user);
            tokenUserDTO.Role = role.RoleName;

            TokenModel tokens = _tokenService.GenerateTokens(tokenUserDTO);
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

                TokenUserDTO tokenUserDTO = _mapper.Map<TokenUserDTO>(user);
                tokenUserDTO.Role = role.RoleName;

                var tokens = _tokenService.GenerateTokens(tokenUserDTO);

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
