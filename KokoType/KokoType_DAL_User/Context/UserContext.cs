using KokoType_DAL_User.Configurations;
using KokoType_DAL_User.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType_DAL_User.Context
{
    public class UserContext : DbContext
    {
        public DbSet<User> Users { get; set; }
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
