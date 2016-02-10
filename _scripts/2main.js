var board = {
	emptySquares: [1,2,3,4,5,6,7,8,9],
	winningLines: [[1,2,3],
									[4,5,6],
									[7,8,9],
									[1,4,7],
									[2,5,8],
									[3,6,9],
									[1,5,9],
									[3,5,7]],

reset: function(){
		board.emptySquares = [];
	}
}

var player = {
	square: '', 
	squares: [],
	chooseSquare: function(event, emptySquares){
		player.square = parseInt(event.target.id);
		$(event.target).html('<p>' + player.symbol +'</p>');
		player.squares.push(this.square);
		emptySquares.splice(emptySquares.indexOf(this.square),1);
		$(event.target).off('click');
		},
}

var pc = {
	square: '', 
	squares: [],

	randomSquare: function(emptySquares){
	  var random = Math.floor(Math.random() * ((emptySquares.length-1) - 0) + 0);	
	  pc.square = emptySquares[random];
  },

	smartPc: function(emptySquares, winningLines){
		sq = '';

	  for (var i = winningLines.length - 1; i >= 0; i--) {
			playerWin = 0;
		  pcWin = 0;
		  arrNumToDefende = [];
		  arrNumToScore = [];

	    $.each(player.squares, function(idx, num){
			 	if(winningLines[i].indexOf(num) !== -1){
					playerWin += 1;
			 		arrNumToDefende.push(num);
			 	}; 
		  });	
			$.each(pc.squares, function(idx, pcnum){
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
			} else if((playerWin === 2)&&(pcWin !== 2)){
			 	$.each(winningLines[i], function(idx, num){
			 		if((arrNumToDefende.indexOf(num) === -1)&&(emptySquares.indexOf(num) !== -1)){
			 			sq = num;
			 		}		 		
			 	});
		  } else if (game.starter === 'player') {
			 	if((emptySquares.length === 8)&&(player.squares[0] !== 5)){
			 		pc.square = 5;
			 	} else if ((emptySquares.length === 8)&&(player.squares[0] === 5)) {
			 		pc.square = 1;
			 	} else if((emptySquares.length === 6)&&(player.squares.indexOf(5)!== -1)&&(player.squares.indexOf(9)!== -1)) {
			 		pc.square = 3;
			 	} else if (emptySquares.length === 6) { //rimangono da coprire i casi i cui si mette negli edge!!!!
			 		if (((player.squares.indexOf(1) !== -1)&&(player.squares.indexOf(9)!== -1))||
			 		   ((player.squares.indexOf(3) !== -1)&&(player.squares.indexOf(7)!== -1))||
			 		   ((player.squares.indexOf(4) !== -1)&&((player.squares.indexOf(3) !== -1)||
			 		   	(player.squares.indexOf(9)!== -1)))) {
			 			pc.square = 2;
			 		} else if((player.squares.indexOf(6) !== -1)&&((player.squares.indexOf(8) !== -1)||
			 			(player.squares.indexOf(7) !== -1))){
			 			pc.square = 9;
			 		} else if((player.squares.indexOf(8) !== -1)&&((player.squares.indexOf(1) !== -1)||
			 			(player.squares.indexOf(3) !== -1))){
			 			pc.square = 4;
			 		} else if (player.squares.indexOf(1) === -1){
			 			pc.square = 1;
			 		} else if (player.squares.indexOf(3) === -1){
			 			pc.square = 3;
			 		} else if (player.squares.indexOf(7) === -1){
			 			pc.square = 7;
			 		} else if (player.squares.indexOf(9) === -1){
			 			pc.square = 9;
			 		}
			 	} else {
			 		pc.randomSquare(emptySquares);
			 	}   	
			} else if(game.starter === 'pc'){
				if(emptySquares.length === 9){
			 		pc.square = 5;
			 	} else if(emptySquares.length === 7){
			 		if([2,4,6,8].indexOf(player.squares[0]) !== -1) {
			 		  pc.square = 7;
			 		} else if([1,3,7,9].indexOf(player.squares[0]) !== -1) {
			 			if (player.squares[0] === 1){
			 				pc.square = 9;
			 			} else if (player.squares[0] === 3){
			 				pc.square = 7;
			 			} else if (player.squares[0] === 7){
			 				pc.square = 3;
			 			} else if (player.squares[0] === 9){
			 				pc.square = 1;
			 			}
			 	  }
			 	} else if(emptySquares.length === 5){
					if ([2,4,6,8].indexOf(player.squares[0]) !== -1) {
						if ((player.squares[0] === 4)||(player.squares[0] === 6)){
							pc.square = 9;
				 	  } else if ((player.squares[0] === 2)||(player.squares[0] === 8)){
							pc.square = 1;
				 	  }
			 	  } else if ([1,3,7,9].indexOf(player.squares[0]) !== -1) {
			 	  	if ((player.squares[1] === 2)&&(player.squares[0] === 7)){
			 				pc.square = 6;
			 			} else if ((player.squares[1] === 6)&&(player.squares[0] === 7)){
			 				pc.square = 2;
			 			} else if ((player.squares[1] === 6)&&(player.squares[0] === 1)){
			 				pc.square = 8;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 1)){
			 				pc.square = 6;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 3)){
			 				pc.square = 4;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 3)){
			 				pc.square = 8;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 9)){
			 				pc.square = 2;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 9)){
			 				pc.square = 4;
			 			} else {
			 				pc.randomSquare(emptySquares);
			 			}
			 	  }
			 	} else if (emptySquares.length === 3){
			 		if ((pc.squares.indexOf(5) !== -1)&&(pc.squares.indexOf(7) !== -1)&&(pc.squares.indexOf(9) !== -1)){
				 		console.log('ufff!!');
				 		pc.square = 8;
				 		break;
			 	  } else if ([1,3,7,9].indexOf(player.squares[0]) !== -1) {
			 	  	if ((player.squares[1] === 2)&&(player.squares[0] === 7)&&(player.squares[2] === 4)){
			 				pc.square = 9;
			 				break;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 7)&&(player.squares[2] === 9)){
			 				pc.square = 4;
			 				break;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 7)&&(player.squares[2] === 1)){
			 				pc.square = 8;
			 				break;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 7)&&(player.squares[2] === 8)){
			 				pc.square = 1;
			 				break;
			 			} else if ((player.squares[1] === 6)&&(player.squares[0] === 1)&&(player.squares[2] === 2)){
			 				pc.square = 7;
			 				break;
			 			} else if ((player.squares[1] === 6)&&(player.squares[0] === 1)&&(player.squares[2] === 7)){
			 				pc.square = 2;
			 				break;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 1)&&(player.squares[2] === 3)){
			 				pc.square = 4;
			 				break;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 1)&&(player.squares[2] === 4)){
			 				pc.square = 3;
			 				break;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 3)&&(player.squares[2] === 2)){
			 				pc.square = 9;
			 				break;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 3)&&(player.squares[2] === 9)){
			 				pc.square = 2;
			 				break;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 3)&&(player.squares[2] === 1)){
			 				pc.square = 6;
			 				break;
			 			} else if ((player.squares[1] === 8)&&(player.squares[0] === 3)&&(player.squares[2] === 6)){
			 				pc.square = 1;
			 				break;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 9)&&(player.squares[2] === 6)){
			 				pc.square = 7;
			 				break;
			 			} else if ((player.squares[1] === 2)&&(player.squares[0] === 9)&&(player.squares[2] === 7)){
			 				pc.square = 6;
			 				break;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 9)&&(player.squares[2] === 3)){
			 				pc.square = 8;
			 				break;
			 			} else if ((player.squares[1] === 4)&&(player.squares[0] === 9)&&(player.squares[2] === 8)){
			 				pc.square = 3;
			 				break;
			 			} else {
			 				pc.randomSquare(emptySquares);
			 			}
			 	  } else {
			 	  	pc.randomSquare(emptySquares);
			 	  }
			 	} else if (emptySquares.length === 1){
			 		pc.randomSquare(emptySquares);
			 	}
			} else {
				pc.randomSquare(emptySquares);
			}
	  }
	  if(sq !== '') {
			pc.square = sq;
		}
	},

	chooseSquare: function(emptySquares){
		setTimeout(function(){
			pc.smartPc(emptySquares, board.winningLines);
			$('#' + pc.square).html('<p>' + pc.symbol + '</p>');
		  pc.squares.push(pc.square);
		  emptySquares.splice(emptySquares.indexOf(pc.square) ,1);
			$('#' + pc.square).off('click');
		}, 600);
	},
}

