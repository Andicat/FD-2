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
            var requiredInputs = formValid.querySelectorAll('[required]');
            var paymentRadio = formValid.elements.payment;
          }
    } catch {
        return;
    }

    //валидация при уходе с поля
    requiredInputs.forEach (function(field) {
        var event = (field.nodeName==="SELECT" || field.type==="checkbox") ? "change" : "blur";
        field.addEventListener(event, f => checkInput(f.target));
    });

    //валидация радио-кнопок оплаты
    paymentRadio.forEach(function(v) {
        v.addEventListener("change", f => setError(v, true));
    });

    //валидация формы при отправке
    function onSubmitFormValid(evt) {
        var valid = checkValidityForm(evt.target);
        if (!valid) {
          evt.preventDefault();
          var firstError = evt.target.querySelector('.form__error');
          if (firstError) {
            firstError.scrollIntoView({ behavior: "smooth" });
            var input = firstError.querySelector('[required]');
            if (input) {
                input.focus();
            }
          }
        }
      };

      function checkValidityForm(form) {
        var res = true;
        //проверим обязательные текстовые поля
        var requiredInputs = form.querySelectorAll('[required]');
        requiredInputs.forEach(function(input) {
            if (!checkInput(input, form)) {
            res = false;
            }
        });
        
        //проверим радио-кнопки оплаты
        if (!checkRadio(paymentRadio)) {
            res = false;
        };
        return res;
      }

      //проверка радио-кнопки
      function checkRadio(field) {
        var paymentIsChecked = false;
        field.forEach(function(v) {
            if (v.checked) {
                paymentIsChecked = true;
            }
        });
        setError(field[0], paymentIsChecked);
        return paymentIsChecked;
      }

      //проверка текстового поля на валидность
      function checkInput(field) {
        var val = field.value;
        var res;
        switch (field.name) {
          case 'develop':
            res = (val.length === 0) ? false : true;  
            break;
        case 'sitename':
            res = (val.length === 0) ? false : true;  
            break;
        case 'siteurl':
            res = (val.length === 0) ? false : true;  
            break;
        case 'date-start':
            res = field.validity.valid;  
            break;
        case 'visitors':
            res = (Number(val) <= 0) ? false : true;  
            break;
        case 'email':
            res = (val.length === 0) ? false : true;  
            break;
        case 'division':
            res = (val === "1") ? false : true;  
            break;
        case 'votes':
            res = field.checked;
            break;
          case 'description':
            res = (val.length === 0 ) ? false : true;
            break;
          default:
            true;
        }
        setError(field, res);
        return res;
      }
    
      //устанавливаем или убираем ошибку
      function setError(evt, result) {
        if (result) {
          evt.parentNode.classList.remove('form__error');
        } else {
          evt.parentNode.classList.add('form__error');
        }
      }

})();
