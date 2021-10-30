import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid, Typography } from '@material-ui/core';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'
import { Label } from '@material-ui/icons';

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

        <Card>
            <CardContent>
                <CardHeader title="Monitoring" />
                <ReactJson onEdit={(edit) => console.log(edit)} src={contextState["json"]} />
            </CardContent>

            <CardActionArea onClick={() => generateNewSampleJson()} >
                <CardActions style={{ backgroundColor: '#79b0e0' }}>
                    <p style={{ margin: "auto", fontSize: "large" }}>Generate New Sample</p>
                </CardActions>
            </CardActionArea>
        </Card>
    )
}

export default JsonView
