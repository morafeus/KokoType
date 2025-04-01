using KokoType.UserService.BLL.DTO;
using KokoType.UserService.BLL.Interfaces;
using KokoType.UserService.DAL.Models;
using KokoType.UserService.DAL.ViewModels;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KokoType.UserService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IAchivementService _achivementService;

        public UserController(IUserService userService, IAchivementService achivementService)
        {
            this._userService = userService;
            this._achivementService = achivementService;
        }

        [HttpPost]
        [Route("signup")]
        public async Task<IActionResult> SignUp(UserModelDTO userModel)
        {
            try
            {
                await _userService.CreateUserAsync(userModel);
                return Ok("user has been created");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("signin")]
        public async Task<IActionResult> SignIn(LoginUserModelDTO userModel)
        {
            try
            {
                var user = await _userService.SignIn(userModel);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout(DeleteUserModelDTO userModel)
        {
            try
            {
                await _userService.LogoutUser(userModel);
                return Ok("user logout success");
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("refresh")]
        public async Task<IActionResult> RefreshToken(RefreshDTO tokenModel)
        {
            try
            {
                TokenModel newToken = await _userService.RefreshToken(tokenModel);
                return Ok(newToken);
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("delete")]
        [Authorize(Roles = "Admin")]
        public async Task DeleteUser(DeleteUserModelDTO userModel)
        {
            await _userService.DeleteUserAsync(userModel);
        }

        [HttpPost]
        [Route("updateLvl")]
        [Authorize]
        public async Task<IActionResult> UpdateLvlAsync(UpdateUserLvlDTO userModel)
        {
            try
            {
                UserModel user = await _userService.UpdateLvl(userModel);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("updateTestCount")]
        [Authorize]
        public async Task<IActionResult> UpdateTestCountAsync(DeleteUserModelDTO userdto)
        {
            try
            {
                UserModel user = await _userService.UpdateTestCount(userdto.Id);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("updateUser")]
        [Authorize]
        public async Task<IActionResult> UpdateUserAsync(UpdateUserDTO userModel)
        {
            try
            {
                UserModel user = await _userService.UpdateUser(userModel);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getMe")]
        [Authorize]
        public async Task<IActionResult> GetMeAsync(DeleteUserModelDTO userModel)
        {
            try
            {
                UserModel user = await _userService.GetMe(userModel);
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("getAll")]
        public async Task<IActionResult> GetAllAsync()
        {
            try
            {
                List<UserModel> user = await _userService.GetUsers();
                return Ok(user);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPost]
        [Route("AddAchive")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddAchive(AchivementDTO achivement)
        {
            try
            {
                await _achivementService.AddAchivement(achivement);
                return Ok(achivement);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }


        [HttpPost]
        [Route("AddUserAchive")]
        [Authorize]
        public async Task<IActionResult> AddUserAchive(AchivementUserDTO achivement)
        {
            try
            {
                await _achivementService.AddUserAchivement(achivement);
                return Ok(achivement);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

    }
}
