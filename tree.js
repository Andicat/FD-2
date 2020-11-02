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
            function renderNode(renderFunc,node,index) {
                var nodeElem  = renderFunc(node,index);
                var children = node['children'];
                if (!children) {
                    return nodeElem;
                }
                children.forEach((child,i) => {
                    var childElem = renderNode(renderFunc,child,index+(i+1));
                    nodeElem.appendChild(childElem);
                });
                return nodeElem;
            };

            var domTree  = renderNode(this.func,this.tree,"1");
            cnt.appendChild(domTree);
        }
    }

    //btnTree.addEventListener('click', function() {
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

        var renderFunc = function (node,index) {
            if (node.type==="FOLDER") {
                var elem =  document.createElement("ul");
                var input = document.createElement("input");
                input.setAttribute("type","checkbox");
                input.setAttribute("name",node.name);
                input.setAttribute("id",index);
                elem.appendChild(input);
                var label = document.createElement("label");
                label.setAttribute("for",index);
                label.textContent = node.name;
                elem.appendChild(label);
                elem.classList.add("tree__node");
                elem.classList.add("tree__folder");
                return elem;
            };

            if (node.type==="FILE") {
                var elem =  document.createElement("li");
                elem.textContent = node.name;
                elem.classList.add("tree__node");
                elem.classList.add("tree__file");
                return elem;
            }
            
        };
        
        var tree = new Tree(treeData,renderFunc);
        tree.render(cntTree);
    //});

})();
