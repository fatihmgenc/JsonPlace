import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActions, Button, Input, Typography, TextField } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'
import { Save } from '@material-ui/icons';

var faker = require('faker');
const JsonView = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    const [sampleCount, setSampleCount] = useState(1)

    const generateNewSampleJson = () => {
        contextState.typeArray.forEach(element => {
            Reflect.set(contextState.json, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(contextState.json)
    }

    function download(filename, text) {
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

    const downloadJsonDoc = async () => {
        let data = {};
        let docString = "";
        for (let index = 0; index < sampleCount; index++) {
            contextState.typeArray.forEach(element => {
                Reflect.set(data, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
            });
            docString += `${JSON.stringify(data)}${index == sampleCount - 1 ? '' : ','}`
        }
        download("jsons.txt", docString)
    }

    return (

        <Card>
            <CardContent>
                <CardHeader title="Monitoring" />
                <ReactJson onEdit={(edit) => console.log(edit)} src={contextState["json"]} />
            </CardContent>


            <CardActions  >
                <Button disabled={!contextState.typeArray.length} onClick={() => generateNewSampleJson()} style={{ margin: "auto", fontSize: "medium", backgroundColor: "#927bfb" }}>Generate New Sample</Button>
                {/* <Typography>Sample Count :</Typography> */}
                <TextField
                    type="number"
                    InputProps={{
                        inputProps: {
                            max: 1000, min: 0
                        }
                    }}
                    variant="outlined"
                    label="Sample Count"
                    size="small"
                    style={{ width: 125 }}
                    onChange={(e) => setSampleCount(e.target.value)}
                    defaultValue="1"
                />
                <Button disabled={!contextState.typeArray.length} color="secondary" variant="contained" onClick={() => downloadJsonDoc()} style={{ fontSize: "medium" }}>Download</Button>

            </CardActions>
        </Card >
    )
}

export default JsonView
