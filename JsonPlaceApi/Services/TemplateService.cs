using AutoMapper;
using Grpc.Core;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.DataTransferObjects.Template;

namespace JsonPlaceApi.Services
{
    public class TemplateService : TemplatePrt.TemplatePrtBase
    {
        ITemplateOperations _templateOperations;
        IMapper _mapper;
        public TemplateService(ITemplateOperations templateOperations, IMapper mapper)
        {

            _templateOperations = templateOperations;
            _mapper = mapper;
        }
        public async override Task<SaveTemplateResponse> SaveTemplate(TemplateProtoDto template, ServerCallContext context)
        {
            var dto = ToDto(template);
            var x = context.GetHttpContext().User;
            var res = await _templateOperations.SaveTemplateAsync(dto);
            return new SaveTemplateResponse { Result = res.Result };
        }
        public TemplateDto ToDto(TemplateProtoDto template)
        {
            return _mapper.Map<TemplateDto>(template);
        }
    }
}
