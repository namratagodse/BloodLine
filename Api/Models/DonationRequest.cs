using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class DonationRequest
{
    public int DonationRequestId { get; set; }

    public int? DonorId { get; set; }

    public int? BloodBankId { get; set; }

    public DateOnly? PreferredDate { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual BloodBank? BloodBank { get; set; }

    public virtual User? Donor { get; set; }
}
