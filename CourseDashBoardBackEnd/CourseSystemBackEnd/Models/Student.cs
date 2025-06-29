using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourseSystemBackEnd.Models;

public class Student
{
    [Key]
    public Guid StudentID { get; set; }

    [Range(0.0, 4.0)]
    public double GPA { get; set; }

    public Guid UserID { get; set; }

    [ForeignKey(nameof(UserID))]
    public User? User { get; set; }
    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
