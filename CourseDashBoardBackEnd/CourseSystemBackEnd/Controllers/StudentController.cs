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

        [HttpGet("GetStudentByIdForUpdate/{studentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStudentByIdForUpdate(Guid studentId)
        {
            if (studentId == Guid.Empty)
            {
                return BadRequest("Invalid student ID.");
            }
            var student = await _studentRepository.GetStudentByIdAsync(studentId);
            if (student == null)
            {
                return NotFound("Student not found.");
            }
            return Ok(student.ToStudentUpdateDTO());
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

        [HttpPut("UpdateStudentBasicInfo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateBasicInfo(
            [FromBody] StudentUpdateBaiscInfoDto studentUpdateBasicInfoDto
        )
        {
            if (studentUpdateBasicInfoDto == null)
            {
                return BadRequest("Student data cannot be null.");
            }

            var result = await _studentRepository.UpdateBasicInfoAsync(studentUpdateBasicInfoDto);
            if (!result)
            {
                return NotFound("Student not found or update failed.");
            }
            return Ok(new { message = "Student basic info updated successfully." });
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

        // for UserINterFace

        [HttpGet("GetStudentWithAllInfoAndCoursesAndTeachersById/{studentId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetStudentWithAllInfoAndCoursesAndTeachersById(
            Guid studentId
        )
        {
            var student = await _studentRepository.GetStudentWithAllInfoAndCoursesAndTeachersById(
                studentId
            );
            if (student == null)
            {
                return NotFound();
            }
            return Ok(student);
        }
    }
}
