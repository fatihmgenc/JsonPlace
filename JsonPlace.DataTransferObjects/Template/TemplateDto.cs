using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace JsonPlace.DataTransferObjects.Template
{
    public class TemplateDto
    {
        public string UserId;
        public IEnumerable<PropTypeDto> PropTypes;
    }
}
