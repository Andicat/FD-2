'use strict';

/*
 Реализовать методы, которые в процессе выполнения строки (2).plus(3).minus(1) дали бы на выходе 4.
 Поскольку, мы работаем с числами, надо расширить прототип Number новыми методами.

    Number.prototype.plus = function (value) {
        return this + value;
    }
    
    Number.prototype.minus = function (value) {
        return this - value;
    }

*/


/*
Дана функция, она принимает в качестве аргументов строки '*', '1', 'b', '1c', реализуйте ее так, что бы она вернула строку '1*b*1c'

function test () {
    return [].slice.call(arguments, 1).join(arguments[0]);
}

*/


/*
Числа от 1 до 100 лежат в массиве, они хаотично перемешанные, от туда изъяли одно число, надо найти, что это за число. алгоритм не должен превышать O(n^2) сложности.
*/

/*
 Сортировка пузырьком.

var m = [1, 7, 5, 13, 8],
      count = m.length - 1,
      max;
for (var i = 0; i < count; i++) {
    for (var j = 0; j < count - i; j++) {
        if (m[j] > m[j + 1]) {
            max = m[j];
            m[j] = m[j + 1];
            m[j + 1] = max;
        }
    }
}
*/

/*
Напишите код, который сделает из массива объект
// на входе массив
var arr = [
 {name: 'width', value: 10}, 
 {name: 'height', value: 20}
]

// на выходе объект
{width: 10, height: 20}

var arr = [
            {name: 'width', value: 10}, 
            {name: 'height', value: 20}
           ]

        var obj = {};

        arr.forEach(function(e,i,a) {
            obj[e.name] = e.value;

        })
*/

/*
Необходимо написать функцию, 
принимающую в аргументах многомерный массив неограниченной вложенности 
и возвращающую новый одномерный массив, состоящий из элементов со всех уровней вложенности исходного массива.
flat([1, [2, [3, [4,5]]]]); // => [1, 2, 3, 4, 5]

var arr = [1, [2, [3, [4,5],[6,7]]]];

        function flat(arr) {
            return arr.join().split(",");
        }

        var res = flat(arr);
        console.log(res);

надо так

function flat(arr) {
	let res = [];
	
	arr.forEach((item) => {
		if (Array.isArray(item)) {
			res = res.concat(flat(item));
		} else {
			res.push(item);
		}
	});

	return res;
}
*/

/*
Написать функцию, принимающую аргументом массив чисел и возвращающую новый массив, состоящий из удвоенных значений первого.
f([1, 2, null, 7, 8, null, 3]); // => [2, 4, 14, 16, 6]

var arr = [1, 2, null, 7, 8, null, 3];

        function double(a) {
            return a.filter(e => {return (e)}).map(e => {return e*2} );
        }

        console.log(double(arr));

*/


/*
Дана структура данных в виде дерева:

const tree = {
	value: 1,
	children: [
		{
			value: 2,
			children: [
				{ value: 4 },
				{ value: 5 },
			]
		},
		{
			value: 3,
			children: [
				{ value: 6 },
				{ value: 7 },
			]
		}
	]
};
Необходимо написать функцию, возвращающую значения всех вершин дерева:
getTreeValues(tree); // => [1, 2, 3, 4, 5, 6, 7]


        var arr = [];
        function getTreeValues(t,a) {
            for (var k in t) {
                if (Array.isArray(t[k])) {
                    getTreeValues(t[k],a);
                    continue;
                }
                if (t[k]instanceof Object) {
                    getTreeValues(t[k],a);
                    continue;
                }
                a.push(t[k]);
            }
            return a;
        }
        
        var res = getTreeValues(tree, arr).sort((a,b) => { return a-b} );
        console.log(res);


*/


/*
Какой результат?
console.log(+false)
console.log(+true)
console.log(+null)

унарный плюс - преобразует к числу. результат будет 0 1 0
*/

/*Переверните каждое слово в строке. Например, строка 
    "Welcome to this Javascript Guide!" должна стать "emocleW ot siht tpircsavaJ !ediuG".*/

/*    var str = "Welcome to this Javascript Guide!";
    var str1 = str.split(" ").map( v => { return v.split("").reverse().join("")}).join(" ");
    console.log(str1);*/



