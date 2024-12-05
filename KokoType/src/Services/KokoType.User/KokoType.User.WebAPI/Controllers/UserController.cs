using KokoType.User.BLL.DTO;
using KokoType.User.BLL.Interfaces;
using Microsoft.AspNetCore.Mvc;

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
        public async Task SignUp(UserModelDTO userModel)
        {
            await _userService.CreateUserAsync(userModel);
        }
    }
}
