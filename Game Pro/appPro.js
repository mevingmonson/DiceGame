/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, gamePlaying;
var diceDOM1 = document.getElementById("dice-1");
var diceDOM2 = document.getElementById("dice-2");
var score0 = document.getElementById("score-0");
var score1 = document.getElementById("score-1");
var current0 = document.getElementById("current-0");
var current1 = document.getElementById("current-1");

initGame();

document.querySelector(".btn-roll").addEventListener("click", function () {
  if (gamePlaying) {
    var dice1 = Math.floor(Math.random() * 6 + 1);
    var dice2 = Math.floor(Math.random() * 6 + 1);
    diceDOM1.style.display = "block";
    diceDOM2.style.display = "block";

    diceDOM1.src = "images/dice-" + dice1 + ".png";
    diceDOM2.src = "images/dice-" + dice2 + ".png";

    if (dice1 === 1 && dice2 === 1) {
      nextPlayer();
    } else {
      roundScore += dice1 + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = roundScore;
    }
  }
});

document.querySelector(".btn-hold").addEventListener("click", function () {
  if (gamePlaying) {
    // update the score
    scores[activePlayer] += roundScore;
    document.querySelector("#score-" + activePlayer).textContent = scores[activePlayer];

    var input = document.querySelector('.final-score').value;
    var winningScore;

    // undefined null 0 "" are coerced to false
    // Anything else is coerced to true
    if (input) {
      winningScore = input;
    }
    else {
      winningScore = 100;
    }
    //check the winner
    if (scores[activePlayer] >= winningScore) {
      document.querySelector("#name-" + activePlayer).textContent = "Winner!";
      diceDOM1.style.display = "none";
      diceDOM2.style.display = "none";
      document.querySelector(".player-" + activePlayer + "-panel").classList.add("winner");
      document.querySelector(".player-" + activePlayer + "-panel").classList.remove("active");
      gamePlaying = false;
    } else {
      //calling the next player
      diceDOM1.style.display = "none";
      diceDOM2.style.display = "none";
      nextPlayer();
    }
  }
});

function nextPlayer() {
  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  roundScore = 0;

  current0.textContent = "0";
  current1.textContent = "0";

  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");

  // diceDOM1.style.display = "none";
  // diceDOM2.style.display = "none";
}

document.querySelector(".btn-new").addEventListener("click", initGame);

function initGame() {
  var input = document.querySelector('.final-score').value;
  scores = [0, 0];
  roundScore = 0;
  activePlayer = 0;
  gamePlaying = true;

  diceDOM1.style.display = "none";
  diceDOM2.style.display = "none";

  score0.textContent = "0";
  score1.textContent = "0";
  current0.textContent = "0";
  current1.textContent = "0";

  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";

  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");

  document.querySelector(".player-0-panel").classList.add("active");
}
