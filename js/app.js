/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var score, roundScore, activePlayer, dice, gamePlaying, winningScore, varCheck;

init();

document.querySelector('.btn-roll').addEventListener('click', function(){
    if(gamePlaying){
        // Random Number
        dice = Math.floor(Math.random() * 6) + 1;

        // Display the result and pick the dice image from the files
        var diceDOM = document.querySelector('.dice');
        diceDOM.style.display = 'block';
        diceDOM.src = 'dice-' + dice + '.png';

        // Update round score
        if (dice !== 1 ){
                //Add Score
                roundScore += dice;
                document.querySelector('#current-'+activePlayer).textContent = roundScore;
        }
        else{
            nextPlayer();
        }
    }
});

document.querySelector('.btn-hold').addEventListener('click', function(){
    if(gamePlaying){
        
        scores[activePlayer] += roundScore;
        
        document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

        if(scores[activePlayer] >= winningScore){
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
            gamePlaying = false;
        }
        else {
            nextPlayer();
        }
    }
});

document.querySelector('.btn-new').addEventListener('click', init);

function nextPlayer(){
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current-0').textContent = '0';
    document.getElementById('current-1').textContent = '0';
    
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    document.querySelector('.dice').style.display = 'none';
}

function init(){
    varCheck = prompt('Enter the winning score!');
    if (varCheck == "" || varCheck == null || varCheck === '0' || typeof varCheck === 'undefined' || varCheck.indexOf(' ') >= 0){
        location.reload();
    } else if (!Number.isInteger(varCheck)) {
        console.log("It's not integer!");
    }
    winningScore = varCheck;
    /*varCheck = prompt('Enter the winning score!');
    if(varCheck === undefined){
        alert("Please enter the winning score in form of a number!");
        location.reload();
    }
    else{
        winningScore = prompt('Enter the winning score!');
    }*/
    scores = [0,0];
    roundScore = 0;
    activePlayer = 0;
    gamePlaying = true;
    document.querySelector('#score-0').textContent = '0';
    document.querySelector('#score-1').textContent = '0';
    document.querySelector('#current-0').textContent = '0';
    document.querySelector('#current-1').textContent = '0';
    document.getElementById('name-0').textContent = 'Player 1!';
    document.getElementById('name-1').textContent = 'Player 2!';
    document.querySelector('.player-0-panel').classList.remove('winner');
    document.querySelector('.player-1-panel').classList.remove('winner');
    document.querySelector('.player-0-panel').classList.remove('active');
    document.querySelector('.player-1-panel').classList.remove('active');
    document.querySelector('.player-0-panel').classList.add('active');
}
