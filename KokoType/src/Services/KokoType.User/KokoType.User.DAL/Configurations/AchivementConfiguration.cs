using KokoType.User.DAL.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace KokoType.User.DAL.Configurations
{
    public class AchivementConfiguration : IEntityTypeConfiguration<Achivement>
    {
        public void Configure(EntityTypeBuilder<Achivement> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x => x.Name).IsRequired().HasMaxLength(40);
            builder.Property(x => x.Condition).IsRequired().HasMaxLength(100);

        }
    }
}
