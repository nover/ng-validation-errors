using ServiceStack;

namespace NgValidationErrors.ServiceInterface
{
    [FallbackRoute("/{PathInfo*}")]
    public class FallbackForClientRoutes
    {
        public string PathInfo { get; set; }
    }
}