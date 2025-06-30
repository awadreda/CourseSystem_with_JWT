namespace CourseSystemBackEnd.DTOs;

using System.ComponentModel.DataAnnotations;
using CourseSystemBackEnd.Models;

public record CourseCreateDTO
{
    [Required, MinLength(2), MaxLength(100)]
    public string Title { get; init; } = string.Empty;

    [Required, MinLength(10), MaxLength(500)]
    public string Description { get; init; } = string.Empty;

    [Required]
    public int Credits { get; init; }

    [Required]
    public Guid TeacherID { get; init; }
}

public record CourseReadDTO
{
    public Guid CourseID { get; init; }

    [Required, MinLength(2), MaxLength(100)]
    public string Title { get; init; } = string.Empty;

    [Required, MinLength(10), MaxLength(500)]
    public string Description { get; init; } = string.Empty;

    [Required]
    public int Credits { get; init; }

    [Required]
    public Guid TeacherID { get; init; }
    public List<Student> Students { get; init; } = new List<Student>();
}

public record CourseUpdateDTO
{
    public Guid CourseID { get; init; }

    [Required, MinLength(2), MaxLength(100)]
    public string Title { get; init; } = string.Empty;

    [Required, MinLength(10), MaxLength(500)]
    public string Description { get; init; } = string.Empty;

    [Required]
    public int Credits { get; init; }

    [Required]
    public Guid TeacherID { get; init; }
    // public ICollection<Student>? Students { get; init; }
}
