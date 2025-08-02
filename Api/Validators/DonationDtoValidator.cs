using FluentValidation;
using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Validators
{
    public class DonationDtoValidator : AbstractValidator<DonationDto>
    {
        public DonationDtoValidator()
        {
            RuleFor(x => x.DonorId)
                .GreaterThan(0).WithMessage("DonorId must be a positive integer.");

            RuleFor(x => x.BloodBankId)
                .GreaterThan(0).WithMessage("BloodBankId must be a positive integer.");

            RuleFor(x => x.BloodGroup)
                .NotEmpty().WithMessage("BloodGroup is required.")
                .Matches("^(A|B|AB|O)[+-]$").WithMessage("Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-.");

            RuleFor(x => x.UnitsDonated)
                .GreaterThan(0).WithMessage("UnitsDonated must be at least 1.");

            RuleFor(x => x.DonationDate)
                .LessThanOrEqualTo(DateTime.Today).WithMessage("DonationDate cannot be in the future.");
        }
    }
}
