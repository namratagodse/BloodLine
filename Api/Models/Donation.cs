using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class Donation
{
    public int DonationId { get; set; }

    public int? DonorId { get; set; }

    public int? BloodBankId { get; set; }

    public string? BloodGroup { get; set; }

    public int? UnitsDonated { get; set; }

    public DateOnly? DonationDate { get; set; }

    public string? AcknowledgementUrl { get; set; }

    public virtual BloodBank? BloodBank { get; set; }

    public virtual User? Donor { get; set; }
}
