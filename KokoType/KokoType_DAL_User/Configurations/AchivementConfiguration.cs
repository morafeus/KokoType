using KokoType_DAL_User.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KokoType_DAL_User.Configurations
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
