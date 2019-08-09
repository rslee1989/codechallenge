using System;
using System.Collections.Generic;
using System.Text;
using System.ComponentModel.DataAnnotations;

namespace Sabio.Models.Requests.Advertisers
{
    class EntityUpdateRequest : IModelIdentifier
    {
        [Required]
        public int Id { get; set; }
    }
}
