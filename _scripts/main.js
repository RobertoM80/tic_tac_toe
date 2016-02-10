var playerWin = 0;
var pcWin = 0;
var playerSymbol = '';
var pcSymbol = '';
var winner = '';
var score = 0;
var playerSquares = [];
var pcSquares = [];
var winnerLine;
var square;
var emptySquares = [1,2,3,4,5,6,7,8,9];
var winningLines = [[1,2,3],
										[4,5,6],
										[7,8,9],
										[1,4,7],
										[2,5,8],
										[3,6,9],
										[1,5,9],
										[3,5,7]];

function smartPc(){
	var sq = '';
	  for (var i = winningLines.length - 1; i >= 0; i--) {
		var playerWin = 0;
		var pcWin = 0;
		var arrNumToDefende = [];
		var arrNumToScore = [];
		var missingToScore;
		//square;
		$.each(playerSquares, function(idx, num){
		 	if(winningLines[i].indexOf(num) !== -1){
				playerWin += 1;
		 		arrNumToDefende.push(num);
		 	}; 
	  });
			
		$.each(pcSquares, function(idx, pcnum){
			if(winningLines[i].indexOf(pcnum) !== -1){
				pcWin += 1;
			 	arrNumToScore.push(pcnum);
			}; 
		});

		if(pcWin === 2){
		 	$.each(winningLines[i], function(_, num){
		 		if((arrNumToScore.indexOf(num) === -1)&&(emptySquares.indexOf(num) !== -1)){
		 			sq = num;
		 		}
		 	});
		} else if(playerWin === 2){
		 	$.each(winningLines[i], function(idx, num){
		 		if((arrNumToDefende.indexOf(num) === -1)&&(emptySquares.indexOf(num) !== -1)){
		 			sq = num;
		 		}
		 	});
		} else if((pcSquares.indexOf(5) === -1)&&(playerSquares.indexOf(5) === -1)){
	    square = 5;
	  } else if ((playerSquares.indexOf(5) !== -1)&&(emptySquares.length === 8)) {
	  	var rigthArr = [1,3,7,9];
	  	square = rigthArr[Math.floor(Math.random()*rigthArr.length)];
	  } else if((playerSquares.length === 1)&&(pcSquares.length === 1)) {
	  	console.log(pcSquares);
	  	var rigthArr = [1,3,7,9];
	    if ((playerSquares[0] === 1)||(playerSquares[0] === 3)||(playerSquares[0] === 7)||(playerSquares[0] === 9)){
	  	  console.log('fffff', rigthArr.indexOf( playerSquares[0]), playerSquares[0]);
	  	  rigthArr.splice(rigthArr.indexOf( playerSquares[0]), 1);
	  	  //square = rigthArr[Math.floor(Math.random()*rigthArr.length)];
	  	  //console.log('here', square);
	    }
	    square = rigthArr[Math.floor(Math.random()*rigthArr.length)];
	  } else {
	    randomSquare();
	  }
		};
		if(sq !== '') {
			square = sq;
		}
}

function randomSquare(){
	var random = Math.floor(Math.random() * ((emptySquares.length-1) - 0) + 0);	
	square = emptySquares[random];
}

function congrat(winningArr){
		$('#' + winnerLine[0]).children().addClass('animated rubberBand');
		$('#' + winnerLine[1]).children().addClass('animated rubberBand');
		$('#' + winnerLine[2]).children().addClass('animated rubberBand');
		$(".display").animate({
	    fontSize: "2em"
	  }, 500 );
	  setTimeout(function(){
	  	$('.playground').addClass('animated hinge');
	  }, 1600); 
	  playAgain();
}

function displayChoosenSymbol(){
	$('.symbol').html('<h3>You have Choose <span>' + playerSymbol + '</span></h3>');
}

function playerChooseSquare(event){
	var square = parseInt(event.target.id);
	$(event.target).html('<p>' + playerSymbol +'</p>');
	playerSquares.push(square);
	emptySquares.splice(emptySquares.indexOf(square),1);
	$(event.target).off('click');
}

function pcChooseSquare(){
	setTimeout(function(){
		smartPc();
		$('#' + square).html('<p>' + pcSymbol + '</p>');
	  pcSquares.push(square);
	  emptySquares.splice(emptySquares.indexOf(square) ,1);
		$('#' + square).off('click');
	}, 600);
}

function checkForWinner(){
	setTimeout(function(){    
		for (var i = winningLines.length - 1; i >= 0; i--) {
				pcWin = 0;
				playerWin = 0;
				$.each(playerSquares, function(idx, num){
					if(winningLines[i].indexOf(num) !== -1){
						playerWin += 1;
					}
				});				
				$.each(pcSquares, function(idx, pcnum){
					if(winningLines[i].indexOf(pcnum) !== -1){
						pcWin += 1;
					}
				});
				if(playerWin === 3){
					$('.display').html('<h3>Congratulation, You Win!!</h3>' );
					winner += 'player';
					winnerLine = winningLines[i];
					$('.square').off('click');
					congrat();	
				} else if (pcWin === 3) {
					$('.display').html('<h3>Sorry but You lost!!</h3>' );
					winner += 'pc';
					winnerLine = winningLines[i];
					$('.square').off('click');
					congrat(winningLines[i]);
				} else if ((emptySquares.length === 0) && (winner == '')) {
					$('.display').html('<h3>Nobody win this time!!</h3>' );
					winner += 'Tie';
					winnerLine = [];
					$('.square').off('click');
					congrat();
				};
		};
	}, 1000);
}

function playAgain(){
	setTimeout(function(){
	  	$('.jumbotron').removeClass('hide');
	  	$('.jumbotron').addClass('animated fadeInUpBig');
	}, 3600);
	$('.buttons').on('click', function(event){
		if($(event.target).hasClass('yes') === true){
			location.reload();
		} else {
			$('.jumbotron').html('<h1 class="text-center">Thank you for play!</h1>');
		}
	});
}

function game(){
	$('.symbol').addClass('animated tada');
	$('.choosable').on('click', function(event){
		if((playerSymbol === '')||(pcSymbol === '')){
			if($(event.target).hasClass('x')) {
				playerSymbol = 'x';
				pcSymbol = 'o';
				$('.display').html('<h3>Good Luck! Pc Starts..</h3>');
				displayChoosenSymbol();
				pcChooseSquare();			
				$('.square').on('click', function(event){
					checkForWinner();
	  			playerChooseSquare(event);
	  			checkForWinner();
	  			if ((winner === '')&&(emptySquares.length > 0)){
					  pcChooseSquare();
					}
	  	  	checkForWinner();		  
	  		});					  
			} else if($(event.target).hasClass('o')){
				playerSymbol = 'o';
				pcSymbol = 'x';
				$('.display').html('<h3>Good Luck! You Start..</h3>');
				displayChoosenSymbol();
				$('.square').on('click', function(event){
					playerChooseSquare(event);
					if ((winner === '')&&(emptySquares.length > 0)){
					  pcChooseSquare();
					}
					checkForWinner();
				});
			}
		}
	});	
}

game();



