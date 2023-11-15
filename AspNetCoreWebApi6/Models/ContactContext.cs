using Microsoft.EntityFrameworkCore;

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

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Contact>().HasData(
               new Contact[]
               {
                    new Contact { Id=1, Name = "Alex", BirthDate = new DateTime(2001,7,20), JobTitle = "Software engineer", MobilePhone = "(29) 333-1244"},
                    new Contact { Id=2, Name = "George", BirthDate = new DateTime(2003,6,16), JobTitle = "Designer", MobilePhone = "(29) 333-3244"},
                    new Contact { Id=3, Name = "Ivan", BirthDate = new DateTime(2000,4,10), JobTitle = "Data engineer", MobilePhone = "(29) 333-4414"},
                    new Contact { Id=4, Name = "Kirill", BirthDate = new DateTime(2002,1,30), JobTitle = "Product manager", MobilePhone = "(29) 333-2244"},

               });
        }
    }

}
