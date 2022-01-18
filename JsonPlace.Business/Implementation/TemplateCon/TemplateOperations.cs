using AutoMapper;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Template;
using JsonPlace.Repository.Abstract;
using JsonPlace.Core.Entitites.Template;
using AutoMapper.QueryableExtensions;
using JsonPlace.Business.Implementation.Validation;

namespace JsonPlace.Business.Implementation.TemplateCon
{
    internal class TemplateOperations : ITemplateOperations
    {
        private readonly ITemplateRepository _repository;
        private readonly IMapper _mapper;

        public TemplateOperations(ITemplateRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public async Task<SaveTemplateResponseDto> DeleteAsync(string id)
        {
            if (string.IsNullOrWhiteSpace(id))
                return new SaveTemplateResponseDto() { Success = false, ErrorMessage = "Invalid User Id!" };
            try
            {
                await _repository.DeleteAsync(id);
                return new SaveTemplateResponseDto() { Success = true, ErrorMessage = "" };
            }
            catch
            {
                return new SaveTemplateResponseDto() { Success = false, ErrorMessage = "Server error while deleting template!" };
            }

        }

        public async Task<GetAllTemplateResponseDto> GetAllByUserId(string? userId)
        {
            if (string.IsNullOrWhiteSpace(userId))
                return new GetAllTemplateResponseDto() { Success = false, ErrorMessage = "Invalid User Id!" };
            try
            {
                var query = _repository.Where(x => x.UserId == userId).AsEnumerable().Select(x => _mapper.Map<TemplateDto>(x));
                return new GetAllTemplateResponseDto() { Success = true, Templates = query.ToList(), ErrorMessage = "" };
            }
            catch (Exception)
            {
                return new GetAllTemplateResponseDto() { Success = false, ErrorMessage = "Server error while obtaining templates!" };
            }
        }

        public async Task<SaveTemplateResponseDto> SaveTemplateAsync(TemplateDto dto)
        {
            if (!dto.Validate())
                return new SaveTemplateResponseDto() { ErrorMessage = "Validation Error!", Success = false };
            try
            {
                var model = _mapper.Map<Template>(dto);
                await _repository.InsertAsync(model);
                return new SaveTemplateResponseDto() { Success = true, ErrorMessage = "" };
            }
            catch
            {
                return new SaveTemplateResponseDto() { ErrorMessage = "Server error while saving template!", Success = false };
            }
        }
    }
}
