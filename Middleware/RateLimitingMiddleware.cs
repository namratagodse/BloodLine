using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.Options;
using WebApplication2.Extensions;

namespace WebApplication2.Middleware
{
    public class RateLimitingMiddleware
    {
        private readonly RequestDelegate _next;
        private readonly IMemoryCache _cache;
        private readonly int _maxRequests;
        private readonly TimeSpan _period;

        public RateLimitingMiddleware(
            RequestDelegate next,
            IMemoryCache cache,
            IOptions<RateLimitingOptions> opts)
        {
            _next = next;
            _cache = cache;
            _maxRequests = opts.Value.MaxRequestsPerPeriod;
            _period = TimeSpan.FromSeconds(opts.Value.PeriodSeconds);
        }

        public async Task InvokeAsync(HttpContext context)
        {
            var ip = context.Connection.RemoteIpAddress?.ToString() ?? "unknown";
            var counter = _cache.GetOrCreate(ip, entry =>
            {
                entry.AbsoluteExpirationRelativeToNow = _period;
                return new RequestCounter { Count = 0, ExpiresAt = DateTime.UtcNow.Add(_period) };
            });

            if (counter.Count >= _maxRequests)
            {
                context.Response.StatusCode = StatusCodes.Status429TooManyRequests;
                var retryAfter = (int)(counter.ExpiresAt - DateTime.UtcNow).TotalSeconds;
                context.Response.Headers["Retry-After"] = retryAfter.ToString();
                await context.Response.WriteAsync("Too many requests.");
                return;
            }

            counter.Count++;
            _cache.Set(ip, counter, counter.ExpiresAt);
            await _next(context);
        }

        private class RequestCounter
        {
            public int Count { get; set; }
            public DateTime ExpiresAt { get; set; }
        }
    }
}
