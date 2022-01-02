using JsonPlace.DataTransferObjects.Common;

namespace JsonPlaceApi.Helpers
{
    public interface IJWTAuthenticationManager
    {
        string Authonticate(JsonPlaceTokenIngreditians ingreditians);
    }
}
