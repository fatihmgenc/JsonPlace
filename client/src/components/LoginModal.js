import { React, useContext, useState } from 'react'
import { Modal, Input, Box, Button, Grid, TextField, Typography } from '@material-ui/core';
import { JsonContext } from '../context/jsonContext';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { TokenPrtClient } from '../protos/token_grpc_web_pb'
import { SimpleAccountDto } from '../protos/token_pb'
import LoadingOverlay from 'react-loading-overlay';
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
    const [isLoading, setIsLoading] = useState(false)
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
        setIsLoading(true)
        e.preventDefault()
        if (!validateInputs())
            return;
        if (!isLogin) {
            simpleAccountDto.setUsername(loginDto.Username);
            simpleAccountDto.setPassword(loginDto.Password);
            simpleAccountDto.setEmail(loginDto.Email);
            var tokenPrtClient = new TokenPrtClient('http://localhost:8080');
            tokenPrtClient.register(simpleAccountDto, {}, (err, RegisterResponse) => {
                if (RegisterResponse?.getResult() === false) {
                    NotificationManager.error('An Error Occured', 'Error!', 3000);
                } else {
                    console.log(RegisterResponse);
                    NotificationManager.success('Register Succeed', 'Welcome!', 3000);
                    contextStateActions.setAuthorizedUser({ Username: loginDto.Username, Email: loginDto.Email });
                    contextStateActions.isLoginModalOpenChanged(false)
                }

            });

        } else {
            simpleAccountDto.setUsername(loginDto.Username);
            simpleAccountDto.setPassword(loginDto.Password);
            console.log(simpleAccountDto, "simpleAccountDto");

            var tokenPrtClient = new TokenPrtClient('http://localhost:8080');
            tokenPrtClient.login(simpleAccountDto, {}, (err, RegisterResponse) => {
                if (err || RegisterResponse?.getResult() === false) {
                    NotificationManager.error('An Error Occured', 'Error!', 3000);
                } else {
                    NotificationManager.success('Login Succeed', 'Welcome Back!', 3000);
                    contextStateActions.setAuthorizedUser({ Username: loginDto.Username });
                    contextStateActions.isLoginModalOpenChanged(false)
                }
            });
        }
        setIsLoading(false)

    }
    return (
        <Modal
            open={contextState.isLoginModalOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            onClose={() => contextStateActions.isLoginModalOpenChanged(false)}
        >
            <Box sx={style}>
                <LoadingOverlay
                    active={isLoading}
                    spinner
                    text='Please wait...'
                    styles={{
                        overlay: (base) => ({
                            ...base,
                            opacity: 0.5,
                            borderRadius: '10px',
                            height: '100%',
                            position: 'absolute',
                            bottom: '10%',
                        }),
                        pinner: (base) => ({
                            ...base,
                            width: '100px',
                            '& svg circle': {
                                stroke: '#002984',
                            }
                        })
                    }}
                >
                    <Grid container >
                        <Grid style={{ marginBottom: 20 }} item xs={12}>
                            <Button onClick={() => setIsLogin(true)} variant={isLogin ? 'contained' : 'outlined'} style={{ width: '50%', borderRight: 'none', borderTopRightRadius: 0, borderBottomRightRadius: 0 }} >Login</Button>
                            <Button onClick={() => setIsLogin(false)} variant={isLogin ? 'outlined' : 'contained'} style={{ width: '50%', borderLeft: 'none', borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }} >Register</Button>
                        </Grid>
                        <Grid style={{ marginTop: 20 }} item xs={12} md={12} lg={12} >
                            <TextField
                                style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined"
                                label='Username'
                                name='Username'
                                value={loginDto.Username}
                                onChange={handleChange}>
                            </TextField>
                        </Grid>
                        {!isLogin && <Grid item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined"
                                label='Email'
                                onChange={handleChange}
                                value={loginDto.Email}
                                name='Email' >
                            </TextField>
                        </Grid>}
                        <Grid item xs={12} md={12} lg={12} >
                            <TextField style={{ margin: 2, left: '50%', transform: 'translate(-50%, -50%)' }}
                                variant="outlined"
                                label='Password'
                                type='password'
                                onChange={handleChange}
                                value={loginDto.Password}
                                name="Password">

                            </TextField>
                        </Grid>
                        <Grid item xs={12} md={12} lg={12} >
                            <Button style={{ left: '50%', transform: 'translate(-50%, -50%)', marginTop: 5, backgroundColor: "#3e51b5", color: 'white' }}
                                onClick={handleSubmit}
                                variant="contained"
                            >
                                {isLogin ? 'Login' : 'Register'}
                            </Button>
                        </Grid>
                    </Grid>
                </LoadingOverlay>
            </Box>
        </Modal>
    )
}

export default LoginModal
