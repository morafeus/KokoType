using KokoType.UserService.DAL.Models;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Microsoft.EntityFrameworkCore;


namespace KokoType.UserService.DAL.Configuration
{
    public class RoleConfiguration : IEntityTypeConfiguration<Role>
    {
        public void Configure(EntityTypeBuilder<Role> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.RoleName).IsRequired();
        }
    }
}
