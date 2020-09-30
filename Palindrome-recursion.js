'use strict';

//======================================Palindrome-recursion==================================
/*
A4+
Написать чистую функцию, проверяющую, что переданная ей фраза является палиндромом, с использованием рекурсии.
Массивы при решении не использовать.
При проверке должны игнорироваться:
 - регистр букв;
 - пробелы;
 - знаки препинания;
 - мягкие и твёрдые знаки;
 - разница между буквами "е" и "ё".
Внимание: не надо строку очищать от игнорируемых символов с помощью рекурсии; рекурсию нужно применять только при проверке, является ли очищенная строка палиндромом.
*/
(function () {

    var btnTask = document.querySelector('.Palindrome-r');

    function isPalindrome (phrase) {

        phrase = phrase.toLowerCase();            
    
        var exceptionsList = {" ":true, "?":true, ",":true, ".":true, "!":true, ";":true, ":":true, "-":true, "(":true, ")":true, '"':true, "'":true, "ь":true, "ъ":true};
        
        //функция проверки строки с заданными исключениями
        function checkStr(str, exception) {

            //если фраза пустая или состоит из одного символа, она палиндром.
            if (str.length <= 1) {
                return true;
            }

            var first = 0;
            var last = str.length - 1;

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
            if (leftSymbol==="ё") {
                leftSymbol = "е";
            }
        
            if (rightSymbol==="ё") {
                rightSymbol = "е";
            }

            //если крайние символы одинаковы, вызываем рекурсивно проверку урезанной строки
            if (leftSymbol===rightSymbol) {
                return checkStr(str.slice(first+1,last), exception);
            }
        
            return false;
        }

        return checkStr(phrase,exceptionsList);

    }
  
    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        var testStr = prompt("Введите фразу. А мы проверим, является ли она палидромом.");
        var result = isPalindrome(testStr);
        console.log("Ваша фраза '" + testStr + "' - " + (result ? "ПАЛИНДРОМ!": "НЕ палиндром!"));
      });
    }

})();
