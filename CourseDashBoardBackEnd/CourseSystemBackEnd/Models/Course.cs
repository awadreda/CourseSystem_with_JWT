using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace CourseSystemBackEnd.Models;

public class Course
{
    [Key]
    public Guid CourseID { get; set; }

    [Required, MinLength(2), MaxLength(100)]
    public string Title { get; set; } = string.Empty;

    [Required, MinLength(10), MaxLength(500)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public int Credits { get; set; }

    [ForeignKey("TeacherID")]
    public Guid? TeacherID { get; set; }

    // Navigation propertiesa
    public Teacher? Teacher { get; set; }

    public ICollection<Student> Students { get; set; } = new List<Student>();
}
