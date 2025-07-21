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
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepositroy _authRepositroy;

        private readonly IUserRepository _userRepository;

        public AuthController(IAuthRepositroy authRepositroy, IUserRepository userRepository)
        {
            _authRepositroy = authRepositroy;
            _userRepository = userRepository;
        }

        [HttpPost("Login")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<TokenResponseDto>> Login(UserLoginDTO userLoginDTO)
        {
            var result = await _authRepositroy.Login(userLoginDTO.Email, userLoginDTO.Password);

            if (result is null)
            {
                return Unauthorized("Invalid email or password.");
            }

            return Ok(result);
        }

        [HttpPost("Register")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        [ProducesResponseType(StatusCodes.Status401Unauthorized)]
        [ProducesResponseType(StatusCodes.Status500InternalServerError)]
        public async Task<ActionResult<UserReadDTO>> Register(UserRegisterDTo userRegisterDTo)
        {
            if (await _userRepository.UserExistsByEmail(userRegisterDTo.Email))
            {
                return BadRequest("User Email already exists.");
            }
            var result = await _authRepositroy.Register(userRegisterDTo, userRegisterDTo.Password);

            if (result is null)
            {
                return BadRequest("Bad Request.");
            }

            return Ok(result.toUserReadDTO());
        }
    }
}
