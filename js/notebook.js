
 /*
save_nb = function() {
    chrome.storage.sync.set({ 'notebook': $('#nbarea').val() }, function() {});
}
*/

load_nb = function(result) {
    $('#nbarea').val(result);
}

$("#nbarea").keyup(function() {
    save_nb();
});