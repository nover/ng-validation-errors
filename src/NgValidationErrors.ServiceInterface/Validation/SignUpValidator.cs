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
                .WithErrorCode("FirstNameEmpty")
                .WithMessage("Du skal skrive et fornavn");

            RuleFor(s => s.LastName)
                .NotEmpty()
                .WithErrorCode("LastNameEmpty")
                .WithMessage("Du skal skrive et efternavn");

            RuleFor(s => s.Password)
                .NotEmpty()
                .Must((dto, password, validator) => dto != null && password != null && password.Equals(dto.PasswordRepeat))
                .WithErrorCode("PasswordMismatch")
                .WithMessage("Passwords should match");

            RuleFor(s => s.Email)
                .EmailAddress()
                .WithErrorCode("EmailInvalid")
                .WithMessage("Invalid email");
        }
    }
}
