/* GLOBAL CONSTANTS */

// Player's buttons stored in array
const BUTTONS = [...document.querySelectorAll('.player .action-button')];
const WINNING_SCORE = 5;

/* FUNCTIONS */

/**
 * Generate random string representing the computer's play.
 * @return {String} - One of ['Rock', 'Paper', 'Scissors'].
 */
function computerPlay() {
    const gameActionsArr = ['Rock', 'Paper', 'Scissors'];
    const randInt = Math.floor(Math.random() * 3);
    return gameActionsArr[randInt];  // Returns random action.
}

/**
 * Update an element's class list to show a player's play for the current round.
 * @param {Object} classList    - DOMTokenList of classes applied to element.
 * @param {String} newSelection - One of ['rock', 'paper', 'scissors'].
 */
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
 * @param  {String} player   - One of ['rock', 'paper', 'scissors']
 * @param  {String} computer - One of ['rock', 'paper', 'scissors']
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
 * Play a single round of the game, updating the round results as necessary.
 */
function playRound() {
    // 'this' refers to button element calling this function.
    const playerSelection = this.textContent.toLowerCase();
    const computerSelection = computerPlay().toLowerCase();
    // Element (containing each player's action) class lists
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
}

// Add event listener to each button.
for (let i = 0; i < BUTTONS.length; i++) {
    BUTTONS[i].addEventListener('click', playRound);
}
