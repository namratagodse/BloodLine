using FluentValidation;
using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Validators
{
    public class DonationRequestDtoValidator : AbstractValidator<DonationRequestDto>
    {
        public DonationRequestDtoValidator()
        {
            RuleFor(x => x.DonorId)
                .GreaterThan(0).WithMessage("DonorId must be a positive integer.");

            RuleFor(x => x.BloodBankId)
                .GreaterThan(0).WithMessage("BloodBankId must be a positive integer.");

            RuleFor(x => x.PreferredDate)
                .GreaterThanOrEqualTo(DateTime.Today).WithMessage("Preferred date cannot be in the past.");

            RuleFor(x => x.Status)
                .NotEmpty().WithMessage("Status is required.")
                .MaximumLength(50);
        }
    }
}
