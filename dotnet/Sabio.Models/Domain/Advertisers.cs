using Sabio.Models.Domain;
using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Text;


namespace Sabio.Models.Domain
{
    public class Advertisers

    {
        public int Id { get; set; }

        public string ShortTitle { get; set; }

        public string Title { get; set; }

        public string ShortDescription { get; set; }

        public string Content { get; set; }

        public string Slug { get; set; }

        public int EntityTypeId { get; set; }

        public int StatusId { get; set; }

        public DateTime DateCreated { get; set; }

        public DateTime DateModified { get; set; }

        public int BaseMetaData { get; set; }
    }
}