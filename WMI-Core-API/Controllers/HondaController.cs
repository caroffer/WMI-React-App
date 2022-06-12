using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace WMI_Core_API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class HondaController : ControllerBase
    {
        private List<IHondaWMI> _data;
        public HondaController(List<IHondaWMI> data)
        {
            _data = data;
        }

        [HttpGet]
        public List<IHondaWMI> Get()
        {
            return _data;
        }
    }
}
