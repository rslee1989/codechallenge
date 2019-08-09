using System;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Sabio.Models;
using Sabio.Models.Domain;
using Sabio.Models.Requests.Advertisers;
using Sabio.Services;
using Sabio.Web.Controllers;
using Sabio.Web.Models.Responses;

namespace Sabio.Web.Api.Controllers
{
    [Route("api/advertisers")]
    [ApiController]
    public class VenueApiController : BaseApiController
    {
        private IAdvertisersService _service = null;
        private IAuthenticationService<int> _authService = null;

        public VenueApiController(IAdvertisersService service
            , ILogger<VenueApiController> logger
            , IAuthenticationService<int> authService) : base(logger)

        {
            _service = service;
            _authService = authService;
        }


        [HttpPost]
        public ActionResult<ItemResponse<int>> Add(AdvertisersAddRequest model)
        {
            int userId = _authService.GetCurrentUserId();
            IUserAuthData user = _authService.GetCurrentUser();
            ObjectResult result = null;

            try
            {

                int id = _service.Add(model, userId);
                ItemResponse<int> response = new ItemResponse<int>() { Item = id };

                result = Created201(response);
            }
            catch (Exception ex)
            {
                Logger.LogError(ex.ToString());
                ErrorResponse response = new ErrorResponse(ex.Message);

                result = StatusCode(500, response);
            }

            return result;
        }

    }
}
