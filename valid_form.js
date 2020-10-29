'use strict';

//======================================VALID_FORM==================================
/*
N.27 Домашнее задание VALID_FORM
Сверстать проект VALID_FORM по образцу.
Сделать валидацию вводимых значений; правила валидации продумать самостоятельно, описать их в комментариях; как минимум, пустое (начальное) значение каждого из полей должно считаться ошибочным.
При уходе с текстового поля формы или изменении чекбокса, радиогруппы, выпадающего списка — валидировать только данное поле и в случае ошибки сообщение об ошибке сразу отобразить рядом с полем (сообщения об ошибках возле остальных полей не должны стираться); позволять пользователю уйти с поля, даже если оно заполнено с ошибкой.
При попытке отправки формы — валидировать сразу все поля и отобразить сразу все сообщения об ошибках рядом с ошибочно заполненными полями; скроллировать страницу к первому ошибочно заполненному полю, фокусировать это поле.
В качестве скрипта, обрабатывающего данные формы (атрибут action тега form), можно установить https://fe.it-academy.by/TestForm.php
*/

(function () {

    try {
        var formValid = document.forms.formValid;
        if (formValid) {
            formValid.setAttribute("novalidate", "novalidate");
            formValid.addEventListener('submit', onSubmitFormValid);
          }
    } catch {
        return;
    }

    //валидация формы
    function onSubmitFormValid(evt) {
        var valid = checkValidityForm(evt.target);
        if (!valid) {
          evt.preventDefault();
          setInputCheckvalue(evt.target);
          var firstError = evt.target.querySelector('.form__error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth" });
          }
        }
      };

      function checkValidityForm(form) {
        var res = true;
        var inputs = form.querySelectorAll('[required]');
        //requiredInputs.forEach(function(input) {
        for(var i = 0; i < form.elements.length; i++) {
          if (!checkInput(form.elements[i], form)) {
            res = false;
          }
        }
        return res;
      }

      function checkInput(field, form) {
        console.log(field);
        var val = field.value;
        var res;
        switch (field.name) {
          case 'password-ver':
            var fieldPass = form.querySelector('[name=password]');
            if (fieldPass) {
              if (fieldPass.validity.valid) {
                res = (fieldPass.value === val) ? true : false;
              } else {
                res = true;
              }
            }
            break;
          case 'agr':
            res = field.checked;
            break;
          case 'tel':
            res = (val.length < field.getAttribute('minlength')) ? false : field.validity.valid;
            break;
          default:
            res = field.validity.valid;
        }
        setError(field, res);
        return res;
      }
    
      function setError(evt, result) {
        var error = evt.parentNode.querySelector('.form__error-text');
        if (result) {
          evt.parentNode.classList.remove('form__error');
        } else {
          evt.parentNode.classList.add('form__error');
        }
      }

})();
