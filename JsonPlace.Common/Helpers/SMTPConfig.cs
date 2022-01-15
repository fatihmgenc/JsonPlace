using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.Common.Helpers
{
    public class SMTPConfig
    {
        public string FromAddress { get; set; }
        public string FromName { get; set; }
        public string Host { get; set; }
        public string FromPassword { get; set; }
        public int Port { get; set; }
        public bool EnableSSL { get; set; }
        public bool UseDefaultCredentials { get; set; }

    }
}
