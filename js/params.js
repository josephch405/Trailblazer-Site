/**
 * PARAM.js
 * for (more or less) static objects
 */

ver = 1;

//Styling object for colors, lines, partition styles

tooltipStyle = {
    position: {
        my: 'center bottom',
        at: 'center top'
    },
    track: false,
    show: {
        effect: "toggle"
    },
    hide: {
        effect: "toggle"
    }
}

STATUS = {
    "categ": 0,
    "subpageId": -1,
    "subMode": false,
    "settingsMode": false,
    "settings": {
        "tasksNB": false,
        "activeBG": true
    }
};

mainNode = [
    { "name": "Group 1", "data": [] }
];
