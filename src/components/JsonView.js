import { React, useState } from 'react'
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
import ReactJson from 'react-json-view'

const JsonView = () => {
    const { jsonState, jsonActions } = useContext(JsonContext)
    console.log(jsonState, "contextState");
    return (
        <>
            <Grid>
                <Card  >
                    <CardContent>
                        <CardHeader title="Monitoring" />
                    </CardContent>

                    <CardActionArea>
                        <ReactJson onEdit={(edit) => console.log(edit)} src={jsonState["json"]} />
                        <CardActions>
                            <Button size="small" >
                                Generate new sample
                            </Button>

                        </CardActions>
                    </CardActionArea>
                </Card>
            </Grid>
        </>
    )
}

export default JsonView
