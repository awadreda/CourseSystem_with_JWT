using System.ComponentModel.DataAnnotations;

namespace CourseSystemBackEnd.Models;

public class User
{
    public Guid UserID { get; set; }

    [Required, MinLength(2), MaxLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [Required, MinLength(2), MaxLength(50)]
    public string LastName { get; set; } = string.Empty;

    [Required, MinLength(6)]
    public string Password { get; set; } = string.Empty;

    [Required, EmailAddress]
    public string Email { get; set; } = string.Empty;

    public string Role { get; set; } = string.Empty; // "Student", "Teacher", or "Admin"

    public string? RefreshToken { get; set; }
    public DateTime? RefreshTokenExpiryTime { get; set; }

    public Student? student { get; set; }
    public Teacher? teacher { get; set; }
}
