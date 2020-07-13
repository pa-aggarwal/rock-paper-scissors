/**
 * Generate random string representing the computer's play.
 * @return {String} - One of ["Rock", "Paper", "Scissors"].
 */
function computerPlay() {
    const gameActionsArr = ['Rock', 'Paper', 'Scissors'];
    const randInt = Math.floor(Math.random() * 3);
    return gameActionsArr[randInt];  // Returns random action.
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

    return (playerWins) ? 'Player' : 'Computer';
}

/**
 * Play a single round of rock-paper-scissors.
 * @param  {String} playerSelection   - One of ["rock", "paper", "scissors"]
 * @param  {String} computerSelection - One of ["rock", "paper", "scissors"]
 * @return {String}                   - Winner of current round or draw.
 */
function playRound(playerSelection, computerSelection) {
    // Player selections are case insensitive.
    playerSelection = playerSelection.toLowerCase();
    computerSelection = computerSelection.toLowerCase();

    return (playerSelection === computerSelection) ?
            'Draw!' : findWinner(playerSelection, computerSelection);
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
