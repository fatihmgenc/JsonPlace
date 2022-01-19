using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Template;

namespace JsonPlace.Business.Abstract.Template
{
    public interface ITemplateOperations
    {
        public Task<ResponseDto> SaveTemplateAsync(TemplateDto dto);
        public Task<GetAllTemplateResponseDto> GetAllByUserId(string? userId);
        public Task<ResponseDto> DeleteAsync(string id);
    }
}
