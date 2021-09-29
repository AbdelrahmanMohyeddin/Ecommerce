using Core.Entities.Identity;
using System.Collections.Generic;

namespace API.Dtos
{
    public class UserDto
    {
        public string Email { get; set; }
        public string DisplayName { get; set; }
        public string Token { get; set; }
        public IList<string> Role { get; set; }
    }
}