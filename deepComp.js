'use strict';

//======================================DeepComp==================================
/*
С3+
Напишите функцию deepComp для глубокого сравнения переданных ей значений.
Значения могут быть числами, строками, хэшами, массивами, в т.ч. любого уровня вложения.
Учтите, что цикл for..in не гарантирует перебора ключей хэша в каком-либо порядке.
Не используйте Object.is().
Напишите тесты правильной работы функции, как минимум такие:
var H1={ a:5, b: { b1:6, b2:7 } };
var H2={ b: { b1:6, b2:7 }, a:5 };
var H3={ a:5, b: { b1:6 } };
var H4={ a:5, b: { b1:66, b2:7 } };
var H5={ a:5, b: { b1:6, b2:7, b3:8 } };
var H6={ a:null, b:undefined, c:Number.NaN };
var H7={ c:Number.NaN, b:undefined, a:null };
var H8={a:5,b:6};
var H9={c:5,d:6};
var H10={a:5};
var A1=[5,7];
var A2=[5,5,7];
var A3=[5,8,7];
deepComp(H1,H2) будет true
deepComp(H1,H3) будет false
deepComp(H1,H4) будет false
deepComp(H1,H5) будет false
deepComp(H6,H7) будет true
deepComp(H8,H9) будет false
deepComp(H8,H10) будет false
deepComp(null,H10) будет false
deepComp(H10,null) будет false
deepComp(null,null) будет true
deepComp(null,undefined) будет false
deepComp(5,"5") будет false
deepComp(5,H1) будет false
deepComp(A1,H1) будет false
deepComp(A2,A3) будет false
deepComp( {a:5,b:undefined}, {a:5,c:undefined} ) будет false
deepComp([5,7],{0:5,1:7}) будет false
deepComp("aaa","bbb") будет false
*/

(function () {

    var btnTask = document.querySelector('.DeepComp');

    function deepComp(a, b) {

       //сравниваем два хэша или массива
        if (a instanceof Object && b instanceof Object) {
            //если один - массив, а второй - нет
            if ((a instanceof Array)!==(b instanceof Array)) {
                return false;
            }

            //если количество ключей разное
            if (Object.keys(a).length!==Object.keys(b).length) {
                return false;
            }

            //сравниванием по ключам
            for (var k in a) {
                if (!(k in b)) {
                    return false;
                };
                if (!deepComp(a[k],b[k])) {
                    return false;
                };
            };
            return true;
        }

        //NaN
        if ((typeof a) === "number" && isNaN(a)) {
            return isNaN(b);
        }

        return a===b;           
    };

    function setVar (name,value) {
        console.log("Значение " + name + ":");
        console.log(value);
        return value;
    };

    function tests() {

        var H1 = setVar("H1", { a:5, b: { b1:6, b2:7 } });
        var H2 = setVar("H2", { b: { b1:6, b2:7 }, a:5 });
        var H3 = setVar("H3", { a:5, b: { b1:6 } });
        var H4 = setVar("H4", { a:5, b: { b1:66, b2:7 } });
        var H5 = setVar("H5", { a:5, b: { b1:6, b2:7, b3:8 } });
        var H6 = setVar("H6", { a:null, b:undefined, c:Number.NaN });
        var H7 = setVar("H7", { c:Number.NaN, b:undefined, a:null });
        var H8 = setVar("H8", {a:5,b:6});
        var H9 = setVar("H9", {c:5,d:6});
        var H10 = setVar("H10", {a:5});
        var A1 = setVar("A1", [5,7]);
        var A2 = setVar("A2", [5,5,7]);
        var A3 =  setVar("A3", [5,8,7]);

        var testsArr = [
            ["проверяем deepComp(H1,H2) будет true", deepComp(H1,H2), true],
            ["проверяем deepComp(H1,H3) будет false", deepComp(H1,H3), false],
            ["проверяем deepComp(H1,H4) будет false", deepComp(H1,H4), false],
            ["проверяем deepComp(H1,H5) будет false", deepComp(H1,H5), false],
            ["проверяем deepComp(H6,H7) будет true", deepComp(H6,H7), true],
            ["проверяем deepComp(H8,H9) будет false", deepComp(H8,H9), false],
            ["проверяем deepComp(H8,H10) будет false", deepComp(H8,H10), false],
            ["проверяем deepComp(null,H10) будет false", deepComp(null,H10), false],
            ["проверяем deepComp(H10,null) будет false", deepComp(H10,null), false],
            ["проверяем deepComp(null,null) будет true", deepComp(null,null), true],
            ["проверяем deepComp(null,undefined) будет false", deepComp(null,undefined), false],
            ["проверяем deepComp(5,\"5\") будет false", deepComp(5,"5"), false],
            ["проверяем deepComp(5,H1) будет false", deepComp(5,H1), false],
            ["проверяем deepComp(A1,H1) будет false", deepComp(A1,H1), false],
            ["проверяем deepComp(A2,A3) будет false", deepComp(A2,A3), false],
            ["проверяем deepComp( {a:5,b:undefined}, {a:5,c:undefined} ) будет false", deepComp( {a:5,b:undefined}, {a:5,c:undefined} ), false],
            ["проверяем deepComp([5,7],{0:5,1:7}) будет false", deepComp([5,7],{0:5,1:7}), false],
            ["проверяем deepComp(\"aaa\",\"bbb\") будет false", deepComp("aaa","bbb"), false]
        ];

        testsArr.forEach(function (test) {
            var text = test[0];
            var exp = test[1];
            var res = test[2];
            console.log("тест " + (test[1]===test[2] ? " пройден " : " НЕ ПРОЙДЕН!") + " " + test[0]);
        });
        
    }

    if (btnTask) {
      btnTask.addEventListener('click', (event) => {
        tests();
      });
    }

})();
