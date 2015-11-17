using System.Collections.Generic;
using ServiceStack;

namespace NgValidationErrors.ServiceModel
{
    public class ListUsersResponse : IHasResponseStatus
    {
        public List<UserDto> Users { get; set; } 
        public ResponseStatus ResponseStatus { get; set; }
    }

    public class UserDto
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Email { get; set; }
    }
}