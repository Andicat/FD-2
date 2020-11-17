"use strict";

//======================================CLOCK==================================
/*
Создать проект CLOCK с помощью канвас.
*/

(function () {

    try {
        var blockClock = document.querySelector(".clock");
        var btnClockCanvas = blockClock.querySelector(".clock__button-canvas");
        var cntClock = blockClock.querySelector(".clock__container");
    } catch {
        return;
    }

    var timer;
    var clockCanvas;
    const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches?300:500;
    const FONT_SIZE = window.matchMedia("(max-width: 768px)").matches?15:25;
    const ARROW_SEC_LENGHT = CLOCK_SIZE*0.4;
    const ARROW_MIN_LENGHT = CLOCK_SIZE*0.35;
    const ARROW_HOUR_LENGHT = CLOCK_SIZE*0.3;
    const ARROW_SEC_WIDTH = CLOCK_SIZE*0.01;
    const ARROW_MIN_WIDTH = CLOCK_SIZE*0.02;
    const ARROW_HOUR_WIDTH = CLOCK_SIZE*0.03;
    const COLOR_CLOCK = "rgba(231, 114, 60, 0.8)";
    const COLOR_NUMBER = "rgba(231, 114, 60)";
    const COLOR_ARROW = "black";
    const COLOR_CLOCK_CENTER = "brown";

    // дополняет строку Val слева нулями до длины Len
    function str0l(val,len) {
        var strVal=val.toString();
        while ( strVal.length < len )
            strVal="0"+strVal;
        return strVal;
    }

    //рисуем стрелку
    function drawArrow (context, arrowWidth, arrowHeight) {
        context.lineWidth = arrowWidth;
        context.lineCap = "round";
        context.beginPath();
        context.moveTo(CLOCK_SIZE/2,CLOCK_SIZE/2);
        context.lineTo(CLOCK_SIZE/2,CLOCK_SIZE/2 - arrowHeight);
        context.stroke();
    }

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

    //создание часов с помощью Canvas
    function drawClockCanvas () {

        clearTimeout(timer);
        var time = new Date();
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        var secAngle = (360/60)*sec;
        var minAngle = (360/60)*min + (360/60/60)*sec;
        var hourAngle = (360/12)*hour + (360/12/60)*min;
        var timeDigital =  str0l(hour,2) + ":" + str0l(min,2) + ":" + str0l(sec,2);
    
        //рисуем часы
        var clockCenterX = CLOCK_SIZE/2;
        var clockCenterY = CLOCK_SIZE/2;
        var context = clockCanvas.getContext("2d");
        context.fillStyle = COLOR_CLOCK;
        context.strokeStyle = COLOR_CLOCK;
        console.log(context.fillStyle);
        //context.globalAlpha = 0.7;
        context.beginPath();
        context.arc(clockCenterX,clockCenterY, CLOCK_SIZE/2, 0,Math.PI*2, false);
        context.stroke();
        context.fill();
        
        //рисуем циферблат
        //context.globalAlpha = 1;
        var nmbClockRadius = parseFloat(CLOCK_SIZE/2*0.85);
        var nmbRadius = CLOCK_SIZE/20;
        for (var i = 1; i <= 12; i++) {
            var nmbAngle = (i*(360/12))/180*Math.PI;
            var nmbCenterX = Math.round(clockCenterX + nmbClockRadius*Math.sin(nmbAngle));
            var nmbCenterY = Math.round(clockCenterY - nmbClockRadius*Math.cos(nmbAngle));
            //рисуем кружочки
            context.fillStyle = COLOR_NUMBER;
            context.strokeStyle = COLOR_NUMBER;
            context.beginPath();
            context.arc(nmbCenterX, nmbCenterY, nmbRadius, 0,Math.PI*2, false);
            context.stroke();
            context.fill();
            //рисуем цифры в кружочках
            context.strokeStyle = COLOR_ARROW;
            context.fillStyle = COLOR_ARROW;
            context.font = FONT_SIZE + "px Roboto";
            var textMeasures = context.measureText(i);
            var textWidth = textMeasures.width;
            var textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent;
            context.fillText(i, nmbCenterX - textWidth/2, nmbCenterY +  textHeight/2);
        }

        //рисуем часовую стрелку
        drawArrow(context, ARROW_HOUR_WIDTH, ARROW_HOUR_LENGHT);
        //рисуем минутную стрелку
        drawArrow(context, ARROW_MIN_WIDTH, ARROW_MIN_LENGHT);
        //рисуем секундную стрелку
        drawArrow(context, ARROW_SEC_WIDTH, ARROW_SEC_LENGHT, );

        //русуем центр
        context.fillStyle = COLOR_CLOCK_CENTER;
        context.beginPath();
        context.arc(clockCenterX, clockCenterY, ARROW_SEC_WIDTH/2, 0,Math.PI*2, false);
        context.stroke();
        context.fill();
        
        //рисуем цифровые часы
        context.fillStyle = COLOR_ARROW;
        context.font ="italic " + context.font;
        var textMeasures = context.measureText(timeDigital);
        var textWidth = textMeasures.width;
        var textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent;
        context.fillText(timeDigital, CLOCK_SIZE/2 - textWidth/2, CLOCK_SIZE/1.35 - textHeight);
        
        timer = setTimeout(drawClockCanvas,1000);
    }

    btnClockCanvas.addEventListener("click", function() {
        clearInterval(timer);
        cntClock.innerHTML = "";
        clockCanvas = document.createElement("canvas");
        clockCanvas.setAttribute("width",CLOCK_SIZE);
        clockCanvas.setAttribute("height",CLOCK_SIZE);
        cntClock.appendChild(clockCanvas);
        drawClockCanvas();
    });

    /*
    Точность часов!!!!
    запускаем как SetTimeout(1000-getmiliseconds)
    */

})();
