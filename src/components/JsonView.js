import React from 'react'
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import { useContext } from 'react';
import { JsonContext } from '../context/jsonContext';
//ToDo : Create ContextApi and visiualize json 

const JsonView = () => {

    const { jsonState, jsonActions } = useContext(JsonContext)

    return (
        <Grid>
            <Card  >
                <CardContent >
                    <CardHeader title="Monitoring" />
                    <p>{jsonState}</p>
                </CardContent>

                <CardActionArea>
                    <CardActions>
                        <Button size="small" >
                            Generate new sample
                        </Button>

                    </CardActions>
                </CardActionArea>
            </Card>
        </Grid>
    )
}

export default JsonView
