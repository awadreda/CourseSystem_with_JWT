using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Interfaces;
using CourseSystemBackEnd.Mappers;
using CourseSystemBackEnd.Models;
using Microsoft.AspNetCore.Mvc;

namespace CourseSystemBackEnd.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _userRepository;

        public UserController(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        [HttpGet("GetAllUsers")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = await _userRepository.GetAllUsersAsync();
            if (users == null || users.Count == 0)
            {
                return NotFound("No users found.");
            }

            var userDtos = users.Select(u => u.toUserReadDTO()).ToList();
            return Ok(userDtos);
        }

        [HttpGet("GetUserById/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetUserById(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Invalid user ID.");
            }
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user.toUserReadDTO());
        }

        [HttpGet("GetUserByIdForUpdate/{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GetUserByIdForUpdate(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Invalid user ID.");
            }
            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user.toUserUpdateDTO());
        }

        [HttpGet("GetUserByEmail/{email}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> GerUserbyEmail(string email)
        {
            if (string.IsNullOrEmpty(email))
            {
                return BadRequest("Email cannot be null or empty.");
            }
            var user = await _userRepository.GetUserByEmailAsync(email);
            if (user == null)
            {
                return NotFound("User not found.");
            }
            return Ok(user.toUserReadDTO());
        }

        [HttpPost("CreateUser")]
        [ProducesResponseType(StatusCodes.Status201Created)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> CreateUser([FromBody] UserCreateDTO userdDto)
        {
            if (userdDto == null)
            {
                return BadRequest("User cannot be null.");
            }

            if (string.IsNullOrEmpty(userdDto.Email) || string.IsNullOrEmpty(userdDto.Password))
            {
                return BadRequest("Email and Password are required.");
            }
            if (await _userRepository.GetUserByEmailAsync(userdDto.Email) != null)
            {
                return BadRequest("User with this email already exists.");
            }
            // Ensure the user has a unique ID
            var userCreated = await _userRepository.CreateUserAsync(userdDto.toUserFromCreateDTO());
            if (userCreated == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error creating user.");
            }
            return CreatedAtAction(
                nameof(GetUserById),
                new { userId = userCreated.UserID },
                userCreated.toUserReadDTO()
            );
        }

        ///============UpdateUser
        [HttpPut("UpdateUser")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateUser([FromBody] UserUpdateDTO userUpdateDTO)
        {
            if (userUpdateDTO == null || userUpdateDTO.UserID == Guid.Empty)
            {
                return BadRequest("User cannot be null and must have a valid ID.");
            }

            var existingUser = await _userRepository.GetUserByIdAsync(userUpdateDTO.UserID);
            if (existingUser == null)
            {
                return NotFound("User not found.");
            }

            var updatedUser = await _userRepository.UpdateUserAsync(
                userUpdateDTO.toUserFromUpdateDTO()
            );
            if (updatedUser == null)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error updating user.");
            }
            return Ok(updatedUser.toUserReadDTO());
        }

        [HttpPut("UpdateUserBasicInfo")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> UpdateUserBasicInfo(
            [FromBody] UserReadDTO userUpdateBasicInfoDTO
        )
        {
            if (userUpdateBasicInfoDTO == null || userUpdateBasicInfoDTO.UserID == Guid.Empty)
            {
                return BadRequest("User cannot be null and must have a valid ID.");
            }

            if (_userRepository.UserExistsById(userUpdateBasicInfoDTO.UserID).Result == false)
            {
                return NotFound("User not found.");
            }

            bool result = await _userRepository.UpdateBaskInfoAsync(userUpdateBasicInfoDTO);
            if (!result)
            {
                return StatusCode(
                    StatusCodes.Status500InternalServerError,
                    "Error updating user basic info."
                );
            }
            return Ok(userUpdateBasicInfoDTO);
        }

        [HttpDelete("DeleteUser/{userId}")]
        [ProducesResponseType(StatusCodes.Status204NoContent)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        public async Task<IActionResult> DeleteUserByID(Guid userId)
        {
            if (userId == Guid.Empty)
            {
                return BadRequest("Invalid user ID.");
            }

            var user = await _userRepository.GetUserByIdAsync(userId);
            if (user == null)
            {
                return NotFound("User not found.");
            }

            bool result = await _userRepository.DeleteUserAsync(userId);

            if (!result)
            {
                return StatusCode(StatusCodes.Status500InternalServerError, "Error deleting user.");
            }
            return Ok("User deleted successfully.");
        }
    }
}
