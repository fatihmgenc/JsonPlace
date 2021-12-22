import { React, useContext } from 'react'
import { Modal, Input, Box, Button, Grid, TextField } from '@material-ui/core';
import { JsonContext } from '../context/jsonContext';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid azure',
    boxShadow: 24,
    p: 3,
};

const LoginModal = ({ open, handleLogin }) => {

    const { contextState, contextStateActions } = useContext(JsonContext)

    return (
        <div>
            <Modal
                open={contextState.isLoginModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Grid container >
                        <Grid style={{ marginTop: 20 }} item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }} variant="outlined" label='Username/Email'>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }} variant="outlined" label='Password' type='password'>
                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <Button variant="contained" style={{ left: '50%', transform: 'translate(-50%, -50%)', marginTop: 5, backgroundColor: "#3e51b5", color: 'white' }} >
                                Login
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginModal
