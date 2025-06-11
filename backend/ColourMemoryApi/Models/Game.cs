using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ColourMemoryApi.Models
{
    public class Game
    {
        public string Id { get; set; } = Guid.NewGuid().ToString();
        public List<Card> Cards { get; set; } = new List<Card>();
        public int Score { get; set; } = 0;
        public int Attempts { get; set; } = 0;
        public bool IsGameOver { get; set; } = false;
        public string? SelectedCard1 { get; set; }
        public string? SelectedCard2 { get; set; }

        public Game()
        {
            InitializeBoard();
        }

        private void InitializeBoard()
        {
            var hexColors = new[] {
                "#FF0000", "#00FF00", "#0000FF", "#FFFF00",
                "#FF00FF", "#00FFFF", "#FFA500", "#800080",
            };
            var cardList = new List<string>();
            foreach (var color in hexColors)
            {
                cardList.Add(color);
                cardList.Add(color);
            }
            var rng = new Random();
            Cards = cardList.Select((color, index) => new Card
            {
                Id = index.ToString(),
                Color = color,
                IsFlipped = false,
                IsMatched = false
            }).OrderBy(_ => rng.Next()).ToList();
        }

        public async Task FlipCardAsync(string cardId)
        {
            var card = Cards.Find(c => c.Id == cardId);
            if (card == null || card.IsMatched || IsGameOver) return;

            card.IsFlipped = true;
            Attempts++;

            if (SelectedCard1 == null)
            {
                SelectedCard1 = cardId;
            }
            else if (SelectedCard2 == null)
            {
                SelectedCard2 = cardId;
                var card1 = Cards.Find(c => c.Id == SelectedCard1);
                if (card1 != null)
                {
                    await Task.Delay(1000); 
                    if (card1.Color == card.Color)
                    {
                        card.IsMatched = true;
                        card1.IsMatched = true;
                        Score += 1;
                    }
                    else
                    {
                        card.IsFlipped = false;
                        card1.IsFlipped = false;
                    }
                    SelectedCard1 = null;
                    SelectedCard2 = null;
                }
            }

            IsGameOver = Cards.All(c => c.IsMatched) || Attempts >= 16;
        }
    }

    public class Card
    {
        public required string Id { get; set; }
        public required string Color { get; set; }
        public bool IsFlipped { get; set; }
        public bool IsMatched { get; set; }
    }
}