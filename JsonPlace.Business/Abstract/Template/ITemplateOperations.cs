using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Template;

namespace JsonPlace.Business.Abstract.Template
{
    public interface ITemplateOperations
    {
        public Task<SaveTemplateResponseDto> SaveTemplateAsync(TemplateDto dto);
    }
}
