using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourseSystemBackEnd.Models;

public class Teacher
{
    [Key]
    public Guid TeacherID { get; set; } = Guid.NewGuid();

    public Guid UserID { get; set; }

    [ForeignKey(nameof(UserID))]
    public required User User { get; set; }

    public ICollection<Course> Courses { get; set; } = new List<Course>();
}
