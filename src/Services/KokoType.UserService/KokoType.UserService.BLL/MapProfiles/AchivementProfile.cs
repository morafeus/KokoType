using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.MapProfiles
{
    public class AchivementProfile : Profile
    {
        public AchivementProfile() 
        {
            CreateMap<AchivementDTO, Achivement>(MemberList.Destination)
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Guid.NewGuid()))
                .ForMember(dest => dest.Description, opt => opt.MapFrom(src => String.Empty));

            CreateMap<Achivement, AchivementDTO>(MemberList.Destination);
        }
    }
}
