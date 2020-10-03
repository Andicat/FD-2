'use strict';

//======================================Treesum==================================
/*
Разработать «чистую» функцию treeSum, которая получает массив, элементы которого могут быть числами или снова массивами, и так до любого уровня.
Функция должна рассчитать и вернуть сумму всех числовых элементов массива со всех уровней.
При написании функции не описывать каких-либо вложенных в неё функций.
Проверить работу функции можно на следующем массиве (сумма 50):

      [ 5, 7, 
        [ 4, [2], 8, [1,3], 2 ], 
        [ 9, [] ], 
        1, 8
      ]
*/
(function () {
  var btnTask = document.querySelector('.Treesum');

  function treeSum (arr) {
    var sum = 0;
    for (var i = 0; i < arr.length; i++) {
      sum = sum + ((typeof arr[i]==="number") ? arr[i] : treeSum(arr[i]));
    }    
    return sum;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testArr = [ 5, 7, [ 4, [2], 8, [1,3], 2 ], [ 9, [] ], 1, 8 ];
      var result = treeSum(testArr);
      console.log("Сумма чисел массива: " + result);
    });
  }
})();
