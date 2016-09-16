/**
 * BASE.js
 * for (more or less) independent, utility functions
 */

//returns string for button class based on "ticked"
bToCClass = function(ticked) {
    if (ticked) {
        return 'but_green';
    }
    return 'but_orange';
}


setBaseOnclicks = function() {
    $('#greypage').click(returnToMain);
    $('#reset_btn').click(N.evalAll);
    $('#settings').click(openSettings);
}

//returns first item in array with id "i"
findById = function(arr, i) {
    return arr[findIndexById(arr, i)];
}

//returns index of item in arr that has id "i"
findIndexById = function(arr, i) {
    index = arr.findIndex(x => x.id == i)
    return index;
}

//returns JSON text of _node
JSONexport = function(_node) {
    var returnText = JSON.stringify(_node);
    return returnText;
}

//returns object parsed from JSON string
JSONimport = function(string) {
    return JSON.parse(string);
}

//clamps num between min and max
clampNum = function(min, num, max){
     return Math.min(Math.max(num, min), max);
}

//wipes all local data to default
resetLocalData = function() {
    STATUS = {
        "categ": 0,
        "subpageId": -1,
        "subMode": false,
        "settingsMode": false,
        "settings": {
            "tasksNB": false
        }
    };

    mainNode = [
        { "name": "Group 1", "data": [] }
        /*,
            { "name": "Hobbies", "data": [] },
            { "name": "Habits", "data": [] }*/
    ];
}
