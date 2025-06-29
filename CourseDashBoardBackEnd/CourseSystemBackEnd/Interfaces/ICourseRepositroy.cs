using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces;

public interface ICourseRepository
{
    Task<List<Course>> GetAllCoursesAsync();
    Task<Course> GetCourseByIdAsync(Guid courseId);
    Task<List<Course>> GetCoursesByInstructorIdAsync(Guid instructorId);
    Task<Course> AddCourseAsync(Course course);
    Task<bool> UpdateCourseAsync(Course course);
    Task<bool> DeleteCourseAsync(Guid courseId);
    Task<bool> EnrollStudentInCourseAsync(Guid courseId, Guid studentId);
    Task<bool> UnenrollStudentFromCourseAsync(Guid courseId, Guid studentId);
}
