'use strict';

//======================================Chess==================================
/*
Дана шахматная доска (8x8).
"Расстановкой ферзей" назовём такую расстановку 8 ферзей на шахматной доске,
при которой ни один из ферзей не может сбить ни одного другого ферзя.
(Ферзь бьёт в любом направлении - горизонтальном, вертикальном, диагональном)
1. Найдите все возможные расстановки.
2. Отобразите на веб-странице количество найденных расстановок.
3. Дайте возможность пользователю ввести номер расстановки или выбрать
   расстановку из списка.
4. Отобразите на веб-странице шахматную доску с выбранной расстановкой -
   расставленными ферзями (любым способом).
5. (необязательно, если умеете) При нажатии мышью на любого из ферзей - подцвечивайте
   клетки доски, которые он "пробивает".
*/

(function () {

    var blockchess = document.querySelector('.chess');

    if (!blockchess) {
        return;
    }
    
    var btnChess = blockchess.querySelector('.chess__button');
    var cntChessBoard = blockchess.querySelector('.chess__board');
    
    function chessQueens () {

        const QUEENS_COUNT = 8;
        const CHESS_SIZE = 8;

        //отрисовка
        function showCombinations(combinations) {
            var resultChess = blockchess.querySelector('.chess__result');
            if (!resultChess) {
                return;
            } 
            var resultChessText = resultChess.querySelector('.chess__result-text');
            if (resultChessText) {
                resultChessText.innerHTML = "Найдено комбинаций: " + combinations.length;
            } 
            if (combinations.length) {
                resultChess.classList.add("chess__result--show");
            }
            var btnComb = resultChess.querySelector('.chess__button--combination');
            var comb = resultChess.querySelector('.chess__combination');
            if (btnComb) {
                btnComb.addEventListener("click", drawBoard.bind(comb));
            }
        }
        
        function drawBoard() {
            if (!cntChessBoard) {
                return;
            }
            if (!Number(this.value)) {
                return;
            }
            var chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
                        
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
                e.classList.remove("chess__queen");
            })

            function colorBoard(evt,q) {
                chessCeils.forEach(function(e) {
                    e.classList.remove("chess__ceil--red");
                })
                evt.target.classList.add("chess__ceil--red");
                q.battlefield.forEach(function(b) {
                    chessCeils[b].classList.add("chess__ceil--red");
                })
            }

            if (combinations[this.value-1]) {
                combinations[this.value-1].forEach( function(q) {
                    var ceil = chessCeils[q.ceil];
                    ceil.classList.add("chess__queen");
                    ceil.addEventListener("click", function(evt) { colorBoard(evt,q) })
                })
            }
        };

        function initBoard() {
            var board = [];
            for  (var i = 0; i< CHESS_SIZE*CHESS_SIZE; i++) {
                var battlefield = disableCeils(i);
                board.push({ceil:i, battlefield:battlefield});    
            }
            return board;
        }

        var combinations = [];

        //функция блокировки клеток на доске
        function disableCeils(ceilCurr) {
            var battlefield = [];
            
            var row = Math.floor(ceilCurr/CHESS_SIZE);
            var col = (ceilCurr-row*CHESS_SIZE);
            
            battlefield.push(ceilCurr);
            
            function disableOther(ceil) {
                if (ceil!==ceilCurr) {
                    battlefield.push(ceil);
                }
            }
            
            for (var i = 0; i < CHESS_SIZE; i++) {
                //горизонтальный ряд
                disableOther(row*CHESS_SIZE + i);
                //вертикальный ряд
                disableOther(i*CHESS_SIZE + col);
                //диагональные ряды
                if ((row+i)<CHESS_SIZE && (col+i)<CHESS_SIZE) {
                    disableOther((row+i)*CHESS_SIZE + col + i);
                }
                if ((row-i)>=0 && (col-i)>=0) {
                    disableOther((row-i)*CHESS_SIZE +col-i);
                }
                if ((row+i)<CHESS_SIZE && (col-i)>=0) {
                    disableOther((row+i)*CHESS_SIZE +col-i);
                }
                if ((row-i)>=0 && (col+i)<CHESS_SIZE) {
                    disableOther((row-i)*CHESS_SIZE +col+i);
                }
            }
            return battlefield.sort((a,b)=>a-b);
        };

        function findFreeCeil(i,queens,boardCurr) {
            console.log("check ceil " + i);
            if (i > CHESS_SIZE*CHESS_SIZE) {
                return;
            }
            do {
                var row = Math.floor(i/CHESS_SIZE);
                var col = CHESS_SIZE-(CHESS_SIZE*(row+1)-i)-1;
                var ceil = boardCurr[row][col];
                i++;

            } while (!ceil && (i < (CHESS_SIZE*CHESS_SIZE)));
            if (ceil) {
                var battlefield = disableCeils(boardCurr,row,col);
                var queen = {ceil:[row,col], battlefield:battlefield};
                //console.log("the queen on [" + row + "," + col + "]");
                queens.push(queen);    
            }
            if (queens.length < QUEENS_COUNT) {
                findFreeCeil(i,queens,boardCurr);
                return;
            }
            if (queens.length==QUEENS_COUNT) {
                combinations.push(queens);
                queens = [];
            };
        }

        //функция поиска возможных комбинаций
        function findCombinations(queens,board,t) {
            console.log("deep " + t);
            if (queens.length===QUEENS_COUNT) {
                combinations.push(queens);
                return;
            }

            if (combinations.length===1) {
                //combinations.push(queens);
                return;
            }
            
            //перебор доски
            for (var i = 0; i < board.length; i++) {
                var bbb = board.filter( function( el ) {
                    return !battlefield.includes( el );
                } );
                //console.log("the queen on " + board[i]);
                findCombinations(queens.concat([{ceil:board[i], battlefield:battlefield}]),bbb,t+1); 
            }
            return;
        };

        var board = initBoard();
        //console.log(board);
        findCombinations([],board,1);
        
        //console.log(board);
        //console.log(queens);
        console.log(combinations);
        showCombinations(combinations);
        //drawBoard();


    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            var res = chessQueens();
            //showResult("Результат: " + (res!==null ? res.join("-") : "Цепочку построить невозможно"));
        });
    }

})();




/*
 function disableCeils(boardCurr,ceil) {
            var battlefield = [];
            boardCurr[row][col] = false;
            battlefield.push([row,col]);
            for (var i = 0; i < CHESS_SIZE; i++) {
                //горизонтальный ряд
                boardCurr[row][i] = false;
                battlefield.push([row,i]);
                //вертикальный ряд
                boardCurr[i][col] = false;
                battlefield.push([i,col]);
                //диагональные ряды
                if ((row+i)<CHESS_SIZE && (col+i)<CHESS_SIZE) {
                    boardCurr[row+i][col+i] = false;
                    battlefield.push([row+i,col+i]);
                }
                if ((row-i)>=0 && (col-i)>=0) {
                    boardCurr[row-i][col-i] = false;
                    battlefield.push([row-i,col-i]);
                }
                if ((row+i)<CHESS_SIZE && (col-i)>=0) {
                    boardCurr[row+i][col-i] = false;
                    battlefield.push([row+i,col-i]);
                }
                if ((row-i)>=0 && (col+i)<CHESS_SIZE) {
                    boardCurr[row-i][col+i] = false;
                    battlefield.push([row-i,col+i]);
                }
            }
            return battlefield;
        };

*/