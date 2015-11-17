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
                .WithMessage("Du skal skrive et password");

            RuleFor(s => s.PasswordRepeat)
                .NotEmpty().WithMessage("Du skal skrive din kode igen")
                .Must((dto, pwdRepeat, validator) => dto != null && pwdRepeat != null && pwdRepeat.Equals(dto.Password))
                .WithErrorCode("PasswordMismatch")
                .WithMessage("Dine koder skal være ens");

            RuleFor(s => s.Email)
                .NotEmpty().WithMessage("Du skal angive en email addresse")
                .EmailAddress()
                .WithErrorCode("EmailInvalid")
                .WithMessage("Indtast en gyldig email addresse");
        }
    }
}
