'use strict';

//======================================mood==================================
/*
Выбор случайных цветов радуги.
Доработать проект MOOD так, чтобы цвета не повторялись.
Для контроля повторения цветов использовать хэш.
*/

(function () {

    var btnTask = document.querySelector('.Mood');

    function randomDiap(n,m) {
        return Math.floor(Math.random()*(m-n+1))+n;
    }

    function mood(colorsCount) {
        var colors = [ '', 'красный', 'оранжевый', 'жёлтый', 'зелёный', 'голубой', 'синий', 'фиолетовый' ];
        var usedColors = {};

        console.log( 'цветов: ' + colorsCount );
        for ( var i = 1; i <= colorsCount; i++ ) {
            do {
                var n = randomDiap(1,7);
                var colorName = colors[n];
            } while (colorName in usedColors);
            console.log( colorName );
            usedColors[colorName] = true;
        }
        console.log(usedColors);
    }

    if (btnTask) {
        btnTask.addEventListener('click', (event) => {
            mood(3);
        });
      }

})();
