namespace CourseSystemBackEnd.Repository;

using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.DTOs.StudentDTOs;
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

    public async Task<bool> AssignCourseToStudentAsync(Guid studentId, Guid courseId)
    {
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            return false;
        }

        var course = await _schoolDB.Courses.FirstOrDefaultAsync(C => C.CourseID == courseId);
        if (course == null)
        {
            return false;
        }

        student.Courses.Add(course);
        _schoolDB.Students.Update(student);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnassignCourseFromStudentAsync(Guid studentId, Guid courseId)
    {
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            return false;
        }
        var course = await _schoolDB.Courses.FirstOrDefaultAsync(C => C.CourseID == courseId);
        if (course == null)
        {
            return false;
        }
        student.Courses.Remove(course);
        _schoolDB.Students.Update(student);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsStudentAssignedToCourseAsync(Guid studentId, Guid courseId)
    {
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            return false;
        }
        return student.Courses.Any(c => c.CourseID == courseId);
    }

    public async Task<bool> IsStudentExistsAsync(Guid StudentId)
    {
        return await _schoolDB.Students.AnyAsync(s => s.StudentID == StudentId);
    }

    //====================Add Student ======================

    public async Task<Student> AddStudentAsync(Student student)
    {
        if (student == null)
        {
            return null!;
        }
        var CreatedUser = student.User;
#pragma warning disable CS8602 // Dereference of a possibly null reference.
        CreatedUser.UserID = Guid.NewGuid();
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        await _schoolDB.Users.AddAsync(CreatedUser);

        student.UserID = CreatedUser.UserID;
        student.User = null!; // Clear the User reference to avoid circular reference issues

        student.StudentID = Guid.NewGuid(); // Ensure a new TeacherID is set
        await _schoolDB.Students.AddAsync(student);
        await _schoolDB.SaveChangesAsync();
        return student;
    }

    //====================Delete Student By Id ======================

    public async Task<bool> DeleteStudentAsync(Guid studentId)
    {
        if (studentId == Guid.Empty)
        {
            throw new ArgumentException("Student ID cannot be empty.", nameof(studentId));
        }

        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);

        if (student == null)
        {
            return false;
        }

        student.Courses.Clear();

        _schoolDB.Students.Remove(student);

        var DeletedUser = student.User;

#pragma warning disable CS8604 // Possible null reference argument.
        _ = _schoolDB.Users.Remove(DeletedUser);
#pragma warning restore CS8604 // Possible null reference argument.

        await _schoolDB.SaveChangesAsync();
        return true;
    }

    //====================Get All Students ======================
    public async Task<List<Student>> GetAllStudentsAsync()
    {
        var students = await _schoolDB
            .Students.Include(s => s.Courses)
            .Include(s => s.User)
            .ToListAsync();

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

    //====================Get Student By Email ======================
    public async Task<Student> GetStudentByEmailAsync(string email)
    {
        if (string.IsNullOrWhiteSpace(email))
        {
            return null!;
        }

#pragma warning disable CS8602 // Dereference of a possibly null reference.
        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .Include(s => s.User)
            .Include(s => s.Courses)
            .FirstOrDefaultAsync(s => s.User.Email == email);
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        if (student == null)
        {
            return null!;
        }

        return student;
    }

    //====================Get Student By Id ======================
    public async Task<Student> GetStudentByIdAsync(Guid studentId)
    {
        if (studentId == Guid.Empty)
        {
            return null!;
        }

        var student = await _schoolDB
            .Students.Include(s => s.Courses)
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);
        if (student == null)
        {
            return null!;
        }
        return student;
    }

    //====================Update Student ======================

    public async Task<Student> UpdateStudentAsync(Student student)
    {
        if (student == null || student.StudentID == Guid.Empty)
        {
            return null!;
        }

        var existingStudent = await _schoolDB
            .Students.Include(s => s.Courses)
            .Include(s => s.User)
            .FirstOrDefaultAsync(s => s.StudentID == student.StudentID);

        if (existingStudent == null)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return null;
#pragma warning restore CS8603 // Possible null reference return.
        }

        var exitUser = existingStudent.User;

#pragma warning disable CS8602 // Dereference of a possibly null reference.
        exitUser.FirstName = student.User.FirstName;
#pragma warning restore CS8602 // Dereference of a possibly null reference.
        exitUser.LastName = student.User.LastName;
        exitUser.Email = student.User.Email;
        exitUser.Password = student.User.Password;
        exitUser.Role = student.User.Role;
        _schoolDB.Users.Update(exitUser);

        existingStudent.GPA = student.GPA;
        _schoolDB.Students.Update(existingStudent);
        await _schoolDB.SaveChangesAsync();
        return existingStudent;
    }

    public async Task<bool> UpdateBasicInfoAsync(StudentUpdateBaiscInfoDto student)
    {
        var studentToUpdate = await _schoolDB
            .Students.Include(s => s.User)
            .FirstOrDefaultAsync(s => s.StudentID == student.StudentID);
        if (studentToUpdate == null)
        {
            return false;
        }

        var existingUser = studentToUpdate.User;

        existingUser.FirstName = student.FirstName;
        existingUser.LastName = student.LastName;
        existingUser.Email = student.Email;
        _schoolDB.Users.Update(existingUser);

        studentToUpdate.GPA = student.GPA;
        _schoolDB.Update(studentToUpdate);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<Student> GetStudentWithAllInfoAndCoursesAndTeachersById(Guid studentId)
    {
        if (!IsStudentExistsAsync(studentId).Result)
        {
            return null;
        }

        var student = await _schoolDB
            .Students.Include(s => s.User)
            .Include(s => s.Courses)
            .ThenInclude(c => c.Teacher).ThenInclude(t => t.User)
            .FirstOrDefaultAsync(s => s.StudentID == studentId);

        if (student == null)
        {
            return null;
        }
        return student;
    }
}
