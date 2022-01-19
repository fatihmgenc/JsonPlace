using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.DataTransferObjects.Common
{
    public class ResponseDto
    {
        public bool Success { get; set; }
        public string ErrorMessage { get; set; }
    }
}
