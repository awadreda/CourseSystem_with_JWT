using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Repository;

public class AuthRepositroy : IAuthRepositroy
{
    public Task<User> Login(string email, string password)
    {
        throw new NotImplementedException();
    }

    public Task<User> Register(UserRegisterDTo userRegisterDTo, string password)
    {
        throw new NotImplementedException();
    }

    public Task<bool> UserExists(string email)
    {
        throw new NotImplementedException();
    }
}
