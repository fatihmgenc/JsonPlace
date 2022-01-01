namespace JsonPlaceApi.Helpers
{
    public interface IJWTAuthenticationManager
    {
        string Authonticate(string username, string password);
    }
}
