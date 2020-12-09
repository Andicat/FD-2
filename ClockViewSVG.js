"use strict";

// view ClockViewSVG
class ClockViewSVG {

    constructor() {
        this.myModel = null;
        this.myContainer = null;
        this.SIZES = {};
    }
    
    init = function(model,container) {
        this.myModel = model;
        this.myContainer = container;
        //создаем нужные нам элементы DOM
        this.create();
    }

    create = function() {

        this.SIZES.CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches?100:200;
        this.SIZES.ARROW_SEC_LENGHT = this.SIZES.CLOCK_SIZE*0.4;
        this.SIZES.ARROW_MIN_LENGHT = this.SIZES.CLOCK_SIZE*0.35;
        this.SIZES.ARROW_HOUR_LENGHT = this.SIZES.CLOCK_SIZE*0.3;
        this.SIZES.ARROW_SEC_WIDTH = this.SIZES.CLOCK_SIZE*0.01;
        this.SIZES.ARROW_MIN_WIDTH = this.SIZES.CLOCK_SIZE*0.02;
        this.SIZES.ARROW_HOUR_WIDTH = this.SIZES.CLOCK_SIZE*0.03;

        //создаем часы
        var clockSvg = document.createElementNS("http://www.w3.org/2000/svg","svg");
        clockSvg.setAttribute("width",this.SIZES.CLOCK_SIZE);
        clockSvg.setAttribute("height",this.SIZES.CLOCK_SIZE);
        clockSvg.setAttribute("xmlns","http://www.w3.org/2000/svg");
        this.myContainer.appendChild(clockSvg);
        var clock = document.createElementNS("http://www.w3.org/2000/svg","circle");
        clock.classList.add("clock__figure");
        clock.setAttribute("cx",this.SIZES.CLOCK_SIZE/2);
        clock.setAttribute("cy",this.SIZES.CLOCK_SIZE/2);
        clock.setAttribute("r",this.SIZES.CLOCK_SIZE/2);
        clockSvg.appendChild(clock);
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmbGroup = document.createElementNS("http://www.w3.org/2000/svg","svg");
            nmbGroup.classList.add("clock__number");
            nmbGroup.setAttribute("width",this.SIZES.CLOCK_SIZE/8);
            nmbGroup.setAttribute("height",this.SIZES.CLOCK_SIZE/8);
            var nmbCircle = document.createElementNS("http://www.w3.org/2000/svg","circle");
            nmbCircle.setAttribute("cx",this.SIZES.CLOCK_SIZE/16);
            nmbCircle.setAttribute("cy",this.SIZES.CLOCK_SIZE/16);
            nmbCircle.setAttribute("r",this.SIZES.CLOCK_SIZE/16);
            var nmbText = document.createElementNS("http://www.w3.org/2000/svg","text");
            nmbText.setAttribute("x",this.SIZES.CLOCK_SIZE/16);
            nmbText.setAttribute("y",this.SIZES.CLOCK_SIZE/16*1.35);
            nmbText.setAttribute("text-anchor","middle");
            nmbText.setAttribute("font-size",this.SIZES.CLOCK_SIZE/16);
            nmbText.setAttribute("fill","black");
            nmbText.textContent = i;
            nmbGroup.appendChild(nmbCircle);
            nmbGroup.appendChild(nmbText);
            clockSvg.appendChild(nmbGroup);
            posNmb(nmbGroup,i,this.SIZES.CLOCK_SIZE);
        }
        
        //создаем стрелки
        this.arrowHour = createArrow(this.SIZES.ARROW_HOUR_WIDTH,this.SIZES.ARROW_HOUR_LENGHT,this.SIZES.CLOCK_SIZE);
        clockSvg.appendChild(this.arrowHour);
        this.arrowMin = createArrow(this.SIZES.ARROW_MIN_WIDTH,this.SIZES.ARROW_MIN_LENGHT,this.SIZES.CLOCK_SIZE);
        clockSvg.appendChild(this.arrowMin);
        this.arrowSec = createArrow(this.SIZES.ARROW_SEC_WIDTH,this.SIZES.ARROW_SEC_LENGHT,this.SIZES.CLOCK_SIZE);
        clockSvg.appendChild(this.arrowSec);

