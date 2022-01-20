import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActions, Box, Button, TextField, Grid, Modal } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'
import { Refresh, Save, SaveAltRounded } from '@material-ui/icons';
import TemplateServices from "../protoServices/TemplateServices";

var faker = require('faker');
const JsonView = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    const [sampleCount, setSampleCount] = useState(1)
    const [templateTitle, setTemplateTitle] = useState("");
    const [isSaveModalOpen, setIsSaveModalOpen] = useState("");
    const [desc, setDesc] = useState("");

    const generateNewSampleJson = () => {
        console.log(contextState.typeArray, "context.typeArray")
        console.log(faker.address, "fakerAddres")
        let temp = {}
        contextState.typeArray.forEach(element => {
            Reflect.set(temp, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(temp)
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

    const download = async (filename, text) => {
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

    const downloadJsonDoc = async () => {
        contextStateActions.setLoading(true);
        var docString = await createFile();
        await download("jsons.txt", docString);
        await contextStateActions.setLoading(false);
    }

    const saveTemplate = async () => {

        await TemplateServices.SaveTemplate({ contextState, contextStateActions, title: templateTitle, desc, callBacks: [TemplateServices.GetAll] }).then(() => {
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
                                    maxRows={4}
                                    placeholder="Description"
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
