window.addEventListener('DOMContentLoaded', () => {
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
    const undo = document.querySelector('#undo');
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;
    let moves=[];
    let l=[];
    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';
    let playerxcount=0;
    let playerocount=0;
    let t=[];
    let nottie=true;


    const winningConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    function handleResultValidation() {
        let roundWon = false;
        for (let i = 0; i <= 7; i++) {
            const winCondition = winningConditions[i];
            const a = board[winCondition[0]];
            const b = board[winCondition[1]];
            const c = board[winCondition[2]];
            if (a === '' || b === '' || c === '') {
                continue;
            }
            if (a === b && b === c) {
                t=winCondition;
                roundWon = true;
                break;
            }
        }

    if (roundWon) {
            announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
            isGameActive = false;
            return;
        }

    if (!board.includes(''))
        announce(TIE);
    }
    function announce(type) {
        switch(type){
            case PLAYERO_WON:
                document.getElementById("dis").style.display="none";
                announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                playerocount++;

                break;
            case PLAYERX_WON:
                announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                playerxcount++;
                document.getElementById("dis").style.display="none";
                break;
            case TIE:
                announcer.innerText = 'Tie';
                document.getElementById("dis").style.display="none";
                isGameActive = false;
                nottie=false;
        }
        
        if(nottie==true){
            for(let i=0;i<t.length;i++){
                tiles[t[i]].style.backgroundColor="#C8CDD6";
            }
        }

        document.getElementsByClassName("score")[0].innerHTML= `<div class="score-player playerX">Player X : <span class="score-count">${playerxcount}</span></div> <div class="score-player playerO">Player O : <span class="score-count">${playerocount}</span></div>`;
        document.getElementById("undo").style.display = "none";
        announcer.classList.remove('hide');
    }

    function isValidAction(tile) {
        if (tile.innerText === 'X' || tile.innerText === 'O'){
            return false;
        }

        return true;
    }

    function updateBoard(index) {
        board[index] = currentPlayer;
    }
    
    function changePlayer() {

        playerDisplay.classList.remove(`player${currentPlayer}`);
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        playerDisplay.innerText = currentPlayer;
        playerDisplay.classList.add(`player${currentPlayer}`);
    }

    function userAction(tile, index) {
        l.push(currentPlayer);
        if(l[l.length-1]!==l[l.length-2]){
            document.getElementById("undo").style.display = "block";
        
        }
        if(!isGameActive)
        document.getElementById("undo").style.display = "none";

        if(isValidAction(tile) && isGameActive) {
            moves.push(index);
            tile.innerText = currentPlayer;
            tile.classList.add(`player${currentPlayer}`);
            updateBoard(index);
            handleResultValidation();
            changePlayer();
  
        }
    }

    tiles.forEach((tile, index) => {
        tile.addEventListener('click', () => userAction(tile, index));
    });
  
    resetButton.addEventListener('click', resetBoard);
    function resetBoard() {
        board = ['', '', '', '', '', '', '', '', ''];
        document.getElementById("dis").style.display="block";
        isGameActive = true;
        announcer.classList.add('hide');

        if (currentPlayer === 'O') {
            changePlayer();
        }

        tiles.forEach(tile => {
            tile.innerText = '';
            tile.classList.remove('playerX');
            tile.classList.remove('playerO');
        });
        for(let i=0;i<t.length;i++){
            tiles[t[i]].style.backgroundColor="white";
        }
        l=[];
        moves=[];
        t=[];
        
       
    }
    undo.addEventListener('click', undoMove);
    function undoMove(){
        if(moves.length>0){
                let lastMove = moves.pop();
                tiles[lastMove].innerText = '';
                tiles[lastMove].classList.remove('playerX');
                tiles[lastMove].classList.remove('playerO');
                board[lastMove] = '';
                changePlayer();
            }
            document.getElementById("undo").style.display = "none";

        }
    
});