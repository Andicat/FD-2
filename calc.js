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
            "*": function (a,b) { return a*b},
            "/": function (a,b) { return a/b},
            "+": function (a,b) { return a+b},
            "-": function (a,b) { return a-b}
        };

        //парсинг строки в массив операторов и операндов
        function parseStr (exp) {
            var arr = [];
            var symb = "";
                
            for (var i = 0; i < exp.length; i++) {
                // если символ - оператор
                if (exp[i] in operations) {
                    if (symb) {
                        arr.push(symb);
                    }
                    arr.push(exp[i]);
                    symb = "";
                    continue;
                } 
                //начало выражения в скобках
                if (exp[i]==="(") {
                    i++;
                    var eee = parseStr(exp.substr(i))
                    arr.push(eee);
                    i = i + eee.join("").length;
                    continue;
                }
                //конец выражения в скобках
                if (exp[i]===")") {
                    if (symb) {
                        arr.push(symb);
                    }
                    return arr;
                }
                //если это все еще не оператов или не скобки, то это часть операнда
                symb += exp[i];
            };
            if (symb) {
                arr.push(symb);
            }
            return arr;
        }

        //вычисления
        function calcExp(arr) {
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
                    console.log(arr);
                }
            }
            var res = (arr.length === 1)? parseFloat(arr[0]) : false;
            return res;
        }

        var arrCalc = parseStr(str);
        console.log(arrCalc);
        var res = calcExp(arrCalc);
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
            showResult(res?("Результат: " + res):"Выражение не может быть вычислено");
        });
    }

})();



/*
function calcExp (exp, i = -1) {

        var aaa = ;

        //var eee = "";

        function isEndOfExp(symb) {
            if (symb===")"||symb===undefined) {
                i++;
                return true;
            }
            return false;
        }
        
        do {
            i++;
            var symbol = exp[i];
            if (symbol==="+"||symbol==="-"||symbol==="*"||symbol==="/") {

            }
            
            if (symbol==="(") {
                calcExp(exp, i);
            }
            //eee = eee + symbol;
        } while (!isEndOfExp(symbol))
        //console.log("вычисляли " + eee); 
    }









    function resolve(exp,i) {
        //find right operand
        while (isNumber(exp[i-1])||exp[i-1]=".") {
            
        }
        var opr = exp[i-1];
        var opl = exp[i+1];
        var str = "" + opr + "*" + opl;
        console.log("right " + opr + " " + exp[i] + " left " + opl);

        return exp.replace(str,(opr*opl));

    }

    function calcExp (exp) {
        var op = exp.indexOf("*");
        while (op >= 0) {
            console.log("find of * at " + op + " place. Try to solve")
            exp = resolve(exp,op);
            op = exp.indexOf("*");
            console.log(exp);
        } 
    }
*/