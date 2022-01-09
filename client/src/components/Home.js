import React, { useContext, useEffect, makeStyles } from 'react'
import { Grid } from '@material-ui/core';
import JsonInputs from './JsonInputs';
import JsonView from './JsonView';
import { Box } from '@material-ui/core';
import ModifiedCarousel from './modifiedCarousel';
import LoginModal from './LoginModal';
import BlockUi from 'react-block-ui';
import { NotificationContainer } from 'react-notifications';
import { JsonContext } from '../context/jsonContext';
const Home = () => {

    const { contextState, contextStateActions } = useContext(JsonContext);

    const parseJwt = (token) => {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    };

    useEffect(() => {
        console.log("Home: useEffect");
        if (!contextState.token || parseJwt(contextState.token)?.exp < new Date().getTime() / 1000) {
            contextStateActions.setAuthorizedUser({});
        }
    }, [])

    return (
        <Box style={{ padding: 5 }}  >
            <NotificationContainer />
            <LoginModal />
            <Grid container spacing={3} lg={12}>
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
                    <ModifiedCarousel isCustom={true} />
                </Grid>
            </Grid>
        </Box >
    )
}

export default Home
