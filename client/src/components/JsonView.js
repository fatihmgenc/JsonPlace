import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActions, Button, Input, Typography, TextField, Grid } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'
import { LocalHospital, Save } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { TemplatePrtClient } from "../protos/template_grpc_web_pb";
import { TemplateProtoDto, PropType } from "../protos/template_pb";
import { NotificationManager } from 'react-notifications';


var faker = require('faker');
const JsonView = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    const [sampleCount, setSampleCount] = useState(1)

    const generateNewSampleJson = () => {
        console.log(contextState.typeArray, "context.typeArray")
        contextState.typeArray.forEach(element => {
            Reflect.set(contextState.json, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(contextState.json)
    }

    const download = (filename, text) => {
        var pom = document.createElement('a');
        pom.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        pom.setAttribute('download', filename);

        if (document.createEvent) {
            var event = document.createEvent('MouseEvents');
            event.initEvent('click', true, true);
            pom.dispatchEvent(event);
        }
        else {
            pom.click();
        }
    }

    const createFile = async () => {
        let data = {};
        let docString = "";
        for (let index = 0; index < sampleCount; index++) {
            contextState.typeArray.forEach(element => {
                Reflect.set(data, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            docString += `${JSON.stringify(data)} ${index == sampleCount - 1 ? '' : ','}`
        }
        docString = `[${docString}]`;
        return docString;
    }

    const downloadJsonDoc = () => {
        contextStateActions.setLoading(true);
        createFile().then(docString => {
            download("jsons.txt", docString)
        }).finally(() => {
            contextStateActions.setLoading(false);
        });;
    }
    const saveTemplate = () => {
        // ask a fucking question at stackoverflow

        var client = new TemplatePrtClient('http://localhost:8080');
        var templateProtoDto = new TemplateProtoDto();
        let temp = contextState.typeArray.map(x => {
            var propType = new PropType();
            propType.setTypeselectionname(x.typeSelectionName)
            propType.setParenttypeselectionname(x.parentTypeSelectionName)
            propType.setPropname(x.propName)
            return propType
        })

        console.log(temp, "jstbeforeSet");
        templateProtoDto.setProptypesList(temp);
        client.saveTemplate(templateProtoDto, { Authorization: `bearer ${contextState.token}` },
            (err, SaveTemplateResponse) => {
                console.log(err, "SaveTemplateResponse");
                if (SaveTemplateResponse?.getResult() === false) {
                    NotificationManager.error('An Error Occured', 'Error!', 3000);
                } else {
                    console.log(SaveTemplateResponse);
                    NotificationManager.success('Register Succeed', 'Welcome!', 3000);
                    contextStateActions.isLoginModalOpenChanged(false)
                }

            });

    }

    return (

        <Card>
            <CardContent>
                <CardHeader title="3 - Instance" />
                <ReactJson onEdit={(edit) => console.log(edit)} src={contextState["json"]} />
            </CardContent>


            <CardActions style={{ backgroundColor: "whitesmoke" }} >
                <Grid container style={{ margin: 1 }} spacing={2}>

                    <Grid item sm={12} xs={12} md={6} lg={2} >
                        <TextField
                            type="number"
                            InputProps={{
                                inputProps: {
                                    max: 1000, min: 0
                                }
                            }}
                            variant="outlined"
                            label="Count"
                            size="small"
                            onChange={(e) => setSampleCount(parseInt(e.target.value) > 100000 ? 100000 : (parseInt(e.target.value) < 0 ? 0 : parseInt(e.target.value)))}
                            value={sampleCount}
                            defaultValue="1"
                        />
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={4} >
                        <Button color="primary" variant='contained' disabled={!contextState.typeArray.length} onClick={() => generateNewSampleJson()}
                            style={{ fontSize: "medium" }}>Generate New Sample</Button>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={3} >
                        <Button disabled={!contextState.typeArray.length || sampleCount == 0 || !sampleCount || !contextState?.authorizedUser?.Username}
                            color="primary"
                            variant="contained"
                            style={{ fontSize: "medium" }}
                            onClick={() => saveTemplate()}
                        >Save As Template</Button>
                    </Grid>
                    <Grid item sm={12} xs={12} md={6} lg={3} >
                        <Button disabled={!contextState.typeArray.length || sampleCount == 0 || !sampleCount}
                            color="secondary"
                            variant="contained"
                            onClick={() => downloadJsonDoc()} style={{ fontSize: "medium" }}
                        >Download</Button>
                    </Grid>
                </Grid >
            </CardActions >
        </Card >
    )
}

export default JsonView
