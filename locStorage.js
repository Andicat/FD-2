'use strict';

//======================================DRINKS_LOC_STORAGE==================================
/*
В проекте DRINKS разработать класс LocStorage (в модуле LocStorage.js)
для хранения информации в локальном хранилище (localStorage).
На веб-странице создать два объекта класса LocStorage и реализовать 
два интерфейса (набора кнопок) — для работы с напитками и для работы с блюдами.
*/

(function () {
  
    //model
    class LocStorage {

        _storage = {};

        constructor(storageName){
            this.storageName = storageName;
            var ls = localStorage.getItem(storageName);
            if (ls) {
                this._storage = JSON.parse(ls);
            }
        }
        
        addValue = function (key,value) {
            this._storage[key] = value;
            localStorage.setItem(this.storageName,JSON.stringify(this._storage));
            return this;
        }

        getValue = function (key) {
            return this._storage[key];
        }

        deleteValue = function (key) {
            if (key in this._storage) {
                delete this._storage[key];
                return true;
            };
            return false;
        }

        getKeys = function () {
            return Object.keys(this._storage);
        }
    }

    // controller
    class ControllerButtons {

        constructor() {
            this.storage = null;
            this.container = null;
        }

        start = function(storage, container) {
            this.storage = storage;
            this.container = container;
            this.setListeners();
        }

        setListeners = function() {

            var btnAdd = this.container.querySelector('.locStorage__add');
            var btnGet = this.container.querySelector('.locStorage__get');
            var btnDelete = this.container.querySelector('.locStorage__delete');
            var btnShow = this.container.querySelector('.locStorage__show');
            var cntRecipe = this.container.querySelector('.locStorage__recipe');

            //вносит в базу
            if (btnAdd) {
                btnAdd.addEventListener('click', (event) => {
                    var name = prompt(this.storage.storageName + "\nВведите название");
                    if (name) {
                        var drinkAlc = confirm("Напиток \"" + name + "\" - Алкогольный? \n - Нажмите \"Ок\", если Алкогольный \n - Нажмите \"Отмена\", если Безалкогольный!") ? true : false;
                        var drinkRecipe = prompt("Напишите рецепт \"" + name + "\"") || "рецепта нет";
                        this.storage.addValue(name, {"alc":drinkAlc, "recipe":drinkRecipe});
                    }
                    showInfo("");
                });
            }

            //выводит информацию
            if (btnGet) {
                btnGet.addEventListener('click', (event) => {
                    var name = prompt("Введите название напитка, информацию о котором нужно вывести");
                    var drinkInfo = this.storage.getValue(name);
                    if (drinkInfo) {
                        showInfo("Напиток \"" + name + "\"<br>"
                                + "Алкогольный: " + (drinkInfo.alc?"Да":"Нет") + "<br>"
                                + "Рецепт приготовления:<br>" + drinkInfo.recipe);
                        return;
                    };
                    showInfo("Напиток \"" + name + "\" не найден в базе");
                });
            }

            //выводит список наименований из базы
            if (btnShow) {
                btnShow.addEventListener('click', (event) => {
                    var drinks = this.storage.getKeys();
                    if (!drinks.length) {
                        showInfo("Напитков в базе нет");
                        return;
                    };
                    var text = "Напитки в базе: <br>";
                    for (var i = 0; i < drinks.length; i++) {
                        text = text + "\"" + drinks[i] + "\"<br>";
                    };
                    showInfo(text);
                });
            }

            //удаляет из базы
            if (btnDelete) {
                btnDelete.addEventListener('click', (event) => {
                    var name = prompt("Введите название напитка, информацию о котором нужно удалить");
                    var drinkIsDeleted = this.storage.deleteValue(name);
                    showInfo("Напиток \"" + name + "\" " + (drinkIsDeleted ? "удален из базы" : "не найден в базе"));
                });
            }

            function showInfo (text) {
                if (cntRecipe) {
                    cntRecipe.innerHTML = text;
                }
            }
        }
    }

    //Напитки
    var drinksStorage = new LocStorage("drinksStorage");
    var drinksControls = new ControllerButtons();
    var cntDrinksStorage = document.querySelector('.locStorage--drinks');
    drinksControls.start(drinksStorage,cntDrinksStorage);  
    console.log(drinksStorage._storage);

    //Блюда
    var dishesStorage = new LocStorage("dishesStorage");
    var dishesControls = new ControllerButtons();
    var cntDishesStorage = document.querySelector('.locStorage--dishes');
    dishesControls.start(dishesStorage,cntDishesStorage);  

})();
