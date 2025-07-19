using CourseSystemBackEnd.DTOs;
using CourseSystemBackEnd.Models;

namespace CourseSystemBackEnd.Mappers;

public static class UserMapper
{
    public static UserReadDTO toUserReadDTO(this User user)
    {
        return new UserReadDTO
        {
            UserID = user.UserID,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Role = user.Role,
        };
    }

    public static UserCreateDTO toUserCreateDTO(this User user)
    {
        return new UserCreateDTO
        {
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password = user.Password,
            Role = user.Role,
        };
    }

    public static UserUpdateDTO toUserUpdateDTO(this User user)
    {
        return new UserUpdateDTO
        {
            UserID = user.UserID,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Email = user.Email,
            Password = user.Password, // Optional, can be null
            Role = user.Role,
        };
    }

    public static User toUserFromCreateDTO(this UserCreateDTO userCreateDTO)
    {
        return new User
        {
            FirstName = userCreateDTO.FirstName,
            LastName = userCreateDTO.LastName,
            Email = userCreateDTO.Email,
            Password = userCreateDTO.Password,
            Role = userCreateDTO.Role,
        };
    }

    public static User toUserFromUpdateDTO(this UserUpdateDTO userUpdateDTO)
    {
        return new User
        {
            UserID = userUpdateDTO.UserID,
            FirstName = userUpdateDTO.FirstName,
            LastName = userUpdateDTO.LastName,
            Email = userUpdateDTO.Email,
            Password = userUpdateDTO.Password, // Optional, can be null
            Role = userUpdateDTO.Role,
        };
    }

    public static User toUserFromReadDTO(this UserReadDTO userReadDTO)
    {
        return new User
        {
            UserID = userReadDTO.UserID,
            FirstName = userReadDTO.FirstName,
            LastName = userReadDTO.LastName,
            Email = userReadDTO.Email,
            Role = userReadDTO.Role,
        };
    }
}
