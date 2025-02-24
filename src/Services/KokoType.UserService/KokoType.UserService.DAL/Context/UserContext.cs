using KokoType.UserService.DAL.Configuration;
using KokoType.UserService.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.UserService.DAL.Context
{
    public class UserContext : DbContext
    {
        public DbSet<UserModel> Users { get; set; }
        public DbSet<Achivement> Achives { get; set; }
        public DbSet<Role> Roles { get; set; }

        public UserContext(DbContextOptions<UserContext> options) : base(options) { }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(UserConfiguration).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof(AchivementConfiguration).Assembly);
            modelBuilder.ApplyConfigurationsFromAssembly(typeof (RoleConfiguration).Assembly);
            base.OnModelCreating(modelBuilder);
        }
    }
}
