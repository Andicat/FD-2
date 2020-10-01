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
        
        return a;           
    }

    function tests() {

        function testEqual(testCount,a,b,testsArr) {
            console.log("Тест " + testCount);
            console.log(a);
            console.log(b);
            testsArr.forEach(function (test) {
                var text = test[0];
                var exp = test[1];
                var res = test[2];
                console.log("тест " + (test[1]===test[2] ? " пройден " : " НЕ ПРОЙДЕН!") + " " + test[0]);
            });
        };

        var testCount = 0;
        
        //тест 1
        var h1 = { a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN };
        var h2 = deepCopy(h1);
        var tests = [
            ["проверяем h1===h2 будет false",h1===h2, false],
            ["проверяем h1.a===h2.a будет true",h1.a===h2.a, true],
            ["проверяем h1.b===h2.b будет false",h1.b===h2.b, false],
            ["проверяем h1.b.b1===h2.b.b1 будет true",h1.b.b1===h2.b.b1, true],
            ["проверяем h1.c===h2.c будет false",h1.c===h2.c, false],
            ["проверяем h1.c[0]===h2.c[0] будет true",h1.c[0]===h2.c[0], true],
            ["проверяем h1.d===h2.d будет true",h1.d===h2.d, true],
            ["проверяем h1.e===h2.e будет true",h1.e===h2.e, true],
            ["проверяем isNaN(h2.f) будет true",isNaN(h2.f), true],
            ["проверяем h2.c instanceof Array будет true",h2.c instanceof Array, true]
        ];
        testCount++;
        testEqual(testCount,h1,h2,tests);

        //тест 2
        var a1 = [ 5, {b1:6,b2:7}, [33,22], null, undefined, Number.NaN];
        var a2 = deepCopy(a1);
        tests = [
            ["проверяем a1===a2 будет false",a1===a2, false],
            ["проверяем typeof(a2)===typeof(a1) будет true",typeof(a2)===typeof(a1), true],
            ["проверяем a1[0]===a2[0] будет true",a1[0]===a2[0], true],
            ["проверяем a1[1]===a2[1] будет false",a1[1]===a2[1], false],
            ["проверяем a1[1].b1===a2[1].b1 будет true",a1[1].b1===a2[1].b1, true],
            ["проверяем a1[2]===a2[2] будет false",a1[2]===a2[2], false],
            ["проверяем a1[2][0]===a2[2][0] будет true",a1[2][0]===a2[2][0], true],
            ["проверяем a1[3]===a2[3] будет true",a1[3]===a2[3], true],
            ["проверяем a1[4]===a2[4] будет true",a1[4]===a2[4], true],
            ["проверяем isNaN(a2[5]) будет true",isNaN(a2[5]), true],
            ["проверяем a2[2] instanceof Array будет true",a2[2] instanceof Array, true]
        ];
        testCount++;
        testEqual(testCount,a1,a2,tests);

        //тест 3
        var v1 = "sss";
        var v2 = deepCopy(v1);
        tests = [
            ["проверяем typeof(v2)===typeof(v1) будет true",typeof(v2)===typeof(v1), true],
            ["проверяем v1===v2 будет true",v1===v2, true]
        ];
        testCount++;
        testEqual(testCount,v1,v2,tests);
        
        //тест 4
        var z1 = null;
        var z2 = deepCopy(z1);
        tests = [
            ["проверяем typeof(z2)===typeof(z1) будет true",typeof(z2)===typeof(z1), true],
            ["проверяем z1===z2 будет true",z1===z2, true]
        ];
        testCount++;
        testEqual(testCount,z1,z2,tests);

        //тест 5
        var n1 = Number.NaN;
        var n2 = deepCopy(n1);
        tests = [
            ["проверяем typeof(n2)===typeof(n1) будет true",typeof(n2)===typeof(n1), true],
            ["проверяем isNaN(n2) будет true",isNaN(n2), true]
        ];
        testCount++;
        testEqual(testCount,n1,n2,tests);     
    }

    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        tests();
      });
    }

})();
