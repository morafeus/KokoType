using KokoType.LessonService.BLL.DTO;
using KokoType.LessonService.BLL.Interfaces;
using KokoType.LessonService.DAL.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace KokoType.LessonService.WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class LessonController : ControllerBase
    {
        private ILessonService _lessonService;

        public LessonController(ILessonService lessonService)
        {
            _lessonService = lessonService;
        }


        [HttpPost]
        [Route("addLesson")]
        [Authorize(Roles = ("Admin"))]
        public async Task<IActionResult> AddNewLessonAsync([FromBody] LessonModelDTO model)
        {
            try
            {
                LessonModel lesson = await _lessonService.AddNewLesson(model);
                return Ok(lesson);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("getLessons")]
        public async Task<IActionResult> GetAllLessonsAsync(DeleteLessonDTO user)
        {
            try
            {
                List<LessonModel> lessons = await _lessonService.GetAllLessons(user);
                return Ok(lessons);

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("completeLesson")]
        public async Task<IActionResult> LessonCompleteAsync(CompleteLessonDTO complete)
        {
            try
            {
                await _lessonService.CompleteLesson(complete);
                return Ok("succsess");

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }

        [HttpPost]
        [Route("deleteLesson")]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> DeleteLessonAsync(DeleteLessonDTO lessson)
        {
            try
            {
                await _lessonService.DeleteLesson(lessson);
                return Ok("deleted");

            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }
}
