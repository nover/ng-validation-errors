using ServiceStack;

namespace NgValidationErrors.ServiceModel
{
    public class SignUpResponse : IHasResponseStatus
    {
        /// <summary>
        /// Gets or sets the response status.
        /// </summary>
        /// <value>
        /// The response status.
        /// </value>
        public ResponseStatus ResponseStatus { get; set; }
    }
}