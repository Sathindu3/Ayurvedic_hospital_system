using Hospital.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DoctorController : ControllerBase
    {
        private readonly ApplicationDbContext _doctorContext;
        private readonly ILogger<DoctorController> _logger;

        public DoctorController(ApplicationDbContext doctorContext, ILogger<DoctorController> logger)
        {
            _doctorContext = doctorContext;
            _logger = logger;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Doctor>>> GetDoctors()
        {
            if (_doctorContext.Doctors == null)
            {
                return NotFound();
            }

            return await _doctorContext.Doctors.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Doctor>> GetDoctor(int id)
        {
            var doctor = await _doctorContext.Doctors.FindAsync(id);

            if (doctor == null)
            {
                return NotFound();
            }

            return doctor;
        }

        //[HttpPost]
        //public async Task<ActionResult<Doctor>> PostDoctor([FromBody] Doctor doctor)
        //{
        //    if (doctor == null)
        //    {
        //        return BadRequest("Doctor is null.");
        //    }

        //    if (!ModelState.IsValid)
        //    {
        //        var errors = ModelState.Values
        //            .SelectMany(v => v.Errors)
        //            .Select(e => e.ErrorMessage)
        //            .ToList();

        //        _logger.LogError("Validation errors: {errors}", string.Join(", ", errors));

        //        return BadRequest(new
        //        {
        //            message = "Validation failed",
        //            errors = errors
        //        });
        //    }

        //    // Validate email format if necessary
        //    if (!string.IsNullOrEmpty(doctor.Email) && !new EmailAddressAttribute().IsValid(doctor.Email))
        //    {
        //        return BadRequest("Invalid email format.");
        //    }

        //    try
        //    {
        //        _doctorContext.Doctors.Add(doctor);
        //        await _doctorContext.SaveChangesAsync();

        //        return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
        //    }
        //    catch (DbUpdateException ex)
        //    {
        //        _logger.LogError(ex, "An error occurred while adding the doctor.");
        //        return StatusCode(500, new
        //        {
        //            message = "An error occurred while adding the doctor.",
        //            error = ex.Message
        //        });
        //    }
        //}
        [HttpPost]
        public async Task<ActionResult<Doctor>> PostDoctor([FromBody] Doctor doctor)
        {
            if (doctor == null)
            {
                return BadRequest("Doctor is null.");
            }

            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                return BadRequest(new
                {
                    message = "Validation failed",
                    errors = errors
                });
            }

            // Validate email format if necessary
            if (!string.IsNullOrEmpty(doctor.Email) && !new EmailAddressAttribute().IsValid(doctor.Email))
            {
                return BadRequest("Invalid email format.");
            }

            try
            {
                _doctorContext.Doctors.Add(doctor);
                await _doctorContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDoctor), new { id = doctor.Id }, doctor);
            }
            catch (DbUpdateException ex)
            {
                return StatusCode(500, new
                {
                    message = "An error occurred while adding the doctor.",
                    error = ex.Message
                });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDoctor(int id, [FromBody] Doctor doctor)
        {
            if (id != doctor.Id)
            {
                return BadRequest("Doctor ID mismatch.");
            }

            _doctorContext.Entry(doctor).State = EntityState.Modified;

            try
            {
                await _doctorContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DoctorExists(id))
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

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDoctor(int id)
        {
            var doctor = await _doctorContext.Doctors.FindAsync(id);
            if (doctor == null)
            {
                return NotFound();
            }

            _doctorContext.Doctors.Remove(doctor);
            await _doctorContext.SaveChangesAsync();

            return NoContent();
        }

        private bool DoctorExists(int id)
        {
            return _doctorContext.Doctors.Any(e => e.Id == id);
        }
    }
}
