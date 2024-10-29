using FluentValidation.AspNetCore;
using KokoType_DAL_User.Context;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddFluentValidationAutoValidation();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<UserContext>(options =>
{
    options.UseMySQL("Server=localhost;Database=KokoType_UserServiceDB;Uid=root;Pwd=1234;");
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
