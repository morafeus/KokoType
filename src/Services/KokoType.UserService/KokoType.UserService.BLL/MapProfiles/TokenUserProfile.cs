using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.MapProfiles
{
    public class TokenUserProfile : Profile
    {
        public TokenUserProfile()
        {
            CreateMap<UserModel, TokenUserDTO>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.UserLvl, opt => opt.MapFrom(src => src.UserLvl))
                .ForMember(dest => dest.UserExp, opt => opt.MapFrom(src => src.UserExp))
                .ForMember(dest => dest.Role, opt => opt.Ignore()); 
        }
    }
}
