namespace CourseSystemBackEnd.DTOs.TeacherDTOs;

using System.ComponentModel.DataAnnotations;
using System.Net.NetworkInformation;
using CourseSystemBackEnd.Models;

public record TeacherCreateDTO
{
    public List<Guid>? Courses { get; set; }
    public required UserCreateDTO User { get; set; }
}

public record TeacherReadDTO
{
    public List<Guid>? Courses { get; set; }
    public Guid TeacherID { get; set; }

    // public UserReadDTO User { get; set; } = null!;

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public record TeacherUpdateDTO
{
    public UserUpdateDTO User { get; set; }
    public List<Guid>? Courses { get; set; }
}

public record TeacherUpdateBasicInfoDto
{
    public Guid TeacherID { get; set; }
    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public record TeacherWithAllInfoDto
{
    public Guid TeacherID { get; set; }
    public UserReadDTO User { get; set; } = null!;
    public List<CourseReadDTO> Courses { get; set; } = null!;
}
