using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using WebApplication2.Api.Models;

namespace WebApplication2.Api.Data;

public partial class BloodLineDbContext : DbContext
{
    public BloodLineDbContext()
    {
    }

    public BloodLineDbContext(DbContextOptions<BloodLineDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<AdminAction> AdminActions { get; set; }

    public virtual DbSet<AuditLog> AuditLogs { get; set; }

    public virtual DbSet<BloodBank> BloodBanks { get; set; }

    public virtual DbSet<BloodInventory> BloodInventory { get; set; }

    public virtual DbSet<BloodRequest> BloodRequests { get; set; }

    public virtual DbSet<Donation> Donations { get; set; }

    public virtual DbSet<DonationRequest> DonationRequests { get; set; }

    public virtual DbSet<Notification> Notifications { get; set; }

    public virtual DbSet<OtpVerification> OtpVerifications { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=(localdb)\\MSSQLLocalDB;Database=BloodLine;Trusted_Connection=True;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<AdminAction>(entity =>
        {
            entity.HasKey(e => e.ActionId).HasName("PK__AdminAct__FFE3F4D9482C588C");

            entity.Property(e => e.ActionType).HasMaxLength(100);
            entity.Property(e => e.Notes).HasMaxLength(255);
            entity.Property(e => e.TargetEntity).HasMaxLength(100);
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Admin).WithMany(p => p.AdminActions)
                .HasForeignKey(d => d.AdminId)
                .HasConstraintName("FK__AdminActi__Admin__5535A963");
        });

        modelBuilder.Entity<AuditLog>(entity =>
        {
            entity.HasKey(e => e.LogId).HasName("PK__AuditLog__5E548648EF16B6F4");

            entity.Property(e => e.Action).HasMaxLength(100);
            entity.Property(e => e.EntityAffected).HasMaxLength(100);
            entity.Property(e => e.Timestamp)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<BloodBank>(entity =>
        {
            entity.HasKey(e => e.BloodBankId).HasName("PK__BloodBan__DFE4CFF6D72ADEB3");

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.ContactNumber).HasMaxLength(15);
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.Name).HasMaxLength(100);
            entity.Property(e => e.State).HasMaxLength(100);

            entity.HasOne(d => d.CreatedByNavigation).WithMany(p => p.BloodBanks)
                .HasForeignKey(d => d.CreatedBy)
                .HasConstraintName("FK__BloodBank__Creat__3B75D760");
        });

        modelBuilder.Entity<BloodInventory>(entity =>
        {
            entity.HasKey(e => e.InventoryId).HasName("PK__BloodInv__F5FDE6B3FDD65E54");

            entity.ToTable("BloodInventory");

            entity.Property(e => e.BloodGroup).HasMaxLength(5);
            entity.Property(e => e.LastUpdated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.BloodBank).WithMany(p => p.BloodInventories)
                .HasForeignKey(d => d.BloodBankId)
                .HasConstraintName("FK__BloodInve__Blood__3F466844");
        });

        modelBuilder.Entity<BloodRequest>(entity =>
        {
            entity.HasKey(e => e.RequestId).HasName("PK__BloodReq__33A8517AA255718E");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.HospitalName).HasMaxLength(100);
            entity.Property(e => e.PatientName).HasMaxLength(100);
            entity.Property(e => e.RequiredBloodGroup).HasMaxLength(5);
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.BloodBank).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.BloodBankId)
                .HasConstraintName("FK__BloodRequ__Blood__440B1D61");

            entity.HasOne(d => d.Receiver).WithMany(p => p.BloodRequests)
                .HasForeignKey(d => d.ReceiverId)
                .HasConstraintName("FK__BloodRequ__Recei__4316F928");
        });

        modelBuilder.Entity<Donation>(entity =>
        {
            entity.HasKey(e => e.DonationId).HasName("PK__Donation__C5082EFBC7BC9DD9");

            entity.Property(e => e.AcknowledgementUrl).HasMaxLength(255);
            entity.Property(e => e.BloodGroup).HasMaxLength(5);

            entity.HasOne(d => d.BloodBank).WithMany(p => p.Donations)
                .HasForeignKey(d => d.BloodBankId)
                .HasConstraintName("FK__Donations__Blood__4D94879B");

            entity.HasOne(d => d.Donor).WithMany(p => p.Donations)
                .HasForeignKey(d => d.DonorId)
                .HasConstraintName("FK__Donations__Donor__4CA06362");
        });

        modelBuilder.Entity<DonationRequest>(entity =>
        {
            entity.HasKey(e => e.DonationRequestId).HasName("PK__Donation__8CD417C01AFAC950");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Status).HasMaxLength(50);

            entity.HasOne(d => d.BloodBank).WithMany(p => p.DonationRequests)
                .HasForeignKey(d => d.BloodBankId)
                .HasConstraintName("FK__DonationR__Blood__48CFD27E");

            entity.HasOne(d => d.Donor).WithMany(p => p.DonationRequests)
                .HasForeignKey(d => d.DonorId)
                .HasConstraintName("FK__DonationR__Donor__47DBAE45");
        });

        modelBuilder.Entity<Notification>(entity =>
        {
            entity.HasKey(e => e.NotificationId).HasName("PK__Notifica__20CF2E12EF008276");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Message).HasMaxLength(255);
            entity.Property(e => e.Seen).HasDefaultValue(false);

            entity.HasOne(d => d.User).WithMany(p => p.Notifications)
                .HasForeignKey(d => d.UserId)
                .HasConstraintName("FK__Notificat__UserI__5070F446");
        });

        modelBuilder.Entity<OtpVerification>(entity =>
        {
            entity.HasKey(e => e.OtpId).HasName("PK__OtpVerif__3143C4A33BD784D7");

            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.ExpiryTime).HasColumnType("datetime");
            entity.Property(e => e.OtpCode).HasMaxLength(10);
            entity.Property(e => e.Verified).HasDefaultValue(false);
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4C0C775290");

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053409C7CAD6").IsUnique();

            entity.Property(e => e.Address).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(100);
            entity.Property(e => e.ContactNumber).HasMaxLength(15);
            entity.Property(e => e.Country)
                .HasMaxLength(100)
                .HasDefaultValue("India");
            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FullName).HasMaxLength(100);
            entity.Property(e => e.Password).HasMaxLength(255);
            entity.Property(e => e.Role).HasMaxLength(50);
            entity.Property(e => e.State).HasMaxLength(100);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
