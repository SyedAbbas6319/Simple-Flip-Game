document.addEventListener('DOMContentLoaded', () => {
    const cards = [
        'A', 'A', 'B', 'B', 'C', 'C', 'D', 'D',
        'E', 'E', 'F', 'F', 'G', 'G', 'H', 'H'
    ];

    let hasFlippedCard = false;
    let firstCard, secondCard;
    let lockBoard = false;
    let attempts = 0;

    const memoryGame = document.querySelector('.memory-game');
    const attemptsDisplay = document.getElementById('attempts');
    const messageDisplay = document.getElementById('message');

    // Shuffle cards
    function shuffle(array) {
        array.sort(() => Math.random() - 0.5);
    }

    shuffle(cards);

    // Create card elements
    cards.forEach((letter) => {
        const card = document.createElement('div');
        card.classList.add('memory-card');
        card.innerHTML = `
            <div class="front-face">${letter}</div>
            <div class="back-face"></div>
        `;
        card.addEventListener('click', flipCard);
        memoryGame.appendChild(card);
    });

    function flipCard() {
        if (lockBoard) return;
        if (this === firstCard) return;

        this.classList.add('flip');

        if (!hasFlippedCard) {
            // First click
            hasFlippedCard = true;
            firstCard = this;
            return;
        }

        // Second click
        secondCard = this;
        checkForMatch();
    }

    function checkForMatch() {
        const isMatch = firstCard.querySelector('.front-face').textContent === secondCard.querySelector('.front-face').textContent;

        if (isMatch) {
            disableCards();
        } else {
            unflipCards();
        }

        attempts++;
        attemptsDisplay.textContent = `Attempts: ${attempts}`;
        checkGameEnd();
    }

    function disableCards() {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        resetBoard();
    }

    function unflipCards() {
        lockBoard = true;

        setTimeout(() => {
            firstCard.classList.remove('flip');
            secondCard.classList.remove('flip');

            resetBoard();
        }, 1500);
    }

    function resetBoard() {
        [hasFlippedCard, lockBoard] = [false, false];
        [firstCard, secondCard] = [null, null];
    }

    function checkGameEnd() {
        const allMatched = document.querySelectorAll('.memory-card.matched').length === cards.length;
        if (allMatched) {
            messageDisplay.textContent = "Congratulations! You've matched all pairs!";
        }
    }
});
