using AutoMapper;
using KokoType.LessonService.BLL.DTO;
using KokoType.LessonService.DAL.Models;

namespace KokoType.LessonService.BLL.MapProfiles
{
    public class CompleteLessonProfile : Profile
    {
        public CompleteLessonProfile() 
        { 
            CreateMap<CompleteLessonDTO, LessonResult>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.LessonId, opt => opt.Ignore())
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId))
                .ForMember(dest => dest.Details, opt => opt.MapFrom(src => src.Details)
                );
        }
    }
}
