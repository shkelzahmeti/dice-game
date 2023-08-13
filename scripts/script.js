// Element Selection:
const score0EL = document.querySelector("#score--0"); //total score
const score1EL = document.querySelector("#score--1"); //total score
const diceEl = document.querySelector(".dice"); //dice image
const current0El = document.querySelector("#current--0"); //current score
const current1El = document.querySelector("#current--1"); //current score
const btnNewEl = document.querySelector(".btn--new"); //new game
const btnRollEl = document.querySelector(".btn--roll"); //roll dice
const btnHoldEl = document.querySelector(".btn--hold"); //hold score
const player0El = document.querySelector(".player--0"); //player section select
const player1El = document.querySelector(".player--1"); //player section select

// First Conditions:
score0EL.textContent = 0;
score1EL.textContent = 0;
diceEl.classList.add("hidden");

currentScore = 0;
activePlayer = 0;
scores = [0, 0];
playing = true;

// Initialization function (set back to default state):
const init = function () {
  score0EL.textContent = 0;
  score1EL.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  currentScore = 0;
  activePlayer = 0;
  scores = [0, 0];
  playing = true;
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};
init();

// Switch player function:
const switchPlayer = function () {
  currentScore = 0;
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

// Roll Dice Functionality:
btnRollEl.addEventListener("click", function () {
  if (playing) {
    // 1. Generate and display random dice roll:
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `./dice-${dice}.png `;

    //2: Is it a 1?
    if (dice !== 1) {
      // add dice to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // switch player
      switchPlayer();
    }
  }
});

// Hold Score:

btnHoldEl.addEventListener("click", function () {
  if (playing) {
    // 1. Add current score to total score
    scores[activePlayer] += currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent =
      scores[activePlayer];

    // 2. If score >= 100
    if (scores[activePlayer] >= 100) {
      playing = false;
      // Current player wins
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
      diceEl.classList.add("hidden");
    } else {
      // Switch player
      switchPlayer();
    }
  }
});

// New Game:

btnNewEl.addEventListener("click", init);
