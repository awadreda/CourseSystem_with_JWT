namespace CourseSystemBackEnd.Mappers;

using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Models;

public static class CourseMapper
{
    public static CourseReadDTO ToCourseReadDTO(this Course course)
    {
        return new CourseReadDTO
        {
            CourseID = course.CourseID,
            Title = course.Title,
            Description = course.Description,
            Credits = course.Credits,
            Students = course.Students.ToList(),
            TeacherID = course.TeacherID,
        };
    }

    public static CourseCreateDTO ToCourseCreateDTO(this Course course)
    {
        return new CourseCreateDTO
        {
            Title = course.Title,
            Description = course.Description,
            Credits = course.Credits,
            TeacherID = course.TeacherID,
        };
    }

    public static CourseUpdateDTO ToCourseUpdateDTO(this Course course)
    {
        return new CourseUpdateDTO
        {
            CourseID = course.CourseID,
            Title = course.Title,
            Description = course.Description,
            Credits = course.Credits,
            TeacherID = course.TeacherID,
            Students = course.Students.ToList(),
        };
    }

    public static Course ToCourseFromCreateDTO(this CourseCreateDTO courseCreateDto)
    {
        return new Course
        {
            Title = courseCreateDto.Title,
            Description = courseCreateDto.Description,
            Credits = courseCreateDto.Credits,
            TeacherID = courseCreateDto.TeacherID,
        };
    }
}
