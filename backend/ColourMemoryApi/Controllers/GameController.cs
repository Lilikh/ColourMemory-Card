using Microsoft.AspNetCore.Mvc;
using ColourMemoryApi.Models;
using Microsoft.AspNetCore.Cors;

namespace ColourMemoryApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("AllowAll")]
    public class GameController : ControllerBase
    {
        private static readonly Dictionary<string, Game> Games = new();

        [HttpPost("start")]
        public IActionResult StartGame()
        {
            try
            {
                var game = new Game();
                Games[game.Id] = game;
                return Ok(new { gameId = game.Id });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        [HttpGet("{id}")]
        public IActionResult GetGame(string id)
        {
            if (Games.TryGetValue(id, out var game))
            {
                return Ok(game);
            }
            return NotFound();
        }

        [HttpPost("{id}/flip")]
        public async Task<IActionResult> FlipCard(string id, [FromBody] FlipRequest request)
        {
            if (request.CardId == null) return BadRequest("CardId is required");
            if (Games.TryGetValue(id, out var game))
            {
                await game.FlipCardAsync(request.CardId);
               
                return Ok(game);
            }
            return NotFound();
        }
    }

    public class FlipRequest
    {
        public string? CardId { get; set; }
    }
}
