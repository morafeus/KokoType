using KokoType.TestService.DAL.Models;
using Microsoft.EntityFrameworkCore;

namespace KokoType.TestService.DAL.Context
{
    public class TestContext : DbContext
    {
        DbSet<Statistic> Statistics { get; set; }

        public TestContext(DbContextOptions<TestContext> options) : base(options) { }
    }
}
