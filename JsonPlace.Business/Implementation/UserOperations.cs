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
            if (!user.ValidateForRegister())
                return new AuthResponseDto() { Success = false, ErrorMessage = "Invalid Username & Password!" };

            var userModel = _mapper.Map<User>(user);
            try
            {
                await _userRepository.InsertAsync(userModel);
                string token = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { Username = userModel.Username, UserId = userModel.Id });
                return new AuthResponseDto() { Success = true, AuthToken = token, ErrorMessage = "" };
            }
            catch
            {
                return new AuthResponseDto() { Success = false, ErrorMessage = "Server error while registering user!" };
            }

        }

        public async Task<AuthResponseDto> Login(UserDto dto)
        {
            if (!dto.ValidateForLogin())
                return new AuthResponseDto() { Success = false, ErrorMessage = "Invalid Username & Password!" };

            var user = await _userRepository.GetUserByLoginInfoAsync(dto.Username, dto.Password);
            if (user == null)
                return new AuthResponseDto() { Success = false, ErrorMessage = "Provided mail address not matched with any record!" };
            string token = _jWTManager.Authonticate(new JsonPlaceTokenIngreditians { UserId = user.Id, Username = user.Username });

            return new AuthResponseDto() { Success = true, AuthToken = token, ErrorMessage = "" };
        }

        public async Task<RemindResponseDto> RemindPassword(string mailAddress)
        {
            var resp = new RemindResponseDto();
            if (string.IsNullOrWhiteSpace(mailAddress))
                return new RemindResponseDto() { Success = false, ErrorMessage = "Not a valid mail address!" };
            var user = _userRepository.Where(x => x.Email == mailAddress).Select(x => new { x.Username, x.Password }).FirstOrDefault();

            if (user == null)
                return new RemindResponseDto() { Success = false, ErrorMessage = "Provided mail address not matched with any record!" };

            var toAddress = new MailAddress(mailAddress, $"{user.Username}");
            const string subject = "Your Password";
            string body = $"Your registered password at JsonPlace.com is : '{user.Password}'\n Do not reply this mail.";
            bool isMailSend = SMTPMailHelper.SendMail(_smtpConfig.Value, toAddress, subject, body);

            return new RemindResponseDto() { Success = isMailSend, ErrorMessage = isMailSend ? "" : "Failure during mail operation!" };
        }
    }
}
