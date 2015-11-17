using NgValidationErrors.ServiceInterface;
using ServiceStack;

namespace NgValidationErrors.ServiceModel
{
    [Route("/userList")]
    public class ListUsers : IReturn<ListUsersResponse>
    {
    }
}