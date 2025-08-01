using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace CourseSystemBackEnd.Interfaces;

public class CourseRepository : ICourseRepository
{
    private readonly SchoolDBContext _schoolDB;

    public CourseRepository(SchoolDBContext schoolDB)
    {
        _schoolDB = schoolDB;
    }

    public async Task<Course> AddCourseAsync(Course course)
    {
        await _schoolDB.Courses.AddAsync(course);
        await _schoolDB.SaveChangesAsync();
        return course;
    }

    public async Task<bool> DeleteCourseAsync(Guid courseId)
    {
        if (courseId == Guid.Empty)
        {
            return false;
        }

        var course = await _schoolDB.Courses.FirstOrDefaultAsync(c => c.CourseID == courseId);
        if (course == null)
        {
            return false;
        }

        _schoolDB.Courses.Remove(course);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<List<Course>> GetAllCoursesAsync()
    {
        var courses = await _schoolDB.Courses.ToListAsync();

        return courses;
    }

    public async Task<Course> GetCourseByIdAsync(Guid courseId)
    {
#pragma warning disable CS8603 // Possible null reference return.
        return await _schoolDB
            .Courses.Include(c => c.Teacher)
            .Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.CourseID == courseId);
#pragma warning restore CS8603 // Possible null reference return.
    }

    public async Task<List<Course>> GetCoursesByStudentIdAsync(Guid studentId)
    {
        return await _schoolDB
            .Courses.Where(c => c.Students.Any(s => s.StudentID == studentId))
            .ToListAsync();
    }

    public async Task<bool> IsStudentEnrolledInCourseAsync(Guid studentId, Guid courseId)
    {
        var course = await _schoolDB
            .Courses.Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.CourseID == courseId);
        if (course == null)
        {
            return false;
        }
        return course.Students.Any(s => s.StudentID == studentId);
    }

    public async Task<List<Course>> GetCoursesTeacherIDAsync(Guid TeacherID)
    {
        return await _schoolDB.Courses.Where(c => c.TeacherID == TeacherID).ToListAsync();
    }

    public async Task<bool> IsCourseExistsAsync(Guid courseId)
    {
        return await _schoolDB.Courses.AnyAsync(c => c.CourseID == courseId);
    }

    public async Task<bool> EnrollStudentInCourseAsync(Guid courseId, Guid studentId)
    {
        var courseToEnroll = await _schoolDB
            .Courses.Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.CourseID == courseId);

        if (courseToEnroll == null)
        {
            return false;
        }
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            return false;
        }

        if (courseToEnroll.Students.Any(s => s.StudentID == studentId))
            return false;

        courseToEnroll.Students.Add(student);
        _schoolDB.Courses.Update(courseToEnroll);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    // public async Task<bool> UnenrollStudentFromCourseAsync(Guid courseId, Guid studentId)
    // {
    //     var courseToUnEnroll = await _schoolDB
    //         .Courses.Include(c => c.Students)
    //         .FirstOrDefaultAsync(c => c.CourseID == courseId);
    //     if (courseToUnEnroll == null)
    //     {
    //         return false;
    //     }

    //     var student = courseToUnEnroll.Students.FirstOrDefault(s => s.StudentID == studentId);
    //     if (student == null)
    //     {
    //         return false;
    //     }

    //     courseToUnEnroll.Students.Remove(student);
    //     _schoolDB.Courses.Update(courseToUnEnroll);
    //     await _schoolDB.SaveChangesAsync();
    //     return true;
    // }

    // public async Task<bool> EnrollStudentInCourseAsync(Guid courseId, Guid studentId)
    // {
    //     var student = await _schoolDB
    //         .Students.Include(s => s.Courses)
    //         .FirstOrDefaultAsync(s => s.StudentID == studentId);
    //     if (student == null)
    //         return false;

    //     var course = student.Courses.FirstOrDefault(c => c.CourseID == courseId);
    //     if (course != null)
    //         return false;

    //     student.Courses.Add(course);
    //     await _schoolDB.SaveChangesAsync();
    //     return true;
    // }

    //================FROM CHAT GPT         ==================
    public async Task<bool> UnenrollStudentFromCourseAsync(Guid courseId, Guid studentId)
    {
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
            return false;

        var course = student.Courses.FirstOrDefault(c => c.CourseID == courseId);
        if (course == null)
            return false;

        student.Courses.Remove(course);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<Course> UpdateCourseAsync(Course course)
    {
        if (course == null || course.CourseID == Guid.Empty)
        {
            return null;
        }

        var existingCourse = await _schoolDB
            .Courses.Include(c => c.Students)
            .FirstOrDefaultAsync(c => c.CourseID == course.CourseID);

        if (existingCourse == null)
        {
            return null;
        }

        existingCourse.Title = course.Title;
        existingCourse.Description = course.Description;
        existingCourse.Credits = course.Credits;
        existingCourse.TeacherID = course.TeacherID;
        // existingCourse.Students = course.Students;
        // _schoolDB.Courses.Update(existingCourse);
        // await _schoolDB.SaveChangesAsync();
        return existingCourse;
    }
}
