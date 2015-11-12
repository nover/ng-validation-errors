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
            RuleFor(s => s.FirstName)
                .NotEmpty()
                .WithErrorCode("FirstNameEmpty");

            RuleFor(s => s.LastName)
                .NotEmpty()
                .WithErrorCode("LastNameEmpty");

            RuleFor(s => s.Password)
                .Must((dto, password, validator) => password.Equals(dto.PasswordRepeat))
                .WithErrorCode("PasswordMismatch")
                .WithMessage("Passwords should match");

            RuleFor(s => s.Email)
                .EmailAddress()
                .WithErrorCode("EmailInvalid")
                .WithMessage("Invalid email");
        }
    }
}
