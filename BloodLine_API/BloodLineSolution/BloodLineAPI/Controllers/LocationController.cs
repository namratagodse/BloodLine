using BloodLineAPI.BAL;
using BloodLineAPI.Model;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace BloodLine.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LocationController : ControllerBase
    {
        private readonly StateBAL _stateBAL;
        private readonly DistrictBAL _districtBAL;

        public LocationController()
        {
            _stateBAL = new StateBAL();
            _districtBAL = new DistrictBAL();
        }

        [HttpGet("states")]
        public ActionResult<List<StateModel>> GetStates()
        {
            var states = _stateBAL.GetAllStates();
            return Ok(states);
        }

        [HttpGet("districts")]
        public ActionResult<List<DistrictModel>> GetDistricts()
        {
            var districts = _districtBAL.GetAllDistricts();
            return Ok(districts);
        }

        [HttpGet("districts/{stateId}")]
        public ActionResult<List<DistrictModel>> GetDistrictsByState(int stateId)
        {
            var districts = _districtBAL.GetDistrictsByStateId(stateId);
            if (districts == null || districts.Count == 0)
                return NotFound("No districts found for the given state ID.");
            return Ok(districts);
        }
    }
}
