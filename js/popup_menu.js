'use strict';

//======================================POPUP_MENU==================================
/*
E3+
Создать проект POPUP_MENU.
Разработать функцию или класс формирования горизонтального меню с выпадающими при поднесении мыши подменю.
Меню должно динамически строиться по предоставленному массиву с пунктами.
Массив может быть произвольным, тестировать можно на следующем массиве:
var menu=[
  {name:'Пункт 1',submenu:
    [
      {name:'Пункт 1.1',submenu:
        [
          {name:'Пункт 1.1.1',url:'http://www.tut.by'},
          {name:'Пункт 1.1.2 длинный',url:'http://www.tut.by'}
        ]
      },
      {name:'Пункт 1.2',url:'http://www.tut.by'},
      {name:'Пункт 1.3 длинный',submenu:
        [
          {name:'Пункт 1.3.1',url:'http://www.tut.by'},
          {name:'Пункт 1.3.2',url:'http://www.tut.by'},
          {name:'Пункт 1.3.3',url:'http://www.tut.by'},
          {name:'Пункт 1.3.4 длинный',url:'http://www.tut.by'}
        ]
      }
    ]
  },
  {name:'Пункт 2 длинный',url:'http://www.tut.by'},
  {name:'Пункт 3',submenu:
    [
      {name:'Пункт 3.1 длинный',url:'http://www.tut.by'},
      {name:'Пункт 3.2',url:'http://www.tut.by'}
    ]
  }
];
Пример, как может выглядеть горизонтальное меню с выпавшими вертикальными подменю двух уровней:
http://fe.it-academy.by/Examples/popup_menu.png
*/

(function () {

    try {
        var blockDynMenu = document.querySelector('.popup-menu');
        var btnCreate = blockDynMenu.querySelector('.popup-menu__button');
        var cntMenu = blockDynMenu.querySelector('.popup-menu__container');
    } catch {
        return;
    }

    class Menu {

      constructor(arr,cnt,cls) {
        this.arr = arr;
        this.cnt = cnt;
        this.cls = cls;
      };
      
      createMenu = function () {

        function create (menuElemArr,cnt,clsName,isSubmenu) {
          var ul = document.createElement("ul");
          ul.classList.add(clsName + "__list");
          if (isSubmenu) {
            ul.classList.add(clsName + "__list--sub");
          }
          menuElemArr.forEach( function(el) {
            var li = document.createElement("li");
            li.classList.add(clsName + "__item");
            if (el.url) {
                var link = document.createElement("a");
                link.setAttribute("href",el.url);
                link.textContent = el.name;
                li.appendChild(link);
            }
            if (el.submenu) {
                li.textContent = el.name;
                var submenu = create(el.submenu,li,clsName,true);
                li.appendChild(submenu);
                if (isSubmenu) {
                  submenu.classList.add(clsName + "__list--sub-second");
                }   
                li.addEventListener("mouseover", function(el) {
                  submenu.classList.add(clsName + "__list--show");
                });
                li.addEventListener("mouseleave", function(el) {
                  submenu.classList.remove(clsName + "__list--show");
                });
            }
            ul.appendChild(li);
          });
          return ul;
        };

        this.cnt.appendChild(create(this.arr,this.cnt,this.cls));
      }
    }

    btnCreate.addEventListener('click', (event) => {
        var menu = [
            {name:'Пункт 1',submenu:
              [
                {name:'Пункт 1.1',submenu:
                  [
                    {name:'Пункт 1.1.1',url:'http://www.tut.by'},
                    {name:'Пункт 1.1.2 длинный',url:'http://www.tut.by'}
                  ]
                },
                  {name:'Пункт 1.2',url:'http://www.tut.by'},
                  {name:'Пункт 1.3 длинный',submenu:
              [
                {name:'Пункт 1.3.1',url:'http://www.tut.by'},
                {name:'Пункт 1.3.2',url:'http://www.tut.by'},
                {name:'Пункт 1.3.3',url:'http://www.tut.by'},
                {name:'Пункт 1.3.4 длинный',url:'http://www.tut.by'}
                ]
                    }
                ]
            },
            {name:'Пункт 2 длинный',url:'http://www.tut.by'},
            {name:'Пункт 3',submenu:
                [
                {name:'Пункт 3.1 длинный',url:'http://www.tut.by'},
                {name:'Пункт 3.2',url:'http://www.tut.by'}
                ]
            }
        ];

        cntMenu.innerHTML = "";
        var newMenu = new Menu(menu,cntMenu,"popup-menu");
        newMenu.createMenu();

    });
})();
