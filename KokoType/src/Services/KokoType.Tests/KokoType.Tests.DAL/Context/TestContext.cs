using KokoType.Tests.DAL.Models;
using Microsoft.EntityFrameworkCore;


namespace KokoType.Tests.DAL.Context
{
    public class TestContext : DbContext
    {
        DbSet<Statistic> Statistics { get; set; }

        public TestContext(DbContextOptions<TestContext> options) : base(options) { }
    }
}
