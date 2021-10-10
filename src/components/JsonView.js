import React from 'react'
import { Card, CardHeader, CardContent, CardActionArea, CardActions, Button, Grid } from '@material-ui/core';
import Box from '@material-ui/core/Box';


const JsonView = () => {
    return (
        <Grid>
            <Card  >
                <CardContent >
                    <CardHeader title="Monitoring" />
                    <p>Hello world</p>
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
