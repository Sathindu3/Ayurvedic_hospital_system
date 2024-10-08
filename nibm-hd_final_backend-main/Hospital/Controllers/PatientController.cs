using Hospital.Model;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PatientController : ControllerBase
    {
        private readonly ApplicationDbContext _patientContext;

        public PatientController(ApplicationDbContext patientContext)
        {
            _patientContext = patientContext;
        }

        // Get all patients
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Patient>>> GetPatients()
        {
            if (_patientContext.Patients == null)
            {
                return NotFound();
            }

            return await _patientContext.Patients.ToListAsync();
        }

        // Get a specific patient by Id
        [HttpGet("{id}")]
        public async Task<ActionResult<Patient>> GetPatientById(int id)
        {
            var patient = await _patientContext.Patients.FindAsync(id);

            if (patient == null)
            {
                return NotFound();
            }

            return patient;
        }

        // Create a new patient
        [HttpPost]
        public async Task<ActionResult<Patient>> PostPatient(Patient patient)
        {
            _patientContext.Patients.Add(patient);
            await _patientContext.SaveChangesAsync();

            return CreatedAtAction(nameof(GetPatientById), new { id = patient.Id }, patient);
        }

        // Update an existing patient
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPatient(int id, Patient patient)
        {
            if (id != patient.Id)
            {
                return BadRequest();
            }

            _patientContext.Entry(patient).State = EntityState.Modified;

            try
            {
                await _patientContext.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PatientExists(id))
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

        // Delete a patient
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePatient(int id)
        {
            var patient = await _patientContext.Patients.FindAsync(id);
            if (patient == null)
            {
                return NotFound();
            }

            _patientContext.Patients.Remove(patient);
            await _patientContext.SaveChangesAsync();

            return NoContent();
        }



        private bool PatientExists(int id)
        {
            return _patientContext.Patients.Any(e => e.Id == id);
        }
    }
}
