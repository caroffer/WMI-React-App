using System;

namespace WMI_Core_API
{
    public class IHondaWMI
    {
        public IHondaWMI(string country, string createdOn, string dateAvailableToPublic, int? id, string name, string updatedOn, string vehicleType, string wMI)
        {
            Country = country;
            CreatedOn =  string.IsNullOrEmpty(createdOn)? null : (DateTime?) DateTime.Parse(createdOn);
            DateAvailableToPublic = string.IsNullOrEmpty(dateAvailableToPublic) ? null : (DateTime?)DateTime.Parse(dateAvailableToPublic);
            Id = id;
            Name = name;
            UpdatedOn = string.IsNullOrEmpty(updatedOn) ? null : (DateTime?)DateTime.Parse(updatedOn);
            VehicleType = vehicleType;
            WMI = wMI;
        }

        public string Country { get; set; }
        public DateTime? CreatedOn { get; set; }
        public DateTime? DateAvailableToPublic { get; set; }
        public int? Id { get; set; }
        public string Name { get; set; }
        public DateTime? UpdatedOn { get; set; }
        public string VehicleType { get; set; }
        public string WMI { get; set; }
    }
}
