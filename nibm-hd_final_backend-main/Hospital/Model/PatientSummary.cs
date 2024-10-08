namespace Hospital.Model
{
    public class PatientSummary
    {
        public int TotalPatientCount { get; set; }
        public List<KeyValuePair<string, int>> GenderDistribution { get; set; }
        public List<KeyValuePair<int, int>> TopAges { get; set; }
        public List<KeyValuePair<string, int>> TopCountries { get; set; }
    }
}
