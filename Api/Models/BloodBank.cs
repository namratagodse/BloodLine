using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class BloodBank
{
    public int BloodBankId { get; set; }

    public string? Name { get; set; }

    public string? Address { get; set; }

    public string? City { get; set; }

    public string? State { get; set; }

    public string? ContactNumber { get; set; }

    public string? Email { get; set; }

    public int? CreatedBy { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual ICollection<BloodInventory> BloodInventories { get; set; } = new List<BloodInventory>();

    public virtual ICollection<BloodRequest> BloodRequests { get; set; } = new List<BloodRequest>();

    public virtual User? CreatedByNavigation { get; set; }

    public virtual ICollection<DonationRequest> DonationRequests { get; set; } = new List<DonationRequest>();

    public virtual ICollection<Donation> Donations { get; set; } = new List<Donation>();
}
