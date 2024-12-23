using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KokoType.Tests.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateStatsTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Statistics",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Accuracy = table.Column<float>(type: "float", nullable: false),
                    Speed = table.Column<float>(type: "float", nullable: false),
                    Decription = table.Column<string>(type: "longtext", nullable: false),
                    Errors = table.Column<string>(type: "longtext", nullable: false),
                    UserId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Statistics", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Statistics");
        }
    }
}
