using System.ComponentModel.DataAnnotations;

namespace BloodLineAPI.Model
{
    public class UserModel : IValidatableObject
    {
        public int? UserID { get; set; }
        public string Action { get; set; }
        public string FullName { get; set; }
        public string Email { get; set; }
        public string PasswordHash { get; set; }
        public string PhoneNumber { get; set; }
        public string? Gender { get; set; }
        public DateTime? DateOfBirth { get; set; }
        public string? BloodGroup { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string District { get; set; }
        public string State { get; set; }
        public string Pincode { get; set; }
        public string Role { get; set; }
        public bool? IsActive { get; set; }

        public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
        {
            if (!string.Equals(Role, "BloodBank", StringComparison.OrdinalIgnoreCase))
            {
                if (string.IsNullOrWhiteSpace(Gender))
                {
                    yield return new ValidationResult("The Gender field is required.", new[] { nameof(Gender) });
                }

                if (string.IsNullOrWhiteSpace(BloodGroup))
                {
                    yield return new ValidationResult("The BloodGroup field is required.", new[] { nameof(BloodGroup) });
                }

                if (!DateOfBirth.HasValue)
                {
                    yield return new ValidationResult("The DateOfBirth field is required.", new[] { nameof(DateOfBirth) });
                }
            }
        }
    }
}
