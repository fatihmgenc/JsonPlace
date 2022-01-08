using AutoMapper;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.DataTransferObjects.Common;
using JsonPlace.DataTransferObjects.Template;
using JsonPlace.Repository.Abstract;
using JsonPlace.Core.Entitites.Template;
using AutoMapper.QueryableExtensions;

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

        public GetAllTemplateResponseDto GetAllByUserId(string? userId)
        {
            var resp = new GetAllTemplateResponseDto();
            if (string.IsNullOrWhiteSpace(userId))
                return resp;
            try
            {
                var query = _repository.Where(x => x.UserId == userId).AsEnumerable().Select(x => _mapper.Map<TemplateDto>(x));
                resp.Templates = query.ToList();
                resp.Result = true;
                return resp;
            }
            catch (Exception)
            {
                return resp;
            }
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
                return resp;
            }
            catch
            {
                return resp;
            }
        }
    }
}
