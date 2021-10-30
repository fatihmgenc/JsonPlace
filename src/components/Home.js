import React from 'react'
import { Grid } from '@material-ui/core';
import JsonInputs from './JsonInputs';
import JsonView from './JsonView';
import { Box } from '@material-ui/core';

const Home = () => {
    return (
        <Box style={{ padding: 10 }} sx={{ backgroundColor: "Azure" }} >
            <Grid container spacing={3} lg={12}>
                <Grid item xs={12} md={4} lg={4} >
                    <JsonInputs></JsonInputs>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <JsonView></JsonView>
                </Grid>
            </Grid>
        </Box>
    )
}

export default Home
