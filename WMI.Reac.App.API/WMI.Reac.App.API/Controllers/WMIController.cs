using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WMI.React.App.Data.Models;

namespace WMI.React.App.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HondaWMIController : ControllerBase
    {
        private readonly CarOfferContext _dbcontext;
        public HondaWMIController(CarOfferContext context)
        {
            _dbcontext = context;
        }

        [HttpGet]
        public async Task<List<HondaWMI>> GetHondaWMIsAsync()
        {
            return await _dbcontext.HondaWMI.ToListAsync();
        }
    }
}
