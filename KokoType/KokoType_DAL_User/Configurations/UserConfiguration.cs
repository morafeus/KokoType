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
    public class UserConfiguration : IEntityTypeConfiguration<User>
    {
        public void Configure(EntityTypeBuilder<User> builder)
        {
            builder.Property(x => x.Id).IsRequired();
            builder.Property(x=> x.UserName).HasMaxLength(50);
            builder.Property(x=> x.Login).IsRequired().HasMaxLength(50);
            builder.Property(x=> x.Password).IsRequired().HasMaxLength(30);
        }
    }
}
