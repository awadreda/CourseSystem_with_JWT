using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CourseSystemBackEnd.Services
{
    public interface IPasswordService
    {
        public string HashPassword(string password);

        public bool varifyPassword(string hashedPassword, string providedPassword);
    }
}
