'use strict';

//======================================buildWrapper==================================
/*
B6+
Напишите функцию для оборачивания текста в тег с атрибутами, с которой можно было бы работать в следующем стиле:
  var wrapP=buildWrapper("P");   // строим функцию для оборачивания текста в тег P
  console.log( wrapP("Однажды в студёную зимнюю пору") );
  // в консоль выводится строка "<P>Однажды в студёную зимнюю пору</P>"
  console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
  // в консоль выводится строка "<P lang='ru'>Однажды в студёную зимнюю пору</P>"
Функция должна учитывать, что некоторые символы надо заменять на HTML-мнемоники (а именно - символы < > ' " &):
  console.log( wrapP("Однажды в <студёную> зимнюю пору") );
  // в консоль выводится строка "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>"
  var wrapH1=buildWrapper("H1"); // строим функцию для оборачивания текста в тег H1
  console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
  // в консоль выводится строка "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>"
*/

(function () {

    var btnTask = document.querySelector('.buildWrapper');

    function buildWrapper(tag) {

      //замена символов < > ' " & на мнемоники
      function mnemonic (text) { 
        return text.split("&").join("&amp;")
                    .split("<").join("&lt;")
                    .split(">").join("&gt;")
                    .split("'").join("&#039;")
                    .split('"').join("&quot;");
      };

      //сборка строки
      function buildStr (text, args) {
        var str = "<" + tag;

        for (var k in args) {
          str = str + " " + k + "='"  + mnemonic(args[k]) + "'";
        }
        str = str + ">" + mnemonic(text) + "</" + tag + ">";
        return str;
      }
      
      //возврат функции в качестве результата
      return buildStr;
    }

    function tests() {
        var wrapP = buildWrapper("P");
        console.log("в консоль выводится строка " + "<P>Однажды в студёную зимнюю пору</P>");
        console.log("РЕЗУЛЬТАТ:                 " + wrapP("Однажды в студёную зимнюю пору") );
        console.log("в консоль выводится строка " + "<P lang='ru'>Однажды в студёную зимнюю пору</P>");
        console.log("РЕЗУЛЬТАТ:                 " +  wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
        console.log("в консоль выводится строка " + "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>");
        console.log("РЕЗУЛЬТАТ:                 " +  wrapP("Однажды в <студёную> зимнюю пору") );
        var wrapH1 = buildWrapper("H1");
        console.log("в консоль выводится строка " + "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>");
        console.log("РЕЗУЛЬТАТ:                 " +  wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
    }
        
    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        tests();
      });
    }

})();
