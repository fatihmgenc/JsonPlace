﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.DataTransferObjects.Common
{
    public class AuthResponseDto : ResponseDto
    {
        public string AuthToken { get; set; }
    }
}
