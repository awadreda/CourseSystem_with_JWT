using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Mappers;
using Microsoft.AspNetCore.Mvc;

namespace CourseSystemBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CourseController : ControllerBase
    {
        private readonly ICourseRepository _courseRepository;

        public CourseController(ICourseRepository courseRepository)
        {
            _courseRepository = courseRepository;
        }

        [HttpGet("GetAllCourses")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetAllCourses()
        {
            var courses = await _courseRepository.GetAllCoursesAsync();

            var courseDtos = courses.Select(c => c.ToCourseReadDTO()).ToList();
            if (courses == null || !courses.Any())
            {
                return NotFound();
            }
            return Ok(courseDtos);
        }

        [HttpGet("GetCourseById/{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCousesById(Guid courseId)
        {
            var Course = await _courseRepository.GetCourseByIdAsync(courseId);

            if (Course == null)
            {
                return NotFound();
            }

            return Ok(Course.ToCourseReadDTO());
        }

        [HttpGet("GetCoursesByInstructorIdAsync/{instructorId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByInstructorIdAsync(Guid instructorId)
        {
            var courses = await _courseRepository.GetCoursesByInstructorIdAsync(instructorId);
            if (courses == null || !courses.Any())
            {
                return NotFound();
            }
            var courseDtos = courses.Select(c => c.ToCourseReadDTO()).ToList();
            return Ok(courseDtos);
        }

        [HttpGet("GetCoursesByStudentIdAsync/{studentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> GetCoursesByStudentIdAsync(Guid studentId)
        {
            var courses = await _courseRepository.GetCoursesByStudentIdAsync(studentId);
            if (courses == null || !courses.Any())
            {
                return NotFound();
            }
            var courseDtos = courses.Select(c => c.ToCourseReadDTO()).ToList();
            return Ok(courseDtos);
        }

        [HttpPost("CreateCourse")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateCourse([FromBody] CourseCreateDTO courseCreateDTO)
        {
            if (courseCreateDTO == null)
            {
                return BadRequest("Course data is null.");
            }
            var CreateCourse = await _courseRepository.AddCourseAsync(
                courseCreateDTO.ToCourseFromCreateDTO()
            );
            if (CreateCourse == null)
            {
                return BadRequest("Failed to create course.");
            }
            return CreatedAtAction(
                nameof(GetCousesById),
                new { courseId = CreateCourse.CourseID },
                CreateCourse.ToCourseReadDTO()
            );
        }

        [HttpPut("UpdateCourse")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateCourse([FromBody] CourseUpdateDTO courseUpdateDTO)
        {
            if (courseUpdateDTO == null)
            {
                return BadRequest("Course data is null.");
            }
            var CourseFromUPdatedDTO = courseUpdateDTO.ToCourseFromUpdateDTO();
            var updatedCourse = await _courseRepository.UpdateCourseAsync(CourseFromUPdatedDTO);
            if (updatedCourse == null)
            {
                return BadRequest("Failed to update course.");
            }
            return Ok(updatedCourse.ToCourseReadDTO());
        }

        [HttpPut("EnrollStudentInCourseAsync,{studentId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> EnrollStudentInCourseAsync(Guid studentId, Guid courseId)
        {
            var student = await _courseRepository.GetCourseByIdAsync(studentId);
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
            var result = await _courseRepository.EnrollStudentInCourseAsync(studentId, courseId);
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
            var student = await _courseRepository.GetCourseByIdAsync(studentId);
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
                studentId,
                courseId
            );
            if (!result)
            {
                return BadRequest("Failed to unenroll student from course.");
            }
            return Ok(new { message = "Student unenrolled from course successfully." });
        }

        [HttpDelete("DeleteCourse/{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteCourse(Guid courseId)
        {
            var result = await _courseRepository.DeleteCourseAsync(courseId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(new { message = "Course deleted successfully." });
        }
    }
}
