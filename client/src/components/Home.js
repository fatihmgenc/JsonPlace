import React, { useContext, useEffect, makeStyles } from 'react'
import { Grid } from '@material-ui/core';
import JsonInputs from './JsonInputs';
import JsonView from './JsonView';
import { Box } from '@material-ui/core';
import ModifiedCarousel from './modifiedCarousel';
import LoginModal from './LoginModal';
import HelpModal from './HelpModal';
import { NotificationContainer } from 'react-notifications';
import { JsonContext } from '../context/jsonContext';
import parseJwt from "../common/ParseHelpers";

const Home = () => {

    const { contextState, contextStateActions } = useContext(JsonContext);

    // useEffect(() => {
    //     if (!contextState.token || parseJwt(contextState.token)?.exp < new Date().getTime() / 1000) {
    //         contextStateActions.setAuthorizedUser({});
    //     }
    // }, [])

    return (
        <Box style={{ padding: "5px" }}  >
            <NotificationContainer />
            <LoginModal />
            <HelpModal />
            <Grid container spacing={1} lg={12}>
                <Grid item xs={12} md={12} lg={12}  >
                    <ModifiedCarousel />
                </Grid>
                <Grid item xs={12} md={4} lg={4} >
                    <JsonInputs></JsonInputs>
                </Grid>
                <Grid item xs={12} md={8} lg={8}>
                    <JsonView></JsonView>
                </Grid>
                <Grid item xs={12} md={12} lg={12}  >
                    {contextState.userTemplates?.length > 0 && <ModifiedCarousel isCustom={true} />}
                </Grid>
            </Grid>
        </Box >
    )
}

export default Home
