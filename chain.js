'use strict';

//======================================Chainulator==================================
/*
B4+
Дан большой массив слов - словарь.
Написать функцию, получающую два слова, и строящую за несколько шагов из первого слова второе, за каждый шаг меняя не более одной буквы, так, чтобы на каждом шаге получалось допустимое слово (слово из словаря).
Функция должна вернуть самую короткую цепочку шагов в виде строки.
Например, при работе со следующим словарём:
["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"]
при вызове со словами "ЛИСА" и "ЛОСЬ", функция должна вернуть строку:
"ЛИСА-ЛИПА-ЛУПА-ЛУЖА-ЛОЖА-ЛОЖЬ-ЛОСЬ"
а при вызове со словами "МУХА" и "СЛОН" - строку:
"МУХА-МУРА-ТУРА-ТАРА-ПАРА-ПАРК-ПАУК-ПАУТ-ПЛУТ-ПЛОТ-СЛОТ-СЛОН"
*/

(function () {

    var blockChain = document.querySelector('.chain');

    if (!blockChain) {
        return;
    }
    var inputChainStart = blockChain.querySelector('.chain__start');
    var inputChainEnd = blockChain.querySelector('.chain__end');
    var btnChain = blockChain.querySelector('.chain__button');
    var resultChain = blockChain.querySelector('.chain__result');

    function showResult (text) {
        if (resultChain) {
            resultChain.innerHTML = text;
        }
    }

    var words = ["ЛУЖА","МУЗА","ЛИРА","МЕХА","ЛИГА","ТАРА","ЛИПА","ТУРА","ПАРК","ЛОЖЬ","ЛУПА","ПЛОТ","МУРА","ПАУК","ПАУТ","ПЛУТ","ЛОЖА","СЛОТ","ПАРА"];

    function findChain (wordStart,wordEnd,wordsArr) {

        var chains = [];

        wordStart = wordStart.toUpperCase();
        wordEnd = wordEnd.toUpperCase();
       
        //функция сравнения двух слов на похожесть (одинаковая длина и различие в одной букве).
        function compareTwo (a,b) {
            a = a.split("");
            b = b.split("");
            if (a.length!==b.length) {
                return false;
            };
            var diff = 0;
            for (var i = 0; i < a.length; i++) {
                if (a[i]!==b[i]) {
                    diff++;
                }
            }
            return (diff===1? true : false);
        }

        //функция поиска цепочек от стартового слова до конечного
        function similar(word, end, chain) {
            for (var i = 0; i < word.similar.length; i++) {
                var wordNext = wordsArr[word.similar[i]];
                if (wordNext === end) {
                    chains.push(chain.concat([word.value]).concat(wordNext.value));
                    return;
                }
                if (chain.some(v => {return v === wordNext.value})) {
                    continue;
                }
                similar(wordNext, end, chain.concat([word.value]));
            }
            return;
        };

       //1-преобразуем массив слов в массив соотношений слов между собой
        var wordsArr = words.map( v => ({value:v, similar:[]}));

        //2-добавляем стартовое и конечное слова в массив, если их там нет.
        var indexOfStart = words.indexOf(wordStart);
        if (indexOfStart < 0) {
            indexOfStart = wordsArr.push({value:wordStart, similar:[]}) - 1;
            console.log("not find, but added on " + indexOfStart);
        };
        var indexOfEnd = words.indexOf(wordEnd);
        if (indexOfEnd < 0) {
            indexOfEnd = wordsArr.push({value:wordEnd, similar:[]}) - 1;
            console.log("not find, but added on " + indexOfEnd);
        };

        //3-заполняем массив соотношений слов между собой
        for (var i = 0; i < wordsArr.length; i++) {
            for (var j = i+1; j < wordsArr.length; j++) {
                if (compareTwo(wordsArr[i].value,wordsArr[j].value)) {
                    wordsArr[i].similar.push(j);
                    wordsArr[j].similar.push(i);
                }
            }
        };

        //4-поиск возможных цепочек
        similar(wordsArr[indexOfStart],wordsArr[indexOfEnd],[]);

        //5-поиск самой короткой цепочки
        if (chains.length > 0) {
            var shortestChain = chains[0];
            for (var i = 1; i < chains.length; i++) {
                if (shortestChain.length===2) {
                    return shortestChain;
                }
                if (chains[i].length < shortestChain.length) {
                    shortestChain = chains[i];
                }
            }
            return shortestChain;
        } else {
            return null;
        }
    }

    if (btnChain) {
        btnChain.addEventListener('click', (event) => {
            var wordStart = inputChainStart.value;
            var wordEnd = inputChainEnd.value;
            if (!wordStart.length) {
                showResult("Введите начальное слово");
                return;
            };
            if (!wordEnd.length) {
                showResult("Введите конечное слово");
                return;
            };
            var res = findChain(wordStart, wordEnd, words);
            showResult("Результат: " + (res!==null ? res.join("-") : "Цепочку построить невозможно"));
        });
    }

})();
