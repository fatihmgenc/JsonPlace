using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Core.Entitites.Identity
{
    public class LoginUser
    {
        private readonly ClaimsIdentity _identity;
        private IEnumerable<Claim> _claims => _identity?.Claims;
        public LoginUser(ClaimsIdentity identity) => _identity = identity;
        public long UserId => ParseLong(_claims?.FirstOrDefault(x => x.Type == "uid")?.Value).GetValueOrDefault();
        public string Name => _claims?.FirstOrDefault(x => x.Type == ClaimTypes.Name)?.Value;
        public string SurName => _claims?.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value;
        public string Email => _claims?.FirstOrDefault(x => x.Type == ClaimTypes.Email)?.Value;
        public bool IsSystemUser => _claims?.FirstOrDefault(x => x.Type == "isSystem")?.Value == bool.TrueString;
        public bool IsAuthenticated => _identity?.IsAuthenticated ?? false;

        private static long? ParseLong(string value)
        {
            if (!string.IsNullOrWhiteSpace(value) && long.TryParse(value, out long result))
                return result;

            return default;
        }
    }
}
