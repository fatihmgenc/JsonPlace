using JsonPlace.DataTransferObjects.User;

namespace JsonPlace.Business.Implementation.Validation
{
    public static class Validator
    {
        public static bool ValidateForRegister(this UserDto user)
        {
            if (user == null
                || string.IsNullOrWhiteSpace(user.Username)
                || string.IsNullOrWhiteSpace(user.Password)
                || string.IsNullOrWhiteSpace(user.Email)
                || user.Password.Length < 6
                || user.Email.Length < 6
                || user.Username.Length < 5)
            {
                return false;
            }
            return true;
        }

        public static bool ValidateForLogin(this UserDto user)
        {
            if (user == null || string.IsNullOrWhiteSpace(user.Username) || string.IsNullOrWhiteSpace(user.Password) || user.Password.Length<6 || user.Username.Length<5)
            {
                return false;
            }
            return true;
        }
    }
}
