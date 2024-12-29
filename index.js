const gameboard = (function(row1, row2, row3){
  row1 = ["", "", ""];
  row2 = ["", "", ""];
  row3 = ["", "", ""];

  return {row1, row2, row3};

})();

const gameplay = (function(){

    let player1Played = false;
    let player2Played = false;
    let moves = 0;

  const players  = (function(player1, player2){

    player1 = {marker: "X"}
    player2 = {marker: "O"}
  
    return {player1, player2};
  })();

  const winCombinations = (function(){
    const row1 = [];
    const row2 = [];
    const row3 = [];
    const col1 = [];
    const col2 = [];
    const col3 = [];
    const diag1 = [];
    const diag2 = [];

    return {row1, row2, row3, col1, col2, col3, diag1, diag2};
  })();


  const play = function(player, row, squareIndex){

    // Assign Marker depending on player
    const marker = (player == "player1")? players.player1.marker : players.player2.marker;

     // Ensure that a player cannot mark an already marked square
    const isSquareAvailable = (row, squareIndex)=>{
      return gameboard[row][squareIndex]? false: true;
    }

    const addToWinCombinations = function(){
      //Rows
      switch(row){
        case "row1":
          winCombinations.row1.push(marker);
          break;
        case "row2":
          winCombinations.row2.push(marker);
          break;
        case "row3":
          winCombinations.row3.push(marker);
          break;
      }


      //Diagonals
      if(row == "row1" && squareIndex == 0){
        winCombinations.diag1.push(marker);
      }
      if(row == "row2" && squareIndex == 1){
        winCombinations.diag1.push(marker);
        winCombinations.diag2.push(marker);
      }
      if(row == "row3" && squareIndex == 2){
        winCombinations.diag1.push(marker);
      } 
      if(row == "row3" && squareIndex == 0){
        winCombinations.diag2.push(marker);
      }
      if(row == "row1" && squareIndex == 2){
        winCombinations.diag2.push(marker);
      }
      
      // Columns
      switch(squareIndex){
        case 0:
          winCombinations.col1.push(marker);
          break;
        case 1:
          winCombinations.col2.push(marker);
          break;
        case 2:
          winCombinations.col3.push(marker);
      }
    };

    const resetGameboard = () => {
      gameboard.row1 = ["", "", ""];
      gameboard.row2 = ["", "", ""];
      gameboard.row3 = ["", "", ""];
    
    }

    const resetWinCombinations = function(){
      for(let key in winCombinations){
        winCombinations[key] = [];
      }
    };

    const checkWinner = function(){
      for(let key in winCombinations){
        const consecutiveMarks = winCombinations[key].filter(mark => mark == marker);
        if(consecutiveMarks.length == 3){
          return true
        }
      }

      return false;
    };

    const resetGame = function(){
      resetGameboard();
      resetWinCombinations();
      player1Played = false;
      player2Played = false;
      moves = 0;
    };

    if(player == "player1"){
      if(player1Played){
        alert("Wait for player2");
      } else if(isSquareAvailable(row, squareIndex)){
        // Add Marker to gameboard
        gameboard[row][squareIndex] = marker;
        
        addToWinCombinations();

        player1Played = true;
        player2Played = false;
        moves += 1;

        if(moves >= 5){
          const isWinner = checkWinner();
          if(moves == 9 && !isWinner){
            console.log("IT'S A TIE");
            resetGame();
          } else if(isWinner){
            console.log(`${player} Wins`);
            resetGame();
          }
        } 

      } else{
        alert("Square has been marked")
      }
    } else if(player == "player2"){
      if(player2Played){
        alert("Wait for player1");
      } else if(isSquareAvailable(row, squareIndex)){
        gameboard[row][squareIndex] = marker;
        
        addToWinCombinations();

        player2Played = true;
        player1Played = false;
        moves += 1;

        if(moves >= 5 ){
          const isWinner = checkWinner();
          if(moves == 9 && !isWinner){
            console.log("IT'S A TIE");
            resetGame();
          } else if(isWinner){
            console.log(`${player} Wins`);
            resetGame();
          }
        }

      } else{
        alert("Square has been marked");
      }
      
    }
  };


  return {play}

})();


gameplay.play("player1", "row3", 2);
gameplay.play("player2", "row1", 1);
gameplay.play("player1", "row1", 0);
gameplay.play("player2", "row2", 0);
gameplay.play("player1", "row2", 1);
// gameplay.play("player2", "row2", 2);
// gameplay.play("player1", "row3", 0);
// gameplay.play("player2", "row3", 1);
// gameplay.play("player1", "row1", 2);
