'use strict';

//======================================Anketa==================================
/* 
Создать проект ANKETA. Спросить у пользователя:
фамилию, имя, отчество РАЗДЕЛЬНО (оператором prompt)
возраст в годах (оператором prompt)
пол (оператором confirm, например, "ваш пол - мужской?")
и вывести оператором alert анкету пользователя по примеру:

ваше ФИО: Иванов Иван Иванович
ваш возраст в годах: 20
ваш возраст в днях: 7300
через 5 лет вам будет: 25
ваш пол: мужской
вы на пенсии: нет
Должен быть контроль корректности вводимых пользователем данных (например, фамилия не должна быть пустой, возраст должен быть корректной цифрой и т.д.).
Оператор alert в коде должен использоваться ровно один раз.
*/
(function () {
  var btnAnketa = document.querySelector('.Anketa');

  function getName (question) {
    var str = "";
    while (!isNaN(Number(str))) {
      str = prompt(question);
    };
    return str;
  }
  
  function getAge (question) {
    var age = 0;
    while (!age || age<=0 || age>125) {
      age = Number(prompt(question));
    };
    return parseInt(age);
  }
  
  function isOnRest (age, sex) {
    var ageForRest = (sex==="мужской") ? 65 : 60;
    return (age>=ageForRest ? "да" : "нет");
  }
  
  if (btnAnketa) {
    btnAnketa.addEventListener('click', (event) => {
    var lastName = getName("Введите вашу фамилию");
    var firstName = getName("Введите ваше имя");
    var patrName = getName("Введите ваше отчество");
    var age = getAge("Введите ваш возраст");
    var sex = confirm("Выберите ваш пол: \n - Нажмите \"Ок\", если вы мужчина \n - Нажмите \"Отмена\", если вы женщина!") ? "мужчина" : "женщина";
    var result = "ваше ФИО: " + lastName + " " + firstName + " " + patrName + "\n"
          + "ваш возраст в годах: " + age + "\n"
          + "ваш возраст в днях: " + (age*365) + "\n"
          + "через 5 лет вам будет: " + (age+5) + "\n"
          + "ваш пол: " + sex + "\n"
          + "вы на пенсии: " + isOnRest(age, sex);
    alert(result);
    });
  }
})();

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

//======================================VOWELS==================================
/*
Написать «чистую» функцию для эффективного подсчёта количества русских гласных букв в строке.
Регулярные выражения (кто умеет) не использовать.
Спросить у пользователя строку. Вывести в консоль количество русских гласных букв в ней.
Цикл должен быть один, без вложенных циклов.
*/
(function () {
  var btnTask = document.querySelector('.Vowels');

  function vowelsCount (str) {
    var vowels = {ё:true, у:true, е:true, ы:true, а:true, о:true, э:true, я:true, и:true, ю:true};
    var count = 0;
    for (var i = 0; i < str.length; i++) {
      count = count + ((str[i] in vowels) ? 1 : 0);
    }
    return count;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testStr = prompt("Введите слово. А мы посчитаем количество русских гласных в нём.");
      var result = vowelsCount(testStr.toLowerCase());
      console.log("Количество русских гласных: " + result);
    });
  }
})();

