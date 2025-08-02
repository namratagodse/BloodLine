using System;
using System.Collections.Generic;

namespace WebApplication2.Api.Models;

public partial class BloodInventory
{
    public int InventoryId { get; set; }

    public int? BloodBankId { get; set; }

    public string? BloodGroup { get; set; }

    public int? UnitsAvailable { get; set; }

    public DateTime? LastUpdated { get; set; }

    public virtual BloodBank? BloodBank { get; set; }
}
