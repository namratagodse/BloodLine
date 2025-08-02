using AutoMapper;
using WebApplication2.Api.DTOs;
using WebApplication2.Api.Models;

namespace WebApplication2.Api.Mapping
{
    public class AutoMapperProfile : Profile
    {
        public AutoMapperProfile()
        {
            // Authentication
            CreateMap<LoginRequestDto, User>()
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Username))
                .ForMember(dest => dest.Password, opt => opt.MapFrom(src => src.Password));

            // User mappings
            CreateMap<User, UserDto>();
            CreateMap<RegisterDto, User>();
            CreateMap<UserDto, User>();

            // BloodBank mappings
            CreateMap<BloodBank, BloodBankDto>();
            CreateMap<BloodBankDto, BloodBank>();

            // BloodInventory summary
            CreateMap<BloodInventorySummaryDto, BloodInventorySummaryDto>(); // passthrough

            // BloodRequest mappings
            CreateMap<BloodRequest, BloodRequestDto>();
            CreateMap<BloodRequestDto, BloodRequest>();

            // DonationRequest mappings
            CreateMap<DonationRequest, DonationRequestDto>();
            CreateMap<DonationRequestDto, DonationRequest>();

            // Donation mappings
            CreateMap<Donation, DonationDto>();
            CreateMap<DonationDto, Donation>();

            // Notification mappings
            CreateMap<Notification, NotificationDto>();
            CreateMap<NotificationDto, Notification>();

            // AdminAction mappings
            CreateMap<AdminAction, AdminActionDto>();
            CreateMap<AdminActionDto, AdminAction>();

            // OTP Verification mappings
            CreateMap<OtpVerification, OtpVerificationDto>();
            CreateMap<OtpVerificationDto, OtpVerification>();

            // AuditLog mappings
            CreateMap<AuditLog, AuditLogDto>();
            CreateMap<AuditLogDto, AuditLog>();
        }
    }
}