        //создаем центр
        var center = document.createElementNS("http://www.w3.org/2000/svg","circle");
        center.setAttribute("cx",this.SIZES.CLOCK_SIZE/2);
        center.setAttribute("cy",this.SIZES.CLOCK_SIZE/2);
        center.setAttribute("r",this.SIZES.ARROW_SEC_WIDTH/2);
        center.setAttribute("fill","brown");
        clockSvg.appendChild(center);
        
        //создаем цифровые часы
        this.digital = document.createElementNS("http://www.w3.org/2000/svg","text");
        this.digital.setAttribute("x",this.SIZES.CLOCK_SIZE/2);
        this.digital.setAttribute("y",Math.round(this.SIZES.CLOCK_SIZE/1.3));
        this.digital.setAttribute("text-anchor","middle");
        this.digital.setAttribute("font-size",this.SIZES.CLOCK_SIZE/15);
        this.digital.setAttribute("fill","black");
        clockSvg.appendChild(this.digital);

        //создаем название
        var type = document.createElementNS("http://www.w3.org/2000/svg","text");
        type.setAttribute("x",this.SIZES.CLOCK_SIZE/2);
        type.setAttribute("y",Math.round(this.SIZES.CLOCK_SIZE*0.31));
        type.setAttribute("text-anchor","middle");
        type.setAttribute("font-size",this.SIZES.CLOCK_SIZE/15);
        type.textContent = "SVG";
        type.setAttribute("fill","black");
        clockSvg.appendChild(type);

        //позиционирование цифры
        function posNmb(nmb,count,clockSize) {

            var radius = parseFloat(clockSize/2.1*0.85);
            var angle = (count*(360/12))/180*Math.PI;
            
            var clockCenterX = clockSize/2;
            var clockCenterY = clockSize/2;

            var nmbCenterX = clockCenterX + radius*Math.sin(angle);
            var nmbCenterY = clockCenterY - radius*Math.cos(angle);

            var nmbSizes = nmb.getBoundingClientRect();

            nmb.setAttribute("x", Math.round(nmbCenterX - nmbSizes.width/2));
            nmb.setAttribute("y", Math.round(nmbCenterY - nmbSizes.height/2 ));
        }

        //создание стрелки
        function createArrow (arrowWidth, arrowHeight,clockSize) {
            var arrow = document.createElementNS("http://www.w3.org/2000/svg","line");
            arrow.setAttribute("x1",clockSize/2);
            arrow.setAttribute("y1",clockSize/2);
            arrow.setAttribute("x2",clockSize/2);
            arrow.setAttribute("y2",clockSize/2 - arrowHeight);
            arrow.setAttribute("stroke-width",arrowWidth);
            arrow.setAttribute("stroke-linecap","round");
            arrow.setAttribute("stroke","black");
            return arrow;
        }
        
    }

    update = function() {
        var time = this.myModel.time;
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        var secAngle = (360/60)*sec;
        var minAngle = (360/60)*min + (360/60/60)*sec;
        var hourAngle = (360/12)*hour + (360/12/60)*min;
        this.digital.textContent =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
        rotateArrow(this.arrowSec,secAngle,this.SIZES.ARROW_SEC_LENGHT,this.SIZES.CLOCK_SIZE);
        rotateArrow(this.arrowMin,minAngle,this.SIZES.ARROW_MIN_LENGHT,this.SIZES.CLOCK_SIZE);
        rotateArrow(this.arrowHour,hourAngle,this.SIZES.ARROW_HOUR_LENGHT,this.SIZES.CLOCK_SIZE);

        //поворот стрелки
        function rotateArrow(ar,angle,arLenght,clockSize) {

            angle = angle/180*Math.PI;
            
            var clockCenterX = clockSize/2;
            var clockCenterY = clockSize/2;

            var arCenterX1 = clockCenterX - (arLenght*0.05)*Math.sin(angle);
            var arCenterY1 = clockCenterY + (arLenght*0.05)*Math.cos(angle);
            var arCenterX2 = clockCenterX + (arLenght*0.95)*Math.sin(angle);
            var arCenterY2 = clockCenterY - (arLenght*0.95)*Math.cos(angle);

            ar.setAttribute("x1", Math.round(arCenterX1));
            ar.setAttribute("y1", Math.round(arCenterY1));
            ar.setAttribute("x2", Math.round(arCenterX2));
            ar.setAttribute("y2", Math.round(arCenterY2));
        }

        
        // дополняет строку Val слева нулями до длины Len
        function str0l(val,len) {
            var strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }
    }

};
