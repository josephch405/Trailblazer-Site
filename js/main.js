/**
 *TRAIBLAZER - Tracks Work, Hobbies, Habits, and Tasks
 *2016 Jo Chuang
 */

//external packages
_ = require('lodash');
React = require('react');
ReactDOM = require('react-dom');
firebase = require("firebase");

//internal packages for organization
require("./params.js");
require("./base.js");
require("./fbase.js")
require("./tree.js");
require("./task.js");
require("./notebook.js");
require("./settings.js");
require("./save.js");
require("./bgCanvas.js");
require("./intro.js");



//deletes card with ID/sub ID, then SAVES
delete_card = function(_id) {
    var done = false;

    //TODO: optimize search
    for (var t in mainNode) {
        var _array = mainNode[t];
        for (var i in _array) {
            if (_array[i].id == _id.toString()) {
                _array.splice(i, 1);
                done = true;
            }
        }
    }

    if (!done && _id.split("-").length > 1) {
        var _parentId = N.parentId(_id);
        var _parent = N.find(_parentId);
        for (var i in _parent.children) {
            if (_parent.children[i].id == _id) {
                _parent.children.splice(i, 1);
                done = true;
            }
        }
    }

    N.saveAll();
}

//pushes nodeArray(input) to main board, attaches tooltips
pushCategToBoard = function(_categ) {
    if (_categ != STATUS.categ) {
        $('#categ_' + (_categ + 1)).toggleClass("top_");
        $('#categ_' + (_categ + 1)).toggleClass("top_s");
        $('#categ_' + (STATUS.categ + 1)).toggleClass("top_");
        $('#categ_' + (STATUS.categ + 1)).toggleClass("top_s");
        STATUS.categ = _categ;
    }

    N.pushMain()
    attachTooltips();
}

//opens settings subpage
openSettings = function() {
    greypage(true);
    settingsPage(true);
    STATUS.settingsMode = true;
}

//opens category subpage
openCat = function() {
    greypage(true);
    catPage(true);
    STATUS.catMode = true;
}

//expands card and opens "subpage" subpage
expand_card = function(_id) {
    greypage(true);
    subpage(true);
    STATUS.subMode = true;
    STATUS.subpageId = _id;
    N.push();
}


//handle logout event
fromMainToLogin = function() {
    resetLocalData();
    N.push();
    $("#login_page").show();
    loginEmail.val("");
    loginPassword.val("");
}

//clears all subpage types and greypage, pushes categ according to STATUS, SAVES
returnToMain = function() {
    greypage(false);
    subpage(false);
    settingsPage(false);
    catPage(false);

    STATUS.subMode = false;
    STATUS.settingsMode = false;
    STATUS.catMode = false;

    N.push();
    N.saveAll();
}

//attaches tooltips to all boxes
attachTooltips = function() {
    $(".box>.box").tooltip(tooltipStyle);
}

//sets on/off greypage display
greypage = function(_in) {
    if (_in) {
        $("#greypage").css("display", "block");
    } else {
        $("#greypage").css("display", "none");
    }
}

//sets on/off subpage display
subpage = function(_in) {
    if (_in) {
        $("#cup_sub_page").removeClass("hidden_top");
        $("#cup_sub_page").addClass("hidden_top_reveal");
    } else {
        $("#cup_sub_page").removeClass("hidden_top_reveal");
        $("#cup_sub_page").addClass("hidden_top");
    }
}

//sets on/off settings display
settingsPage = function(_in) {
    if (_in) {
        $("#settings_sub_page").removeClass("hidden_top");
        $("#settings_sub_page").addClass("hidden_top_reveal");
    } else {
        $("#settings_sub_page").removeClass("hidden_top_reveal");
        $("#settings_sub_page").addClass("hidden_top");
    }
}

//sets on/off categ editor display
catPage = function(_in) {
    if (_in) {
        $("#cat_sub_page").removeClass("hidden_top");
        $("#cat_sub_page").addClass("hidden_top_reveal");
    } else {
        $("#cat_sub_page").removeClass("hidden_top_reveal");
        $("#cat_sub_page").addClass("hidden_top");
    }
}

$("#bar_bottom").tooltip(tooltipStyle);

$(window).load(function() {
    $("#loading_cover").fadeOut("slow");
});

setBaseOnclicks();