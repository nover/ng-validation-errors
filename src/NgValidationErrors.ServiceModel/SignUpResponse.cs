using ServiceStack;

namespace NgValidationErrors.ServiceModel
{
    public class SignUpResponse : IHasResponseStatus
    {
        /// <summary>
        /// Gets or sets the identifier of the newly created user.
        /// </summary>
        /// <value>
        /// The identifier.
        /// </value>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the response status.
        /// </summary>
        /// <value>
        /// The response status.
        /// </value>
        public ResponseStatus ResponseStatus { get; set; }
    }
}