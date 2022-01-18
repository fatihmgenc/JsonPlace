import { TokenPrtClient } from "../protos/token_grpc_web_pb";
import { NotificationManager } from 'react-notifications';
import { SimpleAccountDto } from "../protos/token_pb";
import TemplateServices from "./TemplateServices";

var tokenClient = new TokenPrtClient('http://localhost:8080');

const TokenService = {

    Register: async ({ loginDto, contextStateActions, callBacks }) => {
        let simpleAccountDto = new SimpleAccountDto();
        simpleAccountDto.setUsername(loginDto.Username);
        simpleAccountDto.setPassword(loginDto.Password);
        simpleAccountDto.setEmail(loginDto.Email);
        tokenClient.register(simpleAccountDto, {}, (err, response) => {
            if (err) {
                NotificationManager.error(err.message, "Error", 3000);
            }
            else if (response.getSuccess() === false) {
                NotificationManager.error(response.getErrormessage(), "Error", 3000);
            } else {
                NotificationManager.success('Register Succeed', 'Welcome!', 3000);
                contextStateActions.setAuthorizedUser({ Username: loginDto.Username, Email: loginDto.Email });
                contextStateActions.setToken(response.getAuthtoken());
            }
            callBacks.forEach(element => {
                element();
            });
        })
    },
    Login: async ({ loginDto, contextState, contextStateActions, callBacks }) => {
        let simpleAccountDto = new SimpleAccountDto();
        simpleAccountDto.setUsername(loginDto.Username);
        simpleAccountDto.setPassword(loginDto.Password);
        tokenClient.login(simpleAccountDto, {}, (err, response) => {
            if (err) {
                NotificationManager.error(err.message, "Error", 3000);
            }
            else if (response.getSuccess() === false) {
                NotificationManager.error(response.getErrormessage(), "Error", 3000);
            } else {
                NotificationManager.success('Login Succeed', 'Welcome Back!', 3000);
                contextStateActions.setAuthorizedUser({ Username: loginDto.Username });
                contextStateActions.setToken(response.getAuthtoken())
                TemplateServices.GetAll({ token: response.getAuthtoken(), contextState, contextStateActions });
            }
            callBacks.forEach(element => {
                element();
            });
        })
    }
}

export default TokenService
