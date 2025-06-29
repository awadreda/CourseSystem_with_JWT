namespace CourseSystemBackEnd.Repository;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using Microsoft.EntityFrameworkCore;

public class StudentRerepository : IStudentRepository
{
    private readonly SchoolDBContext _schoolDB;

    public StudentRerepository(SchoolDBContext schoolDB)
    {
        _schoolDB = schoolDB;
    }

    public Task<bool> AddStudentAsync(Student student)
    {
        throw new NotImplementedException();
    }

    public async Task<bool> DeleteStudentAsync(Guid studentId)
    {
        if (studentId == Guid.Empty)
        {
            throw new ArgumentException("Student ID cannot be empty.", nameof(studentId));
        }

        var student = _schoolDB.Students.FirstOrDefaultAsync(s => s.StudentID == studentId);

        if (student == null)
        {
            return false;
            throw new KeyNotFoundException($"No student found with ID: {studentId}");
        }

        _schoolDB.Students.Remove(student.Result);

        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<List<Student>> GetAllStudentsAsync()
    {
        var students = await _schoolDB.Students.ToListAsync();

        if (students == null)
        {
            return new List<Student>();
        }
        if (students.Count == 0)
        {
            return new List<Student>();
        }
        return students;
    }

    public async Task<Student> GetStudentByEmailAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            throw new ArgumentException("Email cannot be null or empty.", nameof(email));
        }

        var student = await _schoolDB.Students.FirstOrDefaultAsync(s => s.User.Email == email);
        if (student == null)
        {
            throw new KeyNotFoundException($"No student found with email: {email}");
        }

        return student;
    }

    public async Task<Student> GetStudentByIdAsync(Guid studentId)
    {
        if (studentId == Guid.Empty)
        {
            throw new ArgumentException("Student ID cannot be empty.", nameof(studentId));
        }

        var student = await _schoolDB.Students.FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            throw new KeyNotFoundException($"No student found with ID: {studentId}");
        }
        return student;
    }

    public Task<bool> UpdateStudentAsync(Student student)
    {
        throw new NotImplementedException();
    }
}
