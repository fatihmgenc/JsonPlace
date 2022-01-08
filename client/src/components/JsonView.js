import { React, useState, useEffect } from 'react'
import { Card, CardHeader, CardContent, CardActions, Box, Button, Input, Typography, TextField, Grid, Modal } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'
import { CloudDownload, FontDownload, LocalHospital, Refresh, Save, SaveAltRounded, SaveRounded } from '@material-ui/icons';
import NumberFormat from 'react-number-format';
import { TemplatePrtClient } from "../protos/template_grpc_web_pb";
import { TemplateProtoDto, PropType } from "../protos/template_pb";
import { NotificationManager } from 'react-notifications';
import google_protobuf_empty_pb from 'google-protobuf/google/protobuf/empty_pb.js'

var faker = require('faker');
const JsonView = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    const [sampleCount, setSampleCount] = useState(1)
    const [templateTitle, setTemplateTitle] = useState("");
    const [isSaveModalOpen, setIsSaveModalOpen] = useState("");
    const [desc, setDesc] = useState("");
    const generateNewSampleJson = () => {
        console.log(contextState.typeArray, "context.typeArray")
        contextState.typeArray.forEach(element => {
            Reflect.set(contextState.json, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(contextState.json)
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '300px',
        height: 'auto',
        bgcolor: 'background.paper',
        borderRadius: '10px',
        backgroundColor: 'azure',
        boxShadow: 24,
        p: 3,
    };

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

        var client = new TemplatePrtClient('http://localhost:8080');
        var templateProtoDto = new TemplateProtoDto();
        templateProtoDto.setTitle(templateTitle);
        templateProtoDto.setDescription(desc);
        let temp = contextState.typeArray.map(x => {
            var propType = new PropType();
            propType.setTypeselectionname(x.typeSelectionName)
            propType.setParenttypeselectionname(x.parentTypeSelectionName)
            propType.setPropname(x.propName)
            return propType
        })

        templateProtoDto.setProptypesList(temp);
        console.log(contextState.token, "contextState.token")

        client.saveTemplate(templateProtoDto, { Authorization: `bearer ${contextState.token}` },
            (err, SaveTemplateResponse) => {
                if (SaveTemplateResponse?.getResult() === false || err) {
                    NotificationManager.error('An Error Occured', 'Error!', 3000);
                } else {
                    console.log(SaveTemplateResponse);
                    NotificationManager.success('Register Succeed', 'Welcome!', 3000);
                    contextStateActions.isLoginModalOpenChanged(false)
                }
                handleModalClose();
            });

    }

    const handleModalClose = () => {
        setIsSaveModalOpen(false);
        setTemplateTitle("");
        setDesc("");
    }

    return (
        <>
            <Modal
                open={isSaveModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => handleModalClose()}
            >
                <Box sx={style}>
                    <Grid container>
                        <Grid container xs={8} sm={8} md={8} >

                            <Grid item xs={12} sm={12} md={12}>
                                <TextField disabled={false}
                                    placeholder="Template Title"
                                    onChange={(e) => setTemplateTitle(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                            <Grid item xs={12} sm={12} md={12}>
                                <TextField disabled={false}
                                    multiline
                                    placeholder="Description"
                                    maxRows={4}
                                    onChange={(e) => setDesc(e.target.value)}
                                >
                                </TextField>
                            </Grid>
                        </Grid>
                        <Grid container xs={3} sm={3} md={3}>
                            <Grid item xs={12} sm={12} md={12}

                            >
                                <Button color="primary"
                                    variant="contained"
                                    endIcon={<Save />}
                                    disabled={!templateTitle.length > 0}
                                    onClick={() => saveTemplate()}
                                >
                                    Save
                                </Button>
                            </Grid>
                        </Grid>
                    </Grid>

                </Box>
            </Modal>
            <Card>
                <CardContent>
                    <CardHeader title="3 - Instance" />
                    <ReactJson onEdit={(edit) => console.log(edit)} src={contextState["json"]} />
                </CardContent>


                <CardActions style={{ backgroundColor: "whitesmoke" }} >
                    <Grid container style={{ margin: 1 }} spacing={2}>


                        <Grid item sm={12} xs={12} md={6} lg={4} >
                            <Button color="primary" variant='contained'
                                disabled={!contextState.typeArray.length}
                                onClick={() => generateNewSampleJson()}
                                style={{ fontSize: "medium" }}
                                endIcon={<Refresh />}
                            >Generate New Sample</Button>
                        </Grid>
                        <Grid item sm={12} xs={12} md={6} lg={3} >
                            <Button disabled={!contextState.typeArray.length || sampleCount == 0 || !sampleCount || !contextState?.authorizedUser?.Username}
                                color="primary"
                                variant="contained"
                                style={{ fontSize: "medium" }}
                                onClick={() => setIsSaveModalOpen(true)}
                            >Save As Template</Button>
                        </Grid>
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
                        <Grid item sm={12} xs={12} md={6} lg={3} >
                            <Button disabled={!contextState.typeArray.length || sampleCount == 0 || !sampleCount}
                                color="secondary"
                                variant="contained"
                                onClick={() => downloadJsonDoc()} style={{ fontSize: "medium" }}
                                endIcon={<SaveAltRounded />}
                            >Download</Button>
                        </Grid>
                    </Grid >
                </CardActions >
            </Card >
        </>
    )
}

export default JsonView
