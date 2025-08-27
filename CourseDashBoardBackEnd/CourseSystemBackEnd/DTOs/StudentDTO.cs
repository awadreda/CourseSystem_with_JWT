using System.ComponentModel.DataAnnotations;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.DTOs.StudentDTOs;

public class StudentCreateDto
{
    public double GPA { get; set; }

    public List<Guid>? Courses { get; set; } // Optional, can be null if no courses are assigned

    [Required]
    public UserCreateDTO User { get; set; } = null!;
}

public record StudentReadDto
{
    public Guid StudentID { get; set; }
    public double GPA { get; set; }
    public List<Guid>? Courses { get; set; } // Optional, can be null if no courses are assigned

    // public UserReadDTO User { get; set; } = null!;

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public record StudentUpdateBaiscInfoDto
{
    public Guid StudentID { get; set; }
    public double GPA { get; set; }

    // public UserReadDTO User { get; set; } = null!;

    public string FirstName { get; set; } = string.Empty;
    public string LastName { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Role { get; set; } = string.Empty;
}

public record StudentUpdateDto
{
    public double? GPA { get; set; } // Nullable to allow partial updates
    public UserUpdateDTO User { get; set; } = null!;
    public List<Guid>? Courses { get; set; } // Optional, can be null if no courses are assigned
}



public record StudentWithAllInfoDto
{
    public Guid StudentID { get; set; }
    public double GPA { get; set; }

   public UserReadDTO User { get; set; } = null!;
    public List<CourseReadDTO>? Courses { get; set; } // Optional, can be null if no courses are assigned

}








