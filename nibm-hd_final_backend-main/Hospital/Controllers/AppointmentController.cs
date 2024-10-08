using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Hospital.Model;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace Hospital.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AppointmentController : ControllerBase
    {
        private readonly ApplicationDbContext _appointmentContext;
        private readonly ILogger<AppointmentController> _logger;

        public AppointmentController(ApplicationDbContext appointmentContext, ILogger<AppointmentController> logger)
        {
            _appointmentContext = appointmentContext;
            _logger = logger;
        }

        // GET: api/Appointment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Appointment>>> GetAppointments()
        {
            if (_appointmentContext.Appointments == null)
            {
                return NotFound("Appointments not found.");
            }

            var appointments = await _appointmentContext.Appointments.ToListAsync();

            return Ok(appointments);
        }

        // GET: api/Appointment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Appointment>> GetAppointment(int id)
        {
            var appointment = await _appointmentContext.Appointments
                .FirstOrDefaultAsync(a => a.Id == id);

            if (appointment == null)
            {
                return NotFound($"Appointment with ID {id} not found.");
            }

            return Ok(appointment);
        }

        // POST: api/Appointment
        [HttpPost]
        public async Task<ActionResult<Appointment>> PostAppointment(Appointment appointment)
        {
            // Validate the appointment model
            if (!ModelState.IsValid)
            {
                var errors = ModelState.Values
                    .SelectMany(v => v.Errors)
                    .Select(e => e.ErrorMessage)
                    .ToList();

                _logger.LogError("Validation errors: {errors}", string.Join(", ", errors));

                return BadRequest(new
                {
                    message = "Validation failed",
                    errors = errors
                });
            }

            try
            {
                // Add the appointment and save changes
                _appointmentContext.Appointments.Add(appointment);
                await _appointmentContext.SaveChangesAsync();

                return CreatedAtAction(nameof(GetAppointment), new { id = appointment.Id }, appointment);
            }
            catch (Exception ex)
            {
                // Log the exception
                _logger.LogError(ex, "An error occurred while creating the appointment.");

                return StatusCode(500, new
                {
                    message = "An error occurred while creating the appointment.",
                    error = ex.Message
                });
            }
        }
    }
}
