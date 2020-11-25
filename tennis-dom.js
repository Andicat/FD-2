'use strict';

//======================================TENNIS==================================
/*
Реализовать игру «Теннис» методами DOM (проект TENNIS_DOM).
Мяч прыгает по полю, слева и справа ракетки его отбивают.
Размер поля НЕ резиновый, он должен быть задан на уровне JavaScript-кода константами.
Запуск мяча — по кнопке «старт!», при этом мяч вылетает прямо из середины поля в случайном направлении под случайным (в разумных пределах) углом.
Управление левой ракеткой — клавишами Shift (вверх) и Ctrl (вниз),
правой ракеткой — «стрелка вверх» и «стрелка вниз». Пока клавиша удерживается, ракетка плавно движется; клавиша отпущена — ракетка останавливается.
Если ракетка отбивает мяч — мяч должен отпрыгнуть от ракетки (а не долететь до стенки сквозь ракетку).
Если мяч долетает до левой или правой стенки — засчитывается гол (ведётся подсчёт очков) и до следующего нажатия «старт!» мяч остановлен возле самой стенки, прикоснувшись к ней.
Никаких «волшебных констант» в коде не использовать — все константы вынести в начало скрипта с чётким документированием.
*/

(function () {

    try {
        var blockTennis = document.querySelector('.tennis');
        var btnTennisDOM = blockTennis.querySelector('.tennis__button-dom');
        var cntTennis = blockTennis.querySelector('.tennis__container');
    } catch {
        return;
    }

    var timer;
    const TENNIS_SIZE = window.matchMedia("(max-width: 768px)").matches?300:500;
    
    const SIZES = {
        playgroundWidth: TENNIS_SIZE,
        playgroundHeight: TENNIS_SIZE/1.5,
        playerWidth: TENNIS_SIZE*0.02,
        playerHeight: TENNIS_SIZE*0.2,
        ball: TENNIS_SIZE*0.05,
    };
    const COLORS = {
        playground: "#e8e89b",
        playerOne: "#323a94",
        playerTwo: "#e7723c",
        ball: "brown",
    }

    //мячик
    class Ball {

        constructor() {
            this.elem;
            this.posX;
            this.posY;
            this.speedX = 1;
            this.speedY = 1;
            this.width;
            this.height;
        };

        create = function(cnt,color,width,height) {
            this.width = width;
            this.height = height;
            this.elem = document.createElement("div");
            this.elem.style.width = this.width + "px";
            this.elem.style.height = this.height + "px";
            this.elem.style.backgroundColor = color;
            this.elem.style.position = "absolute";
            this.elem.style.borderRadius = "50%";
            this.elem.style.transform = "translate(-50%,-50%)";
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX,posY) {
            this.elem.style.left = posX + "px";
            this.elem.style.top = posY + "px";
        };
      
    }

    //игрок
    class Player {

        constructor() {
            this.elem;
            this.posX;
            this.posY;
            this.speed = 1;
            this.width;
            this.height;
        };

        create = function(cnt,color,width,height) {
            this.width = width;
            this.height = height;
            this.elem = document.createElement("div");
            this.elem.classList.add("tennis__player");
            this.elem.style.width = this.width + "px";
            this.elem.style.height = this.height + "px";
            this.elem.style.backgroundColor = color;
            this.elem.style.position = "absolute";
            cnt.appendChild(this.elem);
        };

        moveTo = function (posX,posY) {
            this.elem.style.left = posX + "px";
            this.elem.style.top = posY + "px";
        };
      
    }

    //создание тенниса с помощью DOM-элементов
    function renderTennisDOM (cnt) {

        var pgHeight = SIZES.playgroundHeight;
        var pgWidth = SIZES.playgroundWidth;

        //создаем корт
        var tennis = document.createElement("div");
        tennis.classList.add("tennis__playground");
        tennis.style.width = SIZES.playgroundWidth + "px";
        tennis.style.height = SIZES.playgroundHeight + "px";
        tennis.style.backgroundColor = COLORS.playground;
        cnt.appendChild(tennis);
        
        //создаем игрока 1
        var playerOne = new Player();
        playerOne.create(tennis,COLORS.playerOne,SIZES.playerWidth,SIZES.playerHeight);
        playerOne.moveTo(SIZES.playgroundWidth - playerOne.width,SIZES.playgroundHeight/2);

        //создаем игрока 2
        var playerTwo = new Player();
        playerTwo.create(tennis,COLORS.playerTwo,SIZES.playerWidth,SIZES.playerHeight);
        playerTwo.moveTo(0,SIZES.playgroundHeight/2);
                
        //создаем мяч
        var ball = new Ball();
        ball.create(tennis,COLORS.ball,SIZES.ball,SIZES.ball);
        ball.moveTo((SIZES.playgroundWidth/2),(SIZES.playgroundHeight/2))


        window.addEventListener("keydown", function(evt) {
            if (evt.keyCode === 27) {
            evt.preventDefault();
            closeModals();
            }
        });

        function runTennis() {
            function start() {
                // плавное движение - от 25 кадр/сек
                setInterval(tick,40);
            }
        
            function tick() {
        
                ballH.posX+=ballH.speedX;
                // вылетел ли мяч правее стены?
                if ( ballH.posX+ballH.width>areaH.width ) {
                    ballH.speedX=-ballH.speedX;
                    ballH.posX=areaH.width-ballH.width;
                }
                // вылетел ли мяч левее стены?
                if ( ballH.posX<0 ) {
                    ballH.speedX=-ballH.speedX;
                    ballH.posX=0;
                }
        
                ballH.posY+=ballH.speedY;
                // вылетел ли мяч ниже пола?
                if ( ballH.posY+ballH.height>areaH.height ) {
                    ballH.speedY=-ballH.speedY;
                    ballH.posY=areaH.height-ballH.height;
                }
                // вылетел ли мяч выше потолка?
                if ( ballH.posY<0 ) {
                    ballH.speedY=-ballH.speedY;
                    ballH.posY=0;
                }
        
                ballH.update();
            }
        }
           
    
        //запускаем теннис
        //runTennis();
    }

    btnTennisDOM.addEventListener('click', function() {
        clearInterval(timer);
        cntTennis.innerHTML = "";
        renderTennisDOM(cntTennis);
    });

})();
