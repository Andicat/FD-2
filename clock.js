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
    const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches?300:500;
    const ARROW_SEC_LENGHT = CLOCK_SIZE*0.4;
    const ARROW_MIN_LENGHT = CLOCK_SIZE*0.35;
    const ARROW_HOUR_LENGHT = CLOCK_SIZE*0.3;
    const ARROW_SEC_WIDTH = CLOCK_SIZE*0.01;
    const ARROW_MIN_WIDTH = CLOCK_SIZE*0.02;
    const ARROW_HOUR_WIDTH = CLOCK_SIZE*0.03;

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
            console.log(arrow.offsetHeight);

            arrow.style.left = Math.round(clockCenterX - arrow.offsetWidth/2)+'px';
            arrow.style.top = Math.round(clockCenterY - arrow.offsetHeight*0.95)+'px';
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElement("div");
            arrow.classList.add("clock__arrow");
            arrow.style.width = arrowWidth + "px";
            arrow.style.borderRadius = arrowWidth + "px";
            arrow.style.height = (arrowHeight + arrowWidth) + "px";
            arrow.style.transformOrigin = Math.round(arrowWidth/2) + "px " + (arrowHeight + arrowWidth)*0.95 + "px";
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
        
        //создаем стрелки
        var arrowHour = createArrow(ARROW_HOUR_WIDTH,ARROW_HOUR_LENGHT);
        clock.appendChild(arrowHour);
        posArrow(clock,arrowHour);
        var arrowMin = createArrow(ARROW_MIN_WIDTH,ARROW_MIN_LENGHT);
        clock.appendChild(arrowMin);
        posArrow(clock,arrowMin);
        var arrowSec = createArrow(ARROW_SEC_WIDTH,ARROW_SEC_LENGHT);
        clock.appendChild(arrowSec);
        posArrow(clock,arrowSec);

        //создаем центр
        var center = document.createElement("div");
        center.style.width = ARROW_SEC_WIDTH + "px";
        center.style.height = ARROW_SEC_WIDTH + "px";
        center.style.backgroundColor = "brown";
        center.style.position = "absolute";
        center.style.borderRadius = "50%";
        center.style.top = (CLOCK_SIZE/2) + "px";
        center.style.left = (CLOCK_SIZE/2) + "px";
        center.style.transform = "translate(-50%,-50%)";
        clock.appendChild(center);

        //создаем цифровые часы
        var digital = document.createElement("div");
        digital.classList.add("clock__digital");
        digital.style.top = (CLOCK_SIZE - CLOCK_SIZE/10*3) + "px";
        digital.style.left = CLOCK_SIZE/2 + "px";
        digital.style.fontSize = CLOCK_SIZE/20 + "px";
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
            rotateArrow(arrowSec,secAngle,ARROW_SEC_LENGHT);
            rotateArrow(arrowMin,minAngle,ARROW_MIN_LENGHT);
            rotateArrow(arrowHour,hourAngle,ARROW_HOUR_LENGHT);
            timer = setTimeout(runTime,1000);
        };

        //поворот стрелки
        function rotateArrow(ar,angle,arLenght) {

            angle = angle/180*Math.PI;
            
            var clockCenterX = CLOCK_SIZE/2;
            var clockCenterY = CLOCK_SIZE/2;

            var arCenterX1 = clockCenterX - (arLenght*0.05)*Math.sin(angle);
            var arCenterY1 = clockCenterY + (arLenght*0.05)*Math.cos(angle);
            var arCenterX2 = clockCenterX + (arLenght*0.95)*Math.sin(angle);
            var arCenterY2 = clockCenterY - (arLenght*0.95)*Math.cos(angle);

            ar.setAttribute("x1", Math.round(arCenterX1));
            ar.setAttribute("y1", Math.round(arCenterY1));
            ar.setAttribute("x2", Math.round(arCenterX2));
            ar.setAttribute("y2", Math.round(arCenterY2));
        }

        //позиционирование цифры
        function posNmb(nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2*0.85);
            var angle = (count*(360/12))/180*Math.PI;
            
            var clockCenterX = CLOCK_SIZE/2;
            var clockCenterY = CLOCK_SIZE/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            var nmbSizes = nmb.getBoundingClientRect();

            nmb.setAttribute("x", Math.round(nmbCenterX - nmbSizes.width/2));
            nmb.setAttribute("y", Math.round(nmbCenterY - nmbSizes.height/2 ));
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight) {
            var arrow = document.createElementNS("http://www.w3.org/2000/svg","line");
            arrow.setAttribute("x1",CLOCK_SIZE/2);
            arrow.setAttribute("y1",CLOCK_SIZE/2);
            arrow.setAttribute("x2",CLOCK_SIZE/2);
            arrow.setAttribute("y2",CLOCK_SIZE/2 - arrowHeight);
            arrow.setAttribute("stroke-width",arrowWidth);
            arrow.setAttribute("stroke-linecap","round");
            arrow.setAttribute("stroke","black");
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
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmbGroup = document.createElementNS("http://www.w3.org/2000/svg","svg");
            nmbGroup.classList.add("clock__number");
            nmbGroup.setAttribute("width",CLOCK_SIZE/10);
            nmbGroup.setAttribute("height",CLOCK_SIZE/10);
            var nmbCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            nmbCircle.setAttribute("cx",CLOCK_SIZE/20);
            nmbCircle.setAttribute("cy",CLOCK_SIZE/20);
            nmbCircle.setAttribute("r",CLOCK_SIZE/20);
            var nmbText = document.createElementNS("http://www.w3.org/2000/svg","text");
            nmbText.setAttribute("x",CLOCK_SIZE/20);
            nmbText.setAttribute("y",CLOCK_SIZE/20*1.35);
            nmbText.setAttribute("text-anchor","middle");
            nmbText.setAttribute("font-size",CLOCK_SIZE/20);
            nmbText.setAttribute("fill","black");
            nmbText.textContent = i;
            nmbGroup.appendChild(nmbCircle);
            nmbGroup.appendChild(nmbText);
            clockSvg.appendChild(nmbGroup);
            posNmb(nmbGroup,i);
        }
        
        //создаем стрелки
        var arrowHour = createArrow(ARROW_HOUR_WIDTH,ARROW_HOUR_LENGHT);
        clockSvg.appendChild(arrowHour);
        var arrowMin = createArrow(ARROW_MIN_WIDTH,ARROW_MIN_LENGHT);
        clockSvg.appendChild(arrowMin);
        var arrowSec = createArrow(ARROW_SEC_WIDTH,ARROW_SEC_LENGHT);
        clockSvg.appendChild(arrowSec);

        //создаем центр
        var center = document.createElementNS("http://www.w3.org/2000/svg","circle");
        center.setAttribute("cx",CLOCK_SIZE/2);
        center.setAttribute("cy",CLOCK_SIZE/2);
        center.setAttribute("r",ARROW_SEC_WIDTH/2);
        center.setAttribute("fill","brown");
        clockSvg.appendChild(center);
        
        //создаем цифровые часы
        var digital = document.createElementNS("http://www.w3.org/2000/svg","text");
        digital.setAttribute("x",CLOCK_SIZE/2);
        digital.setAttribute("y",CLOCK_SIZE/1.35);
        digital.setAttribute("text-anchor","middle");
        digital.setAttribute("font-size",CLOCK_SIZE/20);
        digital.setAttribute("fill","black");
        clockSvg.appendChild(digital);
        
        //запускаем часы
        runTime();
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

    /*Array.prototype.map2 = function(f) { 
        var ar1 = this;
        var ar2 = [];
        for (var i = 0; i < ar1.length; i++) {
            ar2.push(f(ar1[i],i,ar1));
        }
        return ar2;
    };
    var aaa = [1,2,3,4,5];
    var bbb = aaa.map2(v=>v*2);
    var f = function(v,i,a) { return "" + v + "" + i + "" + a};
    console.log(aaa);
    var ccc = aaa.map2(f);
    console.log(bbb);
    console.log(ccc);

    var o = {"4":true};

    console.log(o.hasOwnProperty("4"));
    console.log(o);

    eval("var x = 1;"); 
    console.log(x);

    var NaN = NaN
    var undefined = undefined
    var Infinity = "1"
    var o = "ggg"
    console.log(o);
    var b;
    
    function ttt(a,a,a) {
        var res = b = 3;
    }
    ttt();
    console.log(res);*/

    /*var a = "5";
    var b = 2;
    var c = a+++b;
    console.log(c); //а+++b эквивалентно записи (a++)+b Значение - a равно "5", а значение - a++ равно 5 (так как это постфиксный инкремент) Следовательно а+++b = 5 + 2 = 7*/

    //Оператор ~ равносилен - (n + 1) то есть - (2 + 1) = -3

    let x;
    x = 'hello' && 123; //x===123
    x = 'hello' || 123; //x==='hello'
    x = false && 123; //x===false
    x = false || 123; //x===123

    //палиндром
    x = "abc";
    x = x.toLowerCase().split("").reverse().join("");
    //console.log(x);

    /*
    Напишите функцию, которая выводит в консоль числа от 1 до n, где n — целое число, которое функция принимает в качестве параметра, при этом:
    выводит fizz вместо чисел, кратных 3;
    выводит buzz вместо чисел, кратных 5;
    выводит fizzbuzz вместо чисел, кратных и 3, и 5.
    */
    function fizzbuzz(value) {
       var res;
       for (var i=1; i<= value; i++) {
        res = (i%3+i%5===0?"fizzbuzz":(i%5===0?"buzz":(i%3===0?"fizz":i)));
        console.log(res);
       }
    }

   //fizzbuzz(15);

    /*
    Напишите функцию, проверяющую, являются ли две строки анаграммами
    друг друга (регистр букв не имеет значения). 
    Важны только символы, пробелы или знаки препинания не учитываются. Пример:
    anagram('finder', 'Friend')  --> true
    anagram('hello', 'bye') --> false
    */

    function anagram(str1,str2) {
        str1 = str1.toLowerCase().split("").sort();
        str2 = str2.toLowerCase().split("").sort();
        if (str1.length!==str2.length) {
            console.log("false");
            return;
        }
        str1.forEach( (v,i) => {
            if (v!==str2[i]) {
                console.log("false");
                return;
            }
        });
        console.log("true");
        return;
        
    }

    //anagram('finder', 'Friend');
    //anagram('hello', 'bye');

    /*
    Последовательность Фибоначчи — это порядок чисел, где каждое последующее число является суммой двух предыдущих. 
    Например, первые десять чисел последовательности выглядят так: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
    Напишите функцию, которая возвращает n-ую запись в последовательности, где n — это число, которое вы передаёте в качестве аргумента функции.
    Пример:
    fibonacci(3)  // --> 2
    */

    function fibonacci(index) {
        var res = [];
        for (var i=0; i<=index; i++) {
            var c = (i<=1)?i:res[i-1]+res[i-2]
            res.push(c);
        }
        console.log(c);
        return c;
    }

    fibonacci(9);

})();
