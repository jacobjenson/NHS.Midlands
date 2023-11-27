﻿namespace NHS.Api.Models
{
    public class User
    {
        public int Id { get; set; }

        public string Username { get; set; } = null!;

        public string Password { get; set; } = null!;

        public string PasswordHash { get; set; } = null!;
    }
}