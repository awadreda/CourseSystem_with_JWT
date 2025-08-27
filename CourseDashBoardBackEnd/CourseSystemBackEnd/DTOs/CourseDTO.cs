namespace CourseSystemBackEnd.DTOs;

using System.ComponentModel.DataAnnotations;
using CourseSystemBackEnd.DTOs.StudentDTOs;
using CourseSystemBackEnd.DTOs.TeacherDTOs;
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
    public TeacherReadDTO Teacher { get; init; } = new TeacherReadDTO();
    public List<StudentReadDto> Students { get; init; } = new List<StudentReadDto>();
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
