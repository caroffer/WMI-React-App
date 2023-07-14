using System;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace api_wmi.Controllers
{
    [EnableCors("ReactApp")]
    [ApiController]
    [Route("api/honda_wmi")]
    public class WMIController : ControllerBase
    {
        [HttpGet]
        public IActionResult GetJsonFile()
        {

            // Check if the file exists
            if (!System.IO.File.Exists("./honda_wmi.json"))
            {
                return NotFound();
            }

            // Read the JSON file
            string jsonData = System.IO.File.ReadAllText("./honda_wmi.json");

            return Ok(jsonData);
        }
    }
}