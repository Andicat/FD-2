"use strict";

//controller
class ClockControllerButtons {

    constructor() {
        this.myModel = null; // с какой моделью работаем
        this.myContainer = null; // внутри какого элемента DOM наша вёрстка
    }
    
    init = function(model,container) {
        this.myModel = model;
        this.myContainer = container;

        // создаем нужные нам элементы DOM
        // назначаем обработчики событий
        var cntPanel = document.createElement("div");
        cntPanel.classList.add("clock-mvc__panel");
        cntPanel.style.order = "-1";
        this.myContainer.appendChild(cntPanel);

        var title = document.createElement("span");
        title.classList.add("clock-mvc__title");
        title.textContent = this.myModel.city;
        cntPanel.appendChild(title);

        var utc = document.createElement("span");
        utc.classList.add("clock-mvc__utc");
        utc.textContent = "GMT" + (Math.sign(this.myModel.UTC)>0?"+":"") + this.myModel.UTC;
        cntPanel.appendChild(utc);

        var btnStart = document.createElement("button");
        btnStart.classList.add("clock-mvc__start");
        btnStart.textContent = "Start";
        cntPanel.appendChild(btnStart);
        btnStart.addEventListener("click", this.start.bind(this));

        var btnStop = document.createElement("button");
        btnStop.classList.add("clock-mvc__stop");
        btnStop.textContent = "Stop";
        cntPanel.appendChild(btnStop);
        btnStop.addEventListener("click", this.stop.bind(this));
    }

    start = function() {
        this.myModel.start(); // контроллер вызывает только методы модели
    }

    stop = function() {
        this.myModel.stop(); // контроллер вызывает только методы модели
    }
}
