import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'

var faker = require('faker');
const JsonView = () => {
    const { contextState, contextStateActions } = useContext(JsonContext)
    console.log(contextState, "contextState");

    const generateNewSampleJson = () => {
        contextState.typeArray.forEach(element => {
            Reflect.set(contextState.json, element.propName, faker[element.parentTypeSelectionName][element.typeSelectionName]())
        });
        contextStateActions.jsonChanged(contextState.json)
    }

    return (
        <>
            <Grid>
                <Card  >
                    <CardContent>
                        <CardHeader title="Monitoring" />
                    </CardContent>

                    <CardActionArea>
                        <ReactJson onEdit={(edit) => console.log(edit)} src={contextState["json"]} />
                        <CardActions>
                            <Button size="small" onClick={() => generateNewSampleJson()} >Generate New Sample</Button>

                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}

export default JsonView
