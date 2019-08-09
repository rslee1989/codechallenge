using Sabio.Models;
using Sabio.Models.Requests.Advertisers;

namespace Sabio.Models.Domain
{
    public interface IAdvertisersService
    {
        int Add(AdvertisersAddRequest model, int userId);

    }
}