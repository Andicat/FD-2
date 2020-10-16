'use strict';

//======================================Move picture==================================
/*
D1+
На странице (не впритык к краям окна браузера) расположите какую-либо прямоугольную картинку.
На каждом углу картинки, и на середине каждой стороны картинки расположите небольшой управляющий элемент, за который можно перетаскивать картинку, меняя её размеры и пропорции.
При перетягивании за угол - пропорции картинки не должны изменяться.
При перетягивании за середину стороны - пропорции картинки меняются.
При перетягивании за саму картинку (не за управляющие элементы) - картинка должна перемещаться.
Независимо от движений мыши, управляющие элементы должны всегда оставаться на углах и серединах сторон картинки.

Подобное поведение, например, можно посмотреть в онлайн-SVG-редакторе: http://editor.method.ac/
нарисуйте прямоугольник, у него появятся те же 8 управляющих элементов,
попробуйте перетаскивать за них и отследите, как меняются размеры и пропорции прямоугольника.
Одна тонкость - при перетаскивании угловых элементов данный редактор позволяет произвольно менять соотношение сторон прямоугольника;
но вы реализуйте, чтобы угловые элементы меняли размер обеих сторон ПРОПОРЦИОНАЛЬНО.
*/

(function () {

    try {
        var blockPicture = document.querySelector('.picture');
        var cntImage = blockPicture.querySelector('.picture__container');
        var image = blockPicture.querySelector('.picture__image');
        var controlList = blockPicture.querySelectorAll('.picture__control');
        var controlLeft = blockPicture.querySelector('.picture__control--left');
    } catch {
        return;
    }

    var action;
    var startCoords;

    var limits = {
        top: cntImage.offseth + image.offsetHeight,
        left: cntImage.offsetLeft,
        bottom: cntImage.offsetHeight - image.offsetHeight,
        right: cntImage.offsetWidth - image.offsetWidth,
      };

    //вешаем обработчики мышки на странице
    document.addEventListener('mousedown', onMouseDown);

    function onMouseDown(evt) {
        
        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
        
        startCoords = {
            x: evt.clientX,
            y: evt.clientY
        };
        if (evt.target===image) {
            //console.log("clink on image");
            action = "move";
        }

        if (evt.target===controlLeft) {
           //console.log("clink on left");
            action = "resize";
        }
    }

    function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        console.log("action - " + action);
        //перенос самой картинки по экрану
        if (action==="move") {
            
            // смещение мышки относительно начальных координат
            var shift = {
                x: startCoords.x - moveEvt.clientX,
                y: startCoords.y - moveEvt.clientY
            };
            //новые стартовые координаты
            startCoords = {
                x: moveEvt.clientX,
                y: moveEvt.clientY
            };
            
            image.style.top = Math.min(Math.max((image.offsetTop - shift.y), 0), limits.bottom) + 'px';
            image.style.left = Math.min(Math.max((image.offsetLeft - shift.x), 0), limits.right) + 'px';
        }
        if (action==="resize") {
           
            // смещение мышки относительно начальных координат
            var shiftX = startCoords.x - moveEvt.clientX;
            startCoords.x = moveEvt.clientX;
            
            image.style.width = (image.offsetWidth + shiftX) + 'px';

        }
        
    }

    function onMouseUp(upEvt) {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

    
    //image.addEventListener("mousedown",movePicture);

    function movePicture(evt) {
        evt.preventDefault();

        

        

        

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

    //изменение размеров по центральным управляющим элементам
    //controlLeft.addEventListener("mousedown",resizePictureHorizontal);

    function resizePictureHorizontal(evt) {
        evt.preventDefault();

        var startX = evt.clientX;

        function onMouseMove(moveEvt) {
            
        }

        function onMouseUp(upEvt) {
            upEvt.preventDefault();
            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
        }

        document.addEventListener('mousemove', onMouseMove);
        document.addEventListener('mouseup', onMouseUp);
    };

})();
