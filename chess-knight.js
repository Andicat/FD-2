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
        var blockchess = document.querySelector('.chess--knight');
        var btnChess = blockchess.querySelector('.chess__button');
        var cntChessBoard = blockchess.querySelector('.chess__board');
        var resultChess = blockchess.querySelector('.chess__result');
        var btnGoKnight = resultChess.querySelector('.chess__button--go');
        var textChessResult = resultChess.querySelector('.chess__result-text');
        var chessCeils;
        var knight;
    } catch {
        return;
    }
            
    function chessKnight () {

        const CHESS_SIZE = 8;
        var result = [];
        var timerId;

        //выводит результат
        function showResult(result) {
            if (result.length) {
                btnChess.classList.add("hidden");
                textChessResult.innerHTML = "Найдена комбинация!"; 
                resultChess.classList.remove("hidden");
                result.forEach(function (ceil,i) {
                    chessCeils[ceil-1].innerHTML = i+1;
                });
                btnGoKnight.addEventListener("click", showKnightWalk);
            }
        }

        function step(direction) {
            if (direction==="row-right") {
                knight.style.left = (knight.offsetLeft + knight.offsetWidth)+'px';
            }
            if (direction==="row-left") {
                knight.style.left = (knight.offsetLeft - knight.offsetWidth)+'px';
            }
            if (direction==="col-down") {
                knight.style.top = (knight.offsetTop + knight.offsetHeight)+'px';
            }
            if (direction==="col-up") {
                knight.style.top = (knight.offsetTop - knight.offsetHeight)+'px';
            }
            setTimeout(step, 1000, direction);
        }

        //код коня
        function showStep(index,indexPrev) {
            var ceil = chessCeils[result[index]-1];
            while (knight.offsetLeft!==ceil.offsetLeft) {
                step("row" + ((knight.offsetLeft<ceil.offsetLeft)?"-right":"-left"));
            }
            while (knight.offsetTop!==ceil.offsetTop) {
                step("col" + ((knight.offsetTop<ceil.offsetTop)?"-down":"-up"));
            }
            /*if (indexPrev!==undefined) {
                var ceilPrev = chessCeils[result[indexPrev]-1];
                var ceil = chessCeils[result[index]-1];
                //ceilPrev.classList.remove("chess__knight");
                ceil.classList.add("chess__ceil--red");
                var topStart = ceilPrev.offsetTop;
                var leftStart = ceilPrev.offsetLeft;
                var topEnd = ceil.offsetTop;
                var leftEnd = ceil.offsetLeft;
                var step = 50;
                while (topStart!==topEnd) {
                    setTimeout()                       
                    }, timeout);green.style.left=(red.offsetLeft-green.offsetWidth)+'px';
                }
            }*/
            //chessCeils[result[index]-1].classList.add("chess__knight");
            if (index+1>=CHESS_SIZE*CHESS_SIZE) {
                ceil.classList.add("chess__ceil--red");
                return;
            }
            setTimeout(showStep, 3000, index+1);
        }
        
        //Рисует ходы коня по шахматной доске
        function showKnightWalk() {  
            knight.classList.remove("hidden");
            chessCeils.forEach(function(e) {
                e.classList.remove("chess__ceil--red");
            })  
            clearTimeout(timerId);
            showStep(0);                
        };

        //создает шахматную доску
        function initBoard() {
            var board = [];
            var divBoard = document.createElement('div');
            divBoard.className = "chess__board chess__board--knight";

            for  (var i = 1; i <= CHESS_SIZE*CHESS_SIZE; i++) {
                var nextStepArr = nextSteps(i);
                board.push({step:i, stepsArr:nextStepArr});
                var divCeil = document.createElement('div');
                var colorOfCeil = colorOfCeil==="black"?"white":"black";
                if ((i-1)%8===0) {
                    var colorOfCeil = colorOfCeil==="black"?"white":"black";
                }
                divCeil.className = "chess__ceil chess__ceil--knight chess__ceil--" + colorOfCeil;
                divBoard.appendChild(divCeil);
            };
            var divKnight = document.createElement('div');
            divKnight.className = "chess__ceil chess__knight hidden";
            divBoard.appendChild(divKnight);
            blockchess.appendChild(divBoard);
            cntChessBoard = divBoard;
            chessCeils = cntChessBoard.querySelectorAll('.chess__ceil');
            knight = cntChessBoard.querySelector('.chess__knight');
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

        //поиск пути начиная с верхнего левого края шахматной доски
        function findWay (knight,board,combination) {
            var combinationCurr = combination.concat(knight);
            if (combinationCurr.length===CHESS_SIZE*CHESS_SIZE) {
                result = combinationCurr;
                return;
            }
            //сортируем клетки по "многоходовости". Конь шагает в самую "многоходовую" клетку 
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
                findWay(nextStep,boardCurr,combinationCurr); 
            }
            return;
        };

        var board = initBoard();
        findWay(1,board,[]);
        showResult(result);
    }

    if (btnChess) {
        btnChess.addEventListener('click', (event) => {
            chessKnight();
        });
    }

})();
