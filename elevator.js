'use strict';

//======================================ELEVATOR==================================
/*
G+
На экране - 9 этажей дома и лифт.
Количество этажей дома должно настраиваться в программе.
На каждом этаже - две кнопки для вызова лифта, "вверх" и "вниз", которые
подсвечиваются, если нажаты мышью.
В лифте - кнопки с номерами этажей, "1"-"9", которые подсвечиваются, если
нажаты мышью.
Одновременно может быть нажато несколько кнопок на разных этажах
и несколько кнопок внутри лифта.
Лифт (с использованием CSS- или JS-анимации) приезжает куда нужно, открывает
двери, закрывает, отвозит куда нужно.
Людей как-либо отображать не обязательно, но с ними будет интереснее :)
Логика работы лифта может быть любой разумной, например следующей:
1. Если лифт стоит, он поедет в ту сторону, откуда вызван первой же нажатой
   кнопкой.
2. Если лифт едет вверх, он будет ехать вверх, пока есть кого подбирать
   по пути вверх (т.е. этажи, где нажата кнопка "вверх")
   или есть кого высаживать (т.е. в нём нажаты кнопки верхних этажей).
   Как только больше некого подбирать или высаживать по пути вверх,
   лифт начинает ехать вниз (если опять же есть кого подбирать/высаживать
   снизу) или останавливается.
3. Если лифт едет вниз, он будет ехать вниз, пока есть кого подбирать
   или высаживать по пути вниз.
   Как только больше некого подбирать или высаживать по пути вниз,
   лифт начинает ехать вверх или останавливается.
*/

