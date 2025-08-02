using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class AuditLog
{
    public int LogId { get; set; }

    public int? UserId { get; set; }

    public string? Action { get; set; }

    public string? EntityAffected { get; set; }

    public DateTime? Timestamp { get; set; }
}
