using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NgValidationErrors.ServiceInterface;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Testing;

namespace NgValidationErrors.Tests
{
    public abstract class UnitTestBase<T> where T: ServiceStack.Service
    {
        private readonly ServiceStackHost _appHost;

        protected T Service { get; private set; }


        protected UnitTestBase()
        {
            _appHost = new BasicAppHost(typeof(SignUpService).Assembly)
            {
                ConfigureContainer = container =>
                {
                    //Add your IoC dependencies here
                }
            }
            .Init();
        }

        [SetUp]
        public void SetThatStuffUp()
        {
            Service = _appHost.Container.Resolve<T>();
        }


        [TestFixtureTearDown]
        public void TestFixtureTearDown()
        {
            _appHost.Dispose();
        }
    }
}
