using System.Collections.Generic;
using Sabio.Models;
using Sabio.Data.Providers;
using Sabio.Data;
using System.Data;
using System.Data.SqlClient;
using Sabio.Models.Requests.Advertisers;
using Sabio.Models.Domain;

namespace Sabio.Models.Domain
{
    public class AdvertisersService : IAdvertisersService
    {
        IDataProvider _data = null;

        public AdvertisersService(IDataProvider data)
        {
            _data = data;
        }


        public int Add(AdvertisersAddRequest model, int userId)
        {
            int id = 0;

            string procName = "dbo.Sabio_Advertisers_Insert";

            _data.ExecuteNonQuery(procName, inputParamMapper: delegate (SqlParameterCollection col)
            {
                AddCommonParams(model, col);
                col.AddWithValue("@CreatedBy", userId);

                SqlParameter idOut = new SqlParameter("@Id", SqlDbType.Int);
                idOut.Direction = ParameterDirection.Output;

                col.Add(idOut);
            }, returnParameters: delegate (SqlParameterCollection returnCollection)
            {
                object oId = returnCollection["@Id"].Value;
                int.TryParse(oId.ToString(), out id);
            });
            return id;
        }

        private static Advertisers MapAdvertisers(IDataReader reader)
        {
            Advertisers aAdvertisers = new Advertisers();

            int startingIndex = 0;

            aAdvertisers.Id = reader.GetSafeInt32(startingIndex++);
            aAdvertisers.ShortTitle = reader.GetSafeString(startingIndex++);
            aAdvertisers.Title = reader.GetSafeString(startingIndex++);
            aAdvertisers.ShortDescription = reader.GetSafeString(startingIndex++);
            aAdvertisers.Content = reader.GetSafeString(startingIndex++);
            aAdvertisers.Slug = reader.GetSafeString(startingIndex++);
            aAdvertisers.EntityTypeId = reader.GetSafeInt32(startingIndex++);
            aAdvertisers.StatusId = reader.GetSafeInt32(startingIndex++);
            aAdvertisers.DateCreated = reader.GetSafeDateTime(startingIndex++);
            aAdvertisers.DateModified = reader.GetSafeDateTime(startingIndex++);
            aAdvertisers.BaseMetaData = reader.GetSafeInt32(startingIndex++);


            return aAdvertisers;
        }

        private static void AddCommonParams(AdvertisersAddRequest model, SqlParameterCollection col)
        {
            col.AddWithValue("@ShortTitle", model.ShortTitle);
            col.AddWithValue("@Title", model.Title);
            col.AddWithValue("@ShortDescription", model.ShortDescription);
            col.AddWithValue("@Content", model.Content);
            col.AddWithValue("@Slug", model.Slug);
            col.AddWithValue("@EntityTypeId", model.EntityTypeId);
            col.AddWithValue("@StatusId", model.StatusId);
            col.AddWithValue("@baseMetaData", model.BaseMetaData);
        }
    }
}