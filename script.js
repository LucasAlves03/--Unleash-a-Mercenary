document.addEventListener('DOMContentLoaded', function() {
  const characterImages = {
    roxo: 'img/purple.jpg',
    azul: 'img/blue.jpg',
    amarelo: 'img/yellow.jpg',
    verde: 'img/green.jpg',
    vermelho: 'img/red.jpg',
  };

  const avatarImage = 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/User-avatar.svg/2048px-User-avatar.svg.png';

  const grid = document.querySelector('.grid');
  const cards = document.querySelectorAll('.card');
  const characterPrizes = document.querySelectorAll('.prize-card');
  const foundCharacters = {
    roxo: 0,
    azul: 0,
    amarelo: 0,
    verde: 0,
    vermelho: 0,
  };

  function shuffleCharacters() {
    const characterList = Object.keys(characterImages);
    const charactersToPlace = [...characterList, 'x'];
    const characterCounts = {
      roxo: 0,
      azul: 0,
      amarelo: 0,
      verde: 0,
      vermelho: 0,
      x: 0,
    };
  
    for (let i = 0; i < cards.length; i++) {
      const randomIndex = Math.floor(Math.random() * charactersToPlace.length);
      const randomCharacter = charactersToPlace[randomIndex];
  
      if (randomCharacter === 'x') {
        cards[i].style.backgroundImage = 'url(img/not.jpg)';
      } else {
        if (characterCounts[randomCharacter] < getCharacterCountLimit(randomCharacter)) {
          characterCounts[randomCharacter]++;
          cards[i].style.backgroundImage = `url(${characterImages[randomCharacter]})`;
          cards[i].setAttribute('data-character', randomCharacter);
        } else {
          charactersToPlace.splice(randomIndex, 1);
          i--; // Repita esta posição
        }
      }
     
      if (i === 6 || i === 7 || i === 13 || i === 14) {
        if (i === 7 || i === 14) {
          if (charactersToPlace[0] === 'x') {
            charactersToPlace.push(charactersToPlace.shift());
          }
        }
        i += 6;
      }
    }
  }
  function shuffleCards() {
    for (let i = cards.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        const temp = cards[i].style.backgroundImage;
        cards[i].style.backgroundImage = cards[j].style.backgroundImage;
        cards[j].style.backgroundImage = temp;
    }
}

shuffleCharacters();
shuffleCards();

  function updateCharacterProgress(character) {
    const characterCount = foundCharacters[character];
    const characterPrize = document.getElementById(`${character}-prize`);
    const characterProgress = characterPrize.querySelector('.progress-bar');
    characterProgress.classList.add(`${character}-character`);
    characterProgress.style.width = `${(characterCount / getCharacterCountLimit(character)) * 100}%`;
    const characterDesc = characterPrize.querySelector('.desc');
    characterDesc.querySelector('h2').textContent = `${characterCount}/${getCharacterCountLimit(character)}`;
  }

  function getCharacterCountLimit(character) {
    switch (character) {
      case 'roxo':
        return 3;
      case 'azul':
        return 3;
      case 'amarelo':
        return 5;
      case 'verde':
        return 6;
      case 'vermelho':
        return 7;
      default:
        return 0;
    }
  }

  cards.forEach((card) => {
    card.addEventListener('click', () => revealCard(card));
    card.style.backgroundImage = `url(${avatarImage})`;
  });

  const characterVictoryImages = {
    roxo: 'img/prize-purple.jpg',
    azul: 'img/prize-blue.jpg',
    amarelo: 'img/prize-yellow.jpg',
    verde: 'img/prize-green.jpg',
    vermelho: 'img/prize-red.jpg',
};

  function revealCard(card) {
    if (!card.classList.contains('revealed')) {
        const character = card.getAttribute('data-character');
        if (character) {
            card.style.backgroundImage = `url(${characterImages[character]}`;
            card.classList.add('revealed');
            foundCharacters[character]++;

            if (foundCharacters[character] === getCharacterCountLimit(character)) {
                const popup = document.getElementById('character-popup');
                
                const imageVitoria = popup.querySelector('.popup-image');
                imageVitoria.src = characterVictoryImages[character];
                popup.style.display = 'flex';
            }

            updateCharacterProgress(character);
        } else {
            card.style.backgroundImage = 'url(img/not.jpg)';
        }
    }
}

document.querySelector('.close-popup').addEventListener('click', () => {
    const popup = document.getElementById('character-popup');
    popup.style.display = 'none';
});
}); 