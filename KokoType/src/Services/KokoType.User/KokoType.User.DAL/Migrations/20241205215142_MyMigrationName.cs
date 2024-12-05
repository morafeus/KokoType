using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace KokoType.User.DAL.Migrations
{
    /// <inheritdoc />
    public partial class MyMigrationName : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Achives",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: false),
                    Condition = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false),
                    Description = table.Column<string>(type: "longtext", nullable: false),
                    Name = table.Column<string>(type: "varchar(40)", maxLength: 40, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achives", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Roles",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    RoleName = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Roles", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Users",
                columns: table => new
                {
                    Id = table.Column<Guid>(type: "char(36)", nullable: false),
                    Email = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    Password = table.Column<string>(type: "longtext", nullable: false),
                    UserName = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false),
                    About = table.Column<string>(type: "longtext", nullable: false),
                    ImageUrl = table.Column<string>(type: "longtext", nullable: false),
                    RegistrateDate = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UserLvl = table.Column<int>(type: "int", nullable: false),
                    UserExp = table.Column<int>(type: "int", nullable: false),
                    RefreshToken = table.Column<string>(type: "longtext", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Users", x => x.Id);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "AchivementUserModel",
                columns: table => new
                {
                    AchivesId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UsersId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AchivementUserModel", x => new { x.AchivesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_AchivementUserModel_Achives_AchivesId",
                        column: x => x.AchivesId,
                        principalTable: "Achives",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AchivementUserModel_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "RoleUserModel",
                columns: table => new
                {
                    RolesId = table.Column<Guid>(type: "char(36)", nullable: false),
                    UsersId = table.Column<Guid>(type: "char(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RoleUserModel", x => new { x.RolesId, x.UsersId });
                    table.ForeignKey(
                        name: "FK_RoleUserModel_Roles_RolesId",
                        column: x => x.RolesId,
                        principalTable: "Roles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RoleUserModel_Users_UsersId",
                        column: x => x.UsersId,
                        principalTable: "Users",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_AchivementUserModel_UsersId",
                table: "AchivementUserModel",
                column: "UsersId");

            migrationBuilder.CreateIndex(
                name: "IX_RoleUserModel_UsersId",
                table: "RoleUserModel",
                column: "UsersId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AchivementUserModel");

            migrationBuilder.DropTable(
                name: "RoleUserModel");

            migrationBuilder.DropTable(
                name: "Achives");

            migrationBuilder.DropTable(
                name: "Roles");

            migrationBuilder.DropTable(
                name: "Users");
        }
    }
}
