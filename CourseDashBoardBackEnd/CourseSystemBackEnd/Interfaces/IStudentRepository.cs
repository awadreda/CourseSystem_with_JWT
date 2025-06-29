namespace CourseSystemBackEnd.Interfaces
{
    using System;
    using System.Collections.Generic;
    using System.Threading.Tasks;
    using CourseSystemBackEnd.Models;

    public interface IStudentRepository
    {
        Task<List<Student>> GetAllStudentsAsync();
        Task<Student> GetStudentByIdAsync(Guid studentId);
        Task<Student> GetStudentByEmailAsync(string email);
        Task<bool> AddStudentAsync(Student student);
        Task<bool> UpdateStudentAsync(Student student);
        Task<bool> DeleteStudentAsync(Guid studentId);
    }
}
