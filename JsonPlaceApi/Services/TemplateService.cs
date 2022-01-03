using AutoMapper;
using Grpc.Core;
using JsonPlace.Business.Abstract.Template;
using JsonPlace.DataTransferObjects.Template;
using Microsoft.AspNetCore.Authorization;

namespace JsonPlaceApi.Services
{
    [Authorize]
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
            dto.UserId = context?.GetHttpContext()?.User?.Claims?.Where(x=>x.Type=="UserId").FirstOrDefault()?.Value;
            var res = await _templateOperations.SaveTemplateAsync(dto);
            return new SaveTemplateResponse { Result = res.Result };
        }

        public TemplateDto ToDto(TemplateProtoDto template)
        {
            return new TemplateDto
            {
                PropTypes = template.PropTypes.Select(x => new PropTypeDto
                {
                    ParentTypeSelectionName = x.ParentTypeSelectionName,
                    PropName = x.PropName,
                    TypeSelectionName = x.TypeSelectionName
                })
            };
        }
    }
}
