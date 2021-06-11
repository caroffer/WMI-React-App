using System;
using System.Collections.Generic;
using System.Linq;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Newtonsoft.Json;

namespace api_src.Controllers
{
  [ApiController]
  [Route("[controller]/honda")]
  public class WMIController : ControllerBase
  {
    private static JsonSerializer jsonSerializer = new JsonSerializer();

    private IWebHostEnvironment _env;

    private readonly ILogger<WMIController> _logger;

    public WMIController(IWebHostEnvironment env, ILogger<WMIController> logger)
    {
      _env = env;
      _logger = logger;
    }

    [HttpGet]
    public IEnumerable<WMIRecord> Get()
    {
      // We could just serve the file directly and save some CPU parsing and
      // re-serializing, but this is a better approximation of a production system
      var jsonFileInfo = _env.ContentRootFileProvider.GetFileInfo("honda_wmi.json");
      using (var jsonFileStream = jsonFileInfo.CreateReadStream())
      using (var sr = new StreamReader(jsonFileStream))
      using (var jr = new JsonTextReader(sr))
      {
        var records = jsonSerializer.Deserialize<IEnumerable<WMIRecord>>(jr);
        return records;
      }
    }
  }
}
