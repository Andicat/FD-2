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


(function () {


    function test () {
     /*Переверните каждое слово в строке. Например, строка 
    "Welcome to this Javascript Guide!" должна стать "emocleW ot siht tpircsavaJ !ediuG".*/

    var str = "Welcome to this Javascript Guide!";
    var str1 = str.split(" ").map( v => { return v.split("").reverse().join("")}).join(" ");
    console.log(str1);
    }
        
    var btnTest = document.querySelector('.Test');

    if (btnTest) {
        btnTest.addEventListener('click', (event) => {
            test();
        });
    }

})();
