using JsonPlace.DataTransferObjects.Common;

namespace JsonPlace.DataTransferObjects.Template
{
    public class GetAllTemplateResponseDto : ResponseDto
    {
        public List<TemplateDto> Templates;
    }
}
