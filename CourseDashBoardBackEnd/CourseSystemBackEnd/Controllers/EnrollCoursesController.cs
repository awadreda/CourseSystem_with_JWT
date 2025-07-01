using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseSystemBackEnd.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace CourseSystemBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnrollCoursesController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        private readonly IStudentRepository _studentRepository;

        private readonly ITeacherRepository _teacherRepository;

        public EnrollCoursesController(
            ICourseRepository courseRepository,
            IStudentRepository studentRepository,
            ITeacherRepository teacherRepository
        )
        {
            _courseRepository = courseRepository;
            _studentRepository = studentRepository;
            _teacherRepository = teacherRepository;
        }

        [HttpPut("AssignCourseToTeacher,{teacherId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AssignCourseToTeacher(Guid teacherId, Guid courseId)
        {
            var teacher = await _teacherRepository.GetTeacherByIdAsync(teacherId);
            if (teacher == null)
            {
                return NotFound("Teacher not found.");
            }
            if (courseId == Guid.Empty)
            {
                return BadRequest("Invalid course ID.");
            }
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (_teacherRepository.IsTeacherAssignedToCourseAsync(teacherId, courseId).Result)
            {
                return BadRequest("Teacher is already assigned to the course.");
            }
            // Assuming you have a method in the repository to assign a course to a teacher
            var result = await _teacherRepository.AssignCourseToTeacherAsync(teacherId, courseId);
            if (!result)
            {
                return NotFound("Teacher or Course not found.");
            }
            return Ok(new { message = "Course assigned to teacher successfully." });
        }

        [HttpPut("UnassignCourseToTeacherAsync,{teacherId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UnassignCourseToTeacherAsync(Guid teacherId, Guid courseId)
        {
            var teacher = await _teacherRepository.GetTeacherByIdAsync(teacherId);
            if (teacher == null)
            {
                return NotFound("Teacher not found.");
            }
            if (courseId == Guid.Empty)
            {
                return BadRequest("Invalid course ID.");
            }
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (!_teacherRepository.IsTeacherAssignedToCourseAsync(teacherId, courseId).Result)
            {
                return BadRequest("Teacher is not assigned to the course.");
            }
            // Assuming you have a method in the repository to assign a course to a teacher
            var result = await _teacherRepository.UnassignCourseFromTeacherAsync(
                teacherId,
                courseId
            );
            if (!result)
            {
                return NotFound("Teacher or Course not found.");
            }
            return Ok(new { message = "Course Unassigned to teacher successfully." });
        }

        [HttpPut("EnrollStudentInCourseAsync,{studentId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EnrollStudentInCourseAsync(Guid studentId, Guid courseId)
        {
            var student = await _studentRepository.GetStudentByIdAsync(studentId);
            if (student == null)
            {
                return NotFound("Student not found.");
            }
            if (courseId == Guid.Empty)
            {
                return BadRequest("Invalid course ID.");
            }
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (_courseRepository.IsStudentEnrolledInCourseAsync(studentId, courseId).Result)
            {
                return BadRequest("Student is already enrolled in the course.");
            }

            // Assuming you have a method in the repository to assign a course to a student
            var result = await _courseRepository.EnrollStudentInCourseAsync(courseId, studentId);
            if (!result)
            {
                return BadRequest("Failed to enroll student in course.");
            }
            return Ok(new { message = "Student enrolled in course successfully." });
        }

        [HttpPut("UnenrollStudentInCourseAsync,{studentId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UnenrollStudentInCourseAsync(Guid studentId, Guid courseId)
        {
            var student = await _studentRepository.GetStudentByIdAsync(studentId);
            if (student == null)
            {
                return NotFound("Student not found.");
            }
            if (courseId == Guid.Empty)
            {
                return BadRequest("Invalid course ID.");
            }
            var course = await _courseRepository.GetCourseByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (!_courseRepository.IsStudentEnrolledInCourseAsync(studentId, courseId).Result)
            {
                return BadRequest("Student is not enrolled in the course.");
            }

            // Assuming you have a method in the repository to assign a course to a student
            var result = await _courseRepository.UnenrollStudentFromCourseAsync(
                courseId,
                studentId
            );
            if (!result)
            {
                return BadRequest("Failed to unenroll student from course.");
            }
            return Ok(new { message = "Student unenrolled from course successfully." });
        }
    }
}
