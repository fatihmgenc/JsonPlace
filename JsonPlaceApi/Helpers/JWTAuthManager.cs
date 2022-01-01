using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JsonPlaceApi.Helpers
{
    public class JWTAuthManager : IJWTAuthenticationManager
    {
        private byte[] _jwtSecret;

        public JWTAuthManager(byte[] jwtSecret)
        {
            _jwtSecret = jwtSecret;
        }

        private readonly IDictionary<string, string> users = new Dictionary<string, string>()
        {{"test1","password1"},{"test2","password2"}};
        public string Authonticate(string username, string password)
        {
            if (!users.Any(x => x.Key == username && x.Value == password))
            {
                return null;
            }

            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, username) }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_jwtSecret), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
