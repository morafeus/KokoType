using KokoType.User.DAL.Configurations;
using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.User.DAL.Context
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
            base.OnModelCreating(modelBuilder);
        }
    }
}
