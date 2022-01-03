using AutoMapper;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Template;
using JsonPlace.Repository.Abstract;
using JsonPlace.Core.Entitites.Template;
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

        public async Task<SaveTemplateResponseDto> SaveTemplateAsync(TemplateDto dto)
        {
            var resp = new SaveTemplateResponseDto();
            if (dto == null || string.IsNullOrWhiteSpace(dto.UserId) || dto.PropTypes == null)
                return resp;
            try
            {
                var model = _mapper.Map<Template>(dto);
                await _repository.InsertAsync(model);
                resp.Result = true;
            }
            catch 
            {
                resp.Result = false;
            }
            return resp;
        }
    }
}
