using System;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Testing;
using NgValidationErrors.ServiceModel;
using NgValidationErrors.ServiceInterface;

namespace NgValidationErrors.Tests
{
    [TestFixture]
    public class SignUpServiceTests : UnitTestBase<SignUpService>
    {
        

        [Test]
        public void TestTheSignup()
        {
            var response = Service.Post(new SignUp());
            Assert.That(response, Is.Not.Null);
        }
    }
}
