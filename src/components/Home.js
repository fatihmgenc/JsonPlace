import React from 'react'
import { Grid, Card, Input, CardHeader, CardContent, CardActionArea, CardActions, Button, Menu, MenuItem } from '@material-ui/core';
import JsonInputs from './JsonInputs';
import JsonView from './JsonView';
import { Box } from '@material-ui/core';

const Home = () => {
    return (
        <Box m={2} >
            <Grid
                container
                direction="row"
                justifyContent="space-evenly"
                alignItems="stretch"
            >
                <JsonInputs></JsonInputs>
                <JsonView></JsonView>
            </Grid>
        </Box>
    )
}

export default Home
