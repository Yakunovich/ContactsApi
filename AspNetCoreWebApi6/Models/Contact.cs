namespace ContactsApi.Models
{
    public class Contact
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? MobilePhone { get; set; }
        public string? JobTitle { get; set; }

        public DateTime BirthDate { get; set; }
    }
}
