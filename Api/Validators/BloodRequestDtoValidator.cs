using FluentValidation;
using WebApplication2.Api.DTOs;

namespace WebApplication2.Api.Validators
{
    public class BloodRequestDtoValidator : AbstractValidator<BloodRequestDto>
    {
        public BloodRequestDtoValidator()
        {
            RuleFor(x => x.ReceiverId)
                .GreaterThan(0).WithMessage("ReceiverId must be a positive integer.");

            RuleFor(x => x.PatientName)
                .NotEmpty().WithMessage("Patient name is required.")
                .MaximumLength(100);

            RuleFor(x => x.HospitalName)
                .NotEmpty().WithMessage("Hospital name is required.")
                .MaximumLength(100);

            RuleFor(x => x.RequiredBloodGroup)
                .NotEmpty().WithMessage("Required blood group is required.")
                .Matches("^(A|B|AB|O)[+-]$").WithMessage("Blood group must be one of: A+, A-, B+, B-, AB+, AB-, O+, O-.");

            RuleFor(x => x.BloodBankId)
                .GreaterThan(0).WithMessage("BloodBankId must be a positive integer.");

            RuleFor(x => x.UnitsRequested)
                .GreaterThan(0).WithMessage("UnitsRequested must be at least 1.");
        }
    }
}
