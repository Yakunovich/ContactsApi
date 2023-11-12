﻿using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Models
{
    public class ContactContext : DbContext
    {
        public ContactContext(DbContextOptions<ContactContext> options)
            : base(options)
        {
            Database.EnsureCreated();
        }

        public DbSet<Contact> Contacts { get; set; } = null!;
    }
}