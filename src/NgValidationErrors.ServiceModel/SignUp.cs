﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using ServiceStack;

namespace NgValidationErrors.ServiceModel
{
    [Route("/signup")]
    public class SignUp : IReturn<SignUpResponse>
    {
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string DisplayName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public string PasswordRepeat { get; set; }

    }
}
