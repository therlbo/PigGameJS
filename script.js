"use strict";

// Both work exactly the same, getElementById is slightly faster (useful in a large number of elements)
// Selecting elements
const player0Ele = document.querySelector(".player--0");
const player1Ele = document.querySelector(".player--1");
const score0Ele = document.querySelector("#score--0");
const score1Ele = document.getElementById("score--1");
const current0Ele = document.getElementById("current--0");
const current1Ele = document.getElementById("current--1");

const diceEle = document.querySelector(".dice");
const btnNew = document.querySelector(".btn--new");
const btnRoll = document.querySelector(".btn--roll");
const btnHold = document.querySelector(".btn--hold");

// Starting conditions
// score0Ele.textContent = 0;
// score1Ele.textContent = 0;
// diceEle.classList.add('hidden');

// Alternative method to delcaring multiple variables
// let scores, currentScore, activePlayer, playing;

let scores = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

// Transferred all init coniditons into function
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0Ele.textContent = 0;
  score1Ele.textContent = 0;
  current0Ele.textContent = 0;
  current1Ele.textContent = 0;

  diceEle.classList.add("hidden");
  player0Ele.classList.remove("player--winner");
  player1Ele.classList.remove("player--winner");
  player0Ele.classList.add("active--player");
  player1Ele.classList.remove("active--player");
};

init();

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0Ele.classList.toggle("player--active");
  player1Ele.classList.toggle("player--active");
};

// Rolling dice functionality
btnRoll.addEventListener("click", function () {
  if (playing) {
    // 1. Generate random dice roll (1-6)
    const dice = Math.trunc(Math.random() * 6) + 1;
    // 2. Display dice roll
    diceEle.classList.remove("hidden");
    diceEle.src = `dice-${dice}.png`;
    // 3. Check for a 1; if true, switch to next player
    if (dice !== 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnHold.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to active players score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // 2. Check if player's score is >= 100 : if so, finish game
    if (scores[activePlayer] >= 20) {
      // Finish the game
      playing = false;
      diceEle.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      // If not, switch players
      switchPlayer();
    }
  }
});

btnNew.addEventListener("click", init);
