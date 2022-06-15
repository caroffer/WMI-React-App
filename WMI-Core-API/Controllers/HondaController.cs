using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using WMI_Core_API.Data;

namespace WMI_Core_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HondaController : ControllerBase
    {
        private List<HondaWMI> _data;
        public HondaController(List<HondaWMI> data)
        {
            _data = data;
        }

        [HttpGet]
        public List<HondaWMI> Get()
        {
            System.Threading.Thread.Sleep(1000);
            return _data;
        }
    }
}
