namespace CourseSystemBackEnd.Mappers;

using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.DTOs.TeacherDTOs;
using CourseSystemBackEnd.Models;
using Microsoft.CodeAnalysis.CSharp.Syntax;

public static class TeacherMapper
{
    public static TeacherReadDTO ToTeacherReadDTO(this Teacher teacher)
    {
        return new TeacherReadDTO
        {
            TeacherID = teacher.TeacherID,
            FirstName = teacher.User.FirstName,
            LastName = teacher.User.LastName,
            Email = teacher.User.Email,
            Role = teacher.User.Role,

            Courses = teacher.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static TeacherCreateDTO ToTeacherCreateDTO(this Teacher teacher)
    {
        return new TeacherCreateDTO
        {
            User = teacher.User.toUserCreateDTO(),
            Courses = teacher.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static TeacherUpdateDTO ToTeacherUpdateDTO(this Teacher teacher)
    {
        return new TeacherUpdateDTO
        {
            User = teacher.User.toUserUpdateDTO(),
            Courses = teacher.Courses.Select(c => c.CourseID).ToList(),
        };
    }

    public static Teacher ToTeacherFromCreateDTO(this TeacherCreateDTO teacherCreateDto)
    {
        return new Teacher
        {
            User = teacherCreateDto.User.toUserFromCreateDTO(),
            Courses =
                teacherCreateDto.Courses?.Select(c => new Course { CourseID = c }).ToList()
                ?? new List<Course>(),
        };
    }

    public static Teacher ToTeacherFromUpdateDTO(this TeacherUpdateDTO teacherUpdateDto)
    {
        return new Teacher
        {
            User = teacherUpdateDto.User.toUserFromUpdateDTO(),
            Courses =
                teacherUpdateDto.Courses?.Select(c => new Course { CourseID = c }).ToList()
                ?? new List<Course>(),
        };
    }
}
