'use strict';

//======================================HashStorageClass==================================
/*
Создать проект DRINKS_HASH_CLASS по аналогии с проектом DRINKS_HASH_FUNC, только класс должен быть описан в ES6-стиле (ключевым словом class).
*/

(function () {

    var blockClass = document.querySelector('.HashStorage--class');

    if (!blockClass) {
        return;
    }
    var btnAdd = blockClass.querySelector('.HashStorage__add');
    var btnGet = blockClass.querySelector('.HashStorage__get');
    var btnDelete = blockClass.querySelector('.HashStorage__delete');
    var btnShow = blockClass.querySelector('.HashStorage__show');
    var cntRecipe = blockClass.querySelector('.HashStorage__recipe');
    
    class HashStorageClass {

        _storage = {};
        
        addValue = function (key,value) {
            this._storage[key] = value;
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

    var drinkStorage = new HashStorageClass();

    function showInfo (text) {
        if (cntRecipe) {
            cntRecipe.innerHTML = text;
        }
    }
    
    //вносит в базу напитков
    if (btnAdd) {
        btnAdd.addEventListener('click', (event) => {
            var drinkName = prompt("Введите название напитка");
            if (drinkName) {
                var drinkAlc = confirm("Напиток \"" + drinkName + "\" - Алкогольный? \n - Нажмите \"Ок\", если Алкогольный \n - Нажмите \"Отмена\", если Безалкогольный!") ? true : false;
                var drinkRecipe = prompt("Напишите рецепт напитка \"" + drinkName + "\"") || "рецепта нет";
                drinkStorage.addValue(drinkName, {"alc":drinkAlc, "recipe":drinkRecipe});
            }
            showInfo("");
        });
    }

    //выводит информацию о напитке
    if (btnGet) {
        btnGet.addEventListener('click', (event) => {
            var drinkName = prompt("Введите название напитка, информацию о котором нужно вывести");
            var drinkInfo = drinkStorage.getValue(drinkName);
            if (drinkInfo) {
                showInfo("Напиток \"" + drinkName + "\"<br>"
                        + "Алкогольный: " + (drinkInfo.alc?"Да":"Нет") + "<br>"
                        + "Рецепт приготовления:<br>" + drinkInfo.recipe);
                return;
            };
            showInfo("Напиток \"" + drinkName + "\" не найден в базе");
        });
    }

    //удаляет из базы напитков
    if (btnDelete) {
        btnDelete.addEventListener('click', (event) => {
            var drinkName = prompt("Введите название напитка, информацию о котором нужно удалить");
            var drinkIsDeleted = drinkStorage.deleteValue(drinkName);
            showInfo("Напиток \"" + drinkName + "\" " + (drinkIsDeleted ? "удален из базы" : "не найден в базе"));
        });
    }

    //выводит список наименований напитков из базы
    if (btnShow) {
        btnShow.addEventListener('click', (event) => {
            var drinks = drinkStorage.getKeys();
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

})();
