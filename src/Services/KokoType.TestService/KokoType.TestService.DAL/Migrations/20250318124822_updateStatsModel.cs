using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KokoType.TestService.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateStatsModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "DateTime",
                table: "Statistics",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "ExpCount",
                table: "Statistics",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "DateTime",
                table: "Statistics");

            migrationBuilder.DropColumn(
                name: "ExpCount",
                table: "Statistics");
        }
    }
}
