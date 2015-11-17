using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NgValidationErrors.ServiceInterface.Validation;
using NgValidationErrors.ServiceModel;
using NUnit.Framework;

namespace NgValidationErrors.Tests
{
    [TestFixture]
    public class SignUpValidatorTest
    {
        private SignUpValidator _validator;

        [SetUp]
        public void SetTestUp()
        {
            _validator = new SignUpValidator();
        }

        [Test]
        public void TestPasswordMismatch()
        {
            var res = _validator.Validate(new SignUp
            {
                DisplayName = "xx",
                Email = "a@b.dk",
                FirstName = "xx",
                LastName = "xx",
                Password = "one",
                PasswordRepeat = "two"
            });

            Assert.That(res.IsValid, Is.False, "Validation shuold not pass");
            Assert.That(res.Errors.Count, Is.EqualTo(1), "Only one error was expected");
            var err = res.Errors.First();

            Assert.That(err.PropertyName, Is.EqualTo("Password"));
            Assert.That(err.ErrorCode, Is.EqualTo("PasswordMismatch"));
        }

        [Test]
        public void TestEmailRules()
        {
            var res = _validator.Validate(new SignUp
            {
                DisplayName = "xx",
                Email = "invalid@email",
                FirstName = "xx",
                LastName = "xx",
                Password = "one",
                PasswordRepeat = "one"
            });

            Assert.That(res.IsValid, Is.False);
            Assert.That(res.Errors.Count, Is.EqualTo(1), "Only one error was expected");
            var err = res.Errors.First();

            Assert.That(err.PropertyName, Is.EqualTo("Email"));
            Assert.That(err.ErrorCode, Is.EqualTo("EmailInvalid"));
        }

        [Test]
        public void TestNameRules()
        {
            var res = _validator.Validate(new SignUp
            {
                DisplayName = "xx",
                Email = "a@b.dk",
                FirstName = "",
                LastName = "",
                Password = "one",
                PasswordRepeat = "one"
            });

            Assert.That(res.IsValid, Is.False, "Validation shuold not pass");
            Assert.That(res.Errors.Count, Is.EqualTo(2), "Two errors expected");
            var err = res.Errors[0];
            Assert.That(err.PropertyName, Is.EqualTo("FirstName"));
            Assert.That(err.ErrorCode, Is.EqualTo("FirstNameEmpty"));
            err = res.Errors[1];
            Assert.That(err.PropertyName, Is.EqualTo("LastName"));
            Assert.That(err.ErrorCode, Is.EqualTo("LastNameEmpty"));
        }

        [Test]
        public void TestWithNullPwd()
        {
            var res = _validator.Validate(new SignUp
            {
                DisplayName = "xx",
                Email = "a@b.dk",
                FirstName = "xx",
                LastName = "xx",
                Password = null,
                PasswordRepeat = "two"
            });

            Assert.That(res.IsValid, Is.False, "Validation shuold not pass");
            Assert.That(res.Errors.Count, Is.EqualTo(1));
        }

        [Test]
        public void TestWithNullPwdRepeat()
        {
            var res = _validator.Validate(new SignUp
            {
                DisplayName = "xx",
                Email = "a@b.dk",
                FirstName = "xx",
                LastName = "xx",
                Password = "one",
                PasswordRepeat = null
            });

            Assert.That(res.IsValid, Is.False, "Validation shuold not pass");
            Assert.That(res.Errors.Count, Is.EqualTo(2));
        }
    }
}
