'use strict';

//======================================VOWELS==================================
/*
Написать «чистую» функцию для эффективного подсчёта количества русских гласных букв в строке.
Регулярные выражения (кто умеет) не использовать.
Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.
Цикл должен быть один, без вложенных циклов.
*/
(function () {
  var btnTask = document.querySelector('.Vowels');

  function vowelsCount (str) {
    var vowels = {ё:true, у:true, е:true, ы:true, а:true, о:true, э:true, я:true, и:true, ю:true};
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      count = count + ((str[i] in vowels) ? 1 : 0);
    }
    return count;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testStr = prompt("Введите слово. А мы посчитаем количество русских гласных в нём.");
      var result = vowelsCount(testStr.toLowerCase());
      console.log("Количество русских гласных: " + result);
    });
  }
})();
