'use strict';

//======================================Calculator==================================
/*
B3+
Написать функцию-калькулятор вручную введённого выражения (без использования функции eval и динамического описания функции new Function, если вы знаете о них).
Должны работать операции + - * / и скобки, числа должны приниматься целые, дробные (через точку), отрицательные
Например, вызываем функцию, передавая ей строку "2*(-3+1)", функция возвращает -4.
*/

(function () {

    var blockCalc = document.querySelector('.calc');

    if (!blockCalc) {
        return;
    }
    var inputCalc = blockCalc.querySelector('.calc__input');
    var btnCalc = blockCalc.querySelector('.calc__button');
    var resultCalc = blockCalc.querySelector('.calc__result');

    function showResult (text) {
        if (resultCalc) {
            resultCalc.innerHTML = text;
        }
    }

    function calculation(str) {
        var operations = {
            "*": function (a,b) { return a*b },
            "/": function (a,b) { return a/b },
            "-": function (a,b) { return a-b },
            "+": function (a,b) { return parseFloat(a)+parseFloat(b) }
        };

        //преобразование строки в массив операторов и операндов
        function parseStr (exp) {
           
            var arr = [];
            var symb = "";
            
            function pushSymbToArr () {
                if (symb) {
                    arr.push(symb);
                }
                symb = "";
            }
                
            while (exp[0].length > 0) {
                // если символ - оператор, но не минус перед отрицательным числом
                if ((exp[0][0] in operations)&&(symb!=="")) {
                    pushSymbToArr();
                    arr.push(exp[0][0]);
                    exp[0] = exp[0].substr(1);
                    continue;
                }
                //начало выражения в скобках
                if (exp[0][0]==="(") {
                    pushSymbToArr();
                    exp[0] = exp[0].substr(1);
                    var arrInside = parseStr(exp, str); 
                    symb = arrInside;
                    continue;
                }
                //конец выражения в скобках
                if (exp[0][0]===")") {
                    pushSymbToArr();
                    exp[0] = exp[0].substr(1);
                    return arr;
                }
                //если это все еще не оператор и не скобки, то это часть операнда
                symb += exp[0][0];
                exp[0] = exp[0].substr(1);
            };
            //что осталось в конце
            pushSymbToArr();
            return arr;
        }

        //вычисления
        function calcExp(arr) {
            //если массив состоит из одного элемента
            if (arr.length===1 ) {
                return (arr[0] instanceof Array) ? calcExp(arr[0]) : parseFloat(arr[0]);
            }
            //перебор операций
            for (var op in operations) {
                while(arr.includes(op)) {
                    var i = arr.indexOf(op);
                    var op1 = arr[i-1];
                    var op2 = arr[i+1];
                    if (op1 instanceof Array) {
                        op1 = calcExp(op1);
                    }
                    if (op2 instanceof Array) {
                        op2 = calcExp(op2);
                    }
                    var res = operations[op](op1,op2);
                    arr.splice(i-1,3,res);
                }
            }
            var res = (arr.length === 1)? parseFloat(arr[0]) : false;
            return res;
        }
        
        var exp = [str];
        var arrCalc = parseStr(exp);
        console.log(arrCalc);
        var res = calcExp(arrCalc);

        return (!isFinite(res)) ? null  : res;
    }

    if (btnCalc) {
        btnCalc.addEventListener('click', (event) => {
            var str = inputCalc.value;
            if (!str.length) {
                showResult("Выражение пустое");
                return;
            };
            var res = calculation(str);
            showResult("Результат: " + (res!==null ? res : "Выражение не может быть вычислено"));
        });
    }

})();
