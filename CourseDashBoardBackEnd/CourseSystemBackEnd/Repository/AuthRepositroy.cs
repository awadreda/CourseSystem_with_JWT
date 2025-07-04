using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using CourseSystemBackEnd.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;
using Microsoft.IdentityModel.Tokens;

namespace CourseSystemBackEnd.Repository;

public class AuthRepositroy : IAuthRepositroy
{
    private readonly SchoolDBContext _schoolDB;
    private readonly IConfiguration _configuration;
    private readonly IPasswordService _passwordService;

    public AuthRepositroy(
        SchoolDBContext schoolDB,
        IConfiguration configuration,
        IPasswordService passwordService
    )
    {
        _schoolDB = schoolDB;
        _configuration = configuration;
        _passwordService = passwordService;
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

        return await CreateTokenResponse(user);
    }

    public async Task<User?> Register(UserRegisterDTo userRegisterDTo, string password)
    {
        if (await _schoolDB.Users.AnyAsync(u => u.Email == userRegisterDTo.Email))
        {
            return null;
        }

        var user = new User
        {
            UserID = Guid.NewGuid(),
            FirstName = userRegisterDTo.FirstName,
            LastName = userRegisterDTo.LastName,
            Email = userRegisterDTo.Email,
            Password = _passwordService.HashPassword(userRegisterDTo.Password),
            Role = userRegisterDTo.Role,
        };

        _schoolDB.Users.Add(user);

        if (userRegisterDTo.Role.ToLower() == "student".ToLower())
        {
            var student = new Student
            {
                StudentID = Guid.NewGuid(),
                UserID = user.UserID,
                GPA = 0,
            };
            _schoolDB.Students.Add(student);
        }

        if (userRegisterDTo.Role.ToLower() == "Teacher".ToLower())
        {
            var teacher = new Teacher
            {
                TeacherID = Guid.NewGuid(),
                UserID = user.UserID,
                User = user,
            };

            _schoolDB.Teachers.Add(teacher);
        }

        await _schoolDB.SaveChangesAsync();

        return user;
    }

    public Task<bool> UserExists(string email)
    {
        throw new NotImplementedException();
    }

    private async Task<TokenResponseDto> CreateTokenResponse(User user)
    {
        return new TokenResponseDto
        {
            AccessToken = CreateToken(user),
            RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
        };
    }

    private string GenerateRefreshToken()
    {
        var randomNumber = new byte[32];
        using var rng = RandomNumberGenerator.Create();
        rng.GetBytes(randomNumber);
        return Convert.ToBase64String(randomNumber);
    }

    private async Task<string> GenerateAndSaveRefreshTokenAsync(User user)
    {
        var refreshToken = GenerateRefreshToken();
        user.RefreshToken = refreshToken;
        user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(7);
        await _schoolDB.SaveChangesAsync();
        return refreshToken;
    }

    public async Task<TokenResponseDto?> RefreshTokens(RefreshTokenRequestDto request)
    {
        var user = await ValidateRefreshTokenAsync(request.UserId, request.RefreshToken);
        if (user is null)
        {
            return null;
        }
        return await CreateTokenResponse(user);
    }

    private async Task<User?> ValidateRefreshTokenAsync(Guid userId, string refreshToken)
    {
        var user = await _schoolDB.Users.FirstOrDefaultAsync(u => u.UserID == userId);
        if (
            user is null
            || user.RefreshToken != refreshToken
            || user.RefreshTokenExpiryTime <= DateTime.UtcNow
        )
        {
            return null;
        }

        return user;
    }

    private string CreateToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email),
            new Claim(ClaimTypes.NameIdentifier, user.UserID.ToString()),
            new Claim(ClaimTypes.Role, user.Role),
        };

        var key = _configuration.GetSection("Jwt")["Key"];
        var Key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(key!));
        var cred = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512);

        var tokenDescriptor = new JwtSecurityToken(
            issuer: _configuration.GetValue<string>("Jwt:Issuer"),
            audience: _configuration.GetValue<string>("Jwt:Audience"),
            claims: claims,
            expires: DateTime.UtcNow.AddDays(1),
            signingCredentials: cred
        );
        ;

        return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
    }
}
