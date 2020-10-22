'use strict';

//======================================DYN_FORM==================================
/*
N.23 Домашнее задание DYN_FORM
Создать проект DYN_FORM. Разработать функцию, которая в переданном ей теге <form> 
динамически строит элементы формы по переданному ей массиву.
Вызвать эту функцию дважды с указанными ниже массивами, чтобы она построила 
на веб-странице две формы по указанным ниже образцам. 
Точном соответствия внешнего вида форм образцам добиваться не обязательно.
В качестве скрипта, обрабатывающего данные форм (атрибут action тега form), 
можно указывать https://fe.it-academy.by/TestForm.php
*/

(function () {

    try {
        var blockDynForms = document.querySelector('.dyn-form');
        var btnCreate = blockDynForms.querySelector('.dyn-form__button');
        var cntForm = blockDynForms.querySelector('.dyn-form__container');
    } catch {
        return;
    }

    //строим форму динамически
    function createForm(form,elemArr, formName) {
        form.setAttribute("name",formName);
        form.setAttribute("action","https://fe.it-academy.by/TestForm.php");
        form.setAttribute("method","post");
               
        elemArr.forEach( function(el) {
            switch(el.kind) {
                case "longtext":
                    var fieldset = document.createElement("fieldset");
                    
                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);

                    var input = document.createElement("input");
                    input.setAttribute("type","text");
                    input.setAttribute("name",el.name);
                    input.setAttribute("id",el.name);
                    fieldset.appendChild(input);
                    
                    form.appendChild(fieldset);
                    break;
                case "shorttext":
                    var fieldset = document.createElement("fieldset");
                    
                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);

                    var input = document.createElement("input");
                    input.setAttribute("type","text");
                    input.setAttribute("name",el.name);
                    input.setAttribute("id",el.name);
                    input.setAttribute("class",el.kind);
                    fieldset.appendChild(input);
                    
                    form.appendChild(fieldset);
                    break;
                case "number":
                    var fieldset = document.createElement("fieldset");

                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);

                    var input = document.createElement("input");
                    input.setAttribute("type","number");
                    input.setAttribute("name",el.name);
                    input.setAttribute("id",el.name);
                    fieldset.appendChild(input);
                    
                    form.appendChild(fieldset);
                    break;
                case "combo":
                    var fieldset = document.createElement("fieldset");
                    
                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);

                    var select = document.createElement("select");
                    select.setAttribute("name",el.name);
                    select.setAttribute("id",el.name);
                    el.variants.forEach( function(v) {
                        var option = document.createElement("option");
                        option.textContent = v.text;
                        option.setAttribute("value",v.value);
                        select.appendChild(option);
                    });
                    fieldset.appendChild(select);

                    form.appendChild(fieldset);
                    break;
                case "radio":
                    var fieldset = document.createElement("fieldset");

                    var legend = document.createElement("legend");
                    legend.textContent = el.label;
                    fieldset.appendChild(legend);
                    
                    el.variants.forEach( function(v) {
                        var radio = document.createElement("input");
                        radio.setAttribute("type","radio");
                        radio.setAttribute("name",el.name);
                        radio.setAttribute("id",v.value);
                        radio.setAttribute("value",v.value);
                        fieldset.appendChild(radio);
                        
                        var label = document.createElement("label");
                        label.textContent = v.text;
                        label.setAttribute("for",v.value);
                        fieldset.appendChild(label);
                    });

                    form.appendChild(fieldset);
                    break;
                case "check":
                    var fieldset = document.createElement("fieldset");
                    
                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);
                    
                    var check = document.createElement("input");
                    check.setAttribute("type","checkbox");
                    check.setAttribute("name",el.name);
                    check.setAttribute("id",el.name);
                    fieldset.appendChild(check);

                    form.appendChild(fieldset);
                    break;
                case "memo":
                    var fieldset = document.createElement("fieldset");
                    
                    var label = document.createElement("label");
                    label.textContent = el.label;
                    label.setAttribute("for",el.name);
                    fieldset.appendChild(label);
                    
                    var textarea = document.createElement("textarea");
                    textarea.setAttribute("name",el.name);
                    textarea.setAttribute("id",el.name);
                    textarea.setAttribute("rows","5");
                    fieldset.appendChild(textarea);

                    form.appendChild(fieldset);
                    break;
                case "submit":
                    var button = document.createElement("button");
                    button.setAttribute("type","submit");
                    button.textContent = el.label;
                    form.appendChild(button);
                    break;
                default:
                    break;
            }
        });
        cntForm.appendChild(form);
    }

    btnCreate.addEventListener('click', (event) => {
        var formDef1 = [
            {label:'Название сайта:',kind:'longtext',name:'sitename'},
            {label:'URL сайта:',kind:'longtext',name:'siteurl'},
            {label:'Посетителей в сутки:',kind:'number',name:'visitors'},
            {label:'E-mail для связи:',kind:'shorttext',name:'email'},
            {label:'Рубрика каталога:',kind:'combo',name:'division',
            variants:[{text:'здоровье',value:1},{text:'домашний уют',value:2},{text:'бытовая техника',value:3}]},
            {label:'Размещение:',kind:'radio',name:'payment',
            variants:[{text:'бесплатное',value:1},{text:'платное',value:2},{text:'VIP',value:3}]},
            {label:'Разрешить отзывы:',kind:'check',name:'votes'},
            {label:'Описание сайта:',kind:'memo',name:'description'},
            {label:'Опубликовать',kind:'submit'},
        ];
        var formDef2 = [
            {label:'Фамилия:',kind:'longtext',name:'lastname'},
            {label:'Имя:',kind:'longtext',name:'firstname'},
            {label:'Отчество:',kind:'longtext',name:'secondname'},
            {label:'Возраст:',kind:'number',name:'age'},
            {label:'Зарегистрироваться',kind:'submit'},
        ];
        cntForm.innerHTML = "";
        
        var form1 = document.createElement("form");
        createForm(form1,formDef1,"form1");

        var form2 = document.createElement("form");
        createForm(form2,formDef2,"form2");
    });

})();
