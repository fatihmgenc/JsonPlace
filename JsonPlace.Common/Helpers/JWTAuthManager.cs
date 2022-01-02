using JsonPlace.DataTransferObjects.Common;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace JsonPlaceApi.Helpers
{
    public class JWTAuthManager : IJWTAuthenticationManager
    {
        private byte[] _jwtSecret;

        public JWTAuthManager(byte[] jwtSecret)
        {
            _jwtSecret = jwtSecret;
        }

        public string Authonticate(JsonPlaceTokenIngreditians ingreditians)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[] { new Claim(ClaimTypes.Name, ingreditians.Username), new Claim("UserId", ingreditians.UserId) }),
                Expires = DateTime.UtcNow.AddHours(3),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(_jwtSecret), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }

    }
}