(function () {

    try {
        var blockElevator = document.querySelector('.elevator');
        var btnCreateHouse = blockElevator.querySelector('.elevator__create-house');
        var btnCreatePassengers = blockElevator.querySelector('.elevator__create-passengers');
        var cntHouse = blockElevator.querySelector('.elevator__container');
    } catch {
        return;
    }

    var newHouse;
    var FLATS = 9;
    var PASSENGERS = 5;
    
    class House {

        _flats;

        constructor(flatsCount,cnt) {
            this.flatsCount = flatsCount;
            this.cnt = cnt;
        };
      
        createHouse = function () {

            var activeFlats = [];
            var timerId;
            var direction = "";
            var flatCurr = 1;
            var elevator;
            var nextStop;
            var elevatorHeight = 50;
            var elevatorStep = elevatorHeight/10;
            var speedNormal = 50;
            var speedStop = 1000;
            var closed = true;

            //остановка лифта
            function openElevator(flat) {
                //открываем двери лифта
                if (closed) {
                    elevator.classList.add("house__elevator--open");
                    setTimeout(() => {
                        elevator.classList.remove("house__elevator--open");
                    }, speedStop);
                    closed = false;
                }
                //забираем пассажиров и везем их куда им нужно
                var persons = flat.flat.querySelectorAll(".flat__person");
                setTimeout(() => {
                    var elevatorButtonsActive = document.getElementsByClassName("elevator__button active");
                    if (elevatorButtonsActive.length===0) {
                        elevator.classList.remove("house__elevator--passenger");
                    }
                    persons.forEach(p => {
                        if (flat.direction===p.getAttribute("direction")) {
                            flat.flat.removeChild(p);
                            var elevatorButton = document.getElementById("elevator-" + p.getAttribute("destination"));
                            elevatorButton.click();
                            elevator.classList.add("house__elevator--passenger");
                        }
                    } )
                }, speedStop/2);
                flat.btn.classList.remove("active");
                activeFlats = activeFlats.filter(v => v.btn!==flat.btn);
            }
           
            //движение лифта
            function moveElevator (speed) {
                clearTimeout(timerId);
                timerId = setTimeout(function () {
                    if (elevator.offsetTop!==nextStop) {
                        elevator.style.top = elevator.offsetTop + (direction==="up"?-elevatorStep:+elevatorStep) + "px";
                        moveElevator(speedNormal);
                        return;
                    }
                    if (activeFlats.length===0) {
                        direction = "";
                        closed = true;
                        return;
                    }
                    
                    //если ли этажи по пути?
                    var nextFlats = activeFlats.filter( function(fl) {
                        if (direction==="up" && fl.flatNumber>=flatCurr) {
                            return true;
                        };
                        if (direction==="down" && fl.flatNumber<=flatCurr) {
                            return true;
                        };
                        return false;
                    }).sort( function(a,b) {
                    
                    if (a.flatNumber===b.flatNumber) {
                        return (a.direction===direction?0:1)-(b.direction===direction?0:1);
                    } else {
                        return (direction==="up"?a.flatNumber-b.flatNumber:b.flatNumber-a.flatNumber);
                    }});
                
                    //если по пути нет этажей, меняем направление
                    if (nextFlats.length === 0 && activeFlats.length>0) {
                        direction = direction==="up"?"down":"up";
                        moveElevator(speedNormal);
                        return;
                    }

                    var nextFlat = nextFlats[0];
                    //Если это последний этаж по пути, останавливаемся и меняем направление 
                    if (Number(nextFlat.flatNumber)===flatCurr && nextFlats.length===1) {
                        direction = direction==="up"?"down":"up";
                        openElevator(nextFlat);
                        moveElevator(speedStop);
                        return;
                    };
                    //проверяем, надо ли останавливаться на этом этаже
                    if (Number(nextFlat.flatNumber)===flatCurr && nextFlat.direction===direction) {
                        openElevator(nextFlat);
                        moveElevator(speedStop); 
                        return;
                    };
                    flatCurr = flatCurr + ((direction==="up")?1:-1);
                    closed = true;
                    nextStop = elevator.offsetTop + (direction==="up"?-elevatorHeight:+elevatorHeight);
                    moveElevator(speedNormal);
                }, speed)
            }

            //нажатие кнопки
            function pushBtn(evt) {
                if (!evt.target.classList.contains("active")) {
                    var btnFlatNumber = Number(evt.target.getAttribute("data-number"));
                    var flat = document.getElementById("flat-" + btnFlatNumber);
                    var btnDirection = evt.target.getAttribute("data-mode");
                    btnDirection = btnDirection ? btnDirection : (btnFlatNumber>flatCurr ? "up" : "down");
                    var act = {flat:flat, btn:evt.target, flatNumber:btnFlatNumber, direction:btnDirection};
                    activeFlats.push(act);
                    evt.target.classList.add("active");
                    //запускаем лифт, если он стоит
                    if (direction==="") {
                        direction = (btnFlatNumber===flatCurr ? btnDirection : (btnFlatNumber>flatCurr ? "up" : "down"));
                        nextStop = elevator.offsetTop;
                        moveElevator(speedNormal); 
                    }
                }
            }

            //создаем кнопку
            function createButton(cnt,type,nmb) {
                var button = document.createElement("div");
                if (type==="elevator") {
                    button.classList.add("elevator__button");
                    button.setAttribute("id","elevator-" + nmb);
                    button.textContent = nmb;
                } else {
                    button.classList.add("flat__button");
                    button.classList.add("flat__button--" + type);
                    button.setAttribute("data-mode",type);
                }
                button.setAttribute("data-number",nmb);
                button.addEventListener("click", pushBtn);
                cnt.appendChild(button);
            };

            //создаем дом
            function create (cnt,flatsCount) {
                var house = document.createElement("div");
                house.classList.add("house");
                //создаем этажи
                var flats = document.createElement("div");
                flats.classList.add("house__flats");
                for (var i = flatsCount; i >= 1; i--) {
                    var flat = document.createElement("div");
                    flat.classList.add("flat");
                    flat.setAttribute("id","flat-" + i);
                    var flatNumber = document.createElement("span");
                    flatNumber.classList.add("flat__number");
                    flatNumber.textContent = i;
                    flat.appendChild(flatNumber);
                    //создаем кнопки лифта на этаже
                    var flatButtons = document.createElement("div");
                    flatButtons.classList.add("flat__buttons");
                    if (i<flatsCount) {
                        createButton(flatButtons,"up",i);
                    }
                    if (i>1) {
                        createButton(flatButtons,"down",i);
                    }
                    flat.appendChild(flatButtons);
                    flats.appendChild(flat);
                };
                //создаем лифт
                var shaft = document.createElement("div");
                shaft.classList.add("house__shaft");
                elevator = document.createElement("div");
                elevator.classList.add("house__elevator");
                //создаем кнопки в лифте
                var elevatorButtons = document.createElement("div");
                elevatorButtons.classList.add("elevator__buttons");
                for (var i = 1; i <= flatsCount; i++) {
                    createButton(elevatorButtons,"elevator",i);  
                }
                shaft.appendChild(elevator);
                cnt.appendChild(elevatorButtons);
                house.appendChild(flats);
                house.appendChild(shaft);
                cnt.appendChild(house);
            };

            create(this.cnt,this.flatsCount);
            this._flats = this.cnt.querySelectorAll(".flat");
        }

        goPeople = function () {
            
            function randomDiap(n,m) {
                return Math.floor(Math.random()*(m-n+1))+n;
            }

            var personCount = 0;
            btnCreatePassengers.setAttribute("disabled",true);

            function createPerson(temp,flats) {   
                setTimeout( function() {
                    var person = document.createElement("div");
                    person.classList.add("flat__person");
                    //этаж для пассажира рандомно
                    var flatNumber = randomDiap(0,FLATS-1);
                    var flat = flats[flatNumber];
                    //выбор кнопки на этаже для пассажира рандомно
                    var flatButtons = flat.querySelectorAll(".flat__button");
                    var flatButton = flatButtons[randomDiap(0,flatButtons.length-1)];
                    flatButton.click();
                    //направление и этаж назначения для пассажира
                    var direction = flatButton.getAttribute("data-mode");
                    person.setAttribute("direction",direction);
                    var flatDestination = randomDiap(direction==="up"?((FLATS - flatNumber)+1):1,direction==="up"?FLATS:(FLATS - flatNumber)-1);
                    person.setAttribute("destination",flatDestination);
                    var dest = document.createElement("span");
                    dest.classList.add("flat__person--dest");
                    dest.textContent = flatDestination;
                    person.appendChild(dest);
                    flat.appendChild(person);
                    personCount++;
                    btnCreatePassengers.textContent = (PASSENGERS - personCount) + " пассажиров";
                    if (personCount < PASSENGERS) {
                        createPerson(2000,flats);
                    }
                    if (personCount===PASSENGERS) {
                        btnCreatePassengers.textContent = PASSENGERS + " пассажиров";
                        btnCreatePassengers.removeAttribute("disabled");
                    }
                }, temp);
            }
            createPerson(0,this._flats);
        }
    }

    btnCreateHouse.addEventListener('click', (event) => {
        cntHouse.innerHTML = "";
        newHouse = new House(FLATS,cntHouse);
        newHouse.createHouse();
        btnCreatePassengers.removeAttribute("disabled");
        btnCreatePassengers.textContent = PASSENGERS + " пассажиров";

    });

    btnCreatePassengers.addEventListener("click", (event) => {
        newHouse.goPeople();
    });
})();
