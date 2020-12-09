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

        constructor(storageName, storageNameRu){
            this.storageName = storageName;
            this.storageNameRu = storageNameRu;
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
                localStorage.setItem(this.storageName,JSON.stringify(this._storage));
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
            //this.setListeners();
            
            //создадим наименование и кнопки
            var titleStorage = document.createElement("span");
            titleStorage.classList.add("locStorage__title");
            titleStorage.textContent = this.storage.storageNameRu;
            this.container.appendChild(titleStorage);

            var btnAdd = document.createElement("button");
            btnAdd.classList.add("locStorage__add");
            btnAdd.textContent = this.storage.storageNameRu + " - внести информацию";
            this.container.appendChild(btnAdd);
            btnAdd.addEventListener("click", this.addItem.bind(this));

            var btnGet = document.createElement("button");
            btnGet.classList.add("locStorage__get");
            btnGet.textContent = this.storage.storageNameRu + " - получить информацию";
            this.container.appendChild(btnGet);
            btnGet.addEventListener("click", this.getItem.bind(this));

            var btnDelete = document.createElement("button");
            btnDelete.classList.add("locStorage__delete");
            btnDelete.textContent = this.storage.storageNameRu + " - удалить информацию";
            this.container.appendChild(btnDelete);
            btnDelete.addEventListener("click", this.deleteItem.bind(this));

            var btnShow = document.createElement("button");
            btnShow.classList.add("locStorage__show");
            btnShow.textContent = this.storage.storageNameRu + " - показать весь перечень";
            this.container.appendChild(btnShow);
            btnShow.addEventListener("click", this.showItems.bind(this));
            
            this.infoStorage = document.createElement("span");
            this.infoStorage.classList.add("locStorage__info");
            this.container.appendChild(this.infoStorage);
        }

        addItem = function() {
            var name = prompt(this.storage.storageNameRu + "\nВведите название");
            if (name) {
                switch (this.storage.storageName) {
                    case "drinksStorage":
                        var drinkAlc = confirm("Напиток \"" + name + "\" - алкогольный? \n - Нажмите \"Ок\", если ДА \n - Нажмите \"Отмена\", если НЕТ!") ? true : false;
                        var drinkRecipe = prompt("Напишите рецепт \"" + name + "\"") || "рецепта нет";
                        this.storage.addValue(name, {"alc":drinkAlc, "recipe":drinkRecipe});
                        break;
                    case "dishesStorage":
                        var dishVegan = confirm("Блюдо \"" + name + "\" - вегетаринское? \n - Нажмите \"Ок\", если ДА \n - Нажмите \"Отмена\", если НЕТ!") ? true : false;
                        var dishRecipe = prompt("Напишите рецепт \"" + name + "\"") || "рецепта нет";
                        this.storage.addValue(name, {"vegan":dishVegan, "recipe":dishRecipe});
                        break;
                    default:
                }
            }
            this.showInfo("");
        }

        getItem = function() {
            var name = prompt(this.storage.storageNameRu + "\nВведите название, чтобы получить информацию");
            var info = this.storage.getValue(name);
            if (info) {
                switch (this.storage.storageName) {
                    case "drinksStorage":
                        this.showInfo("Напиток \"" + name + "\"<br>"
                        + "Алкогольный: " + (info.alc?"Да":"Нет") + "<br>"
                        + "Рецепт приготовления:<br>" + info.recipe);
                        break;
                    case "dishesStorage":
                        this.showInfo("Напиток \"" + name + "\"<br>"
                        + "Вегетерианский: " + (info.vegan?"Да":"Нет") + "<br>"
                        + "Рецепт приготовления:<br>" + info.recipe);
                        break;
                        break;
                    default:
                }
            } else {
                this.showInfo("\"" + name + "\" не найден в базе \"" + this.storage.storageNameRu + "\"");
            }
        }

        showItems = function() {
            var items = this.storage.getKeys();
            if (!items.length) {
                this.showInfo("В базе \"" + this.storage.storageNameRu + "\" пусто");
                return;
            };
            var text = "В базе \"" + this.storage.storageNameRu + "\": <br>";
            for (var i = 0; i < items.length; i++) {
                text = text + "- " + items[i] + "<br>";
            };
            this.showInfo(text);
        }

        deleteItem = function() {
            var name = prompt(this.storage.storageNameRu + "\nВведите название, которое нужно удалить из базы");
            var itemIsDeleted = this.storage.deleteValue(name);
            this.showInfo("\"" + name + "\" " + (itemIsDeleted ? "удален из базы" : "не найден в базе"));
        }

        showInfo  = function(text) {
            this.infoStorage.innerHTML = text;
        }
    }

    //Напитки
    var drinksStorage = new LocStorage("drinksStorage","Напитки");
    var drinksControls = new ControllerButtons();
    var cntDrinksStorage = document.querySelector('.locStorage--drinks');
    drinksControls.start(drinksStorage,cntDrinksStorage);  
    console.log(drinksStorage._storage);

    //Блюда
    var dishesStorage = new LocStorage("dishesStorage","Блюда");
    var dishesControls = new ControllerButtons();
    var cntDishesStorage = document.querySelector('.locStorage--dishes');
    dishesControls.start(dishesStorage,cntDishesStorage);  

})();
