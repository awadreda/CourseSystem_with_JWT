using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseSystemBackEnd.DTOs.StudentDTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace CourseSystemBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {
        private readonly IStudentRepository _studentRepository;
        private readonly ICourseRepository _courseRerepository;

        public StudentController(
            IStudentRepository studentRepository,
            ICourseRepository courseRerepository
        )
        {
            _studentRepository = studentRepository;
            _courseRerepository = courseRerepository;
        }

        [HttpGet("GetAllStudents")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAllStudents()
        {
            var students = await _studentRepository.GetAllStudentsAsync();
            var studentReadDtos = students.Select(s => s.ToStudentReadDTO()).ToList();
            if (students == null || !students.Any())
            {
                return NotFound();
            }
            return Ok(studentReadDtos);
        }

        [HttpGet("GetStudentById/{studentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStudentById(Guid studentId)
        {
            var student = await _studentRepository.GetStudentByIdAsync(studentId);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student.ToStudentReadDTO());
        }

        [HttpGet("GetStudentByEmail/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStudentByEmail(string email)
        {
            var student = await _studentRepository.GetStudentByEmailAsync(email);
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student.ToStudentReadDTO());
        }

        [HttpPost("AddStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> AddStudent([FromBody] StudentCreateDto studentCreateDto)
        {
            var studentEntity = await studentCreateDto.ToStudentFromCreateDTO(_courseRerepository);

            var addedStudent = await _studentRepository.AddStudentAsync(studentEntity);

            if (addedStudent == null)
            {
                return NotFound();
            }

            return Ok(addedStudent.ToStudentReadDTO());
        }

        [HttpPut("UpdateStudent")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateStudent([FromBody] StudentUpdateDto studentUpdateDto)
        {
            var updatedStudent = await _studentRepository.UpdateStudentAsync(
                studentUpdateDto.ToStudentFromUpdateDTO()
            );
            if (updatedStudent == null)
            {
                return NotFound();
            }
            return Ok(updatedStudent.ToStudentReadDTO());
        }

        [HttpPut("AssignCourseToStudentAsync,{studentId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AssignCourseToStudentAsync(Guid studentId, Guid courseId)
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
            var course = await _studentRepository.GetStudentByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (_studentRepository.IsStudentAssignedToCourseAsync(studentId, courseId).Result)
            {
                return BadRequest("Student is already assigned to the course.");
            }
            // Assuming you have a method in the repository to assign a course to a student
            var result = await _studentRepository.AssignCourseToStudentAsync(studentId, courseId);
            if (!result)
            {
                return StatusCode(500, "Failed to assign course to student.");
            }
            return Ok(new { message = "Course assigned to student successfully." });
        }

        [HttpPut("UnassignCourseToStudentAsync,{studentId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UnassignCourseToStudentAsync(Guid studentId, Guid courseId)
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
            var course = await _studentRepository.GetStudentByIdAsync(courseId);
            if (course == null)
            {
                return NotFound("Course not found.");
            }

            if (_studentRepository.IsStudentAssignedToCourseAsync(studentId, courseId).Result)
            {
                return BadRequest("Student is already assigned to the course.");
            }

            // Assuming you have a method in the repository to assign a course to a student
            var result = await _studentRepository.UnassignCourseFromStudentAsync(
                studentId,
                courseId
            );
            if (!result)
            {
                return StatusCode(500, "Failed to assign course to student.");
            }
            return Ok(new { message = "Course Unassigned to student successfully." });
        }

        [HttpDelete("DeleteStudent/{studentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteStudent(Guid studentId)
        {
            var result = await _studentRepository.DeleteStudentAsync(studentId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(new { message = "Student deleted successfully." });
        }
    }
}
