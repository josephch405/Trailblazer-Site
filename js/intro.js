tutCurrentSlide = 1;

initIntro = function() {
    console.log("initIntro begin");
    $("#tutorial_page").fadeIn(200);
    $("#tut_1").fadeIn(200);
    $("#tut_2").hide();
    $("#tut_3").hide();
    $("#tut_4").hide();
    $("#tut_5").hide();
    console.log("initIntro end");
}

introNext = function() {
    if (tutCurrentSlide < 5)
        $("#tut_" + tutCurrentSlide).fadeOut(200, function() {
            $("#tut_" + (tutCurrentSlide + 1)).fadeIn(200)
        });
    else {
        if (mainNode.length == 0) {
            mainNode.push({
                name: "Group 1",
                data: []
            });
        };
        N.saveAll();
        N.render();
        $("#tutorial_page").fadeOut(200);
    }
    tutCurrentSlide++;

}
