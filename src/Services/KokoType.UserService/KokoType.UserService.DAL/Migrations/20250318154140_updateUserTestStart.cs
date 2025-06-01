using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KokoType.UserService.DAL.Migrations
{
    /// <inheritdoc />
    public partial class updateUserTestStart : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "TestStarted",
                table: "Users",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "TestStarted",
                table: "Users");
        }
    }
}
