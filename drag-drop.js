'use strict';

//======================================DRAG-DROP==================================
/*
Реализовать на JavaScript перетаскивание мышью по веб-странице нескольких любых
(но не мелких) изображений. Обрабатывать как минимум события mousedown, mousemove, mouseup.
Изображения должны «таскаться» мышью за любую точку (т.е. и при «взятии» и при «отпускании» изображение смещаться не должно, оно должно смещаться только при смещении мыши при нажатой левой кнопке, ровно настолько, насколько смещена мышь).
Код не должен зависеть от количества картинок (т.е. код должен сам найти все картинки, находящиеся в указанном div-контейнере).
Картинки изначально НЕ должны быть спозиционированы (стилевое свойство position не должно быть задано).
Когда начинается перетаскивание какой-либо картинки, остальные картинки не должны сдвигаться.
Картинка, перетаскивание которой началось, должна оказываться выше (ближе к глазам), чем остальные.
На время перетаскивания менять форму курсора на подходящую.
*/

(function () {

    try {
        var blockDragDrop = document.querySelector('.drag-drop');
        var cntDragDrop = blockDragDrop.querySelector('.drag-drop__container');
    } catch {
        return;
    }

    const PIC_COUNT = 5;
    var picArr = [];

    class Pic {

        constructor(image,cnt) {
            this.cnt = cnt;
            console.log(image);
            this.elem = document.createElement("div");
            this.elem.classList.add("drag-drop__pic");
            this.cnt.appendChild(this.elem);
        };
        
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

    for (var i = 0; i < PIC_COUNT-1; i++) {
        picArr[i] = new Pic("pic-"+i,cntDragDrop);
    }
})();
