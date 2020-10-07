'use strict';

//======================================hashStorageFunc==================================
/*
1.
Разработать класс hashStorageFunc в функциональном стиле (т.е. функцию-конструктор) для хранения в хэше произвольных пар ключ-значение.
Ключ может быть любой строкой; значение может иметь любой тип, в том числе векторный (хэш, массив и т.д.)
Класс должен иметь следующий интерфейс (т.е. иметь следующие публичные методы):
addValue(key,value) — сохраняет указанное значение под указанным ключом;
getValue(key) — возвращает значение по указанному ключу либо undefined;
deleteValue(key) — удаляет значение с указанным ключом, возвращает true если значение было удалено и false если такого значения не было в хранилище;
getKeys() — возвращает массив, состоящий из одних ключей.
Класс должен быть чистым (не должен использовать никаких глобальных переменных, не, должен «пачкать экран»).
Класс должен быть универсальным, т.е. не зависеть ни от структуры хранимых данных, ни от способа их последующего использования (в т.ч. не должен содержать никаких ссылок на DOM, т.к. может использоваться и вообще без веб-страницы).
2.
Создать объект drinkStorage класса hashStorageFunc для хранения рецептов напитков.
Ключом является название напитка; значением — информация о напитке (алкогольный напиток или нет, строка с рецептом приготовления и т.д. по желанию).
3.
Разработать веб-страницу для работы с хранилищем рецептов напитков.
На странице должны быть кнопки:
«ввод информации о напитке» — последовательно спрашивает название напитка, алкогольный он или нет, рецепт его приготовления; 
сохраняет информацию о напитке в хранилище.
«получение информации о напитке» — спрашивает название напитка и выдаёт (на страницу, в консоль или в alert) 
либо информацию о нём (по примеру, приведённому ниже), либо сообщение об отсутствии такого напитка в хранилище.
«удаление информации о напитке» — спрашивает название напитка и удаляет его из хранилища (если он там есть) 
с выдачей соответствующего сообщения в информационное окно.
«перечень всех напитков» — выдаёт в информационное окно перечень всех напитков из хранилища (только названия).

Пример информации о напитке:

напиток Маргарита
алкогольный: да
рецепт приготовления:
продукт, продукт... смешать...
*/

(function () {

    var blockFunc = document.querySelector('.hashStorage--func');

    if (!blockFunc) {
        return;
    }
    var btnAdd = blockFunc.querySelector('.hashStorage__add');
    var btnGet = blockFunc.querySelector('.hashStorage__get');
    var btnDelete = blockFunc.querySelector('.hashStorage__delete');
    var btnShow = blockFunc.querySelector('.hashStorage__show');
    var cntRecipe = blockFunc.querySelector('.hashStorage__recipe');
    
    var drinkStorage = new HashStorageFunc();

    function HashStorageFunc () {
        var self = this;
        
        var storage = {};
        
        self.addValue = function (key,value) {
            storage[key] = value;
            return self;
        }

        self.getValue = function (key) {
            return storage[key];
        }

        self.deleteValue = function (key) {
            if (key in storage) {
                delete storage[key];
                return true;
            };
            return false;
        }

        self.getKeys = function () {
            return Object.keys(storage);
        }
    }

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
