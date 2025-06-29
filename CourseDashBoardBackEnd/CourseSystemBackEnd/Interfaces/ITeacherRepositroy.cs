using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces;

public interface ITeacherRepository
{
    Task<Teacher> GetTeacherByIdAsync(Guid teacherId);
    Task<Teacher> GetTeacherByEmailAsync(string email);
    Task<List<Teacher>> GetAllTeachersAsync();
    Task<Teacher> CreateTeacherAsync(Teacher teacher);
    Task<Teacher> UpdateTeacherAsync(Teacher teacher);
    Task<bool> DeleteTeacherAsync(Guid teacherId);
    Task<bool> AssignCourseToTeacherAsync(Guid teacherId, Guid courseId);
}
