namespace CourseSystemBackEnd.Data;

using CourseSystemBackEnd.Models;
using Microsoft.EntityFrameworkCore;

public class SchoolDBContext : DbContext
{
    public SchoolDBContext(DbContextOptions<SchoolDBContext> options)
        : base(options) { }

    public DbSet<User> Users { get; set; } = null!;
    public DbSet<Student> Students { get; set; } = null!;
    public DbSet<Teacher> Teachers { get; set; } = null!;
    public DbSet<Course> Courses { get; set; } = null!;

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<User>().HasKey(u => u.UserID);

        builder
            .Entity<User>()
            .HasOne(u => u.student)
            .WithOne(s => s.User)
            .HasForeignKey<Student>(s => s.UserID)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<User>()
            .HasOne(u => u.teacher)
            .WithOne(t => t.User)
            .HasForeignKey<Teacher>(t => t.UserID)
            .OnDelete(DeleteBehavior.NoAction);

        builder
            .Entity<Course>()
            .HasMany(c => c.Students)
            .WithMany(s => s.Courses)
            .UsingEntity<Dictionary<string, object>>(
                "CourseStudent", // اسم الجدول الوسيط
                j =>
                    j.HasOne<Student>()
                        .WithMany()
                        .HasForeignKey("StudentsStudentID")
                        .OnDelete(DeleteBehavior.NoAction),
                j =>
                    j.HasOne<Course>()
                        .WithMany()
                        .HasForeignKey("CoursesCourseID")
                        .OnDelete(DeleteBehavior.NoAction)
            );
    }
}
