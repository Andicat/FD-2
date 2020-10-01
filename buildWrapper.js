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
        var funcBody = "function mnemonic (text) { return text.split(\"&\").join(\"&amp;\").split(\"<\").join(\"&lt;\").split(\">\").join(\"&gt;\").split(\"'\").join(\"&#039;\")}"
        funcBody = funcBody + "var str = " + "\"<" + tag + "\"" + ";\n";
        funcBody = funcBody + "for (var k in args) {str = str + \"" + " " + "\" + k + \"=" + "\'" + "\" + args[k] + \"" + "\'" + "\";}" + ";\n";
        funcBody = funcBody + "str = str + '>' + text + " + "'</" + tag + ">'" + ";\n";
        funcBody = funcBody + "str = str.split(\"&\").join(\"&amp;\")" + ";\n";
        funcBody = funcBody + "str = str.split(\"<\").join(\"&lt;\")" + ";\n";
        funcBody = funcBody + "str = str.split(\">\").join(\"&gt;\")" + ";\n";
        funcBody = funcBody + "str = str.split(\"'\").join(\"&#039;\")" + ";\n";
        funcBody = funcBody + "str = str.split(\'\"\').join(\"&quot;\")" + ";\n";
        funcBody = funcBody + "return str;";
        //console.log(funcBody);
        var func = new Function('text','args', funcBody);
        //console.log(func);
        return func;
    }

    function tests() {
        var wrapP = buildWrapper("P");
        console.log("в консоль выводится строка " + "<P>Однажды в студёную зимнюю пору</P>");
        console.log( wrapP("Однажды в студёную зимнюю пору") );
        console.log("в консоль выводится строка " + "<P lang='ru'>Однажды в студёную зимнюю пору</P>");
        console.log( wrapP("Однажды в студёную зимнюю пору",{lang:"ru"}) );
        console.log("в консоль выводится строка " + "<P>Однажды в &lt;студёную&gt; зимнюю пору</P>");
        console.log( wrapP("Однажды в <студёную> зимнюю пору") );
        var wrapH1 = buildWrapper("H1");
        console.log("в консоль выводится строка " + "<H1 align='center' title='M&amp;M&apos;s'>СТИХИ</H1>");
        console.log( wrapH1("СТИХИ",{align:"center",title:"M&M's"}) );
    }
        
    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        tests();
      });
    }

})();
