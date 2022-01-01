import { React, useContext, useState } from 'react'
import { Modal, Input, Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { JsonContext } from '../context/jsonContext';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { TokenPrtClient } from '../protos/token_grpc_web_pb'
import { SimpleAccountDto } from '../protos/token_pb'
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '300px',
    height: 'auto',
    bgcolor: 'background.paper',
    border: '2px solid azure',
    borderRadius: '10px',
    backgroundColor: 'azure',
    boxShadow: 24,
    p: 3,
};


const LoginModal = () => {

    const { contextState, contextStateActions } = useContext(JsonContext)
    const [loginDto, LoginDto] = useState({})
    const [isLogin, setIsLogin] = useState(true)
    var simpleAccountDto = new SimpleAccountDto();

    const handleChange = (e) => {
        LoginDto({ ...loginDto, [e.target.name]: e.target.value })
    }

    const validateInputs = () => {
        if (loginDto.Username === '' || loginDto.Password === '' || loginDto.Username?.length < 5 || loginDto.Password?.length < 5) {
            NotificationManager.error('Please provide valid Username and Password', "Warning", 3000);
            return false
        }
        if (!isLogin && (loginDto.Email === '' || loginDto.Email?.length < 6 || !loginDto.Email.includes('@') || !loginDto.Email.includes('.'))) {
            NotificationManager.error('Please provide a valid Email', "Warning", 3000);
            return false
        }
        return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!validateInputs())
            return;
        if (!isLogin) {
            simpleAccountDto.setUsername(loginDto.Username);
            simpleAccountDto.setPassword(loginDto.Password);
            simpleAccountDto.setEmail(loginDto.Email);
            var tokenPrtClient = new TokenPrtClient('http://localhost:8080');
            var response = tokenPrtClient.register(simpleAccountDto, {}, (err, RegisterResponse) => {
                if (err) {
                    console.log(err);
                } else {
                    console.log(RegisterResponse);
                }
            });

        } else {
            console.log(loginDto);
        }
    }
    return (
        <div>
            <Modal
                open={contextState.isLoginModalOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                onClose={() => contextStateActions.isLoginModalOpenChanged(false)}
            >
                <Box sx={style}>
                    <Grid container >
                        <Grid style={{ marginBottom: 20 }} item xs={12}>
                            <Button onClick={() => setIsLogin(true)} variant={isLogin ? 'contained' : 'outlined'} style={{ width: '50%', borderRight: 'none' }} >Login</Button>
                            <Button onClick={() => setIsLogin(false)} variant={isLogin ? 'outlined' : 'contained'} style={{ width: '50%', borderLeft: 'none' }} >Register</Button>
                        </Grid>
                        <Grid style={{ marginTop: 20 }} item xs={12} md={12} lg={12} >
                            <TextField
                                style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined"
                                label={isLogin ? 'Username/Email' : 'Username'}
                                name='Username'
                                onChange={handleChange}>
                            </TextField>
                        </Grid>
                        {!isLogin && <Grid item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined" label='Email' onChange={handleChange} name='Email' >
                            </TextField>
                        </Grid>}
                        <Grid item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined" label='Password' type='password' onChange={handleChange} name="Password">

                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <Button onClick={handleSubmit} variant="contained"
                                style={{ left: '50%', transform: 'translate(-50%, -50%)', marginTop: 5, backgroundColor: "#3e51b5", color: 'white' }} >
                                {isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Modal>
        </div>
    )
}

export default LoginModal
