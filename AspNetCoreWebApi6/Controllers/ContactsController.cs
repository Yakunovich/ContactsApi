using ContactsApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ContactsApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ContactsController : ControllerBase
    {
        private readonly ContactContext _dbContext;

        public ContactsController(ContactContext dbContext)
        {
            _dbContext = dbContext;
        }

        // GET: api/Contacts
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            if (_dbContext.Contacts == null)
            {
                return NotFound();
            }
            return await _dbContext.Contacts.ToListAsync();
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            if (_dbContext.Contacts == null)
            {
                return NotFound();
            }
            var Contact = await _dbContext.Contacts.FindAsync(id);

            if (Contact == null)
            {
                return NotFound();
            }

            return Contact;
        }

        // POST: api/Contacts
        [HttpPost]
        public async Task<ActionResult<Contact>> PostContact(Contact Contact)
        {
            _dbContext.Contacts.Add(Contact);
            await _dbContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetContact), new { id = Contact.Id }, Contact);
        }

        // PUT: api/Contacts/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutContact(int id, Contact Contact)
        {
            if (id != Contact.Id)
            {
                return BadRequest();
            }

            _dbContext.Entry(Contact).State = EntityState.Modified;

            try
            {
                await _dbContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ContactExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            if (_dbContext.Contacts == null)
            {
                return NotFound();
            }

            var Contact = await _dbContext.Contacts.FindAsync(id);
            if (Contact == null)
            {
                return NotFound();
            }

            _dbContext.Contacts.Remove(Contact);
            await _dbContext.SaveChangesAsync();

            return NoContent();
        }

        private bool ContactExists(long id)
        {
            return (_dbContext.Contacts?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
