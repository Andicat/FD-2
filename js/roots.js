'use strict';

//======================================Roots==================================
/*
Найти ошибку в функции нахождения корней квадратного уравнения (см. слайды по теме «Тесты»).
Доработать функцию так, чтобы тесты проходили успешно.
*/
(function () {

  var btnTask = document.querySelector('.Roots');
  var btnTaskTest = document.querySelector('.Roots_test');

  // находит корни квадратного уравнения, возвращает массив корней
  function squareRoots(a,b,c) {
    //Если а=0, то уравнение уже не квадратное и решается иначе, имея один корень
    if ( a===0 ) 
      return [-c/b];

    var d=b*b-4*a*c; // дискриминант

    if ( d<0 )
        return []; // нет корней

    if ( d==0 )
        return [ -b/(2*a) ]; // один корень

    var x1=(-b+Math.sqrt(d))/(2*a);
    var x2=(-b-Math.sqrt(d))/(2*a);
    return [ x1, x2 ]; // два корня
  }

  function squareRootsTests() {

    console.log('тест 1,1,1 -> нет корней');
    var roots=squareRoots(1,1,1);
    console.log( (roots.length==0)?'пройден':'НЕ ПРОЙДЕН!' )

    console.log('тест 1,-2,-3 -> два корня 3,-1');
    var roots=squareRoots(1,-2,-3);
    console.log( ((roots.length==2)&&(roots[0]==3)&&(roots[1]==-1))?'пройден':'НЕ ПРОЙДЕН!' )

    console.log('тест -1,-2,15 -> два корня -5,3');
    var roots=squareRoots(-1,-2,15);
    console.log( ((roots.length==2)&&(roots[0]==-5)&&(roots[1]==3))?'пройден':'НЕ ПРОЙДЕН!' )

    console.log('тест 1,12,36 -> один корень -6');
    var roots=squareRoots(1,12,36);
    console.log( ((roots.length==1)&&(roots[0]==-6))?'пройден':'НЕ ПРОЙДЕН!' )

    console.log('тест 0,5,-10 -> один корень 2');
    var roots=squareRoots(0,5,-10);
    console.log( ((roots.length==1)&&(roots[0]==2))?'пройден':'НЕ ПРОЙДЕН!' )
}

function ttt() {

  var a=Number(prompt('Введите a'));
  var b=Number(prompt('Введите b'));
  var c=Number(prompt('Введите c'));
  var roots=squareRoots(a,b,c);

  if ( !roots.length )
      alert('корней нет!');
  else if ( roots.length==1 )
      alert('один корень: '+roots[0]);
  else
      alert('два корня: '+roots[0]+' и '+roots[1]);
}

if (btnTask) {
  btnTask.addEventListener('click', (event) => {
    ttt();
  });
}

if (btnTaskTest) {
  btnTaskTest.addEventListener('click', (event) => {
    squareRootsTests();
  });
}

})();





/*


var testArr = [
            {
                h: { a:5, b:{b1:6,b2:7}, c:[33,22], d:null, e:undefined, f:Number.NaN },
                tests: {
                    "h1===h2": false,
                    "h1.a===h2.a": true,
                    "h1.b===h2.b": false,
                    "h1.b.b1===h2.b.b1": true,
                    "h1.c===h2.c": false,
                    "h1.c[0]===h2.c[0]": true,
                    "h1.d===h2.d": true,
                    "h1.e===h2.e": true,
                    "isNaN(h2.f)": true,
                    "h2.c instanceof Array": true
                }
            }
        ];

        for (var i = 0; i < testArr.length; i++) {
            var a = testArr[i].a;
            var tests = testArr[i].tests;
            var b = deepCopy(a);

            console.log("TEST " + (i+1));
            console.log(a); 
            for (var k in tests) {
                console.log("тест " + (eval(k)===tests[k] ? " пройден " : " НЕ ПРОЙДЕН!") + " "+ k + " будет " + tests[k]);
            }
        }


*/
