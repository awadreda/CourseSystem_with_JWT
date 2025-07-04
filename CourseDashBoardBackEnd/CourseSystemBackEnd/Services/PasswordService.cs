using CourseSystemBackEnd.Models;
using Microsoft.AspNetCore.Identity;

namespace CourseSystemBackEnd.Services;

public class PasswordService : IPasswordService
{
    private readonly PasswordHasher<User> _hasher = new();

    public string HashPassword(string password)
    {
        return _hasher.HashPassword(null, password);
    }

    public bool varifyPassword(string hashedPassword, string providedPassword)
    {
        var result = _hasher.VerifyHashedPassword(null, hashedPassword, providedPassword);

        return result == PasswordVerificationResult.Success;
    }
}
