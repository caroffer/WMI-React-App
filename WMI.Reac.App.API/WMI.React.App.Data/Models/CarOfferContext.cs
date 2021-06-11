using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;

namespace WMI.React.App.Data.Models
{
    public class CarOfferContext: DbContext
    {
        public CarOfferContext(DbContextOptions<CarOfferContext> options) : base(options)
        {
        }

        public DbSet<HondaWMI> HondaWMI { get; set; }
    }
}
