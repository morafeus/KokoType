using AutoMapper;
using KokoType.LessonService.BLL.DTO;
using KokoType.LessonService.DAL.Models;
using Microsoft.Build.Framework;
namespace KokoType.LessonService.BLL.MapProfiles
{
    public class LessonModelProfile : Profile
    {
        public LessonModelProfile() 
        {
            CreateMap<LessonModelDTO, LessonModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Language, opt => opt.MapFrom(src => src.Language))
                .ForMember(dest => dest.Pages, opt => opt.MapFrom(src => src.Pages))
                .ForMember(dest => dest.status, opt => opt.MapFrom(src => "close"));
        }
    }
}
