'use strict';

//======================================Palindrome==================================
/*
A3+
Написать чистую функцию, проверяющую, что переданная ей фраза является палиндромом.
(Палиндром - это фраза, которая слева направо читается так же как справа налево)
Массивы при решении не использовать.
При проверке должны игнорироваться:
 - регистр букв;
 - пробелы;
 - знаки препинания;
 - мягкие и твёрдые знаки;
 - разница между буквами "е" и "ё".
*/
(function () {
  var btnTask = document.querySelector('.Palindrome');
  
  function isPalindrome (str) {

    var exception = {" ":true, "?":true, ",":true, ".":true, "!":true, ";":true, ":":true, "-":true, "(":true, ")":true, '"':true, "'":true, "ь":true, "ъ":true};
        
    var first = 0;
    var last = str.length - 1;
        
    while (first < last) { 
      var leftSymbol = str[first];
      var rightSymbol = str[last];

      //игнорируем пробелы, знаки препинания, ь, ъ
      if (leftSymbol in exception) {
        first++;
        continue;
      }

      if (rightSymbol in exception) {
        last--;
        continue;
      }

      //игнорируем разницу между буквами "е" и "ё"
      if (leftSymbol==="ё") {
        leftSymbol = "е";
      }

      if (rightSymbol==="ё") {
        rightSymbol = "е";
      }

      //если символы не одинаковы - не палиндром
      if (leftSymbol!==rightSymbol) {
        return false;
      }

      first++;
      last--;
    }

    return true;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testStr = prompt("Введите фразу. А мы проверим, является ли она палидромом.");
      var result = isPalindrome(testStr.toLowerCase());
      console.log("Ваша фраза '" + testStr + "' - " + (result ? "ПАЛИНДРОМ!": "НЕ палиндром!"));
    });
  }
})();
