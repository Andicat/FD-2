'use strict';

//======================================deepCopy==================================
/*
С2+
Напишите функцию deepCopy для глубокого копирования переданного ей значения.
Функция должна получать число, строку, логическое значение, хэш или массив и возвращать его копию, включая все подхэши, подмассивы и т.д.
Напишите тесты правильной работы функции, как минимум такие:

var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
var h2=deepCopy(h1);
h1===h2 будет false
h1.a===h2.a будет true
h1.b===h2.b будет false
h1.b.b1===h2.b.b1 будет true
h1.c===h2.c будет false
h1.c[0]===h2.c[0] будет true
h1.d===h2.d будет true
h1.e===h2.e будет true
isNaN(h2.f) будет true
h2.c instanceof Array будет true

var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
var a2=deepCopy(a1);
a1===a2 будет false
typeof(a2)===typeof(a1) будет true
a1[0]===a2[0] будет true
a1[1]===a2[1] будет false
a1[1].b1===a2[1].b1 будет true
a1[2]===a2[2] будет false
a1[2][0]===a2[2][0] будет true
a1[3]===a2[3] будет true
a1[4]===a2[4] будет true
isNaN(a2[5]) будет true
a2[2] instanceof Array будет true

var v1="sss";
var v2=deepCopy(v1);
typeof(v2)===typeof(v1) будет true
v1===v2 будет true

var z1=null;
var z2=deepCopy(z1);
typeof(z2)===typeof(z1) будет true
z1===z2 будет true

var n1=Number.NaN;
var n2=deepCopy(n1);
typeof(n2)===typeof(n1) будет true
isNaN(n2) будет true
*/
(function () {

    var btnTask = document.querySelector('.DeepCopy');

    function deepCopy(a) {
        var b;

        if (a instanceof Array) {
            b = [];
            for (var i = 0; i < a.length; i++) {
                b[i] = deepCopy(a[i]);
            }
            return b;
        }
        
        if (a instanceof Object) {
            b = {};
            for (var k in a) {
                b[k] = deepCopy(a[k]);
            }
            return b;
        }

        b = a;
        return b;           
    }

    function tests() {
    
        function controlCopy(exp,res) {
            console.log("тест " + (eval(exp)===res ? " пройден " : " НЕ ПРОЙДЕН!") + " "+ exp + " будет " + res);
        };

        var h1={ a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        var h2=deepCopy(h1);

        console.log("TEST 1");
        console.log(h1);
        controlCopy("h1===h2", false);
        controlCopy("h1.a===h2.a", true);
        controlCopy("h1.b===h2.b", false);
        controlCopy("h1.b.b1===h2.b.b1", true);
        controlCopy("h1.c===h2.c", false);
        controlCopy("h1.c[0]===h2.c[0]", true);
        controlCopy("h1.d===h2.d", true);
        controlCopy("h1.e===h2.e", true);
        controlCopy("isNaN(h2.f)", true);
        controlCopy("h2.c instanceof Array", true);

        var a1=[ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        var a2=deepCopy(a1);

        console.log("TEST 2");
        console.log(a1);
        controlCopy("a1===a2", false);
        controlCopy("typeof(a2)===typeof(a1)", true);
        controlCopy("a1[0]===a2[0]", true);
        controlCopy("a1[1]===a2[1]", false);
        controlCopy("a1[1].b1===a2[1].b1", true);
        controlCopy("a1[2]===a2[2]", false);
        controlCopy("a1[2][0]===a2[2][0]", true);
        controlCopy("a1[3]===a2[3]", true);
        controlCopy("a1[4]===a2[4]", true);
        controlCopy("isNaN(a2[5])", true);
        controlCopy("a2[2] instanceof Array", true);

        var v1="sss";
        var v2=deepCopy(v1);

        console.log("TEST 3");
        console.log(v1);
        controlCopy("typeof(v2)===typeof(v1)", true);
        controlCopy("v1===v2", true);
        
        var z1=null;
        var z2=deepCopy(z1);

        console.log("TEST 4");
        console.log(z1);
        controlCopy("typeof(z2)===typeof(z1)", true);
        controlCopy("z1===z2", true);

        var n1=Number.NaN;
        var n2=deepCopy(n1);

        console.log("TEST 5");
        console.log(n1);
        controlCopy("typeof(n2)===typeof(n1)", true);
        controlCopy("isNaN(n2)", true);
                
    }

    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        tests();
      });
    }

})();
