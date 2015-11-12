using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NgValidationErrors.ServiceModel;
using ServiceStack.FluentValidation;

namespace NgValidationErrors.ServiceInterface.Validation
{
    public class SignUpValidator : AbstractValidator<SignUp>
    {
        public SignUpValidator()
        {
           
        }
    }
}
