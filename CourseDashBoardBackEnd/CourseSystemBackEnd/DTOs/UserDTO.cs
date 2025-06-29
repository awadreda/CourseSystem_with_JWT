using System.ComponentModel.DataAnnotations;

namespace CourseSystemBackEnd.DTOs;

public class UserCreateDTO
{
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty; // e.g., "Student", "Teacher", "Admin"
}

public class UserUpdateDTO
{
    public Guid UserID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string? Password { get; set; } // Optional for updates
    public string Role { get; set; } = string.Empty; // e.g., "Student", "Teacher", "Admin"
}

public class UserReadDTO
{
    public Guid UserID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}
