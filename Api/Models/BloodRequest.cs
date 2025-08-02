using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class BloodRequest
{
    public int RequestId { get; set; }

    public int? ReceiverId { get; set; }

    public string? PatientName { get; set; }

    public string? HospitalName { get; set; }

    public string? RequiredBloodGroup { get; set; }

    public int? BloodBankId { get; set; }

    public int? UnitsRequested { get; set; }

    public string? Status { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual BloodBank? BloodBank { get; set; }

    public virtual User? Receiver { get; set; }
}
