'use strict';
  
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
  return age;
}

function isOnRest (age, isMale) {
  var ageForRest = isMale ? 65 : 60;
  return (age>=ageForRest ? true : false);
}

if (btnAnketa) {
  btnAnketa.addEventListener('click', (event) => {
	var lastName = getName("Введите вашу фамилию");
	var firstName = getName("Введите ваше имя");
	var patrName = getName("Введите ваше отчество");
	var age = getAge("Введите ваш возраст");
	var isMale = confirm("Выберите ваш пол: \n - Нажмите \"Ок\", если вы мужчина \n - Нажмите \"Отмена\", если вы женщина!") ? true : false;
	var result = "ваше ФИО: " + lastName + " " + firstName + " " + patrName + "\n"
				+ "ваш возраст в годах: " + age + "\n"
				+ "ваш возраст в днях: " + (age*365) + "\n"
				+ "через 5 лет вам будет: " + (age+5) + "\n"
				+ "ваш пол: " + (isMale ? "мужчина" : "женщина") + "\n"
				+ "вы на пенсии: " + (isOnRest(age, isMale) ? "да" : "нет");
	alert(result);
	});
}
