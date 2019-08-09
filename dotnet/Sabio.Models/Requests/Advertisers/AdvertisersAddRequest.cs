using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace Sabio.Models.Requests.Advertisers
{
    public class AdvertisersAddRequest

    {
    
        public string ShortTitle { get; set; }

        public string Title { get; set; }
      
        public string ShortDescription { get; set; }

        public string Content { get; set; }

        public string Slug { get; set; }

        public int EntityTypeId { get; set; }

        public int StatusId { get; set; }

        public int BaseMetaData { get; set; }
    }
}