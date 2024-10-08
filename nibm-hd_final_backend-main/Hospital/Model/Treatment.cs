using System.ComponentModel.DataAnnotations;

namespace Hospital.Model
{
    public class Treatment
    {

        public int Id { get; set; }

        public string Title { get; set; }

        public string Description { get; set; }

        public string Price { get; set; }

        public byte[] Image { get; set; }

  

    }
}
