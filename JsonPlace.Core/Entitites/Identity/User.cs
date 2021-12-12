using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Core.Entitites.Identity
{
    public class User : BaseEntity
    {
        public string Email { get; set; }
        public string Username { get; set; }
    }
}
