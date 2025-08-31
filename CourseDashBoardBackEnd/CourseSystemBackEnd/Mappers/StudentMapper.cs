namespace CourseSystemBackEnd.Mappers;

using System.Threading.Tasks;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.DTOs.StudentDTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using CourseSystemBackEnd.Repository;

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
            Role = student.User.Role,

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

    public static async Task<Student> ToStudentFromCreateDTO(
        this StudentCreateDto studentCreateDto,
        ICourseRepository _courseRerepository
    )
    {
        var student = new Student
        {
            GPA = studentCreateDto.GPA,
            User = studentCreateDto.User.toUserFromCreateDTO(),
            Courses = new List<Course>(),
        };

        if (studentCreateDto.Courses != null)
        {
            foreach (var CourseID in studentCreateDto.Courses)
            {
                var course = await _courseRerepository.GetCourseByIdAsync(CourseID);

                if (course != null)
                {
                    student.Courses.Add(course);
                }
            }
        }

        return student;
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
