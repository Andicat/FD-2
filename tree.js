'use strict';

//======================================TREE==================================
/*
Разработайте функцию или класс, который умеет отображать структуры данных в виде дерева.
Получает два аргумента:
1. Аргумент-хэш data вида:
{ name: "tree", type:"FOLDER", children: [
    { name: "folder1", type:"FOLDER", children: [] },
    { name: "folder2", type:"FOLDER", children: [
            { name: "folder21", type:"FOLDER", children: [
                    { name: "file211", type:"FILE" },
                    { name: "file212", type:"FILE" },
                    { name: "file213", type:"FILE" },
                ] },
            { name: "folder22", type:"FOLDER", children: [] },
        ] },
    { name: "folder3", type:"FOLDER", children: [
            { name: "file31", type:"FILE" },
        ] },
] }
т.е. содержит узлы типа FOLDER либо FILE.
Отображается дерево вида: http://fe.it-academy.by/Examples/tree.png
В левой части - только FOLDER-узлы, в правой - только FILE-узлы.
Каждый узел FOLDER, если содержит подузлы FOLDER, может быть сложен или разложен нажатием 
на стрелочку слева (на скриншоте узел folder1 не содержит подузлов FOLDER, folder2 разложен, folder3 содержит подузлы FOLDER и сложен).
Может быть разложено одновременно несколько FOLDER-веток.
При выборе FOLDER-узла мышью:
 - он раскладывается, если это для него возможно;
 - в правой части отображаются его дочерние FILE-узлы, если такие есть.
2. Аргумент renderFunc. Сама функция либо класс НЕ ЗНАЮТ, как рисовать каждый элемент дерева - какими тегами, какими стилями.
Это знает передаваемая функция renderFunc. Ей передаётся один из узлов дерева data (и решите что ещё надо), 
она возвращает хэш с информацией о том, что и как надо отрендерить (например, созданный DOM-элемент со стилями и содержимым).
*/

(function () {

    try {
        var blockTree = document.querySelector('.tree');
        var btnTree = blockTree.querySelector('.tree__button');
        var cntTree = blockTree.querySelector('.tree__container');
    } catch {
        return;
    }

    class Tree {

        constructor(tree,func) {
            this.tree = tree;
            this.func = func;
        }


        render(cnt) {

            function renderNode(renderFunc,node) {
                var nodeElem  = renderFunc(node);
                var children = node['children'];
                if (!children) {
                    return nodeElem;
                }
                children.forEach(child => {
                    var childElem = renderNode(renderFunc,child);
                    nodeElem.appendChild(childElem);
                });
                return nodeElem;
            };

            var domTree  = renderNode(this.func,this.tree);
            cnt.appendChild(domTree);
        }
    }

    btnTree.addEventListener('click', function() {
        var treeData = { name: "tree", type:"FOLDER", children: [
                        { name: "folder1", type:"FOLDER", children: [] },
                        { name: "folder2", type:"FOLDER", children: [
                            { name: "folder21", type:"FOLDER", children: [
                                { name: "file211", type:"FILE" },
                                { name: "file212", type:"FILE" },
                                { name: "file213", type:"FILE" },
                            ] },
                            { name: "folder22", type:"FOLDER", children: [] },
                        ] },
                        { name: "folder3", type:"FOLDER", children: [
                            { name: "file31", type:"FILE" },
                        ] },
                    ] };

        var renderFunc = function (node) {
            var elem =  document.createElement(node.type==="FOLDER"?"div":"span");
            elem.style.width = "100px";
            elem.style.height = "10px";
            elem.style.backgroundColor = "red";
            return elem;
        };
        
        var tree = new Tree(treeData,renderFunc);
        tree.render(cntTree);
    });

})();
