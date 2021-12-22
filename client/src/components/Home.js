import React, { useContext } from 'react'
import { Grid } from '@material-ui/core';
import JsonInputs from './JsonInputs';
import JsonView from './JsonView';
import { Box } from '@material-ui/core';
import ModifiedCarousel from './modifiedCarousel';
import LoginModal from './LoginModal';
import BlockUi from 'react-block-ui';

const Home = () => {
    console.log(React.version);
    return (
        <Box style={{ padding: 10 }}  >
            <LoginModal />
            <Grid container spacing={3} lg={12}>
                <Grid item xs={12} md={4} lg={4} >
                    <JsonInputs></JsonInputs>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <JsonView></JsonView>
                </Grid>
                <Grid item xs={12} md={12} lg={12} >
                    <ModifiedCarousel />
                </Grid>
            </Grid>
        </Box >
    )
}

export default Home
