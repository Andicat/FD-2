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
    
        
    function chessQueens () {

        var cntChessBoard = blockchess.querySelector('.chess__board');
        var resultChess = blockchess.querySelector('.chess__result');
        var btnComb = resultChess.querySelector('.chess__button--combination');
        var comb = resultChess.querySelector('.chess__combination');
        var resultChessText = resultChess.querySelector('.chess__result-text');
        var chessCeils;

        if (!btnComb || !resultChess || !comb || !resultChessText) {
            return;
        }
        
        if (cntChessBoard) {
            cntChessBoard.remove();
            comb.value = "";    
        }
        
        const CHESS_SIZE = 8;
        var combinations = [];

        //выводит количество комбинаций
        function showResult(combinations) {
            chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
            resultChessText.innerHTML = "Найдено комбинаций: " + combinations.length; 
            if (combinations.length) {
                resultChess.classList.add("chess__result--show");
            }
            btnComb.addEventListener("click", showCombination.bind(comb));
        }
        
        //рисует комбинацию на шахматной доске
        function showCombination() {
            
            if (!Number(this.value)) {
                return;
            }
                                    
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
                e.classList.remove("chess__queen");
            })

            if (combinations[this.value-1]) {
                combinations[this.value-1].forEach( function(q) {
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
            var board = [];
            var divBoard = document.createElement('div');
            divBoard.className = "chess__board";
            for  (var i = 0; i< CHESS_SIZE; i++) {
                var row = [];
                for  (var j = 0; j< CHESS_SIZE; j++) {
                    row.push(i*CHESS_SIZE+j);
                    var divCeil = document.createElement('div');
                    divCeil.className = "chess__ceil " + ((i%2 + j%2)===1? "chess__ceil--black" : "chess__ceil--white");
                    divBoard.appendChild(divCeil);
                }
                board.push(row);    
            }
            blockchess.appendChild(divBoard);
            cntChessBoard = blockchess;
            return board;
        }

        //поиск "поля боя" для ферзя
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

        //поиск возможных комбинаций
        function findCombinations (queens,board) {
            //если ферзей уже 8
            if (queens.length === CHESS_SIZE) {
                combinations.push(queens);
                return;
            }
            
            //перебор строки
            var rowCurr = board[0];
            for (var i = 0; i < rowCurr.length; i++) {
                var ceil = rowCurr[i];
                //массив "поля боя" для ферзя ceil
                var battleField = disableCeils(ceil);
                //удаляем с доски клетки
                var boardCurr = [];
                for (var j = 1; j < board.length; j++) {
                    var newRow = board[j].filter(function(i) {
                        return !battleField.includes(i)
                    });
                    //если какая-либо из строк на доске уже пуста, значит комбинация невозможна
                    if (newRow.length===0) {
                        return;
                    };
                    boardCurr.push(newRow);
                };
                findCombinations(queens.concat([{ceil:ceil,battlefield:battleField}]),boardCurr); 
            }
            return;
        };

        var board = initBoard();
        findCombinations([],board);
        showResult(combinations);
    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            chessQueens();
        });
    }

})();
