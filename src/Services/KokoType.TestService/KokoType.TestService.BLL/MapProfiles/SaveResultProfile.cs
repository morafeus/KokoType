

using AutoMapper;
using KokoType.TestService.BLL.DTO;
using KokoType.TestService.DAL.Models;

namespace KokoType.TestService.BLL.MapProfiles
{
    public class SaveResultProfile : Profile
    {
        public SaveResultProfile()
        {
            CreateMap<SaveResultDTO, Statistic>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.Speed, opt => opt.MapFrom(src => src.Speed))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => src.Description))
                .ForMember(dest => dest.Errors, opt => opt.MapFrom(src => src.Errors))
                .ForMember(dest => dest.Accuracy, opt => opt.MapFrom(src => src.Accuracy))
                .ForMember(dest => dest.DateTime, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.ExpCount, opt => opt.MapFrom(src => src.ExpCount))
                .ForMember(dest => dest.UserId, opt => opt.MapFrom(src => src.UserId));
        }
    }
}
