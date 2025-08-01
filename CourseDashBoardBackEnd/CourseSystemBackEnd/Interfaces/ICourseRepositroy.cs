using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces;

public interface ICourseRepository
{
    Task<List<Course>> GetAllCoursesAsync();
    Task<Course> GetCourseByIdAsync(Guid courseId);
    Task<List<Course>> GetCoursesTeacherIDAsync(Guid TeacherID);
    Task<List<Course>> GetCoursesByStudentIdAsync(Guid studentId);

    Task<bool> IsCourseExistsAsync(Guid courseId);
    Task<Course> AddCourseAsync(Course course);
    Task<Course> UpdateCourseAsync(Course course);
    Task<bool> DeleteCourseAsync(Guid courseId);
    Task<bool> EnrollStudentInCourseAsync(Guid courseId, Guid studentId);
    Task<bool> UnenrollStudentFromCourseAsync(Guid courseId, Guid studentId);

    Task<bool> IsStudentEnrolledInCourseAsync(Guid studentId, Guid courseId);
}
