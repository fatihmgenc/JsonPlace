﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.DataTransferObjects.Template
{
    public class GetAllTemplateResponseDto
    {
        public List<TemplateDto> Templates;
        public bool Result { get; set; }
    }
}