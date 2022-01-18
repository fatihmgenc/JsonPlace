import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HelpIcon from '@material-ui/icons/Help';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import { JsonContext } from '../context/jsonContext';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    developerButton: {
        position: "flex",
    }
}));

const Navbar = () => {

    const { contextState, contextStateActions } = useContext(JsonContext);

    const handleLogout = () => {
        contextStateActions.isLoginModalOpenChanged(true)
        contextStateActions.setAuthorizedUser({})
        contextStateActions.setToken('')
        contextStateActions.setUserTemplates([])
    };

    return (
        <AppBar position="static">
            <Toolbar >
                <Typography variant="h5" component="div"  >
                    Json Place
                </Typography>

                <div style={{ marginLeft: "auto" }} >
                    {contextState.authorizedUser.Username
                        ?
                        <Button variant="contained"
                            color="secondary"
                            onClick={handleLogout}
                        >{contextState.authorizedUser.Username}<LogoutIcon fontSize='large' /></Button>
                        :
                        <Button variant="contained"
                            color="secondary"
                            onClick={() => contextStateActions.isLoginModalOpenChanged(true)} >Login/Register</Button>
                    }
                    <IconButton
                        onClick={() => contextStateActions.isHelpModalOpenChanged(true)}
                        size='small'
                        fullWidth={false}
                        style={{ marginLeft: "5px" }}
                        variant='contained'
                        color="default"><HelpIcon /></IconButton>
                </div>
            </Toolbar>
        </AppBar >

    );
};

export default Navbar;