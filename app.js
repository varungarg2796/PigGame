	/*
	GAME RULES:

	- The game has 2 players, playing in rounds
	- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
	- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
	- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
	- The first player to reach 100 points on GLOBAL score wins the game

	*/

// To open the rule section

	// Get the modal
	var modal = document.getElementById('myModal');

	// Get the button that opens the modal
	var btn = document.getElementById("myBtn");

	// Get the <span> element that closes the modal
	var span = document.getElementsByClassName("close")[0];

	// When the user clicks the button, open the modal 
	btn.onclick = function() {
	    modal.style.display = "block";
	}

	// When the user clicks on <span> (x), close the modal
	span.onclick = function() {
	    modal.style.display = "none";
	}

	// When the user clicks anywhere outside of the modal, close it
	window.onclick = function(event) {
	    if (event.target == modal) {
	        modal.style.display = "none";
	    }
	}

	var scores, roundScore, activePlayer,gamePlaying;

	init();

	//Wen you click on new game
	document.querySelector('.btn-new').addEventListener('click', init);


	//When you click on roll dice
	document.querySelector(".btn-roll").addEventListener('click', function(){
		if(gamePlaying){

			//Get the number	
			var dice = Math.floor(Math.random()*6) + 1
			console.log(dice);

			//display the number
			var diceDom = document.querySelector('.dice');
			diceDom.style.display ='block';
			diceDom.src = 'dice-' + dice + '.png';

			//Update the score if dice did not roll one
			if(dice!==1){
				roundScore += dice;
				document.querySelector('#current-' + activePlayer).textContent = roundScore;
			}
			else{
				//next Player
				nextPlayer();
			}
		}

	});

	//When the player clicks on Hold. That is, switches turns.

	document.querySelector(".btn-hold").addEventListener('click', function(){
		if(gamePlaying && roundScore >0){
			//Add current score to the total score	
			scores[activePlayer] += roundScore;

			//update the score in the display
			document.querySelector('#score-'+activePlayer).textContent = scores[activePlayer];

			//check if the player has won

			if(scores[activePlayer] >= 80){
				document.querySelector('#name-' + activePlayer).textContent = 'Winner';
				document.querySelector('.dice').style.display = 'none';
				document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
				document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
				gamePlaying = false;
			}
			else{
				nextPlayer();
			}
		}
		
	})


	//To shift to the next player

	function nextPlayer(){
		if(activePlayer==0){
			activePlayer =1
		}
		else{
			activePlayer = 0;
		}
		roundScore = 0;

		document.getElementById('current-0').textContent = '0';
		document.getElementById('current-1').textContent = '0';
		document.querySelector('.player-0-panel').classList.toggle('active');
		document.querySelector('.player-1-panel').classList.toggle('active');

		document.querySelector('.dice').style.display = 'none';
	}


	//To begin the new game
	function init() {
		gamePlaying = true;
		scores = [0,0],
		activePlayer = 0;
		roundScore = 0;
		document.querySelector('.player-0-panel').classList.add('active');
		document.querySelector('.player-1-panel').classList.remove('active');
		document.querySelector('.dice').style.display = 'none';

		document.getElementById('score-0').textContent = 0;
		document.getElementById('score-1').textContent = 0;
		document.getElementById('current-0').textContent = 0;
		document.getElementById('current-1').textContent = 0;
		document.querySelector('#name-0').textContent= 'Player 1'
		document.querySelector('#name-1').textContent= 'Player 2'
	}