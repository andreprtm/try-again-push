'use strict';

// Selecting Element
const player0Element = document.querySelector('.player--0');
const player1Element = document.querySelector('.player--1');
const score0Element = document.getElementById('score--0');
const score1Element = document.getElementById('score--1');
const currentNumber0 = document.getElementById('current--0');
const currentNumber1 = document.getElementById('current--1');

const diceElement = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let playerScores, currentScore, activePlayer, playing;

// Starting Point
function init() {
  playerScores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Element.textContent = 0;
  score1Element.textContent = 0;
  currentNumber0.textContent = 0;
  currentNumber1.textContent = 0;
  diceElement.classList.add('hidden');
  player0Element.classList.add('player--active');
  player0Element.classList.remove('player--winner');
  player1Element.classList.remove('player--active');
  player1Element.classList.remove('player--winner');
}
init();

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Element.classList.toggle('player--active');
  player1Element.classList.toggle('player--active');
}

// Rolling Dice Function
btnRoll.addEventListener('click', function () {
  if (playing) {
    const diceNumber = Math.trunc(Math.random() * 6) + 1;
    diceElement.classList.remove('hidden');
    diceElement.src = `dice-${diceNumber}.png`;
    if (diceNumber !== 1) {
      currentScore = currentScore + diceNumber;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

// Holding position button
btnHold.addEventListener('click', function () {
  if (playing) {
    playerScores[activePlayer] = playerScores[activePlayer] + currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      playerScores[activePlayer];

    if (playerScores[activePlayer] >= 100) {
      playing = false;
      diceElement.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', function () {
  init();
});

/*
 * NOTES
 * YOU DON'T HAVE TO STORE ALL HTML ELEMENT TO VARIABLE
 * YOU CAN ACCESS THEM DIRECTLY INSIDE LOCAL SCOPE WITHOUT NEEDING TO STORE IT FIRST IN VARIABLE
 */
