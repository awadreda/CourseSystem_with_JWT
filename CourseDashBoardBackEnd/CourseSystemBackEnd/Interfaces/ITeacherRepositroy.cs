using CourseSystemBackEnd.DTOs.TeacherDTOs;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Interfaces;

public interface ITeacherRepository
{
    Task<Teacher> GetTeacherByIdAsync(Guid teacherId);
    Task<Teacher> GetTeacherByEmailAsync(string email);
    Task<TeacherWithAllInfoDto> GetStudentWithAllInfoAndCoursesAndTeachersByEmail(string email)
;
    Task<List<Teacher>> GetAllTeachersAsync();
    Task<Teacher> CreateTeacherAsync(Teacher teacher);
    Task<Teacher> UpdateTeacherAsync(Teacher teacher);
    Task<bool> DeleteTeacherAsync(Guid teacherId);
    Task<bool> AssignCourseToTeacherAsync(Guid teacherId, Guid courseId);
    Task<bool> UnassignCourseFromTeacherAsync(Guid teacherId, Guid courseId);
    Task<bool> IsTeacherAssignedToCourseAsync(Guid teacherId, Guid courseId);
    Task<bool> IsTeacherExistsAsync(Guid teacherId);
    Task<bool> UpdateTeacherBasicInfoAsync(TeacherUpdateBasicInfoDto teacherUpdateBasicInfoDto);
}
