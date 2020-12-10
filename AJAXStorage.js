"use strict";

class AJAXStorage {

    constructor() {
        this.url = "https://fe.it-academy.by/AjaxStringStorage2.php";
        this.password = null;
        this.stringName = 'ANDREEVA_DRINKS_STORAGE';
    }

    
    store = function() {
        this.password = Math.random();
        $.ajax( {
                url : this.url, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p : this.password },
                success : lockGetReady, error : error
            }
        );
    }

    lockGetReady = function(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else {
            // нам всё равно, что было прочитано -
            // всё равно перезаписываем
            var info = {
                name : document.getElementById('IName').value,
                age : document.getElementById('IAge').value
            };
            $.ajax( {
                    url : this.url, type : 'POST', cache : false, dataType:'json',
                    data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(info), p : this.password },
                    success : updateReady, error : error
                }
            );
        }
    }

    updateReady = function(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
    }

    restoreInfo = function() {
        $.ajax(
            {
                url : this.url, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : read, error : error
            }
        );
    }

    read = function(callresult) {
        if ( callresult.error!=undefined )
            alert(callresult.error);
        else if ( callresult.result!="" ) {
            var info=JSON.parse(callresult.result);
            document.getElementById('IName').value=info.name;
            document.getElementById('IAge').value=info.age;
        }
    }

    error = function(jqXHR,statusStr,errorStr) {
        alert(statusStr + ' ' + errorStr);
    }
};
