/**
 * Generate random string representing the computer's play.
 * @return {String} - One of ["Rock", "Paper", "Scissors"].
 */
function computerPlay() {
    const gameActionsArr = ['Rock', 'Paper', 'Scissors'];
    const randInt = Math.floor(Math.random() * 3);
    return gameActionsArr[randInt];  // Returns random action.
}

function updateActionImage(classList, newSelection) {
    // Classes from style.css stylesheet.
    const actionClasses = ['rock-play', 'paper-play', 'scissors-play'];
    // Remove previous action class from classList.
    for (let i = 0; i < actionClasses.length; i++) {
        if (classList.contains(actionClasses[i])) {
            classList.remove(actionClasses[i]);
            break;
        }
    }
    // Add new action class.
    classList.add(newSelection + '-play');
}

/**
 * Return the name of the player who won the current round.
 * @param  {String} player   - One of ["rock", "paper", "scissors"]
 * @param  {String} computer - One of ["rock", "paper", "scissors"]
 * @return {String}          - Name of winning player.
 */
function findWinner(player, computer) {
    let playerWins;

    if (player === 'rock') {
        playerWins = (computer === 'scissors');
    } else if (player === 'paper') {
        playerWins = (computer !== 'scissors');
    } else {
        playerWins = (computer !== 'rock');
    }

    return (playerWins) ? 'player' : 'computer';
}

/**
 * Play a single round of rock-paper-scissors.
 */
function playRound() {
    // 'this' refers to button element calling this function.
    const playerSelection = this.textContent.toLowerCase();
    const computerSelection = computerPlay().toLowerCase();
    const classListPlayer = document.querySelector('.player-action').classList;
    const classListComp = document.querySelector('.computer-action').classList;

    updateActionImage(classListPlayer, playerSelection);
    updateActionImage(classListComp, computerSelection);

    // Tie between player and computer.
    if (playerSelection === computerSelection) {
        return;
    }

    // Update winner's score
    const winner = findWinner(playerSelection, computerSelection);
    let oldScore = +(document.querySelector(`#${ winner }-score`).textContent);
    document.querySelector(`#${ winner }-score`).textContent =
        (oldScore + 1).toString();
}

/**
 * Play rock-paper-scissors game until either the player/computer reaches the
 * required score to win.
 */
function playGame() {
     let playerScore = 0;
     let computerScore = 0;
     let gameWinner;

     // Play the game until one player reaches 5 points
     while (playerScore < 5 && computerScore < 5) {
         let playerSelection = prompt(`Play "Rock", "Paper", or "Scissors"`);
         let computerSelection = computerPlay();
         let roundResult = playRound(playerSelection, computerSelection);
         console.log(roundResult);
         // Increment respective player counters based on round winner.
         if (roundResult === 'Draw!') {
             continue;
         } else if (roundResult === 'Player') {
             console.log(`${ playerSelection } beats ${ computerSelection }`);
             playerScore++;
         } else {
             console.log(`${ computerSelection } beats ${ playerSelection }`);
             computerScore++;
         }
     }

     if (playerScore === computerScore) {
         gameWinner = 'Nobody won. Tie game!';
     } else if (playerScore > computerScore) {
         gameWinner = 'PLAYER WINS!';
     } else {
         gameWinner = 'COMPUTER WINS.';
     }

     console.log(gameWinner);
}

const buttons = [...document.querySelectorAll('.player .action-button')];
for (let i = 0; i < buttons.length; i++) {
    let playerSelection = buttons[i].textContent;
    buttons[i].addEventListener('click', playRound);
}
