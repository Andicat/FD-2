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
    str = str.toLowerCase();
    
    var exception = {" ":true, "?":true, ",":true, ".":true, "!":true, ";":true, ":":true, "-":true, "(":true, ")":true, '"':true, "'":true, "ь":true, "ъ":true};
        
    var first = 0;
    var last = str.length - 1;
        
    while (first < last) { 
      var leftSymbol = str[first];
      var rightSymbol = str[last];

      //пропускаем пробелы, знаки препинания, ь, ъ
      while (leftSymbol in exception) {
        first++;
        leftSymbol = str[first];
      }

      while (rightSymbol in exception) {
        last--;
        rightSymbol = str[last];
      }

      //игнорируем разницу между буквами "е" и "ё"
      if (leftSymbol==="ё" && leftSymbol!==rightSymbol) {
        leftSymbol = "е";
      } else if (rightSymbol==="ё"  && rightSymbol!==leftSymbol) {
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
      var result = isPalindrome(testStr);
      console.log("Ваша фраза '" + testStr + "' - " + (result ? "ПАЛИНДРОМ!": "НЕ палиндром!"));
    });
  }
})();
