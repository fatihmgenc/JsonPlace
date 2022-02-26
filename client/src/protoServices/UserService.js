import { UserPrtClient } from "../protos/user_grpc_web_pb";
import { NotificationManager } from 'react-notifications';
import { RemindPasswordDto } from "../protos/user_pb";
import ApplicationVariables from '../resources/applicationVariables';


var userClient = new UserPrtClient(ApplicationVariables.BaseAdress);

const UserService = {

    RemindPasswordd: async ({ email, callBacks }) => {
        var remindPasswordDto = new RemindPasswordDto();
        remindPasswordDto.setMailaddress(email);
        userClient.remindPassword(remindPasswordDto, {}, (err, response) => {
            if (err) {
                NotificationManager.error(err.message, "Error", 3000);
            }
            else if (response.getSuccess() === false) {
                NotificationManager.error(response.getErrormessage(), "Error", 3000);
            } else {
                NotificationManager.success('Please check your Email (Also check spam folder)', "Success", 3000);
            }
            callBacks.forEach(element => {
                element();
            });
        })
    },
}

export default UserService
