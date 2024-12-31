const player1 = document.querySelector("#player1");
const player2 = document.querySelector("#player2");
const results = document.querySelector("#results");
let player1Name = "Player1";
let player2Name = "Player2";
let gameOver = false;

const formButton = document.querySelector("form button");
const firstPlayer = document.querySelector("#firstPlayer");
const secondtPlayer = document.querySelector("#secondPlayer");
const restartBtn  = document.querySelector(".restartBtn");

formButton.addEventListener("click", (event)=>{
 
  if(firstPlayer.value && secondtPlayer.value){
    player1.textContent = firstPlayer.value;
    player1Name = firstPlayer.value;
    player2.textContent = secondtPlayer.value;
    player2Name = secondtPlayer.value;
  }
 
});


const gameboard = (function(row1, row2, row3){
  row1 = ["", "", ""];
  row2 = ["", "", ""];
  row3 = ["", "", ""];

  return {row1, row2, row3};

})();

const players  = (function(player1, player2){

  player1 = {marker: "X"}
  player2 = {marker: "O"}

  return {player1, player2};
})();

const displayDOM = (function(){

  const row1 = document.querySelector(".row1");
  const row2 = document.querySelector(".row2");
  const row3 = document.querySelector(".row3");
  const rows = {row1, row2, row3};

  for(const key in rows){
    for(let i= 0; i < 3; i++){
      const row = rows[key];
      const square = document.createElement("div");
      square.classList.add("square");
      square.setAttribute("id", `${key}-${i}`)
      row.appendChild(square);
    }
  }

   const marks = function(){
  
        row1.children[0].textContent = gameboard.row1[0];
        row1.children[1].textContent = gameboard.row1[1];
        row1.children[2].textContent = gameboard.row1[2];

        row2.children[0].textContent = gameboard.row2[0];
        row2.children[1].textContent = gameboard.row2[1];
        row2.children[2].textContent = gameboard.row2[2];

        row3.children[0].textContent = gameboard.row3[0];
        row3.children[1].textContent = gameboard.row3[1];
        row3.children[2].textContent = gameboard.row3[2];

    }
  
 return {marks};

})();

