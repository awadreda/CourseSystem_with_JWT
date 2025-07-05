namespace CourseSystemBackEnd.Repository;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using CourseSystemBackEnd.Services;
using Microsoft.EntityFrameworkCore;

public class UserRepository : IUserRepository
{
    private readonly SchoolDBContext _schoolDB;

    public UserRepository(SchoolDBContext schoolDB)
    {
        _schoolDB = schoolDB;
    }

    public async Task<User> CreateUserAsync(User userModel)
    {
        if (userModel == null)
        {
            return null!;
        }

        await _schoolDB.Users.AddAsync(userModel);
        await _schoolDB.SaveChangesAsync();
        return userModel;
    }

    public async Task<bool> DeleteUserAsync(Guid userId)
    {
        if (userId == Guid.Empty)
        {
            return false;
        }

        var user = await _schoolDB.Users.FirstOrDefaultAsync(u => u.UserID == userId);

        if (user == null)
        {
            return false;
        }

        _schoolDB.Users.Remove(user);

        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public Task<List<User>> GetAllUsersAsync()
    {
        var users = _schoolDB.Users.ToListAsync();

        if (users == null)
        {
            return Task.FromResult(new List<User>());
        }
        if (users.Result.Count == 0)
        {
            return Task.FromResult(new List<User>());
        }

        return users;
    }

    public async Task<User> GetUserByEmailAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return null!;
        }

        var user = await _schoolDB.Users.FirstOrDefaultAsync(u => u.Email == email);

        if (user == null)
        {
            return null!;
        }

        return user;
    }

    public async Task<User> GetUserByIdAsync(Guid userId)
    {
        var user = await _schoolDB.Users.FirstOrDefaultAsync(u => u.UserID == userId);
        if (user != null)
        {
            return user;
        }

        return null!;
    }

    public async Task<User> UpdateUserAsync(User user)
    {
        if (user == null || user.UserID == Guid.Empty)
        {
            return null!;
        }

        var existingUser = _schoolDB.Users.FirstOrDefaultAsync(u => u.UserID == user.UserID);

        if (existingUser == null)
        {
            return null!;
        }

        existingUser.Result.FirstName = user.FirstName;
        existingUser.Result.LastName = user.LastName;
        existingUser.Result.Email = user.Email;
        existingUser.Result.Password = user.Password;
        existingUser.Result.Role = user.Role;

        if (user.student != null)
        {
            existingUser.Result.student = user.student;
        }
        if (user.teacher != null)
        {
            existingUser.Result.teacher = user.teacher;
        }
        _schoolDB.Update(existingUser.Result);
        await _schoolDB.SaveChangesAsync();
        return existingUser.Result;
    }

    public Task<bool> UserExists(string email)
    {
        return _schoolDB.Users.AnyAsync(u => u.Email == email);
    }
}
