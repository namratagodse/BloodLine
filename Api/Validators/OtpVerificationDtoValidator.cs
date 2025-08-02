using FluentValidation;
using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Validators
{
    public class OtpVerificationDtoValidator : AbstractValidator<OtpVerificationDto>
    {
        public OtpVerificationDtoValidator()
        {
            RuleFor(x => x.Email)
                .NotEmpty().WithMessage("Email is required.")
                .EmailAddress().WithMessage("A valid email is required.");

            RuleFor(x => x.OtpCode)
                .NotEmpty().WithMessage("OTP code is required.")
                .Length(4, 10).WithMessage("OTP code must be between 4 and 10 characters.");

            RuleFor(x => x.ExpiryTime)
                .GreaterThan(DateTime.Now).WithMessage("ExpiryTime must be in the future.");
        }
    }
}
