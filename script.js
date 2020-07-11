/**
 * Generate random string representing computer's play.
 * @return {String} - One of ["Rock", "Paper", "Scissors"].
 */
function computerPlay() {
    const gameActionsArr = ["Rock", "Paper", "Scissors"];
    const randInt = Math.floor(Math.random() * 3);
    return gameActionsArr[randInt];  // Returns random action.
}

/**
 * Return a message telling the player if they won the current round.
 * @param  {String} player   - One of ["rock", "paper", "scissors"]
 * @param  {String} computer - One of ["rock", "paper", "scissors"]
 * @return {String}          - Message describing who won.
 */
function findWinner(player, computer) {
    const isComputerScissors = (computer === "scissors");
    const isComputerRock = (computer === "rock");
    let matchResult;
    let playerResult;

    if (player === "rock") {
        matchResult = (isComputerScissors) ?    // Computer is scissors/paper.
            "Rock beats Scissors" : "Paper beats Rock";
        playerResult = (isComputerScissors) ? "Win" : "Lose";
    } else if (player === "paper") {
        matchResult = (isComputerScissors) ?    // Computer is scissors/rock.
            "Scissors beats Paper" : "Paper beats Rock";
        playerResult = (isComputerScissors) ? "Lose" : "Win";
    } else {
        matchResult = (isComputerRock) ?        // Computer is rock/paper.
            "Rock beats Scissors" : "Scissors beats Paper";
        playerResult = (isComputerRock) ? "Lose" : "Win";
    }

    return `The player ${playerResult}s! ${matchResult}`;
}

/**
 * Play a single round of rock-paper-scissors.
 * @param  {String} playerSelection   - One of ["rock", "paper", "scissors"]
 * @param  {String} computerSelection - One of ["rock", "paper", "scissors"]
 * @return {String}                   - Results of the current round.
 */
function playRound(playerSelection, computerSelection) {
    // Player selections are case insensitive.
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    return (playerSelection === computerSelection) ?
        "Tie! Try again." : findWinner(playerSelection, computerSelection);
}

/**
 * Play rock-paper-scissors game for 5 rounds between player and computer.
 */
function playGame() {
     // Variables keeping track of wins, winner of game.
     let playerWins = 0;
     let computerWins = 0;
     let gameWinner;

     // Play the game for 5 rounds.
     for (let i = 0; i < 5; i++) {
         // Play single round and report winner.
         let playerSelection = prompt(`Play "rock", "paper", or "scissors"`);
         let roundResult = playRound(playerSelection, computerPlay());
         console.log(roundResult);
         // Increment respective player counters based on round winner.
         if (roundResult.indexOf("Tie") >= 0) {
             continue;
         } else if (roundResult.indexOf("Win") >= 0) {
             playerWins++;
         } else {
             computerWins++;
         }
     }

     // Final winner message.
     if (playerWins === computerWins) {
         gameWinner = "Nobody won. Tie game!";
     } else if (playerWins > computerWins) {
         gameWinner = "PLAYER WINS!";
     } else {
         gameWinner = "COMPUTER WINS.";
     }

     console.log(gameWinner);
}
