import React, { useState, useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
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
            <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    className={classes.menuButton}
                >
                    <HomeIcon />
                </IconButton>

                <Typography variant="h5" className={classes.menuButton}>
                    Json Place
                </Typography>
                {contextState.authorizedUser.Username
                    ? <div>
                        <Button variant="contained" color="secondary" onClick={handleLogout} >Logged In As : {contextState.authorizedUser.Username}, Click To Logout</Button>
                    </div>
                    :
                    <div>
                        <Button variant="contained" color="secondary" onClick={() => contextStateActions.isLoginModalOpenChanged(true)} >Login/Register</Button>
                    </div>
                }

            </Toolbar>
        </AppBar>
    );
};

export default Navbar;