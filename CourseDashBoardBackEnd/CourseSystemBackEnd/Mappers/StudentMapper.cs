namespace CourseSystemBackEnd.Mappers;

using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.DTOs.StudentDTOs;
using CourseSystemBackEnd.Models;

public static class StudentMapper
{
    public static StudentReadDto ToStudentReadDTO(this Student student)
    {
        return new StudentReadDto
        {
            StudentID = student.StudentID,
            FirstName = student.User.FirstName,
            LastName = student.User.LastName,
            GPA = student.GPA,
            Email = student.User.Email,

            Courses = student.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static StudentCreateDto ToStudentCreateDTO(this Student student)
    {
        return new StudentCreateDto
        {
            GPA = student.GPA,
            User = student.User.toUserCreateDTO(),
            Courses = student.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static StudentUpdateDto ToStudentUpdateDTO(this Student student)
    {
        return new StudentUpdateDto
        {
            GPA = student.GPA,
            User = student.User.toUserUpdateDTO(),
            Courses = student.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static Student ToStudentFromCreateDTO(this StudentCreateDto studentCreateDto)
    {
        return new Student
        {
            GPA = studentCreateDto.GPA,
            User = studentCreateDto.User.toUserFromCreateDTO(),
            Courses =
                studentCreateDto.Courses?.Select(c => new Course { CourseID = c }).ToList()
                ?? new List<Course>(),
        };
    }

    public static Student ToStudentFromUpdateDTO(this StudentUpdateDto studentUpdateDto)
    {
        return new Student
        {
            GPA = studentUpdateDto.GPA ?? 0.0, // Default to 0.0 if GPA is null
            User = studentUpdateDto.User.toUserFromUpdateDTO(),
            Courses =
                studentUpdateDto.Courses?.Select(c => new Course { CourseID = c }).ToList()
                ?? new List<Course>(),
        };
    }

    // public static Student ToStudentFromReadDTO(this StudentReadDto studentReadDto)
    // {
    //     return new Student
    //     {
    //         StudentID = studentReadDto.StudentID,
    //         GPA = studentReadDto.GPA,
    //         User = studentReadDto.User.toUserFromReadDTO(),
    //         Courses =
    //             studentReadDto.Courses?.Select(c => new Course { CourseID = c }).ToList()
    //             ?? new List<Course>(),
    //     };
    // }
}
