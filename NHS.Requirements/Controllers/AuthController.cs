using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.EntityFrameworkCore;
using BCrypt.Net;
using NHS.Api.Models;
using NHS.Api.DAL; // Correct using directive

[ApiController]
[Route("")]
public class AuthController : ControllerBase
{
    private readonly RequirementContext _context; // Replace with your DbContext

    public AuthController(RequirementContext context)
    {
        _context = context;
    }

    [HttpPost("login")]
    public async Task<ActionResult> Login([FromBody] User user)
    {
        var dbUser = await _context.Users.FirstOrDefaultAsync(u => u.Username == user.Username);

        if (dbUser != null && VerifyPasswordHash(user.Password, dbUser.PasswordHash))
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("strong-secret-la-la-la"); // Use a secure key
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[] { new Claim("id", dbUser.Id.ToString()) }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return Ok(new { Token = tokenHandler.WriteToken(token) });
        }
        else
        {
            return Unauthorized();
        }
    }

    private bool VerifyPasswordHash(string password, string storedHash)
    {
        return BCrypt.Net.BCrypt.Verify(password, storedHash);
    }
}
