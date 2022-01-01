import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import LogoutIcon from '@material-ui/icons/ExitToApp';
import Box from '@material-ui/core/Box';
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

    const classes = useStyles();
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    };

    const handleLogout = () => {
        contextStateActions.isLoginModalOpenChanged(true)
        contextStateActions.setAuthorizedUser({})
    };

    return (
        <AppBar position="static">
            <Toolbar  >
                <Typography variant="h5" component="div"  >
                    Json Place
                </Typography>

                <div style={{ marginLeft: "auto" }} >
                    {contextState.authorizedUser.Username
                        ?
                        <Button variant="contained" color="secondary" onClick={handleLogout} >{contextState.authorizedUser.Username}<LogoutIcon fontSize='large' /></Button>
                        :
                        <Button variant="contained" color="secondary" onClick={() => contextStateActions.isLoginModalOpenChanged(true)} >Login/Register</Button>
                    }
                </div>
            </Toolbar>
        </AppBar >

    );
};

export default Navbar;