"use strict";

// view ClockViewCanvas
class ClockViewCanvas {

    constructor() {
        this.myModel = null;
        this.myContainer = null;
        this.context = null;
        this.SIZES = {};
        this.COLORS = {};
    }
    
    init = function(model,container) {
        this.myModel = model;
        this.myContainer = container;
        //создаем нужные нам элементы DOM
        this.create();
    }

    create = function() {

        const CLOCK_SIZE = window.matchMedia("(max-width: 768px)").matches ? 100 : 200;
        this.SIZES = {
            clock: CLOCK_SIZE,
            font: CLOCK_SIZE/14,
            arrowSecLenght: CLOCK_SIZE*0.4,
            arrowSecWidth: CLOCK_SIZE*0.01,
            arrowMinLenght: CLOCK_SIZE*0.35,
            arrowMinWidth: CLOCK_SIZE*0.02,
            arrowHourLenght: CLOCK_SIZE*0.3,
            arrowHourWidth: CLOCK_SIZE*0.03,
        };
        this.COLORS = {
            clock: "#ee9c77",
            number: "#e7723c",
            arrow: "black",
            center: "brown",
        };

        var clockCanvas = document.createElement("canvas");
        clockCanvas.setAttribute("width",this.SIZES.clock);
        clockCanvas.setAttribute("height",this.SIZES.clock);
        this.myContainer.appendChild(clockCanvas);
        this.context = clockCanvas.getContext("2d");
    }

    draw = function() {

        var clockCenterX = this.SIZES.clock/2;
        var clockCenterY = this.SIZES.clock/2;
        
        //рисуем часы
        this.context.fillStyle = this.COLORS.clock;
        this.context.beginPath();
        this.context.arc(clockCenterX,clockCenterY, this.SIZES.clock/2, 0,Math.PI*2, false);
        this.context.fill();
        
        //рисуем циферблат
        var nmbClockRadius = parseFloat(this.SIZES.clock/2.1*0.85);
        var nmbRadius = this.SIZES.clock/16;
        for (var i = 1; i <= 12; i++) {
            var nmbAngle = (i*(360/12))/180*Math.PI;
            var nmbCenterX = Math.round(clockCenterX + nmbClockRadius*Math.sin(nmbAngle));
            var nmbCenterY = Math.round(clockCenterY - nmbClockRadius*Math.cos(nmbAngle));
            //рисуем кружочки
            this.context.fillStyle = this.COLORS.number;
            this.context.beginPath();
            this.context.arc(nmbCenterX, nmbCenterY, nmbRadius, 0,Math.PI*2, false);
            this.context.fill();
            //рисуем цифры в кружочках
            this.context.fillStyle = this.COLORS.arrow;
            this.context.font = this.SIZES.font + "px Roboto";
            var textMeasures = this.context.measureText(i);
            var textWidth = textMeasures.width;
            var textHeight = textMeasures.actualBoundingBoxAscent + textMeasures.actualBoundingBoxDescent;
            this.context.fillText(i, nmbCenterX - textWidth/2, nmbCenterY +  textHeight/2);
        }

        //рисуем часовую стрелку
        drawArrow(this.context,this.SIZES.arrowHourWidth, this.SIZES.arrowHourLenght, this.hourAngle);
        //рисуем минутную стрелку
        drawArrow(this.context,this.SIZES.arrowMinWidth, this.SIZES.arrowMinLenght, this.minAngle);
        //рисуем секундную стрелку
        drawArrow(this.context,this.SIZES.arrowSecWidth, this.SIZES.arrowSecLenght, this.secAngle);

        //рисуем центр
        this.context.fillStyle = this.COLORS.center;
        this.context.beginPath();
        this.context.arc(clockCenterX, clockCenterY, this.SIZES.arrowSecWidth/2, 0,Math.PI*2, false);
        this.context.stroke();
        this.context.fill();
        
        //рисуем цифровые часы
        this.context.fillStyle = this.COLORS.arrow;
        this.context.font ="italic " + this.context.font;
        var textMeasures = this.context.measureText(this.digital);
        var textWidth = textMeasures.width;
        this.context.fillText(this.digital, this.SIZES.clock/2 - textWidth/2, Math.round(this.SIZES.clock/1.3));

        //рисуем наименование
        var type ="CANVAS";
        var textMeasures = this.context.measureText(type);
        var textWidth = textMeasures.width;
        this.context.fillText(type, this.SIZES.clock/2 - textWidth/2, Math.round(this.SIZES.clock*0.31));

        //рисуем стрелку
        function drawArrow (context,arrowWidth, arrowHeight, arrowAngle) {
            var angle = arrowAngle/180*Math.PI;
            var arrowX1 = clockCenterX - (arrowHeight*0.05)*Math.sin(angle);
            var arrowY1 = clockCenterY + (arrowHeight*0.05)*Math.cos(angle);
            var arrowX2 = clockCenterX + (arrowHeight*0.95)*Math.sin(angle);
            var arrowY2 = clockCenterY - (arrowHeight*0.95)*Math.cos(angle);
            context.lineWidth = arrowWidth;
            context.lineCap = "round";
            context.beginPath();
            context.moveTo(arrowX1,arrowY1);
            context.lineTo(arrowX2,arrowY2);
            context.stroke();
        }

    }

    update = function() {
        var time = this.myModel.time;
        var sec = time.getSeconds();
        var min = time.getMinutes();
        var hour = time.getHours();
        this.secAngle = (360/60)*sec;
        this.minAngle = (360/60)*min + (360/60/60)*sec;
        this.hourAngle = (360/12)*hour + (360/12/60)*min;
        this.digital =  str0l(hour,2) + ':' + str0l(min,2) + ':' + str0l(sec,2);
        this.draw();
        
        // дополняет строку Val слева нулями до длины Len
        function str0l(val,len) {
            var strVal=val.toString();
            while ( strVal.length < len )
                strVal='0'+strVal;
            return strVal;
        }
    }

};
