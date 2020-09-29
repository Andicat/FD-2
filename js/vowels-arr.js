'use strict';

//======================================Vowels Arr==================================
/*
Переписать VOWELS (подсчёт гласных букв в строке) без использования циклов, тремя способами:
с использованием метода массива forEach,
с использованием метода массива filter,
с использованием метода массива reduce.
*/
(function () {

  var btnTask = document.querySelector('.Vowels_arr');

  function vowelsCountForEach (str) {
    str = str.toLowerCase().split("");
    var vowels = {ё:true, у:true, е:true, ы:true, а:true, о:true, э:true, я:true, и:true, ю:true};
    var count = 0;
    
    str.forEach(function (item) {
        count = count + ((item in vowels) ? 1 : 0);
    });
    
    return count;
  }

  function vowelsCountFilter (str) {
    str = str.toLowerCase().split("");
    var vowels = {ё:true, у:true, е:true, ы:true, а:true, о:true, э:true, я:true, и:true, ю:true};
        
    var count = str.filter( v => (v in vowels)).length;
    
    return count;
  }

  
  function vowelsCountReduce (str) {
    str = str.toLowerCase().split("");
    var vowels = {ё:true, у:true, е:true, ы:true, а:true, о:true, э:true, я:true, и:true, ю:true};
    
    function fra (r,v,i,a) {
      return r + ((v in vowels) ? 1 : 0);
    }

    var count = str.reduce(fra,0);
    
    return count;
  }

  if (btnTask) {
    btnTask.addEventListener('click', (event) => {
      var testStr = prompt("Введите слово. А мы посчитаем количество русских гласных в нём.");
     
      console.log("С использованием метода массива forEach");
      var result = vowelsCountForEach(testStr);
      console.log("Количество русских гласных: " + result);

      console.log("С использованием метода массива filter");
      var result = vowelsCountFilter(testStr);
      console.log("Количество русских гласных: " + result);

      console.log("С использованием метода массива reduce");
      var result = vowelsCountReduce(testStr);
      console.log("Количество русских гласных: " + result);
    });
  }

})();
