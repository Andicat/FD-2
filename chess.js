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
    var resultChess = blockchess.querySelector('.chess__result');
    var cntChessBoard = blockchess.querySelector('.chess__board');
    
    function showResult (text) {
        if (resultChess) {
            resultChess.innerHTML = text;
        }
    }

    function chessQueens () {

        const QUEENS_COUNT = 2;
        const CHESS_SIZE = 8;

        function initBoard() {
            var board = [];
            for  (var i = 0; i< CHESS_SIZE; i++) {
                var row = [];
                for  (var j = 0; j< CHESS_SIZE; j++) {
                    row.push(true);
                }
                board.push(row);    
            }
            return board;
        }

        var board = initBoard();

        //var queens = [];

        var combinations = [];

        function drawBoard() {
            if (!cntChessBoard) {
                return;
            }
            var chessRows = cntChessBoard.querySelectorAll('.chess__row');
            var chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
            
            function colorBoard(evt,q) {
                chessCeils.forEach(function(e) {
                    e.classList.remove("chess__ceil--red");
                })
                evt.target.classList.add("chess__ceil--red");
                q.battlefield.forEach(function(b) {
                    chessRows[b[0]].children[b[1]].classList.add("chess__ceil--red");
                })
                
            }
    
            queens.forEach( function(q) {
                var ceil = chessRows[q.ceil[0]].children[q.ceil[1]];
                ceil.classList.add("chess__queen");
                ceil.addEventListener("click", function(evt) { colorBoard(evt,q) })
            })
            

        };

        //функция блокировки клеток на доске
        function disableCeils(boardCurr,row,col) {
            var battlefield = [];
            boardCurr[row][col] = false;
            battlefield.push([row,col]);
            for (var i = 1; i < 8; i++) {
                //горизонтальный ряд
                boardCurr[row][i] = false;
                battlefield.push([row,i]);
                //вертикальный ряд
                boardCurr[i][col] = false;
                battlefield.push([i,col]);
                //диагональные ряды
                if ((row+i)<8 && (col+i)<8) {
                    boardCurr[row+i][col+i] = false;
                    battlefield.push([row+i,col+i]);
                }
                if ((row-i)>=0 && (col-i)>=0) {
                    boardCurr[row-i][col-i] = false;
                    battlefield.push([row-i,col-i]);
                }
                if ((row+i)<8 && (col-i)>=0) {
                    boardCurr[row+i][col-i] = false;
                    battlefield.push([row+i,col-i]);
                }
                if ((row-i)>=0 && (col+i)<8) {
                    boardCurr[row-i][col+i] = false;
                    battlefield.push([row-i,col+i]);
                }
            }
            return battlefield;
        };

        //функция поиска возможных комбинаций
        function findCombinations(ceilStart,queens,boardCurr) {
            
            //перебор доски
            for (var i = ceilStart; i <= 64; i++) {
                if (queens.length>=QUEENS_COUNT) {
                    combinations.push(queens);
                    return;
                }
                //var boardCurr = board.slice();
                //var board = initBoard();
                var row = Math.ceil(i/8)-1;
                var col = 8-(8*(row+1)-i)-1;
                var ceil = board[row][col];
                //если ячейка свободна, ставим туда ферзя
                if (ceil) {
                    //блокируем клетки на доске (поле боя данного ферзя)
                    var battlefield = disableCeils(boardCurr,row,col);
                    var queen = queens.push({ceil:[row,col], battlefield:battlefield});
                    console.log("the queen on [" + row + "," + col + "]");
                }        
                findCombinations(i+1,queens,boardCurr);        
            }
            return;
        };
        
        findCombinations(1,[],board);
        //console.log(board);
        //console.log(queens);
        console.log(combinations);
        drawBoard();


    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            var res = chessQueens();
            //showResult("Результат: " + (res!==null ? res.join("-") : "Цепочку построить невозможно"));
        });
    }

})();
