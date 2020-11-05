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
        var cntTreeFolders = blockTree.querySelector('.tree__folders');
        var cntTreeFiles = blockTree.querySelector('.tree__files');
    } catch {
        return;
    }

    class Tree {

        constructor(tree,func) {
            this.tree = tree;
            this.func = func;
        }

        render() {

            cntTreeFolders.innerHTML = "";
            cntTreeFiles.innerHTML = "";

            function renderNode(renderFunc,node,indexParent,index,isChild,cnt) {
                var cntParent = (node.type==="FOLDER")?(isChild?cnt:cntTreeFolders):cntTreeFiles;
                var dataIndex = (node.type==="FOLDER")?(indexParent + index):indexParent;
                var children = node['children'];
                if (!children) {
                    var nodeElem  = renderFunc(node,dataIndex,isChild,false);
                    cntParent.appendChild(nodeElem);
                    return;
                }
                var isParent = false;
                children.forEach((child,i) => {
                    if (child.type==="FOLDER") {
                        isParent = true;
                    }
                });
                var nodeElem  = renderFunc(node,dataIndex,isChild,isParent);
                cntParent.appendChild(nodeElem);
                children.forEach((child,i) => {
                    renderNode(renderFunc,child,dataIndex,i+1,true,nodeElem.lastChild);
                });
                return;
            };

            renderNode(this.func,this.tree,"","1",false);
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

        var renderFunc = function (node,index,isChild,isParent) {
            if (node.type==="FOLDER") {
                var elem =  document.createElement(isChild ? "li" : "div");
                elem.classList.add("tree__node");
                elem.classList.add("tree__folder");
                elem.setAttribute("data-id","tree-" + index);

                if (isParent) {
                    //строка с картинкой, названием и упр.элементом
                    var nodeCnt = document.createElement("div");
                    nodeCnt.classList.add("tree__node-name");

                    var input = document.createElement("input");
                    input.setAttribute("type","checkbox");
                    input.setAttribute("name",node.name);
                    input.setAttribute("id","tree-" + index);
                    input.addEventListener("change",toggleFolder);
                    nodeCnt.appendChild(input);
                                        
                    var label = document.createElement("label");
                    label.setAttribute("for","tree-" + index);
                    nodeCnt.appendChild(label);
                    
                    var folderName = document.createElement("span");
                    folderName.textContent = node.name;
                    folderName.addEventListener("click",activateFolder);
                    nodeCnt.appendChild(folderName); 
                    
                    elem.appendChild(nodeCnt);
                    
                    //список для дочерних элементов
                    var ul = document.createElement("ul");
                    ul.classList.add("tree__node-children");
                    elem.appendChild(ul);    
                } else {
                    var folderName = document.createElement("span");
                    folderName.textContent = node.name;
                    folderName.addEventListener("click",activateFolder);
                    elem.appendChild(folderName);        
                }
            };

            if (node.type==="FILE") {
                var elem = document.createElement("span");
                elem.classList.add("tree__file");
                elem.setAttribute("data-id","tree-" + index);
                elem.textContent = node.name;
            }
            return elem;
        };

        function toggleFolder(evt) {
            var folderNode = evt.target.closest(".tree__folder");
            if (folderNode.classList.contains("tree__folder--open")) {
                folderNode.classList.remove("tree__folder--open");
                var openFolders = folderNode.querySelectorAll(".tree__folder--open");
                openFolders.forEach( f => {f.classList.remove("tree__folder--open")});
            } else {
                folderNode.classList.add("tree__folder--open");
            }
            activateFolder(evt);
        }

        function activateFolder(evt) {
            var activeFolder = cntTreeFolders.querySelector(".tree__folder--active");
            if (activeFolder) {
                activeFolder.classList.remove("tree__folder--active");
                var folderIndex = activeFolder.getAttribute("data-id");
                var files = cntTreeFiles.querySelectorAll('span[data-id=\"' + folderIndex + '\"]');
                files.forEach( f => {f.style.display = ""});
            }
            activeFolder = evt.target.closest(".tree__folder");
            activeFolder.classList.add("tree__folder--active");
            var folderIndex = activeFolder.getAttribute("data-id");
            var files = cntTreeFiles.querySelectorAll('span[data-id=\"' + folderIndex + '\"]');
            files.forEach( f => {f.style.display = "block"});
        }

        var tree = new Tree(treeData,renderFunc);
        tree.render();
    });

    
    for (let char of "test") {
        // срабатывает 4 раза: по одному для каждого символа
        alert( char ); // t, затем e, затем s, затем t
      }
    

})();
