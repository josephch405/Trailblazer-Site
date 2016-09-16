/**
 * PARAM.js
 * for (more or less) static objects
 */

/**
 * Styling object for colors, lines, partition styles
 * @type {Object}
 */

ver = 1;

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

/**
 * Status object for tracking user states
 * @type {Object}
 */
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
    /*,
        { "name": "Hobbies", "data": [] },
        { "name": "Habits", "data": [] }*/
];
