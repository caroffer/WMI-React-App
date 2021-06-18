using System;

namespace WMI_API
{
    public class WMIHonda
    {
        public int Id { get; set; }

        public string Country { get; set; }

        public DateTime? CreatedOn { get; set; }

        public DateTime? DateAvailableToPublic { get; set; }

        public string Name { get; set; }

        public DateTime? UpdatedOn { get; set; }

        public string VehicleType { get; set; }

        public string WMI { get; set; }
    }
}