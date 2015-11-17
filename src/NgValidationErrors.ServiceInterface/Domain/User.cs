using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack.DataAnnotations;

namespace NgValidationErrors.ServiceInterface.Domain
{
    public class User
    {
        [PrimaryKey]
        [AutoIncrement]
        public int Id { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        [Index(Clustered = false, Unique = true)]
        public string Email { get; set; }

        public string Password { get; set; }
    }
}
