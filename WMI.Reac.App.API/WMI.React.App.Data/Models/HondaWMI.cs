using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace WMI.React.App.Data.Models
{
    public class HondaWMI
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string VehicleType { get; set; }
        [Key]
        public string WMI { get; set; }
        public string Country { get; set; }
        public DateTime DateAvailableToPublic { get; set; }
        public DateTime CreatedOn { get; set; }
        public DateTime? UpdatedOn { get; set; }
    }
}