( function () {

    /*Array.prototype.map2 = function(f) { 
        var ar1 = this;
        var ar2 = [];
        for (var i = 0; i < ar1.length; i++) {
            ar2.push(f(ar1[i],i,ar1));
        }
        return ar2;
    };

    var aaa = [1,2,3,4,5];
    var bbb = aaa.map2(v=>v*2);
    var f = function(v,i,a) { return "" + v + "" + i + "" + a};
    console.log(aaa);
    var ccc = aaa.map2(f);
    console.log(bbb);
    console.log(ccc);

    var o = {"4":true};

    console.log(o.hasOwnProperty("4"));
    console.log(o);

    eval("var x = 1;"); 
    console.log(x);

    var NaN = NaN
    var undefined = undefined
    var Infinity = "1"
    var o = "ggg"
    console.log(o);
    var b;
    
    function ttt(a,a,a) {
        var res = b = 3;
    }
    ttt();
    console.log(res);*/

    /*var a = "5";
    var b = 2;
    var c = a+++b;
    console.log(c); //а+++b эквивалентно записи (a++)+b Значение - a равно "5", а значение - a++ равно 5 (так как это постфиксный инкремент) Следовательно а+++b = 5 + 2 = 7*/

    //Оператор ~ равносилен - (n + 1) то есть - (2 + 1) = -3

    let x;
    x = 'hello' && 123; //x===123
    x = 'hello' || 123; //x==='hello'
    x = false && 123; //x===false
    x = false || 123; //x===123

    //палиндром
    x = "abc";
    x = x.toLowerCase().split("").reverse().join("");
    //console.log(x);

    /*
    Напишите функцию, которая выводит в консоль числа от 1 до n, где n — целое число, которое функция принимает в качестве параметра, при этом:
    выводит fizz вместо чисел, кратных 3;
    выводит buzz вместо чисел, кратных 5;
    выводит fizzbuzz вместо чисел, кратных и 3, и 5.
    */
    function fizzbuzz(value) {
       var res;
       for (var i=1; i<= value; i++) {
        res = (i%3+i%5===0?"fizzbuzz":(i%5===0?"buzz":(i%3===0?"fizz":i)));
        console.log(res);
       }
    }

   //fizzbuzz(15);

    /*
    Напишите функцию, проверяющую, являются ли две строки анаграммами
    друг друга (регистр букв не имеет значения). 
    Важны только символы, пробелы или знаки препинания не учитываются. Пример:
    anagram('finder', 'Friend')  --> true
    anagram('hello', 'bye') --> false
    */

    function anagram(str1,str2) {
        str1 = str1.toLowerCase().split("").sort();
        str2 = str2.toLowerCase().split("").sort();
        if (str1.length!==str2.length) {
            console.log("false");
            return;
        }
        str1.forEach( (v,i) => {
            if (v!==str2[i]) {
                console.log("false");
                return;
            }
        });
        console.log("true");
        return;
        
    }

    //anagram('finder', 'Friend');
    //anagram('hello', 'bye');

    /*
    Последовательность Фибоначчи — это порядок чисел, где каждое последующее число является суммой двух предыдущих. 
    Например, первые десять чисел последовательности выглядят так: 0, 1, 1, 2, 3, 5, 8, 13, 21, 34.
    Напишите функцию, которая возвращает n-ую запись в последовательности, где n — это число, которое вы передаёте в качестве аргумента функции.
    Пример:
    fibonacci(3)  // --> 2
    */
    function fibonacci(index) {
        var res = [];
        for (var i=0; i<=index; i++) {
            var c = (i<=1)?i:res[i-1]+res[i-2]
            res.push(c);
        }
        console.log(c);
        return c;
    }
    //fibonacci(9);

    //console.log( 20e-1['toString'](2) ); //20e-1 - это 20 * 10(в степени-1) = 20*0,1 = 2. ['toString'](2) - преобразовать в строку в двоичной системе исчесления - 2 в этой системе = 10
    
    /*f.call(f);
    function f() {
        alert( this );
    }*/

    /*function add(...nums) { //через спрэд-оператор
        return nums.reduce((r,v) => r + v);
    }*/

    function add(num) { //через рекурсию. каррирование
        //return nums.reduce((r,v) => r + v);
    }

    //console.log(add(10)(20)(30));
    //console.time("FFF");
    //console.timeEnd("FFF");

})();
