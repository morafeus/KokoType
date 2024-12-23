using KokoType.User.BLL.DTO;
using KokoType.User.BLL.Interfaces;
using KokoType.User.BLL.Service;
using KokoType.User.DAL.Interfaces;
using KokoType.User.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Policy;

namespace KokoType.User.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            this._userService = userService;
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
                return BadRequest(new {message = ex.Message});
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
                return BadRequest(new {message = ex.Message});
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
            catch(Exception ex)
            {
                return BadRequest(new {message = ex.Message});
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
            catch(Exception ex)
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

    }
}
