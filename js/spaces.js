'use strict';

//======================================SPACES==================================
/*
A2+
Написать чистую функцию, эффективно удаляющую из переданной ей строки все начальные и конечные пробелы.
Не используйте метод строки trim.
Не используйте массивы (это неэффективно в данной задаче).
Если умеете работать с регулярными выражениям - не используйте и их :)
Спросите у пользователя строку, уберите из неё с помощью этой функции начальные и конечные пробелы, 
и выведите в консоль результат, добавив к нему слева и справа какой-нибудь символ, чтобы было очевидно, что пробелов нет.
1. Если строка состоит только из пробелов - это выясняется после ПЕРВОГО цикла - можно сразу вернуть результат, не теряя времени на второй цикл.
2. Если оказалось что нет пробелов ни в начале ни в конце строки - можно вернуть исходную строку, не теряя времени на slice/substring.
*/
(function () {
  var btnTask = document.querySelector('.Spaces');
  
  function deleteSpaces (str) {
    
    var strRes = "";
    var first = 0;
    var last = str.length;
    
    //находим количество пробелов в начале строки
    while (str[first]===" ") { 
      first++;
    }

    //если строка полностью из пробелов
    if (first===last) {
      return strRes;
    };
    
    //находим количество пробелов в конце строки
    while (str[last-1]===" ") {
      last--;
    }

    //если строка без крайних пробелов
    if (first===0 && last===str.length) {
      return str;
    };
    
    //вырезаем строку
      strRes = str.slice(first,last);

      return strRes;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testStr = prompt("Введите строку. А мы удалим все начальные и конечные пробелы.");
      var result = deleteSpaces(testStr);
      console.log("Итоговая строка без крайних пробелов: '" + result + "'");
    });
  }
})();