var game = {
	starter: '',
	winner: '',
	winnerLine: '',

	playAgain: function(){
		setTimeout(function(){
	  	$('.jumbotron').removeClass('hide');
	  	$('.jumbotron').addClass('animated fadeInUpBig');
	  }, 3600);
	  $('.buttons').on('click', function(event){
		  if($(event.target).hasClass('yes') === true){
			  location.reload(true);
			  //history.go(0) in Chrome funziona solo questo...;
		  } else {
			  $('.jumbotron').html('<h1 class="text-center">Thank you for play Tic Tac Toe!!</h1>');
		  }
	  });
	},

	congrat: function(){
		if ((game.winner === 'player')||(game.winner === 'pc')){
			$('#' + game.winnerLine[0]).children().addClass('animated rubberBand');
			$('#' + game.winnerLine[1]).children().addClass('animated rubberBand');
			$('#' + game.winnerLine[2]).children().addClass('animated rubberBand');
	  } else {
	  	$('.playground').addClass('animated rubberBand');
	  }
		$(".display").animate({
	    fontSize: "2em"
	  }, 500 );
	  setTimeout(function(){
	  	$('.playground').addClass('animated hinge');
	  }, 1600); 

	  game.playAgain();
	},

	checkWinner: function(winningLines, playerSquares, pcSquares, emptySquares){
		setTimeout(function(){    
			for (var i = winningLines.length - 1; i >= 0; i--) {
				pcWin = 0;
				playerWin = 0;
				$.each(player.squares, function(idx, num){
					if(winningLines[i].indexOf(num) !== -1){
						playerWin += 1;
					}
				});				
				$.each(pc.squares, function(idx, pcnum){
					if(winningLines[i].indexOf(pcnum) !== -1){
						pcWin += 1;
					}
				});
				if(playerWin === 3){
					$('.display').html('<h3>Congratulation, You Win!!</h3>' );
					game.winner += 'player';
					game.winnerLine = winningLines[i];
					$('.square').off('click');
					game.congrat();
				} else if (pcWin === 3) {
					$('.display').html('<h3>Sorry but You lost!!</h3>' );
					game.winner += 'pc';
					game.winnerLine = winningLines[i];
					console.log(winningLines[i]);
					$('.square').off('click');
					game.congrat();		
				} else if ((emptySquares.length === 0) && (game.winner === '')) {
					$('.display').html('<h3>Nobody win this time!!</h3>' );
					game.winner += 'Tie';
					game.winnerLine = [];
					$('.square').off('click');
					game.congrat();			
				};
			};
		}, 1000);
	},

	displayChoosenSymbol: function(){
		$('.display').html('<h3>Good Luck! ' + game.starter + ' Starts..</h3>');
		$('.symbol').html('<h3>You have Choose <span>' + player.symbol + '</span>, Pc has <span>' + pc.symbol + '</span></h3>');
	}, 

	intro: function(){
		$('.symbol').addClass('animated tada');
	},

	play: function(){
		game.intro();
		$('.choosable').on('click', function(event){
			if($(event.target).hasClass('x')) {
				player.symbol = 'x';
				game.starter = 'pc';
				pc.symbol = 'o';
				game.displayChoosenSymbol();
		 		pc.chooseSquare(board.emptySquares);
				game.checkWinner(board.winningLines, player.squares, pc.squares, board.emptySquares);
				$('.square').on('click', function(event){
		 		  player.chooseSquare(event, board.emptySquares);
		 		  game.checkWinner(board.winningLines, player.squares, pc.squares, board.emptySquares);
		 		  pc.chooseSquare(board.emptySquares);
				  game.checkWinner(board.winningLines, player.squares, pc.squares, board.emptySquares);
	  		});		
			} else {
				player.symbol = 'o';
				game.starter = 'player';
				pc.symbol = 'x';
				game.displayChoosenSymbol();
				$('.square').on('click', function(event){
		 		  player.chooseSquare(event, board.emptySquares);
		 		  game.checkWinner(board.winningLines, player.squares, pc.squares, board.emptySquares);
	  			if ((game.winner === '')&&(board.emptySquares.length > 0)){
					pc.chooseSquare(board.emptySquares);
					game.checkWinner(board.winningLines, player.squares, pc.squares, board.emptySquares);
					}
	  		});
			}
		});
	},
}

game.play();
