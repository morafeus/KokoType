using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KokoType.LessonService.DAL.Migrations
{
    /// <inheritdoc />
    public partial class LessonDBMigraion : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Lessons",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Language = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    status = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Lessons", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "LessonPages",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Text = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ErrorCount = table.Column<int>(type: "int", nullable: false),
                    lesson = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    LessonModelId = table.Column<Guid>(type: "uniqueidentifier", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonPages", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonPages_Lessons_LessonModelId",
                        column: x => x.LessonModelId,
                        principalTable: "Lessons",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "LessonResults",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    UserId = table.Column<Guid>(type: "uniqueidentifier", nullable: false),
                    Details = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    LessonId = table.Column<Guid>(type: "uniqueidentifier", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_LessonResults", x => x.Id);
                    table.ForeignKey(
                        name: "FK_LessonResults_Lessons_LessonId",
                        column: x => x.LessonId,
                        principalTable: "Lessons",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_LessonPages_LessonModelId",
                table: "LessonPages",
                column: "LessonModelId");

            migrationBuilder.CreateIndex(
                name: "IX_LessonResults_LessonId",
                table: "LessonResults",
                column: "LessonId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "LessonPages");

            migrationBuilder.DropTable(
                name: "LessonResults");

            migrationBuilder.DropTable(
                name: "Lessons");
        }
    }
}
