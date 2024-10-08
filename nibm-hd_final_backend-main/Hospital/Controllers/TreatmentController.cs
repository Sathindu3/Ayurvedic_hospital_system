using Hospital.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TreatmentController : ControllerBase
    {
        private readonly ApplicationDbContext _treatmentContext;

        public TreatmentController(ApplicationDbContext treatmentContext)
        {
            _treatmentContext = treatmentContext;
        }

        // GET: api/Treatment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Treatment>>> GetTreatments()
        {
            if (_treatmentContext.Treatments == null)
            {
                return NotFound("No treatments found.");
            }

            return await _treatmentContext.Treatments.ToListAsync();
        }

        // GET: api/Treatment/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Treatment>> GetTreatmentById(int id)
        {
            var treatment = await _treatmentContext.Treatments.FindAsync(id);

            if (treatment == null)
            {
                return NotFound($"Treatment with ID {id} not found.");
            }

            return treatment;
        }

        // POST: api/Treatment
        [HttpPost]
        public async Task<ActionResult<Treatment>> PostTreatment([FromForm] TreatmentCreateDto treatmentDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var treatment = new Treatment
            {
                Title = treatmentDto.Title,
                Description = treatmentDto.Description,
                Price = treatmentDto.Price, // Now decimal type
            };

            if (treatmentDto.Image != null && treatmentDto.Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await treatmentDto.Image.CopyToAsync(memoryStream);
                    treatment.Image = memoryStream.ToArray();
                }
            }

            _treatmentContext.Treatments.Add(treatment);
            await _treatmentContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetTreatmentById), new { id = treatment.Id }, treatment);
        }

        // PUT: api/Treatment/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutTreatment(int id, [FromForm] TreatmentCreateDto treatmentDto)
        {
            if (id != treatmentDto.Id)
            {
                return BadRequest("ID mismatch.");
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var treatment = await _treatmentContext.Treatments.FindAsync(id);
            if (treatment == null)
            {
                return NotFound($"Treatment with ID {id} not found.");
            }

            treatment.Title = treatmentDto.Title;
            treatment.Description = treatmentDto.Description;
            treatment.Price = treatmentDto.Price; // Now decimal type

            if (treatmentDto.Image != null && treatmentDto.Image.Length > 0)
            {
                using (var memoryStream = new MemoryStream())
                {
                    await treatmentDto.Image.CopyToAsync(memoryStream);
                    treatment.Image = memoryStream.ToArray();
                }
            }

            _treatmentContext.Entry(treatment).State = EntityState.Modified;

            try
            {
                await _treatmentContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!_treatmentContext.Treatments.Any(e => e.Id == id))
                {
                    return NotFound($"Treatment with ID {id} not found.");
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Treatment/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTreatment(int id)
        {
            var treatment = await _treatmentContext.Treatments.FindAsync(id);
            if (treatment == null)
            {
                return NotFound($"Treatment with ID {id} not found.");
            }

            _treatmentContext.Treatments.Remove(treatment);
            await _treatmentContext.SaveChangesAsync();

            return NoContent();
        }
    }

    public class TreatmentCreateDto
    {
        public int Id { get; set; } // Used for PUT requests
        public string Title { get; set; }
        public string Description { get; set; }
        public string Price { get; set; } // Changed to decimal
        public IFormFile Image { get; set; }
    }
}