const play = (function(){
  let moves = 0;
  let player = "";
  let lastMarker = "";

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


  player1.addEventListener("click", (event) =>{
  
    if(player2.textContent == "Click to play..." || 
      player2.textContent == `${player2Name}'s Turn...`
    ){
     
    }else{
      showPlayerTurn(event);

      player = players.player1;
    }
      
    
      

  });
  
  player2.addEventListener("click", (event) => {
     if(player1.textContent == "Click to play..." ||
      player1.textContent == `${player1Name}'s Turn...`
     ){

     }else{
      showPlayerTurn(event);

      player = players.player2;
     }
        
      

  });

  const showPlayerTurn = function(event){
    switch(event.target.id){
      case "player1":
        player2.textContent = `${player2Name}`;
        player2.style.backgroundColor = "rebeccapurple";

        player1.textContent = `${player1Name}'s Turn...`;
        player1.style.backgroundColor = "darkred";
        break;
      case "player2":
        player1.textContent = `${player1Name}`;
        player1.style.backgroundColor = "rebeccapurple";

        player2.textContent = `${player2Name}'s Turn...`;
        player2.style.backgroundColor = "darkred";
        break;
    }
  };

  const togglePlayerTurn = function(){
    if(lastMarker == "X"){
      player1.textContent = `${player1Name}`;
      player1.style.backgroundColor = "rebeccapurple";

      player2.textContent = "Click to play...";
      player2.style.backgroundColor = "darkred";
      
    }else if(lastMarker == "O"){
      player2.textContent = `${player2Name}`;
      player2.style.backgroundColor = "rebeccapurple";

      player1.textContent = "Click to play...";
      player1.style.backgroundColor = "darkred";
   
    }
  };

  const isSquareAvailable = (row, squareIndex)=>{
    return gameboard[row][squareIndex]? false: true;
  }

  const isPlayerPlayed = function(){
    if(player){
      if(lastMarker == "X" && player.marker == "X"){
        alert("Wait for player2 to play");
        return true;
      }else if(lastMarker == "O" && player.marker == "O"){
        alert("Wait for player1 to play")
        return true;
      } else{
        return false;
      }
    }else{
      alert("Choose player to start");
    }
    
  };

  const addToWinCombinations = function(row, squareIndex){
    //Rows
    switch(row){
      case "row1":
        winCombinations.row1.push(player.marker);
        break;
      case "row2":
        winCombinations.row2.push(player.marker);
        break;
      case "row3":
        winCombinations.row3.push(player.marker);
        break;
    }


    //Diagonals
    if(row == "row1" && squareIndex == 0){
      winCombinations.diag1.push(player.marker);
    }
    if(row == "row2" && squareIndex == 1){
      winCombinations.diag1.push(player.marker);
      winCombinations.diag2.push(player.marker);
    }
    if(row == "row3" && squareIndex == 2){
      winCombinations.diag1.push(player.marker);
    } 
    if(row == "row3" && squareIndex == 0){
      winCombinations.diag2.push(player.marker);
    }
    if(row == "row1" && squareIndex == 2){
      winCombinations.diag2.push(player.marker);
    }
    
    // Columns
    switch(squareIndex){
      case 0:
        winCombinations.col1.push(player.marker);
        break;
      case 1:
        winCombinations.col2.push(player.marker);
        break;
      case 2:
        winCombinations.col3.push(player.marker);
    }
  };

  const checkWinner = function(){
    for(let key in winCombinations){
      const consecutiveMarks = winCombinations[key].filter(mark => mark == player.marker);
      if(consecutiveMarks.length == 3){
        console.log(`${key}`);
        return true
      }
    }

    return false;
  };


  const resetGame = function(){
    // Reset Gameboard
    gameboard.row1 = ["", "", ""];
    gameboard.row2 = ["", "", ""];
    gameboard.row3 = ["", "", ""];
    // Reset Win Combinations
    for(let key in winCombinations){
      winCombinations[key] = [];
    }
    // Re-initialize 
    lastMarker = "";
    moves = 0;
    player = "";
    player1.textContent = `${player1Name}`;
    player2.textContent = `${player2Name}`;
    gameOver = false;

    // Clear Results content
    results.textContent = "";

  };

  restartBtn.addEventListener("click", ()=>{
    resetGame();
    displayDOM.marks();
  });
  

  const displayMarker = function(row, squareIndex){

    const isAvailable = isSquareAvailable(row, squareIndex);
    if(isAvailable){
      const hasPlayed = isPlayerPlayed();
      if(!hasPlayed){
        gameboard[row][squareIndex] = player.marker;
        addToWinCombinations(row, squareIndex);
        displayDOM.marks();
        lastMarker = player.marker;
        moves += 1;

        togglePlayerTurn();
        
        if(moves >= 5){
       
          const isWinner = checkWinner();

          if(isWinner){
            player.marker == "X"? results.textContent = `${player1Name} Wins! Click "Restart" to continue playing`: results.textContent = `${player2Name} Wins!  Click "Restart" to continue playing`;
            gameOver = true;

          } else if(moves == 9){
            results.textContent = "It's a Draw. Click Restart to continue playing";
            gameOver = true;
          }
        }
  
      } 
      
    }else{
      alert("Square has a mark");
    }
    
  }

  const container = document.querySelector("#gameboard");

  container.addEventListener("click", (event)=>{
    // Only listen to clicks on the gameboard when game isn't over
    if(!gameOver){
      let row;
      let squareIndex;
      switch(event.target.id){
        // Row1
        case "row1-0":
          row = "row1";
          squareIndex = 0;
          
          displayMarker(row, squareIndex);
          
          break;
        case "row1-1":
          row = "row1";
          squareIndex = 1;
  
          displayMarker(row, squareIndex);
  
          break;
        case "row1-2":
            row = "row1";
            squareIndex = 2;
            
            displayMarker(row, squareIndex);
  
            break;
        // Row2
        case "row2-0":
            row = "row2";
            squareIndex = 0;
           
            displayMarker(row, squareIndex);
  
            break;
        case "row2-1":
            row = "row2";
            squareIndex = 1;
            
            displayMarker(row, squareIndex);
  
            break;
        case "row2-2":
            row = "row2";
            squareIndex = 2;
            
            displayMarker(row, squareIndex);
  
            break;
        // Row3
        case "row3-0":
            row = "row3";
            squareIndex = 0;
            
            displayMarker(row, squareIndex);
  
            break;
        case "row3-1":
            row = "row3";
            squareIndex = 1;
            
            displayMarker(row, squareIndex);
  
            break;
        case "row3-2":
            row = "row3";
            squareIndex = 2;
            
            displayMarker(row, squareIndex);
  
            break;
      }
    }
    
  })

})();