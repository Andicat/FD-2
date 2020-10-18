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
    } catch {
        return;
    }

    var action;
    var mouseStart;
    var limitRight;
    var limitBottom;
    var limitY;
    var limits;
    var limitX;
    var limitY;
    var propWidth;
    var propHeight;

    //вешаем обработчики мышки на странице
    document.addEventListener('mousedown', onMouseDown);

    function onMouseDown(evt) { 
        evt.preventDefault();
        action = evt.target.getAttribute("data-action");
        if (action) {
            document.addEventListener('mousemove', onMouseMove);
            document.addEventListener('mouseup', onMouseUp);
            //начальные координаты мышки
            mouseStart = {
                x: evt.clientX,
                y: evt.clientY
            };
            //пределы
            limitX = image.offsetLeft + image.offsetWidth;
            limitY = image.offsetTop + image.offsetHeight;
            limitRight = cntImage.offsetWidth - image.offsetLeft;
            limitBottom = cntImage.offsetHeight - image.offsetTop;
            limits = {
                bottom: cntImage.offsetHeight - image.offsetHeight,
                right: cntImage.offsetWidth - image.offsetWidth,
            };
            //пропорции картинки
            propWidth = image.offsetWidth;
            propHeight = image.offsetHeight;
        }
    }

    function onMouseMove(moveEvt) {
        moveEvt.preventDefault();
        //смещение мышки относительно начальных координат
        var shift = {
            x: mouseStart.x - moveEvt.clientX,
            y: mouseStart.y - moveEvt.clientY
        };
        //новые стартовые координаты мышки
        mouseStart = {
            x: moveEvt.clientX,
            y: moveEvt.clientY
        };
        switch(action) {
            //перемещение самой картинки по экрану - done
            case "image":
                image.style.top = Math.min(Math.max((image.offsetTop - shift.y), 0), limits.bottom) + "px";
                image.style.left = Math.min(Math.max((image.offsetLeft - shift.x), 0), limits.right) + "px";
                break;
            //ресайз картинки слева - done
            case "left":
                image.style.left = Math.max(Math.min((image.offsetLeft - shift.x), limitX),0) + "px";
                image.style.width = (limitX - image.offsetLeft) + "px";
                if ((image.offsetLeft-shift.x)>=limitX) {
                    image.style.left = limitX + "px";
                    limitRight = cntImage.offsetWidth - image.offsetLeft;
                    action = "right";
                    image.classList.toggle("picture__image--mirrorX");
                }
                break;
            //ресайз картинки справа - done
            case "right":
                image.style.width = Math.min((image.offsetWidth - shift.x),limitRight) + "px";
                if ((image.offsetWidth - shift.x)<=0) {
                    image.style.width = "0px";
                    limitX = image.offsetLeft;
                    action = "left";
                    image.classList.toggle("picture__image--mirrorX");
                }
                break;
            //ресайз картинки сверху - done
            case "top":
                console.log("action " + action);
                console.log(" height " + image.offsetHeight + " top " + image.offsetTop + " limitY " + limitY);
                image.style.top = Math.max(Math.min((image.offsetTop - shift.y),limitY),0) + "px";
                image.style.height = (limitY - image.offsetTop) + "px";
                if ((image.offsetTop - shift.y)>=limitY) {
                    image.style.top = limitY + "px";
                    limitBottom = cntImage.offsetHeight - image.offsetTop;;
                    action = "bottom";
                    image.classList.toggle("picture__image--mirrorY");
                }
                break;
            //ресайз картинки снизу - done
            case "bottom":
                console.log("action " + action);
                image.style.height = Math.min((image.offsetHeight - shift.y),limitBottom) + "px";
                if ((image.offsetHeight - shift.y)<=0) {
                    console.log("change from bottom to top. height " + image.offsetHeight + " top " + image.offsetTop + " limitY " + limitY);
                    image.style.height = "0px";
                    limitY = image.offsetTop;
                    console.log("height " + image.offsetHeight + " top " + image.offsetTop + " limitY " + limitY);
                    action = "top";
                    image.classList.toggle("picture__image--mirrorY");
                }
                break;
            //ресайз картинки слева сверху
            case "left-top":
                image.style.left = Math.max(Math.min((image.offsetLeft - ((image.offsetTop===0&&shift.x>0)?0:shift.x)),limitX),0) + "px";
                image.style.width = (limitX - image.offsetLeft) + "px";
                image.style.top = Math.max(Math.min((image.offsetTop - ((image.offsetLeft===0&&shift.x>0)?0:shift.x/(propWidth/propHeight))),limitY),0) + "px";
                image.style.height = (limitY - image.offsetTop) + "px";
                break;
            //ресайз картинки справа сверху
            case "right-top":
                image.style.width = Math.min((image.offsetWidth - ((image.offsetTop===0&&shift.x<0)?0:shift.x)),limitRight) + "px";
                image.style.top = Math.max(Math.min((image.offsetTop + ((image.offsetWidth===limitRight&&shift.x<0)?0:shift.x/(propWidth/propHeight))),limitY),0) + "px";
                image.style.height = (limitY - image.offsetTop) + "px";
                break;
            //ресайз картинки слева снизу
            case "left-bottom":
                image.style.left = Math.max(Math.min((image.offsetLeft - ((image.offsetHeight===limitBottom&&shift.x>0)?0:shift.x)),limitX),0) + "px";
                image.style.width = (limitX - image.offsetLeft) + "px";
                image.style.height = Math.min((image.offsetWidth / (propWidth/propHeight)),limitBottom) + "px";
                break;
            //ресайз картинки справа снизу
            case "right-bottom":
                image.style.width = Math.min((image.offsetWidth - ((image.offsetHeight===limitBottom&&shift.x)<0?0:shift.x)),limitRight) + "px";
                image.style.height = Math.min((image.offsetWidth / (propWidth/propHeight)),limitBottom) + "px";
                break;
            default:
                break;
        }
    }

    function onMouseUp(upEvt) {
        upEvt.preventDefault();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
    }

})();
