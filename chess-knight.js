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
        function showResult(result) {
            resultChessText.innerHTML = "Найдена комбинация!"; 
            if (result.length) {
                resultChess.classList.add("chess__result--show");
            }
            btnComb.addEventListener("click", showResult);
        }
        
        //рисует результат на шахматной доске
        function showResult() {
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
            var board = [];
            var divBoard = document.createElement('div');
            divBoard.className = "chess__board";

            for  (var i = 1; i <= CHESS_SIZE*CHESS_SIZE; i++) {
                var nextStepArr = nextSteps(i);
                board.push({step:i, stepsArr:nextStepArr});
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

        //поиск комбинации начиная с верхнего левого края шахматной доски
        function findCombinations (knight,board,combination) {
            var combinationCurr = combination.concat(knight);
            if (combinationCurr.length===CHESS_SIZE*CHESS_SIZE) {
                result = combinationCurr;
                return;
            }
            //сортируем клетки по "многоходовости". Конь шагает в самую "многоходовую в след.шаге" клетку 
            function sf (a,b) {
                var bl = (board.filter(v => v.step == b)[0].stepsArr.length);
                var al = board.filter(v => v.step == a)[0].stepsArr.length;
                return al - bl;
            }
            var nextStepsArr = board[0].stepsArr.sort(sf);
            //убираем с доски текущую клетку
            var boardCurr = [];
            for (var i = 1; i < board.length; i++) {
                var newStepsArr = board[i].stepsArr.filter(function(i) {
                    return i!==knight;
                });
                boardCurr.push({step:board[i].step, stepsArr:newStepsArr});
            }
            
            //перебор возможных ходов с текущей клетки
            for (var i = 0; i < nextStepsArr.length; i++) {
                var nextStep = nextStepsArr[i];
                if (result.length!==0) {
                    return;
                }
                //сортируем таблицу по след.шагу
                boardCurr = boardCurr.sort((a,b)=>{return a.step===nextStep?-1:0;});
                findCombinations(nextStep,boardCurr,combinationCurr); 
            }
            return;
        };

        var board = initBoard();
        findCombinations(1,board,[]);
        console.log(result);
        showResult(result);
    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            chessKnight();
        });
    }

})();
