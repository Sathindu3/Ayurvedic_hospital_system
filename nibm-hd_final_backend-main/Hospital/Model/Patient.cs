namespace Hospital.Model
{
    public class Patient
    {
        public int Id { get; set; }

        public string Patient_Name { get; set; }

        public string Gender { get; set; }

        public DateTime DOB { get; set; }   

        public string Address {  get; set; }    

        public string Contact_number { get; set; }

        public string? Optional_number { get; set; }

        public string? Email { get; set; }

        public string? Country { get; set; }

        
    }
}
