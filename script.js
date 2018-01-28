window.addEventListener("DOMContentLoaded", function() {

var string = "match/ that/ cartoon/ series!";
		var str = string.split("/");
		var title = document.getElementById("title");

	 window.addEventListener("load", function loadTitle() {
		str.length > 0 ? title.innerHTML += str.shift() : clearTimeout(running);
			var running = setTimeout(loadTitle, 500);
		});

	//Scroll down function
	var startBtn = document.querySelector(".start-btn");
	startBtn.addEventListener("click", function() {
		var gameBoard = document.getElementById("game-table");
		gameBoard.scrollIntoView({behavior: "smooth", block: "center"});
	});	

	
	//Card game
	
	var cardsFlipped;
	var flipCountIncrementor;
	var scoreIncrementor;
	var score = document.getElementsByClassName('score')[0];
	var flipCount = document.getElementsByClassName('clicks')[0];




	function deckInit() {
		var memoryArray = 
		["url('gif/adventure.gif')", "url('gif/americanDad.gif')", "url('gif/archer.gif')", "url('gif/bigMouth.gif')", "url('gif/bobs.gif')", "url('gif/bojack.gif')", "url('gif/familyguy.gif')", 
		"url('gif/futurama.gif')", "url('gif/metal.gif')", "url('gif/rickMorty.gif')", "url('gif/simpsons.gif')", "url('gif/southPark.gif')", "url('gif/adventure.gif')", "url('gif/americanDad.gif')",
		"url('gif/archer.gif')", "url('gif/bigMouth.gif')", "url('gif/bobs.gif')", "url('gif/bojack.gif')", "url('gif/familyguy.gif')", "url('gif/futurama.gif')", "url('gif/metal.gif')", "url('gif/rickMorty.gif')",
		"url('gif/simpsons.gif')", "url('gif/southPark.gif')"];
		cardsFlipped = [];
		flipCountIncrementor = 0;
		scoreIncrementor = 0;

		var highestScore = document.querySelector(".highest-score");
		if (localStorage.getItem("bestScore") === null) {
			highestScore.innerText = "--"
		} else {
			highestScore.innerText = localStorage.getItem("bestScore");
		}
		

		var gameRestart = document.querySelector(".game-over");
			gameRestart.style.display = "none";

		var card = document.getElementsByClassName("cards");
		shuffleCards(memoryArray);

		for (var i = 0; i < card.length; i++) {
			if (card[i].classList.contains("flipped")) {
				card[i].classList.toggle("flipped");
			}
			
			card[i].querySelector(".back").style.background= memoryArray[i];
			card[i].querySelector(".back").style.backgroundSize = "contain";
			card[i].querySelector(".back").style.backgroundRepeat = "no-repeat";
			card[i].querySelector(".back").style.backgroundPosition = "center";
			card[i].addEventListener("click", flip);
			
		}
		score.innerText = "00";
		flipCount.innerText = "00";

	}



	function flip() {
		if (!this.classList.contains("flipped") && cardsFlipped.length < 2) {
			this.classList.toggle("flipped");

			cardsFlipped.push(this);

			if(cardsFlipped.length === 2) {
				checkMatch();
			}
			flipCount.innerText = "0" + ++flipCountIncrementor;
		}
	}


	function checkMatch() {
		if (cardsFlipped[0].querySelector(".back").style.background === cardsFlipped[1].querySelector(".back").style.background) {
			if (scoreIncrementor === 11) {
				setTimeout(endGame, 1000);
			} else {
				score.innerText = "0" + ++scoreIncrementor;
				
			}
		
		cardsFlipped = [];

		
		} else {
			setTimeout(flipBack, 1300);
		}
	}


	function flipBack() {
		cardsFlipped[0].classList.toggle("flipped");
		cardsFlipped[1].classList.toggle("flipped");
		cardsFlipped = [];
	}


	function endGame() {
		var gameOver = document.querySelector(".game-over");
		gameOver.style.display = "flex";

		var finalScore = document.querySelector(".final-score");
		var totalClicks = flipCountIncrementor;
		finalScore.innerText = totalClicks;

		var bestScore = localStorage.getItem("bestScore"); 
			if(bestScore === null || totalClicks < bestScore) {
				localStorage.setItem("bestScore", JSON.stringify(totalClicks));
			}

		var highestScore = document.querySelector(".high-score");
		highestScore.innerText = JSON.parse(localStorage.getItem("bestScore"));  
		
		var replaybtn = document.getElementById('replay');
		replaybtn.addEventListener("click", deckInit);
	}

	//Using a bubbleSort like method to shuffle

	function shuffleCards(array) {

		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i+1));
			var temp = array[j];
			array[j] = array[i];
			array[i] = temp;
		}
		return array;
	}

deckInit();


});


//Rick&Morty, familyguy, americandad, southpark, bigmouth, bojack, bob's burgers, archer, the simpsons, futurama, metalocalypse

