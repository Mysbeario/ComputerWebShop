using DTO;
using System.Data.SQLite;
using System;
using System.Collections.Generic;

namespace DAL
{
	public class ImportDAL
	{
		private static string table = "import";
		private static string subTable = "importDetails";

		private static Import extractData(SQLiteDataReader reader)
		{
			Import ticket = new Import();
			ticket.Id = reader.GetInt32(0);
			ticket.Staff = StaffDAL.GetById(reader.GetInt32(1));
			ticket.Date = reader.GetString(2);

			string detailsQuery = $"SELECT * FROM {subTable} WHERE ticketId = @ticketId";
			SQLiteCommand detailsCommand = new SQLiteCommand(detailsQuery, DAL.Conn);

			detailsCommand.Parameters.AddWithValue("@ticketId", ticket.Id);

			SQLiteDataReader detailsReader = detailsCommand.ExecuteReader();

			while (detailsReader.HasRows)
			{
				while (detailsReader.Read())
				{
					TicketDetails details = new TicketDetails();
					details.Ticket = ticket;
					details.Product = ProductDAL.GetById(detailsReader.GetInt32(1));
					details.Amount = detailsReader.GetInt32(2);

					ticket.Details.Add(details);
				}

				detailsReader.NextResult();
			}

			return ticket;
		}

		public static List<Import> GetAll(int productId = 0)
		{
			string productQuery = "";

			if (productId != 0)
			{
				productQuery = $"WHERE {subTable}.productId = {productId}";
			}

			DAL.ConnectDb();

			List<Import> data = new List<Import>();
			string query = $"SELECT * FROM {table} JOIN {subTable} ON {table}.id = {subTable}.ticketId {productQuery} GROUP BY {subTable}.ticketId";
			SQLiteCommand command = new SQLiteCommand(query, DAL.Conn);
			SQLiteDataReader reader = command.ExecuteReader();

			while (reader.HasRows)
			{
				while (reader.Read())
				{
					data.Add(extractData(reader));
				}

				reader.NextResult();
			}


			return data;
		}

		public static int Create(Import ticket)
		{
			DAL.ConnectDb();

			string ticketQuery =
							$"INSERT INTO {table} (staffId, date) VALUES (@staffId, @date)";
			SQLiteCommand ticketCommand = new SQLiteCommand(ticketQuery, DAL.Conn);

			ticketCommand.Parameters.AddWithValue("@staffId", ticket.Staff.Id);
			ticketCommand.Parameters.AddWithValue("@date", ticket.Date);
			ticketCommand.ExecuteNonQuery();

			ticket.Id = Convert.ToInt32(DAL.Conn.LastInsertRowId);

			foreach (TicketDetails detail in ticket.Details)
			{
				String detailQuery = $"INSERT INTO {subTable} (ticketId, productId, amount) VALUES (@ticketId, @productId, @amount)";
				SQLiteCommand detailCommand = new SQLiteCommand(detailQuery, DAL.Conn);

				detailCommand.Parameters.AddWithValue("@ticketId", ticket.Id);
				detailCommand.Parameters.AddWithValue("@productId", detail.Product.Id);
				detailCommand.Parameters.AddWithValue("@amount", detail.Amount);
				detailCommand.ExecuteNonQuery();

				Product product = ProductDAL.GetById(detail.Product.Id);

				product.Amount += detail.Amount;
				ProductDAL.Update(product);
			}

			return ticket.Id;
		}

		public static Import GetById(int id)
		{
			DAL.ConnectDb();

			Import ticket = null;
			string query = $"SELECT * FROM {table} WHERE id = @id";
			SQLiteCommand command = new SQLiteCommand(query, DAL.Conn);

			command.Parameters.AddWithValue("@id", id);

			SQLiteDataReader reader = command.ExecuteReader();

			while (reader.Read())
			{
				ticket = extractData(reader);
			}


			return ticket;
		}
	}
}