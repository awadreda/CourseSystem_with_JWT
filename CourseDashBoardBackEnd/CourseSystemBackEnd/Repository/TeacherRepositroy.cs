using CourseSystemBackEnd.Data;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Models;
using Microsoft.EntityFrameworkCore;

namespace CourseSystemBackEnd.Repository;

public class TeacherRepository : ITeacherRepository
{
    private readonly SchoolDBContext _schoolDB;

    public TeacherRepository(SchoolDBContext schoolDB)
    {
        _schoolDB = schoolDB;
    }

    public async Task<bool> AssignCourseToTeacherAsync(Guid teacherId, Guid courseId)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.Courses)
            .FirstOrDefaultAsync(t => t.TeacherID == teacherId);
        if (teacher == null)
        {
            return false;
        }

        var course = await _schoolDB.Courses.FirstOrDefaultAsync(C => C.CourseID == courseId);
        if (course == null)
        {
            return false;
        }

        teacher.Courses.Add(course);
        _schoolDB.Teachers.Update(teacher);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<bool> UnassignCourseFromTeacherAsync(Guid teacherId, Guid courseId)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.Courses)
            .FirstOrDefaultAsync(t => t.TeacherID == teacherId);
        if (teacher == null)
        {
            return false;
        }
        var course = await _schoolDB.Courses.FirstOrDefaultAsync(C => C.CourseID == courseId);
        if (course == null)
        {
            return false;
        }
        teacher.Courses.Remove(course);
        _schoolDB.Teachers.Update(teacher);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<bool> IsTeacherAssignedToCourseAsync(Guid teacherId, Guid courseId)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.Courses)
            .FirstOrDefaultAsync(t => t.TeacherID == teacherId);
        if (teacher == null)
        {
            return false;
        }
        return teacher.Courses.Any(c => c.CourseID == courseId);
    }

    public async Task<bool> IsTeacherExistsAsync(Guid teacherId)
    {
        return await _schoolDB.Teachers.AnyAsync(t => t.TeacherID == teacherId);
    }

    public async Task<Teacher> CreateTeacherAsync(Teacher teacher)
    {
        if (teacher == null)
        {
            return null!;
        }
        var CreatedUser = teacher.User;
        CreatedUser.UserID = Guid.NewGuid();
        await _schoolDB.Users.AddAsync(CreatedUser);

        teacher.UserID = CreatedUser.UserID;
        teacher.User = null!; // Clear the User reference to avoid circular reference issues

        teacher.TeacherID = Guid.NewGuid(); // Ensure a new TeacherID is set
        await _schoolDB.Teachers.AddAsync(teacher);
        await _schoolDB.SaveChangesAsync();
        return teacher;
    }

    public async Task<bool> DeleteTeacherAsync(Guid teacherId)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.User)
            .FirstOrDefaultAsync(t => t.TeacherID == teacherId);

        if (teacher == null)
        {
            return false;
        }
        var userTODELete = teacher.User;
        _schoolDB.Teachers.Remove(teacher);

        _schoolDB.Users.Remove(userTODELete);
        await _schoolDB.SaveChangesAsync();
        return true;
    }

    public async Task<List<Teacher>> GetAllTeachersAsync()
    {
        var teachers = await _schoolDB
            .Teachers.Include(t => t.User)
            .Include(t => t.Courses)
            .ToListAsync();

        return teachers;
    }

    public async Task<Teacher> GetTeacherByEmailAsync(string email)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.User)
            .Include(t => t.Courses)
            .FirstOrDefaultAsync(t => t.User.Email == email);
        if (teacher == null)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return null;
#pragma warning restore CS8603 // Possible null reference return.
        }
        return teacher;
    }

    public async Task<Teacher> GetTeacherByIdAsync(Guid teacherId)
    {
        var teacher = await _schoolDB
            .Teachers.Include(t => t.User)
            .Include(t => t.Courses)
            .FirstOrDefaultAsync(t => t.TeacherID == teacherId);
#pragma warning disable CS8603 // Possible null reference return.
        return teacher;
#pragma warning restore CS8603 // Possible null reference return.
    }

    public async Task<Teacher> UpdateTeacherAsync(Teacher teacher)
    {
        // Ensure the UserID is set correctly
        var existingTeacher = await _schoolDB
            .Teachers.Include(t => t.User)
            .FirstOrDefaultAsync(t => t.TeacherID == teacher.TeacherID);
        if (existingTeacher == null)
        {
#pragma warning disable CS8603 // Possible null reference return.
            return null;
#pragma warning restore CS8603 // Possible null reference return.
        }

        // Users
        var existingUser = await _schoolDB.Users.FirstOrDefaultAsync(u =>
            u.UserID == existingTeacher.UserID
        );
        if (existingUser == null)
        {
            // If the user does not exist, we cannot update the teacher
#pragma warning disable CS8603 // Possible null reference return.
            return null;

#pragma warning restore CS8603 // Possible null reference return.
        }
        existingUser.FirstName = teacher.User.FirstName;
        existingUser.LastName = teacher.User.LastName;
        existingUser.Email = teacher.User.Email;
        existingUser.Role = teacher.User.Role;
        _schoolDB.Update(existingUser);
        //UpdateTeacher

        existingTeacher.UserID = existingUser.UserID;
        existingTeacher.User = existingUser;
        existingTeacher.Courses = teacher.Courses;
        _schoolDB.Update(existingTeacher);
        await _schoolDB.SaveChangesAsync();
        return existingTeacher;
    }
}
