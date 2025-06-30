using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseSystemBackEnd.DTOs.TeacherDTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Mappers;
using CourseSystemBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseSystemBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherController : ControllerBase
    {
        private readonly ITeacherRepository _teacherRepository;

        public TeacherController(ITeacherRepository teacherRepository)
        {
            _teacherRepository = teacherRepository;
        }

        [HttpGet("GetTeacherByID,{teacherId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTeacherByID(Guid teacherId)
        {
            var teacher = await _teacherRepository.GetTeacherByIdAsync(teacherId);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher.ToTeacherReadDTO());
        }

        [HttpGet("GetTeacherByEmail,{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetTeacherByEmail(string email)
        {
            var teacher = await _teacherRepository.GetTeacherByEmailAsync(email);
            if (teacher == null)
            {
                return NotFound();
            }
            return Ok(teacher.ToTeacherReadDTO());
        }

        [HttpGet("GetAllTeachers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAllTeachers()
        {
            var teachers = await _teacherRepository.GetAllTeachersAsync();
            if (teachers == null || !teachers.Any())
            {
                return NotFound();
            }

            var teacherDtos = teachers.Select(t => t.ToTeacherReadDTO()).ToList();
            return Ok(teachers);
        }

        [HttpPost("CreateTeacher")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> CreateTeacher([FromBody] TeacherCreateDTO teacherCreateDTO)
        {
            if (teacherCreateDTO == null)
            {
                return BadRequest("Teacher data is null.");
            }
            var CreateTeacher = await _teacherRepository.CreateTeacherAsync(
                teacherCreateDTO.ToTeacherFromCreateDTO()
            );
            if (CreateTeacher == null)
            {
                return BadRequest("Failed to create teacher.");
            }
            return CreatedAtAction(
                nameof(GetTeacherByID),
                new { teacherId = CreateTeacher.TeacherID },
                CreateTeacher.ToTeacherReadDTO()
            );
        }

        [HttpPut("UpdateTeacher")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> UpdateTeacher(
            [FromBody] TeacherUpdateDTO teacherUpdateDTO,
            Guid teacherId
        )
        {
            if (teacherUpdateDTO == null)
            {
                return BadRequest("Teacher data is null.");
            }

            var existingTeacher = await _teacherRepository.GetTeacherByIdAsync(teacherId);
            if (existingTeacher == null)
            {
                return NotFound("Teacher not found.");
            }

            var TeacherFromUPdatedDTO = teacherUpdateDTO.ToTeacherFromUpdateDTO();
            TeacherFromUPdatedDTO.TeacherID = teacherId;
            var updatedTeacher = await _teacherRepository.UpdateTeacherAsync(TeacherFromUPdatedDTO);
            Console.WriteLine(updatedTeacher);
            if (updatedTeacher == null)
            {
                return BadRequest("Failed to update teacher.");
            }
            return Ok(updatedTeacher.ToTeacherReadDTO());
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
            var course = await _teacherRepository.GetTeacherByIdAsync(courseId);
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

        [HttpPut("AssignCourseToTeacherAsync,{teacherId},{courseId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> AssignCourseToTeacherAsync(Guid teacherId, Guid courseId)
        {
            var result = await _teacherRepository.AssignCourseToTeacherAsync(teacherId, courseId);
            if (!result)
            {
                return NotFound("Teacher or Course not found.");
            }
            return Ok(new { message = "Course assigned to teacher successfully." });
        }

        [HttpDelete("DeleteTeacher,{teacherId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<IActionResult> DeleteTeacher(Guid teacherId)
        {
            var result = await _teacherRepository.DeleteTeacherAsync(teacherId);
            if (!result)
            {
                return NotFound();
            }
            return Ok(new { message = "Teacher deleted successfully." });
        }
    }
}
