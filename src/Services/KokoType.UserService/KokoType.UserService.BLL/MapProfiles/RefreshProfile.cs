using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.MapProfiles
{
    public class RefreshProfile : Profile
    {
        public RefreshProfile()
        {
            CreateMap<RefreshDTO, UserModel>()
            .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
            .ForMember(dest => dest.UserName, opt => opt.Ignore())
            .ForMember(dest => dest.Email, opt => opt.Ignore())
            .ForMember(dest => dest.Password, opt => opt.Ignore())
            .ForMember(dest => dest.Salt, opt => opt.Ignore())
            .ForMember(dest => dest.About, opt => opt.Ignore())
            .ForMember(dest => dest.ImageUrl, opt => opt.Ignore())
            .ForMember(dest => dest.RegistrateDate, opt => opt.Ignore())
            .ForMember(dest => dest.UserLvl, opt => opt.Ignore())
            .ForMember(dest => dest.UserExp, opt => opt.Ignore())
            .ForMember(dest => dest.RefreshToken, opt => opt.MapFrom(src => src.RefreshToken))
            .ForMember(dest => dest.Roles, opt => opt.Ignore())
            .ForMember(dest => dest.Achives, opt => opt.Ignore());
        }
    }
}
