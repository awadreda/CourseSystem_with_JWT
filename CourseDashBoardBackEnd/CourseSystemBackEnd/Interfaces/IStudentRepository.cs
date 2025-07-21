namespace CourseSystemBackEnd.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CourseSystemBackEnd.DTOs.StudentDTOs;
    using CourseSystemBackEnd.Models;

    public interface IStudentRepository
    {
        Task<List<Student>> GetAllStudentsAsync();
        Task<Student> GetStudentByIdAsync(Guid studentId);
        Task<Student> GetStudentByEmailAsync(string email);
        Task<Student> AddStudentAsync(Student student);
        Task<Student> UpdateStudentAsync(Student student);
        Task<bool> UpdateBasicInfoAsync(StudentReadDto student);

        Task<bool> AssignCourseToStudentAsync(Guid studentId, Guid courseId);
        Task<bool> UnassignCourseFromStudentAsync(Guid studentId, Guid courseId);

        Task<bool> IsStudentExistsAsync(Guid studentId);

        Task<bool> IsStudentAssignedToCourseAsync(Guid studentId, Guid courseId);
        Task<bool> DeleteStudentAsync(Guid studentId);
    }
}
