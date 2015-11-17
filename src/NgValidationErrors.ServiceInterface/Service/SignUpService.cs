using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using NgValidationErrors.ServiceInterface.Domain;
using ServiceStack;
using NgValidationErrors.ServiceModel;
using ServiceStack.OrmLite;

namespace NgValidationErrors.ServiceInterface
{
    public class SignUpService : Service
    {
        public object Post(SignUp request)
        {
            var newUser = request.ConvertTo<User>();
            newUser.Id =(int)Db.Insert(newUser);
            return newUser.ConvertTo<SignUpResponse>();
        }

        public object Get(ListUsers request)
        {
            var users = Db.Select<User>();

            return new ListUsersResponse
            {
                Users = users.ConvertAll(u => new UserDto
                {
                    Id = u.Id,
                    Name = $"{u.FirstName} {u.LastName}",
                    Email =  u.Email
                })
            };
        }
    }
}