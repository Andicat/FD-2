'use strict';

//======================================CLOCK==================================
/*
Создать проект CLOCK_DOM. Реализовать методами DOM показывающие текущее время 
и идущие в реальном времени часы по нижеуказанному макету.
Цифры часов не верстать «жёстко», создавать их и вычислять их позиции в цикле.
Никаких «волшебных констант» в коде не использовать — все константы вынести в начало скрипта с чётким документированием.
Реализовать часы (проект CLOCK_SVG) с использованием SVG.
Описание — в домашнем задании про проект CLOCK_DOM.
*/

(function () {

    try {
        var blockClock = document.querySelector('.clock');
        var btnClockDOM = blockClock.querySelector('.clock__button-dom');
        var btnClockSVG = blockClock.querySelector('.clock__button-svg');
        var cntClock = blockClock.querySelector('.clock__container');
    } catch {
        return;
    }

    var timer;
    const CLOCK_SIZE = 500;

    // дополняет строку Val слева нулями до длины Len
    function str0l(val,len) {
        var strVal=val.toString();
        while ( strVal.length < len )
            strVal='0'+strVal;
        return strVal;
    }

    //создание часов с помощью DOM-элементов
    function renderClockDOM (cnt) {

        //ход часов
        function runTime() {
            clearTimeout(timer);
            var time = new Date();
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hour = time.getHours();
            var secAngle = (360/60)*sec;
            var minAngle = (360/60)*min + (360/60/60)*sec;
            var hourAngle = (360/12)*hour + (360/12/60)*min;
            digital.textContent =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
            arrowSec.style.transform = "rotate(" + secAngle + "deg)";
            arrowMin.style.transform = "rotate(" + minAngle + "deg)";
            arrowHour.style.transform = "rotate(" + hourAngle + "deg)";
            timer = setTimeout(runTime,1000);
        };

        //позиционирование цифры
        function posNmb(clock,nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2*0.85);
            var angle = (count*(360/12))/180*Math.PI;

            var clockCenterX = clock.offsetWidth/2;
            var clockCenterY = clock.offsetHeight/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            nmb.style.left = Math.round(nmbCenterX - nmb.offsetWidth/2)+'px';
            nmb.style.top = Math.round(nmbCenterY - nmb.offsetHeight/2)+'px';
        }

        //позиционирование стрелки
        function posArrow (clock,arrow) {

            var clockCenterX = clock.offsetWidth/2;
            var clockCenterY = clock.offsetHeight/2;

            arrow.style.left = Math.round(clockCenterX - arrow.offsetWidth/2)+'px';
            arrow.style.top = Math.round(clockCenterY - arrow.offsetHeight + 10)+'px';
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElement("div");
            arrow.classList.add("clock__arrow");
            arrow.style.width = arrowWidth + "px";
            arrow.style.borderRadius = arrowWidth + "px";
            arrow.style.height = arrowHeight + "px";
            arrow.style.transformOrigin = Math.round(arrowWidth/2) + "px " + (arrowHeight-10) + "px";
            return arrow;
        }

        //создаем часы
        var clock = document.createElement("div");
        clock.classList.add("clock__figure");
        clock.style.width = CLOCK_SIZE + "px";
        clock.style.height = CLOCK_SIZE + "px";
        cnt.appendChild(clock);
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmb = document.createElement("div");
            nmb.classList.add("clock__number");
            nmb.style.width = CLOCK_SIZE/10 + "px";
            nmb.style.height = CLOCK_SIZE/10 + "px";
            nmb.style.fontSize = CLOCK_SIZE/20 + "px";
            nmb.textContent = i;
            clock.appendChild(nmb);
            posNmb(clock,nmb,i);
        }
        
        //создаем центр
        var center = document.createElement("div");
        center.style.width = "4px";
        center.style.height = "4px";
        center.style.backgroundColor = "brown";
        center.style.zIndex = "10";
        center.style.position = "absolute";
        center.style.borderRadius = "50%";
        center.style.top = (clock.offsetHeight/2 - 2) + "px";
        center.style.left = (clock.offsetWidth/2 - 2) + "px";
        clock.appendChild(center);
        
        //создаем стрелки
        var arrowHour = createArrow(CLOCK_SIZE/10/4,CLOCK_SIZE/2*0.7);
        clock.appendChild(arrowHour);
        posArrow(clock,arrowHour);
        var arrowMin = createArrow(CLOCK_SIZE/10/6,CLOCK_SIZE/2*0.75);
        clock.appendChild(arrowMin);
        posArrow(clock,arrowMin);
        var arrowSec = createArrow(CLOCK_SIZE/10/9,CLOCK_SIZE/2*0.8);
        clock.appendChild(arrowSec);
        posArrow(clock,arrowSec);

        //создаем цифровые часы
        var digital = document.createElement("div");
        digital.classList.add("clock__digital");
        digital.style.top = (CLOCK_SIZE - CLOCK_SIZE/10*3) + "px";
        digital.style.left = CLOCK_SIZE/2 + "px";
        digital.style.transform = "translateX(-50%)";
        clock.appendChild(digital);
        
        //запускаем часы
        runTime();
    }

    //создание часов с помощью SVG
    function renderClockSVG (cnt) {

        //ход часов
        function runTime() {
            clearTimeout(timer);
            var time = new Date();
            var sec = time.getSeconds();
            var min = time.getMinutes();
            var hour = time.getHours();
            var secAngle = (360/60)*sec;
            var minAngle = (360/60)*min + (360/60/60)*sec;
            var hourAngle = (360/12)*hour + (360/12/60)*min;
            digital.textContent =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
            arrowSec.style.transform = "rotate(" + secAngle + "deg)";
            arrowMin.style.transform = "rotate(" + minAngle + "deg)";
            arrowHour.style.transform = "rotate(" + hourAngle + "deg)";
            timer = setTimeout(runTime,1000);
        };

        //позиционирование цифры
        function posNmb(clock,nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2*0.85);
            var angle = (count*(360/12))/180*Math.PI;
            
            var clockCenterX = clockSizes.width/2;
            var clockCenterY = clockSizes.height/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            var nmbSizes = clock.getBoundingClientRect();

            nmb.setAttribute("cx", Math.round(nmbCenterX));
            nmb.setAttribute("cy", Math.round(nmbCenterY));
        }

        //позиционирование стрелки
        function posArrow (clock,arrow) {

            var clockCenterX = clock.offsetWidth/2;
            var clockCenterY = clock.offsetHeight/2;

            arrow.style.left = Math.round(clockCenterX - arrow.offsetWidth/2)+'px';
            arrow.style.top = Math.round(clockCenterY - arrow.offsetHeight + 10)+'px';
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElement("div");
            arrow.classList.add("clock__arrow");
            arrow.style.width = arrowWidth + "px";
            arrow.style.borderRadius = arrowWidth + "px";
            arrow.style.height = arrowHeight + "px";
            arrow.style.transformOrigin = Math.round(arrowWidth/2) + "px " + (arrowHeight-10) + "px";
            return arrow;
        }

        //создаем часы
        var clockSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        clockSvg.setAttribute("width",CLOCK_SIZE);
        clockSvg.setAttribute("height",CLOCK_SIZE);
        clockSvg.setAttribute("xmlns","http://www.w3.org/2000/svg");
        cnt.appendChild(clockSvg);
        var clock = document.createElementNS("http://www.w3.org/2000/svg","circle");
        clock.classList.add("clock__figure");
        clock.setAttribute("cx",CLOCK_SIZE/2);
        clock.setAttribute("cy",CLOCK_SIZE/2);
        clock.setAttribute("r",CLOCK_SIZE/2);
        clockSvg.appendChild(clock);

        var clockSizes = clock.getBoundingClientRect();
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmbGroup = document.createElementNS("http://www.w3.org/2000/svg","g");
            nmbGroup.classList.add("clock__number");
            var nmbCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            nmbCircle.setAttribute("r",CLOCK_SIZE/20);
            var nmbText = document.createElementNS("http://www.w3.org/2000/svg","text");
            nmbText.textContent = i;
            nmbGroup.appendChild(nmbCircle);
            nmbGroup.appendChild(nmbText);
            clockSvg.appendChild(nmbGroup);
            posNmb(clock,nmbCircle,i);
            posNmb(clock,nmbText,i);
        }
        
        /*//создаем центр
        var center = document.createElement("div");
        center.style.width = "4px";
        center.style.height = "4px";
        center.style.backgroundColor = "brown";
        center.style.zIndex = "10";
        center.style.position = "absolute";
        center.style.borderRadius = "50%";
        center.style.top = (clock.offsetHeight/2 - 2) + "px";
        center.style.left = (clock.offsetWidth/2 - 2) + "px";
        clock.appendChild(center);
        
        //создаем стрелки
        var arrowHour = createArrow(CLOCK_SIZE/10/4,CLOCK_SIZE/2*0.7);
        clock.appendChild(arrowHour);
        posArrow(clock,arrowHour);
        var arrowMin = createArrow(CLOCK_SIZE/10/6,CLOCK_SIZE/2*0.75);
        clock.appendChild(arrowMin);
        posArrow(clock,arrowMin);
        var arrowSec = createArrow(CLOCK_SIZE/10/9,CLOCK_SIZE/2*0.8);
        clock.appendChild(arrowSec);
        posArrow(clock,arrowSec);

        //создаем цифровые часы
        var digital = document.createElement("div");
        digital.classList.add("clock__digital");
        digital.style.top = (CLOCK_SIZE - CLOCK_SIZE/10*3) + "px";
        digital.style.left = CLOCK_SIZE/2 + "px";
        digital.style.transform = "translateX(-50%)";
        clock.appendChild(digital);
        
        //запускаем часы
        runTime();*/
    }

    btnClockDOM.addEventListener('click', function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        renderClockDOM(cntClock);
    });

    btnClockSVG.addEventListener('click', function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        renderClockSVG(cntClock);
    });

})();
