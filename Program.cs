using Microsoft.EntityFrameworkCore;
using MemoryCardGame.Data;
using MemoryCardGame.Repositories;
using MemoryCardGame.Controllers;
using MemoryCardGame.Entities;
using MemoryCardGame.Services;
using Microsoft.AspNetCore.Identity;


var builder = WebApplication.CreateBuilder(args);
IConfiguration configuration = builder.Configuration;

string secretKey = SecretKeyInitializer.InitializeSecretKey();

builder.Services.AddDbContext<GameDbContext>(options =>
{
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});


builder.Services.AddRazorPages();
builder.Services.AddControllers();

builder.Services.AddScoped<AverageMovesRepository>();
builder.Services.AddScoped<AverageTimeRepository>();
builder.Services.AddScoped<ImageRepository>();
builder.Services.AddScoped<UserRepository>();

builder.Services.AddScoped<AverageMovesController>();
builder.Services.AddScoped<AverageTimeController>();
builder.Services.AddScoped<ImageController>();
builder.Services.AddScoped<UserController>();

builder.Services.AddScoped<SignupService>();
builder.Services.AddScoped<SecretKeyGenerator>();
builder.Services.AddScoped<SecretKeyInitializer>();
builder.Services.AddScoped<GenerateTokenService>();
builder.Services.AddScoped<ImageService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddScoped<IPasswordHasher<User>, PasswordHasher<User>>();

builder.Services.AddSingleton(_ => secretKey);


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseStaticFiles();

app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapRazorPages();
});


app.MapControllers();


app.Run();
