"use strict";

//======================================CLOCK_MVC==================================
/*
Создать проект CLOCK. Реализовать согласно концепции активного MVC:
Model — часы, класс Clock в файле Clock.js, могут идти (отображая актуальное время) либо стоять (отображая время на момент остановки);
View — реализовать три варианта:
класс ClockViewDOM в файле ClockViewDOM.js
для отображения часов средствами HTML/CSS/DOM;
класс ClockViewSVG в файле ClockViewSVG.js
для отображения средствами SVG и
класс ClockViewCanvas в файле ClockViewCanvas.js
для отображения средствами Canvas;
Controller — реализовать вариант старта/остановки часов кнопками,
класс ClockControllerButtons в файле ClockControllerButtons.js.
Создать шесть объектов часов, для двух установить отображение в DOM, ещё для двух — в SVG, и ещё для двух — в Canvas, расположить их на одной странице.
Каждые часы должны отображать текущее время в своём часовом поясе.
Все шесть часов должны независимо управляться своими кнопками «стоп» и «старт» 
(при загрузке страницы часы должны идти; по нажатию кнопки «стоп» стрелки должны останавливаться;
по нажатию «старт» — переводиться на текущее время и снова идти).
*/


(function () {

    var cntClockMVC = document.querySelector('.clock-mvc');

    function createClock (cityName,utcDelta,typeView) {

        // настройка, инициализация
        // создаём все три компонента
        var clock = new Clock(cityName,utcDelta);
        switch (typeView.toUpperCase()) {
            case "DOM": 
                var viewClock = new ClockViewDOM();
                break;
            case "SVG": 
                var viewClock = new ClockViewSVG();
                break;
            case "CANVAS": 
                var viewClock = new ClockViewCanvas();
                break;
            default:
        }
        
        var controller = new ClockControllerButtons();

        // увязываем компоненты друг с другом
        // указываем компонентам, в каком DOM им работать
        var cntClock = document.createElement("div");
        cntClock.classList.add("clock-mvc__container");
        cntClockMVC.appendChild(cntClock);

        viewClock.init(clock,cntClock);
        controller.init(clock,cntClock);
        clock.init(viewClock);

        // инициируем первичное отображение Model во View
        clock.updateView();
        }

    createClock("Firenze",1,"DOM");
    createClock("Minsk",3,"SVG");
    createClock("Fiji",12,"Canvas");
    createClock("Miami",-5,"SVG");
    createClock("Denpasar",8,"Canvas");
    createClock("Lissabon",0,"DOM");

})();