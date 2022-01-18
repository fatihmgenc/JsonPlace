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
            dto.UserId = context?.GetHttpContext()?.User?.Claims?.Where(x => x.Type == "UserId").FirstOrDefault()?.Value;
            var res = await _templateOperations.SaveTemplateAsync(dto);
            return new SaveTemplateResponse { Success = res.Success, ErrorMessage = res.ErrorMessage };
        }
        public async override Task<SaveTemplateResponse> Delete(TemplateDeleteProto deleteDto, ServerCallContext context)
        {
            var res = await _templateOperations.DeleteAsync(deleteDto.Id);
            return new SaveTemplateResponse { Success = res.Success };
        }

        public async override Task<GetAllTemplateResponse> GetAll(Google.Protobuf.WellKnownTypes.Empty empty, ServerCallContext context)
        {
            var UserId = context?.GetHttpContext()?.User?.Claims?.Where(x => x.Type == "UserId").FirstOrDefault()?.Value;
            var result = await _templateOperations.GetAllByUserId(UserId);
            var resp = new GetAllTemplateResponse();
            resp.PropTypes.Add(result.Templates.Select(x => ToProto(x)));
            resp.Success = true;
            return resp;
        }

        public TemplateDto ToDto(TemplateProtoDto template)
        {
            return new TemplateDto
            {
                Description = template.Description,
                Title = template.Title,
                PropTypes = template.PropTypes.Select(x => new PropTypeDto
                {
                    ParentTypeSelectionName = x.ParentTypeSelectionName,
                    PropName = x.PropName,
                    TypeSelectionName = x.TypeSelectionName
                })
            };
        }
        public SavedTemplateProtoDto ToProto(TemplateDto template)
        {

            var mess = new SavedTemplateProtoDto();
            mess.Id = template.Id;
            mess.Title = template.Title;
            mess.Description = template.Description;
            foreach (var item in template.PropTypes)
            {
                mess.PropTypes.Add(ToProto(item));
            }
            return mess;
        }

        public PropType ToProto(PropTypeDto dto)
        {
            return new PropType
            {
                ParentTypeSelectionName = dto.ParentTypeSelectionName,
                PropName = dto.PropName,
                TypeSelectionName = dto.TypeSelectionName
            };
        }

    }
}
