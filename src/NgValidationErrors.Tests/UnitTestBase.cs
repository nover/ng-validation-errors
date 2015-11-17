using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NgValidationErrors.ServiceInterface;
using NgValidationErrors.ServiceInterface.Domain;
using NUnit.Framework;
using ServiceStack;
using ServiceStack.Data;
using ServiceStack.OrmLite;
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
                    container.Register<IDbConnectionFactory>(c =>
                        new OrmLiteConnectionFactory(":memory:", SqliteDialect.Provider)); //InMemory Sqlite DB


                    using (var db = container.Resolve<IDbConnectionFactory>().Open())
                    {
                        db.CreateTable<User>();
                    }
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
