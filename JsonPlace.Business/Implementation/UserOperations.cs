using AutoMapper;
using JsonPlace.Business.Abstract.Identity;
using JsonPlace.Business.Implementation.Validation;
using JsonPlace.Common.Helpers;
using JsonPlace.Core.Entitites.Identity;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.User;
using JsonPlace.Repository.Abstract;
using JsonPlaceApi.Helpers;
using Microsoft.Extensions.Options;
using System.Net;
using System.Net.Mail;

namespace JsonPlace.Business.Implementation
{
    public class UserOperations : IUserOperations
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;
        private readonly IJWTAuthenticationManager _jWTManager;
        private readonly IOptions<SMTPConfig> _smtpConfig;
        public UserOperations(IUserRepository userRepository, IMapper mapper, IJWTAuthenticationManager jWTManager, IOptions<SMTPConfig> smtpConfig)
        {
            _userRepository = userRepository;
            _mapper = mapper;
            _jWTManager = jWTManager;
            _smtpConfig = smtpConfig;
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

            var user = await _userRepository.GetUserByLoginInfoAsync(dto.Username, dto.Password);
            if (user == null)
                return resp;
            resp.AuthToken = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { UserId = user.Id, Username = user.Username });
            resp.Result = true;
            return resp;
        }

        public bool RemindPassword(string mailAddress)
        {

            if (string.IsNullOrWhiteSpace(mailAddress))
                return false;
            var user = _userRepository.Where(x => x.Email == mailAddress).Select(x => new { x.Username, x.Password }).FirstOrDefault();

            if (user == null)
                return false;

            var toAddress = new MailAddress(mailAddress, $"{user.Username}");
            const string subject = "Your Password";
            string body = $"Your registered password at JsonPlace.com is : '{user.Password}'\n Do not reply this mail.";
            return SMTPMailHelper.SendMail(_smtpConfig.Value, toAddress, subject, body);
        }
    }
}
