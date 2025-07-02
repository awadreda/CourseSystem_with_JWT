using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces
{
    public interface IAuthRepositroy
    {
        Task<User> Register(UserRegisterDTo userRegisterDTo, string password);
        Task<string> Login(string email, string password);
        Task<bool> UserExists(string email);
    }
}
