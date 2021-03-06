import { React } from 'react'
import { TemplatePrtClient } from "../protos/template_grpc_web_pb";
import { TemplateProtoDto, PropType, TemplateDeleteProto } from "../protos/template_pb";
import google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb.js'
import { NotificationManager } from 'react-notifications';
import ApplicationVariables from '../resources/applicationVariables';

var client = new TemplatePrtClient(ApplicationVariables.BaseAdress);

const TemplateServices = {

    SaveTemplate: async ({ contextState, contextStateActions, title, desc, callBacks }) => {
        var templateProtoDto = new TemplateProtoDto();
        templateProtoDto.setTitle(title);

        templateProtoDto.setDescription(desc);
        let temp = contextState.typeArray.map(x => {
            var propType = new PropType();
            propType.setTypeselectionname(x.typeSelectionName)
            propType.setParenttypeselectionname(x.parentTypeSelectionName)
            propType.setPropname(x.propName)
            return propType
        })

        templateProtoDto.setProptypesList(temp);
        client.saveTemplate(templateProtoDto, { Authorization: `bearer ${contextState.token}` },
            (err, response) => {
                if (err) {
                    NotificationManager.error(err.message, "Error", 3000);
                }
                else if (response.getSuccess() === false) {
                    NotificationManager.error(response.getErrormessage(), "Error", 3000);
                } else {
                    NotificationManager.success('Register Succeed', 'Welcome!', 3000);
                    contextStateActions.isLoginModalOpenChanged(false)
                }
                callBacks.forEach(element => {
                    element({ contextState, contextStateActions, title, desc });
                });
            });
    },
    GetAll: async ({ token, contextState, contextStateActions }) => {
        let list = []
        client.getAll(new google_protobuf_empty_pb.Empty, { Authorization: `bearer ${token || contextState.token}` }, (err, response) => {

            if (err) {
                NotificationManager.error(err.message, "Error", 3000);
            }
            else if (response.getSuccess() === false) {
                NotificationManager.error(response.getErrormessage(), "Error", 3000);
            } else {
                response?.getProptypesList().map(x => {
                    list.push(
                        {
                            Id: x.getId(),
                            Title: x.getTitle(),
                            Description: x.getDescription(),
                            PropTypes: x.getProptypesList().map(y => {
                                return {
                                    propName: y.getPropname(),
                                    typeSelectionName: y.getTypeselectionname(),
                                    parentTypeSelectionName: y.getParenttypeselectionname()
                                }
                            })
                        }
                    )
                });
                contextStateActions.setUserTemplates(list)
            }
        });
    },
    Delete: async ({ contextState, contextStateActions, id, callBacks }) => {
        let newTemplateDeleteProto = new TemplateDeleteProto();
        newTemplateDeleteProto.setId(id);
        client.delete(newTemplateDeleteProto, { Authorization: `bearer ${contextState.token}` }, (err, response) => {
            if (err) {
                NotificationManager.error(err.message, "Error", 3000);
                return;
            }
            else if (response.getSuccess() === false) {

                NotificationManager.error("Error", "Error", 3000);
                return;
            }
            NotificationManager.success('Record Deleted Succesfully', "Success", 3000);
            callBacks.forEach(element => {
                element({ contextState, contextStateActions });
            });
        });
    }


}

export default TemplateServices
