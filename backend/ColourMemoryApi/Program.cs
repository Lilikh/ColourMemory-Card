using ColourMemoryApi.Models;
using Microsoft.AspNetCore.Cors;

var builder = WebApplication.CreateBuilder(args);

// ✳️ Add this to make sure it works on Fly.io (bind to port 8080)
builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(8080); // Fly requires this
});

// Enable CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    });
});

builder.Services.AddControllers();

var app = builder.Build();

app.UseRouting();        
app.UseCors("AllowAll"); 
app.MapControllers();    

// Optional: add this simple route for testing root
app.MapGet("/", () => "Backend is running!");

app.Run();
