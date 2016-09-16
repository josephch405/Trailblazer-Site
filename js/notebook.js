nbData = "";

load_nb = function(result) {
	nbData = result;
    $('#nbarea').val(result);
}

$("#nbarea").keyup(function() {
	nbData = $('#nbarea').val();
    storageSet();
});