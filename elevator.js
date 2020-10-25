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
        var btnCreate = blockElevator.querySelector('.elevator__button');
        var btnPeople = blockElevator.querySelector('.elevator__people');
        var cntHouse = blockElevator.querySelector('.elevator__container');
    } catch {
        return;
    }

    var newHouse;
    var FLATS = 5;
    var PERSONS = 10;

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
            var speed = 50;
            var closed = true;

            //остановка лифта
            function openElevator(flat) {
                speed = 1000;
                var persons = flat.flatCnt.querySelectorAll(".house__person");
                if (closed) {
                    elevator.classList.add("house__elevator--open");
                    setTimeout(() => {
                        elevator.classList.remove("house__elevator--open");
                    }, speed);
                    closed = false;
                }
                setTimeout(() => {
                    persons.forEach(p => {
                        if (flat.direction===p.getAttribute("direction")) {
                            flat.flatCnt.removeChild(p);
                        }
                    } )
                    
                }, speed/2);
                flat.btn.classList.remove("active");
                
                activeFlats = activeFlats.filter(v => v.btn!==flat.btn);
            }
           
            //движение лифта
            function moveElevator (time) {
                clearTimeout(timerId);
                timerId = setTimeout(function () {
                    if (elevator.offsetTop!==nextStop) {
                        elevator.style.top = elevator.offsetTop + (direction==="up"?-elevatorStep:+elevatorStep) + "px";
                        speed = 50;
                        moveElevator();
                        return;
                    }
                    if (activeFlats.length===0) {
                        direction = "";
                        closed = true;
                        return;
                    }
                    
                    //если ли этажи по пути?
                    var nextFlats = activeFlats.filter( function(fl) {
                        if (direction==="up" && fl.flat>=flatCurr) {
                            return true;
                        };
                        if (direction==="down" && fl.flat<=flatCurr) {
                            return true;
                        };
                        return false;
                    }).sort( function(a,b) {
                        if (a.flat===b.flat) {
                            return (a.direction===direction?0:1)-(b.direction===direction?0:1);
                        } else {
                            return (direction==="up"?a.flat-b.flat:b.flat-a.flat);
                        }});
                    
                    //если по пути нет этажей, меняем направление
                    if (nextFlats.length === 0 && activeFlats.length>0) {
                        direction = direction==="up"?"down":"up";
                        speed = 50;
                        moveElevator();
                        return;
                    }
                    var nextFlat = nextFlats[0];
                    //Если это последний этаж по пути, останавливаемся и меняем направление 
                    if (Number(nextFlat.flat)===flatCurr && nextFlats.length===1) {
                        direction = direction==="up"?"down":"up";
                        openElevator(nextFlat);
                        moveElevator();
                        return;
                    };
                    //проверяем, надо ли останавливаться на этом этаже
                    if (Number(nextFlat.flat)===flatCurr && nextFlat.direction===direction) {
                        openElevator(nextFlat);
                        moveElevator(); 
                        return;
                    };
                    flatCurr = flatCurr + ((direction==="up")?1:-1);
                    //console.log("before next stop - elevator top " + elevator.offsetTop + " height " + elevator.offsetHeight);
                    closed = true;
                    nextStop = elevator.offsetTop + (direction==="up"?-elevatorHeight:+elevatorHeight);
                    //console.log(nextStop);
                    speed = 50;
                    moveElevator();
                }, speed)
            }

            //нажатие кнопки
            function pushBtn(evt) {
                if (!evt.target.classList.contains("active")) {
                    var btnFlat = Number(evt.target.getAttribute("data-number"));
                    var flat = document.getElementById("flat-"+btnFlat);
                    var btnDirection = evt.target.getAttribute("data-mode");
                    btnDirection = btnDirection ? btnDirection : (btnFlat>flatCurr ? "up" : "down");
                    var act = {btn:evt.target, flat:btnFlat, direction:btnDirection, flatCnt:flat};
                    activeFlats.push(act);
                    evt.target.classList.add("active");
                    if (direction==="") {
                        direction = (btnFlat===flatCurr ? btnDirection : (btnFlat>flatCurr ? "up" : "down"));
                        nextStop = elevator.offsetTop;
                        moveElevator(); 
                    }
                }
            }

            //создаем кнопку
            function createButton(cnt,type,cls,nmb) {
                var button = document.createElement("div");
                button.classList.add(cls);
                button.setAttribute("data-number",nmb);
                button.classList.add(cls + "--" + type);
                if (type==="elevator") {
                    button.textContent = nmb;
                } else {
                    button.setAttribute("data-mode",type);
                }
                button.addEventListener("click", pushBtn);
                cnt.appendChild(button);
            };

            //создаем дом
            function create (cnt,flatsCount) {
                var flats;
                var house = document.createElement("div");
                house.classList.add("house");
                //создаем этажи
                flats = document.createElement("div");
                flats.classList.add("house__flats");
                //console.log(this._flats);
                for (var i = flatsCount; i >= 1; i--) {
                    var flat = document.createElement("div");
                    flat.classList.add("house__flat");
                    flat.setAttribute("id","flat-" + i);
                    var flatNumber = document.createElement("span");
                    flatNumber.classList.add("house__flat-number");
                    flatNumber.textContent = i;
                    flat.appendChild(flatNumber);
                    //создаем кнопки лифта на этаже
                    var flatButtons = document.createElement("div");
                    flatButtons.classList.add("house__flat-buttons");
                    if (i<flatsCount) {
                        createButton(flatButtons,"up","house__button",i);
                    }
                    if (i>1) {
                        createButton(flatButtons,"down","house__button",i);
                    }
                    flat.appendChild(flatButtons);
                    flats.appendChild(flat);
                };
                //создаем лифт
                var shaft = document.createElement("div");
                shaft.classList.add("house__shaft");
                elevator = document.createElement("div");
                //console.log(this._elevator);
                elevator.classList.add("house__elevator");
                //создаем кнопки в лифте
                var elevatorButtons = document.createElement("div");
                elevatorButtons.classList.add("house__elevator-buttons");
                for (var i = 1; i <= flatsCount; i++) {
                    createButton(elevatorButtons,"elevator","house__button",i);  
                }
                shaft.appendChild(elevator);
                cnt.appendChild(elevatorButtons);
                house.appendChild(flats);
                house.appendChild(shaft);
                cnt.appendChild(house);
            };

            create(this.cnt,this.flatsCount);
            this._flats = document.querySelectorAll(".house__flat");
            console.log(this._flats);
        }

        goPeople = function () {
            function randomDiap(n,m) {
                return Math.floor(Math.random()*(m-n+1))+n;
            }

            var personCount = 0;

            function createPerson(flat) {   
                setTimeout( function() {
                    var flatNmb = randomDiap(1,FLATS);
                    var person = document.createElement("div");
                    person.classList.add("house__person");
                    var flat = document.getElementById("flat-" + flatNmb);
                    var btns = flat.querySelectorAll(".house__button");
                    var btnNmb = randomDiap(0,btns.length-1);
                    console.log("person on flat " + flatNmb + " push " + btns[btnNmb].getAttribute("data-mode") + "");
                    btns[btnNmb].click();
                    person.setAttribute("direction",btns[btnNmb].getAttribute("data-mode"));
                    flat.appendChild(person);
                    personCount++;
                    if (personCount < PERSONS) {
                        createPerson(personCount);
                    }
                }, 1500);
           
            }
            
            createPerson(personCount,this.cnt);
        }
    }

    btnCreate.addEventListener('click', (event) => {
        cntHouse.innerHTML = "";
        newHouse = new House(FLATS,cntHouse);
        newHouse.createHouse();

    });

    btnPeople.addEventListener("click", (event) => {
        newHouse.goPeople();
    });
})();
