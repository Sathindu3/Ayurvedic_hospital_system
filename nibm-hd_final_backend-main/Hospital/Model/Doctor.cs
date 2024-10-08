namespace Hospital.Model
{
    public class Doctor
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Speciality { get; set; }  // Updated to match frontend field

        public string Contact_number { get; set; }  // Updated to match frontend field

        public string Email { get; set; }

        public string Gender { get; set; }

        public byte[] Profile_pic { get; set; }

        public string Description { get; set; }
    }
}
