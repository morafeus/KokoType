using AutoMapper;
using KokoType.UserService.BLL.DTO;
using KokoType.UserService.BLL.Interfaces;
using KokoType.UserService.DAL.Interfaces;
using KokoType.UserService.DAL.Models;

namespace KokoType.UserService.BLL.Service
{
    public class AchivementService : IAchivementService
    {
        private IUnitOfWork _unitOfWork;
        private IMapper _mapper;

        public AchivementService(IUnitOfWork unitOfWork, IMapper mapper)
        {
            this._unitOfWork = unitOfWork;
            this._mapper = mapper;
        }

        public async Task<Achivement> AddAchivement(AchivementDTO achivementdto)
        {
            var achivement = _mapper.Map<Achivement>(achivementdto);
            await _unitOfWork.AchivementRepository.Add(achivement);
            return achivement;
        }

        public async Task<Achivement> AddUserAchivement(AchivementUserDTO achivementUser)
        {
            try
            {
                Achivement achive =await _unitOfWork.AchivementRepository.GetByName(achivementUser.AchiveName);
                UserModel user = await _unitOfWork.UserRepository.GetById(achivementUser.UserId);

                if (user.Achives == null)
                    user.Achives = new List<Achivement> { achive };
                else if(!user.Achives.Contains(achive))
                    user.Achives.Add(achive); 
                
                await _unitOfWork.UserRepository.Update(user);

                return achive;
            }
            catch(Exception ex) 
            {
                throw new Exception(ex.Message);
            }
        }


    }
}
