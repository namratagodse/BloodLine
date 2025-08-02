using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class AdminAction
{
    public int ActionId { get; set; }

    public int? AdminId { get; set; }

    public string? ActionType { get; set; }

    public string? TargetEntity { get; set; }

    public string? Notes { get; set; }

    public DateTime? Timestamp { get; set; }

    public virtual User? Admin { get; set; }
}
