using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class OtpVerification
{
    public int OtpId { get; set; }

    public string? Email { get; set; }

    public string? OtpCode { get; set; }

    public DateTime? ExpiryTime { get; set; }

    public bool? Verified { get; set; }
}
