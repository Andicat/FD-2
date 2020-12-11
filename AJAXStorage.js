"use strict";

class AJAXStorage {

    _storage = {};

    constructor(stringName, storageName, storageNameRu) {
        this.url = "https://fe.it-academy.by/AjaxStringStorage2.php";
        this.stringName = stringName;
        this.storageName = storageName;
        this.storageNameRu = storageNameRu;
        this.password;
        this.read();
    }

    addValue = function (key,value) {
        this._storage[key] = value;
        this.save();
        return this;
    }

    getValue = function (key) {
        return this._storage[key];
    }

    deleteValue = function (key) {
        if (key in this._storage) {
            delete this._storage[key];
            this.save();
            return true;
        };
        return false;
    }

    getKeys = function () {
        return Object.keys(this._storage);
    }

    read = function() {
        $.ajax(
            {
                url : this.url, type : 'POST', cache : false, dataType:'json',
                data : { f : 'READ', n : this.stringName },
                success : successRead.bind(this), error : this.onError
            }
        );

        function successRead(callresult) {
            if ( callresult.error!=undefined )
                alert(callresult.error);
            else if ( callresult.result!="" ) {
                this._storage = JSON.parse(callresult.result);
                localStorage.setItem(this.storageName,JSON.stringify(this._storage));
            }
        }
    }

    save = function(info) {
        this.password = Math.random();
        $.ajax( {
                url : this.url, type : 'POST', cache : false, dataType:'json',
                data : { f : 'LOCKGET', n : this.stringName, p : this.password },
                success : lock.bind(this), error : this.onError
            }
        );

        function lock(callresult) {
            if ( callresult.error!=undefined )
                alert(callresult.error);
            else {
                $.ajax( {
                        url : this.url, type : 'POST', cache : false, dataType:'json',
                        data : { f : 'UPDATE', n : this.stringName, v : JSON.stringify(this._storage), p : this.password },
                        success : this.onUpdate.bind(this), error : this.onError
                    }
                );
            }
        }

    }

    onUpdate = function(callresult) {
        if ( callresult.error!=undefined ) {
            alert(callresult.error);
        } else {
            localStorage.setItem(this.storageName,JSON.stringify(this._storage));
        }
    }

    onError = function(jqXHR,statusStr,errorStr) {
        alert(statusStr + ' ' + errorStr);
    }
};
