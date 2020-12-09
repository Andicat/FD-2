"use strict";

// model
class Clock {

    constructor(city,UTC) {
        this.time = null;
        this.city = city;
        this.UTC = UTC;
        this.isRun = false;
        this.myView = null;    
        this.timer = null;
    }
    
    init = function(view) {
        this.myView = view;
        this.time = new Date();
        var hoursUTC = this.time.getUTCHours();
        this.time.setHours(hoursUTC + this.UTC);
    }

    start = function() {
        this.isRun = true;
        this.update();
    }

    stop = function() {
        this.isRun = false;
        clearTimeout(this.timer);
        this.updateView();
    }

    update = function() {
        clearTimeout(this.timer);
        this.time = new Date();
        var hoursUTC = this.time.getUTCHours();
        this.time.setHours(hoursUTC + this.UTC);
        
        this.updateView();
        this.timer = setTimeout(this.update.bind(this),1020 - (new Date().getMilliseconds()));
    }

    updateView = function() {
        if (this.myView)
            this.myView.update();
    }
};
