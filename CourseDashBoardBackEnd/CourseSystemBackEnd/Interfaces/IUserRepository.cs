using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces;

public interface IUserRepository
{
    Task<User> GetUserByIdAsync(Guid userId);
    Task<User> GetUserByEmailAsync(string email);

    // Task<User> GetUserByIDForUpdate(Guid userId);
    Task<bool> UserExistsByEmail(string email);
    Task<bool> UserExistsById(Guid userId);

    Task<List<User>> GetAllUsersAsync();
    Task<User> CreateUserAsync(User user);
    Task<User> UpdateUserAsync(User user);
    Task<bool> UpdateBaskInfoAsync(UserReadDTO user);
    Task<bool> DeleteUserAsync(Guid userId);
}
