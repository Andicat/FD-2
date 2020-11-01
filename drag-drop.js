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
        var cntImages = blockDragDrop.querySelector('.drag-drop__container');
        var imageList = cntImages.querySelectorAll('.drag-drop__image');
    } catch {
        return;
    }

    var mouseStart;
    var mouseShift;
    var rightMin;
    var bottomMin;
    var topMax;
    var limits;
    var leftMax;
    var topMax;
    var image;
    //var zInd = 0;

    window.addEventListener('load', onLoadDoc);

    function onLoadDoc() {
        for (var i = imageList.length-1; i >= 0; i--) {
            imageList[i].style.top = imageList[i].offsetTop + "px";
            imageList[i].style.left = imageList[i].offsetLeft + "px";
            imageList[i].style.position = "absolute";
            imageList[i].classList.add("drag-drop__image--drag");
            imageList[i].addEventListener("mousedown", onMouseDown);
            imageList[i].addEventListener('touchstart',onMouseDown);
        }    
    }
    
    function onMouseDown(evt) {
        evt.preventDefault();
        if (image!==evt.target) {
            image = evt.target;
            //zInd++;
            //image.style.zIndex = zInd;    
            cntImages.appendChild(image);
        };
        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('touchmove', onMouseMove);
        window.addEventListener('mouseup', onMouseUp);
        window.addEventListener('touchend', onMouseUp);
        //начальные координаты мышки
        mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        //пределы
        leftMax = image.offsetLeft + image.offsetWidth;
        topMax = image.offsetTop + image.offsetHeight;
        rightMin = cntImages.offsetWidth - image.offsetLeft;
        bottomMin = cntImages.offsetHeight - image.offsetTop;
        limits = {
            bottom: cntImages.offsetHeight - image.offsetHeight,
            right: cntImages.offsetWidth - image.offsetWidth,
        };
    }

    function onMouseMove(evt) {
        evt.preventDefault();
        //смещение мышки относительно начальных координат
        mouseShift = {
            x: evt.clientX - mouseStart.x,
            y: evt.clientY - mouseStart.y 
        };
        //новые стартовые координаты мышки
        mouseStart = {
            x: evt.clientX,
            y: evt.clientY
        };
        //показатели смещения
        var leftShift = Math.max(image.offsetLeft + mouseShift.x,0);
        var topShift = Math.max(image.offsetTop + mouseShift.y,0);
        //перемещаем объект
        image.style.top = Math.min(topShift, limits.bottom) + "px";
        image.style.left = Math.min(leftShift, limits.right) + "px";
    }

    function onMouseUp(evt) {
        evt.preventDefault();
        window.removeEventListener('mousemove', onMouseMove);
        window.removeEventListener('touchmove', onMouseMove);
        window.removeEventListener('mouseup', onMouseUp);
        window.removeEventListener('touchend', onMouseUp);
    }

})();
