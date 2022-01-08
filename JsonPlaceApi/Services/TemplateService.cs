﻿using AutoMapper;
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
            return new SaveTemplateResponse { Result = res.Result };
        }

        public async override Task<GetAllTemplateResponse> GetAll(Google.Protobuf.WellKnownTypes.Empty empty, ServerCallContext context)
        {
            var UserId = context?.GetHttpContext()?.User?.Claims?.Where(x => x.Type == "UserId").FirstOrDefault()?.Value;
            var result = _templateOperations.GetAllByUserId(UserId);
            var resp = new GetAllTemplateResponse ();
            resp.PropTypes.Add(result.Templates.Select(x => ToProto(x)));
            resp.Result = true;
            return resp;
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
        public SavedTemplateProtoDto ToProto(TemplateDto template)
        {

            var mess = new SavedTemplateProtoDto();
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
