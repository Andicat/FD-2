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
            var exp1 = [];
            exp1.push(exp);
            var arr = [];
            //res.arr = [];
            //res.len = 0;
            var symb = "";
            var arrLengthInside = 0;
                
            while (exp1[0].length > 0) {
                // если символ - оператор, но не минус перед отрицательным числом
                if ((exp1[0][0] in operations)&&(symb!=="")) {
                    if (symb) {
                        arr.push(symb);
                    }
                    arr.push(exp1[0][0]);
                    symb = "";
                    exp1[0] = exp1[0].substr(1);
                    continue;
                }
                //начало выражения в скобках
                if (exp1[0][0]==="(") {
                    if (symb) {
                        arr.push(symb);
                    }
                    exp1[0] = exp1[0].substr(1);
                    var arrInside = parseStr(exp1[0]); 
                    var arrLengthInside = arrInside.join("").length;  
                    exp1[0] = exp1[0].substr(arrLengthInside);
                    //res.arr.push(arrInside);
                    //symb = "";
                    //console.log(arrInside.join(""));
                    //console.log(arrInside.length);
                    //i = i + arrInside.len + 1;
                    continue;
                }
                //конец выражения в скобках
                if (exp1[0][0]===")") {
                    //res.arr.push(arrInside);
                    if (symb) {
                        arr.push(symb);
                        //len = res.arr.join("").length;
                    }


                    return arr;
                    
                }
                //если это все еще не оператор и не скобки, то это часть операнда
                symb += exp1[0][0];
                exp1[0] = exp1[0].substr(1);
                
            };
            //что осталось в конце
            if (symb) {
                arr.push(symb);
            }
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
                    //console.log(arr);
                }
            }
            console.log(arr);
            var res = (arr.length === 1)? parseFloat(arr[0]) : false;
            //console.log(res);
            return res;
        }

        var arrCalc = parseStr(str);
        console.log(arrCalc);
        var res = calcExp(arrCalc);
        if (!isFinite(res)) {
            return "Выражение не может быть вычислено";
        }
        return res;
    }

    if (btnCalc) {
        btnCalc.addEventListener('click', (event) => {
            var str = inputCalc.value;
            if (!str.length) {
                showResult("Выражение пустое");
                return;
            };
            var res = calculation(str);
            showResult("Результат: " + res);
        });
    }

})();


/*//преобразование строки в массив операторов и операндов
        function parseStr (exp) {
            var res = {};
            res.arr = [];
            res.len = 0;
            var symb = "";
            var arrLengthInside = 0;
                
            for (var i = 0; i < exp.length; i++) {
                // если символ - оператор, но не минус перед отрицательным числом
                if ((exp[i] in operations)&&!isNaN(Number(exp[i-1]))) {
                    if (symb) {
                        res.arr.push(symb);
                    }
                    res.arr.push(exp[i]);
                    symb = "";
                    continue;
                } 
                //начало выражения в скобках
                if (exp[i]==="(") {
                    if (symb) {
                        res.arr.push(symb);
                    }
                    //i++;
                    var arrInside = parseStr(exp.substr(i+1)); 
                    symb = arrInside.arr;
                    //arrLengthInside = arrLengthInside + arrInside.join("").length;  
                    //res.arr.push(arrInside);
                    //symb = "";
                    //console.log(arrInside.join(""));
                    //console.log(arrInside.length);
                    i = i + arrInside.len + 1;
                    continue;
                }
                //конец выражения в скобках
                if (exp[i]===")") {
                    //res.arr.push(arrInside);
                    if (symb) {
                        res.arr.push(symb);
                        res.len = res.arr.join("").length;
                    }


                    return res;
                    
                }
                //если это все еще не оператор и не скобки, то это часть операнда
                symb += exp[i];
            };
            //что осталось в конце
            if (symb) {
                res.arr.push(symb);
            }
            return res;
        } */
