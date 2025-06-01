
using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.MapProfiles
{
    public class UserModelProfile : Profile
    {
        public UserModelProfile()
        {
            CreateMap<UserModelDTO, UserModel>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid())) 
                .ForMember(dest => dest.Password, opt => opt.Ignore()) 
                .ForMember(dest => dest.Salt, opt => opt.Ignore()) 
                .ForMember(dest => dest.UserLvl, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.UserExp, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.TestStarted, opt => opt.MapFrom(src => 0))
                .ForMember(dest => dest.RegistrateDate, opt => opt.MapFrom(src => DateTime.Now))
                .ForMember(dest => dest.About, opt => opt.MapFrom(src => string.Empty))
                .ForMember(dest => dest.ImageUrl, opt => opt.MapFrom(src => string.Empty))
                .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => string.Empty))
                .ForMember(dest => dest.Roles, opt => opt.Ignore())
                .ForMember(dest => dest.Achives, opt => opt.Ignore());
        }
    }
}
