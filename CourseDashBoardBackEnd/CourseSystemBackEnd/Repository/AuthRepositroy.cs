using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using CourseSystemBackEnd.Services;
using Microsoft.EntityFrameworkCore;

namespace CourseSystemBackEnd.Repository;

public class AuthRepositroy : IAuthRepositroy
{
     
     private readonly SchoolDBContext _schoolDB;
     

    public AuthRepositroy(SchoolDBContext schoolDB)
    {
        _schoolDB = schoolDB;
       
    }

    public async Task<TokenResponseDto?> Login(string email, string password)
    {
        var user = await _schoolDB.Users.FirstOrDefaultAsync(u => u.Email == email);


        if (user is null)
        {
            return null;
        }

        var passwordHass = user.Password;

        if (!new PasswordService().varifyPassword(passwordHass, password))
        {
            return null;
        }

        return new CreateTokenResponse(user);
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
