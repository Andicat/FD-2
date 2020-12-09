"use strict";

// view ClockViewDOM
class ClockViewDOM {

    constructor() {
        this.myModel = null;
        this.myContainer = null;    
    }
    
    init = function(model,container) {
        this.myModel = model;
        this.myContainer = container;
        //создаем нужные нам элементы DOM
        this.create();
    }

    create = function() {

        const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches?100:200;
        const ARROW_SEC_LENGHT = CLOCK_SIZE*0.4;
        const ARROW_MIN_LENGHT = CLOCK_SIZE*0.35;
        const ARROW_HOUR_LENGHT = CLOCK_SIZE*0.3;
        const ARROW_SEC_WIDTH = CLOCK_SIZE*0.01;
        const ARROW_MIN_WIDTH = CLOCK_SIZE*0.02;
        const ARROW_HOUR_WIDTH = CLOCK_SIZE*0.03;

        //создаем часы
        var clock = document.createElement("div");
        clock.classList.add("clock__figure");
        clock.style.width = CLOCK_SIZE + "px";
        clock.style.height = CLOCK_SIZE + "px";
        this.myContainer.appendChild(clock);
        
        //создаем циферблат
        for (var i = 1; i <= 12; i++) {
            var nmb = document.createElement("div");
            nmb.classList.add("clock__number");
            nmb.style.width = CLOCK_SIZE/8 + "px";
            nmb.style.height = CLOCK_SIZE/8 + "px";
            nmb.style.fontSize = CLOCK_SIZE/15 + "px";
            nmb.textContent = i;
            clock.appendChild(nmb);
            posNmb(clock,nmb,i);
        }
        
        //создаем стрелки
        this.arrowHour = createArrow(ARROW_HOUR_WIDTH,ARROW_HOUR_LENGHT);
        clock.appendChild(this.arrowHour);
        posArrow(clock,this.arrowHour);
        this.arrowMin = createArrow(ARROW_MIN_WIDTH,ARROW_MIN_LENGHT);
        clock.appendChild(this.arrowMin);
        posArrow(clock,this.arrowMin);
        this.arrowSec = createArrow(ARROW_SEC_WIDTH,ARROW_SEC_LENGHT);
        clock.appendChild(this.arrowSec);
        posArrow(clock,this.arrowSec);

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
        this.digital = document.createElement("div");
        this.digital.classList.add("clock__digital");
        this.digital.style.top = Math.round(CLOCK_SIZE/1.3) + "px";
        this.digital.style.left = CLOCK_SIZE/2 + "px";
        this.digital.style.fontSize = CLOCK_SIZE/15 + "px";
        this.digital.style.transform = "translate(-50%,-100%)";
        clock.appendChild(this.digital);

        //создаем название
        var type = document.createElement("div");
        type.classList.add("clock__digital");
        type.style.top = Math.round(CLOCK_SIZE*0.35) + "px";
        type.style.left = CLOCK_SIZE/2 + "px";
        type.style.fontSize = CLOCK_SIZE/15 + "px";
        type.style.transform = "translate(-50%,-100%)";
        type.textContent = "DOM";
        clock.appendChild(type);

        //позиционирование цифры
        function posNmb(clock,nmb,count) {

            var radius = parseFloat(CLOCK_SIZE/2.1*0.85);
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
        this.arrowSec.style.transform = "rotate(" + secAngle + "deg)";
        this.arrowMin.style.transform = "rotate(" + minAngle + "deg)";
        this.arrowHour.style.transform = "rotate(" + hourAngle + "deg)";

        // дополняет строку Val слева нулями до длины Len
        function str0l(val,len) {
            var strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }
    }

};
