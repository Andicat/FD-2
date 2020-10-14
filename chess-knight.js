'use strict';

//======================================Chess-knight==================================
/*
Дана шахматная доска (8x8).
Найдите программно один способ обойти все 64 клетки доски конём, чтобы в каждой
клетке конь побывал ровно 1 раз. Обход должен начинаться с любой угловой клетки.
Отобразите на веб-странице найденный способ (в каждой клеточке - номер хода,
на котором конь попадает в эту клеточку).
По нажатию кнопки - отобразите процесс обхода конём доски в динамике,
т.е. конь становится в угловую клетку и делает ходы по 2-3 в секунду;
клетки, в которых конь уже побывал, подцвечивайте
*/

(function () {

    try {
        var blockchess = document.querySelector('.chess-knight');
        var btnChess = blockchess.querySelector('.chess__button');
        var cntChessBoard = blockchess.querySelector('.chess__board');
        var resultChess = blockchess.querySelector('.chess__result');
        var resultChessText = resultChess.querySelector('.chess__result-text');
        var btnComb = resultChess.querySelector('.chess__button--combination');
        var inputComb = resultChess.querySelector('.chess__combination');
        var chessCeils;
    } catch {
        return;
    }
            
    function chessKnight () {
        
        if (cntChessBoard) {
            cntChessBoard.remove();
            inputComb.value = "";    
        }
        
        const CHESS_SIZE = 8;
        var combinationIs = false;
        var result = [];

        //выводит количество комбинаций
        function showResult(combinations) {
            resultChessText.innerHTML = "Найдено комбинаций: " + combinations.length; 
            if (combinations.length) {
                resultChess.classList.add("chess__result--show");
            }
            btnComb.addEventListener("click", showCombination);
        }
        
        //рисует комбинацию на шахматной доске
        function showCombination() {
            var cmbNumber = inputComb.value;
            if (!Number(cmbNumber)) {
                return;
            }
                                    
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
                e.classList.remove("chess__queen");
            })

            if (combinations[cmbNumber-1]) {
                combinations[cmbNumber-1].forEach( function(q) {
                    var ceil = chessCeils[q.ceil];
                    ceil.classList.add("chess__queen");
                    ceil.addEventListener("click", function(evt) { showBattlefield(evt,q) })
                })
            }
        };

        //рисует "поле боя" ферзя
        function showBattlefield(evt,q) {
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
            })
            evt.target.classList.add("chess__ceil--red");
            q.battlefield.forEach(function(b) {
                chessCeils[b].classList.add("chess__ceil--red");
            })
        }

        //создает шахматную доску
        function initBoard() {
            var board = {};
            var divBoard = document.createElement('div');
            divBoard.className = "chess__board";

            for  (var i = 1; i <= CHESS_SIZE*CHESS_SIZE; i++) {
                board[i] = nextSteps(i);
                var divCeil = document.createElement('div');
                //divCeil.className = "chess__ceil " + ((i%2 + j%2)===1? "chess__ceil--black" : "chess__ceil--white");
                divBoard.appendChild(divCeil);
                //board.push(row);    
            };

            blockchess.appendChild(divBoard);
            cntChessBoard = divBoard;
            chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
            return board;
        }

        //поиск возможных ходов для коня
        function nextSteps(ceil) {
            var steps = [];
            var next;
            
            var row = Math.ceil(ceil/CHESS_SIZE);
            var col = (ceil-(row-1)*CHESS_SIZE);
           
            //ходы "по горизонтали"
            if ((row-1)>=1) {
                //левый верхний ход
                if((col-2)>=1) {
                    next = (row-2)*CHESS_SIZE + (col-2);
                    steps.push(next);
                }
                //правый верхний ход
                if((col+2)<=CHESS_SIZE) {
                    next = (row-2)*CHESS_SIZE + (col+2);
                    steps.push(next);
                }
            }
            if ((row+1)<=CHESS_SIZE) {
                //левый нижний ход
                if((col-2)>=1) {
                    next = (row)*CHESS_SIZE + (col-2);
                    steps.push(next);
                }
                //правый нижний ход
                if((col+2)<=CHESS_SIZE) {
                    next = (row)*CHESS_SIZE + (col+2);
                    steps.push(next);
                }
            }
            //ходы "по вертикали"
            if ((row-2)>=1) {
                //левый верхний ход
                if((col-1)>=1) {
                    next = (row-3)*CHESS_SIZE + (col-1);
                    steps.push(next);
                }
                //правый верхний ход
                if((col+1)<=CHESS_SIZE) {
                    next = (row-3)*CHESS_SIZE + (col+1);
                    steps.push(next);
                }
            }
            if ((row+2)<=CHESS_SIZE) {
                //левый нижний ход
                if((col-1)>=1) {
                    next = (row+1)*CHESS_SIZE + (col-1);
                    steps.push(next);
                }
                //правый нижний ход
                if((col+1)<=CHESS_SIZE) {
                    next = (row+1)*CHESS_SIZE + (col+1);
                    steps.push(next);
                }
            }
            return steps.sort((a,b)=>a-b);
        };

        //урезаем ходы
        function createNewboard (ceil, board) {
            var newBoard = {};
            for (var i in board) {
                if (i!==ceil) {
                    newBoard[i] = board[i].filter(function(i) {
                        return i!==ceil;
                    });
                }
            }
            return newBoard;
        }

        //поиск комбинации начиная с верхнего левого края шахматной доски
        function findCombinations (knight,board,combination) {
            var knightSteps = board[knight];
            if (knightSteps.length===0) {
                console.log("no more steps");
                return;
            }
            //сделаем копию доски без текущей ячейки
            var boardCurr = createNewboard(knight,board);
            if (combination.length===62) {
                combinationIs = true;
                result = combination;
            //    console.log(combinations.sort((a,b)=>a-b));
            //    console.log(boardCurr);
            return;
            }
            //if (knight===25) {
            //    debugger;
            //}
            //console.log(boardCurr);
            console.log("knight " + knight + " steps " + knightSteps);
            for (var i = 0; i < knightSteps.length; i++) {
                if (combinationIs) {
                    //    console.log(combinations.sort((a,b)=>a-b));
                    //    console.log(boardCurr);
                    return;
                    }
                var nextStep = knightSteps[i];
                //проверим, свободна ли клетка для этого хода
                if (nextStep in boardCurr) {
                    console.log("step on " + nextStep);
                    findCombinations(nextStep,boardCurr,combination.concat(knight)); 
                    //console.log(combinations);
                }
            }
            
            return;
        };

        var board = initBoard();
        //console.log(board);
        findCombinations(1,board,[]);
        console.log(result);
        //showResult(combinations);
    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            chessKnight();
        });
    }

})();
