using Microsoft.AspNetCore.Authorization;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace JsonPlaceApi.Helpers
{
    public class JwtTokenValidator : ISecurityTokenValidator
    {
        public bool CanReadToken(string securityToken) => true;

        public ClaimsPrincipal ValidateToken(string securityToken, TokenValidationParameters validationParameters, out SecurityToken validatedToken)
        {
            var handler = new JwtSecurityTokenHandler();
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateIssuer = true,
                ValidateAudience = true,
                ValidateLifetime = true,
                ValidateIssuerSigningKey = true,
                ValidIssuer = "Fatih",
                ValidAudience = "fatihmgenc",
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("RlSg8qAvQSTTIuKDTEcGpvXu9qmzsPj764UjY3GgkFtnA1v07yoGT8qBc9AC6ff"))
            };

            var claimsPrincipal = handler.ValidateToken(securityToken, tokenValidationParameters, out validatedToken);
            return claimsPrincipal;
        }

        public bool CanValidateToken { get; } = true;
        public int MaximumTokenSizeInBytes { get; set; } = int.MaxValue;
    }
}
