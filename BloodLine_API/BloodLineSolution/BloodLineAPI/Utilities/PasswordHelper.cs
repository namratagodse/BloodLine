using System;
using System.Security.Cryptography;

namespace BloodLineAPI.Utilities
{
    public static class PasswordHelper
    {
        private const int SaltSize = 16;      // 128-bit
        private const int HashSize = 32;      // 256-bit
        private const int Iterations = 100000;

        // Produce Base64(salt + hash)
        public static string HashPassword(string password)
        {
            if (password == null) throw new ArgumentNullException(nameof(password));

            byte[] salt = RandomNumberGenerator.GetBytes(SaltSize);
            using var pbkdf2 = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            byte[] hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            return Convert.ToBase64String(hashBytes);
        }

        public static bool VerifyPassword(string enteredPassword, string storedHash)
        {
            if (enteredPassword == null) throw new ArgumentNullException(nameof(enteredPassword));
            if (storedHash == null) return false;

            byte[] hashBytes = Convert.FromBase64String(storedHash);
            if (hashBytes.Length != SaltSize + HashSize) return false;

            byte[] salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            using var pbkdf2 = new Rfc2898DeriveBytes(enteredPassword, salt, Iterations, HashAlgorithmName.SHA256);
            byte[] hash = pbkdf2.GetBytes(HashSize);

            // Constant-time comparison
            for (int i = 0; i < HashSize; i++)
                if (hashBytes[i + SaltSize] != hash[i]) return false;

            return true;
        }
    }
}
