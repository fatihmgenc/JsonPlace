using AutoMapper;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Implementation.Validation;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.User;
using JsonPlace.Repository.Abstract;
using JsonPlaceApi.Helpers;
using System.Net;
using System.Net.Mail;

namespace JsonPlace.Business.Implementation
{
    public class UserOperations : IUserOperations
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJWTAuthenticationManager _jWTManager;
        public UserOperations(IUserRepository userRepository, IMapper mapper, IJWTAuthenticationManager jWTManager)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jWTManager = jWTManager;
        }


        public async Task<AuthResponseDto> Upsert(UserDto user)
        {
            var resp = new AuthResponseDto();
            if (!user.ValidateForRegister())
                return resp;

            var userModel = _mapper.Map<User>(user);
            try
            {
                await _userRepository.InsertAsync(userModel);
                resp.Result = true;
                resp.AuthToken = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { Username = userModel.Username, UserId = userModel.Id });
            }
            catch
            {
                resp.Result = false;
            }

            return resp;
        }

        public async Task<AuthResponseDto> Login(UserDto dto)
        {
            var resp = new AuthResponseDto();
            if (!dto.ValidateForLogin())
                return resp;
            
            var user = await _userRepository.GetUserByLoginInfoAsync(dto.Username,dto.Password);
            if (user == null)
                return resp;
            resp.AuthToken = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { UserId=user.Id,Username=user.Username});
            resp.Result = true;
            return resp;
        }

        public bool RemindPassword (string mailAddress)
        {

            var fromAddress = new MailAddress("pokerfaceturkrey44@gmail.com", "From Name");
            var toAddress = new MailAddress("qfydxuurakksky@frederictonlawyer.com", "To Name");
            const string subject = "Subject";
            const string body = "Body";

            var smtp = new SmtpClient
            {
                Host = "smtp.gmail.com",
                Port = 587,
                EnableSsl = true,
                DeliveryMethod = SmtpDeliveryMethod.Network,
                UseDefaultCredentials = false,
                Credentials = new NetworkCredential(fromAddress.Address, "****")
            };
            using (var message = new MailMessage(fromAddress, toAddress)
            {
                Subject = subject,
                Body = body
            })
            {
                smtp.Send(message);
            }
            return true;
        }
    }
}
