tutCurrentSlide = 1;

initIntro = function() {
    console.log("initIntro begin");
    tutCurrentSlide = 1;
    introCategs = [
        [["Work", false], ["Client communication", false], ["Sales", false], ["Next meeting", false], ["Professional dev", false]],
        [["School", false], ["Math", false], ["English", false], ["Physics", false], ["Chemistry", false]],
        [["Lifestyle", false], ["Sleep", false], ["Clean", false], ["Meditate", false], ["Exercise", false]],
        [["Learning", false], ["Foreign Language", false], ["Technology", false], ["Code", false], ["News", false]] ,
        [["Culture", false], ["Drawing", false], ["Sculpting", false], ["Music", false]],
        [["Finances", false], ["Investing", false], ["Budgeting", false], ["Debt", false]],
        [["Social", false], ["Clubs", false], ["Church", false], ["Chat", false]]
    ]

    $("#tutorial_page").fadeIn(200);
    $("#tut_1").fadeIn(200);
    $("#tut_2").hide();
    $("#tut_3").hide();
    $("#tut_4").hide();
    $("#tut_5").hide();
    console.log("initIntro end");
}

introCategs = [
    [["Work", false], ["Client communication", false], ["Sales", false], ["Next meeting", false], ["Professional dev", false]],
    [["School", false], ["Math", false], ["English", false], ["Physics", false], ["Chemistry", false]],
    [["Lifestyle", false], ["Sleep", false], ["Clean", false], ["Meditate", false], ["Exercise", false]],
    [["Learning", false], ["Foreign Language", false], ["Technology", false], ["Code", false], ["News", false]] ,
    [["Culture", false], ["Drawing", false], ["Sculpting", false], ["Music", false]],
    [["Finances", false], ["Investing", false], ["Budgeting", false], ["Debt", false]],
    [["Social", false], ["Clubs", false], ["Church", false], ["Chat", false]]
]

renderIntro2 = function(){
    ReactDOM.render(
        <IntroCategPage data={introCategs} />,
        document.getElementById('introSelection')
    );
}

introNext = function() {
    tutCurrentSlide++;
    if (tutCurrentSlide <= 5){
        $("#tut_" + (tutCurrentSlide - 1)).fadeOut(200, function() {
            $("#tut_" + tutCurrentSlide).fadeIn(200)
        });
        switch (tutCurrentSlide){
            case 2: renderIntro2();
            break;
            case 3: pushIntroCategsToMain();
        }
    }
    else {
        if (mainNode.length == 0) {
            mainNode.push({
                name: "Group 1",
                data: []
            });
        };
        $("#tutorial_page").fadeOut(200);
        N.saveAll();
        N.render();
        setTimeout(N.push(), 200);
    }
}

introCategClick = function(p, c){
    introCategs[p][c][1] = !introCategs[p][c][1];
    renderIntro2();
}

pushIntroCategsToMain = function(){
    mainNode = [];
    for (var i in introCategs){
        if (introCategs[i][0][1]){
            //push this categ
            var k = introCategs[i];
            mainNode.push({
                name: k[0][0],
                data: []
            });

            for (var ii = 1; ii < k.length; ii ++){
                if (k[ii][1]){
                    var _id = N.nextId();
                    N.arrayD(mainNode.length-1).push(N.create({ "name": k[ii][0], "id": _id }));
                }
            }
        }
    }
}

IntroCategPage = React.createClass({
    render: function() {
        return ( 
            <div id = "introCategPage" > {
                this.props.data.map(function(child, i) {
                    return <IntroCateg key = {i} id = {i} data = {child}/>
                })
            }
            </div>)
    }
});

IntroCateg = React.createClass({
    render: function() {
        var pID = this.props.id;
        var cName = "introCateg";
        if (this.props.data[0][1])
            cName += " expand"
        console.log(pID);
        var inner = this.props.data.map(function(child, i) {
                        return <IntroItem key = {i} parentId = {pID} id = {i} data = { child }/>;
                    })


        return ( 
            <ul className = {cName} id = { this.props.id }>
                {inner}   
            </ul>
        )
    }
})

IntroItem = React.createClass({
    render: function(){
        var p = this.props.parentId;
        var c = this.props.id;
        var cName = (this.props.id != 0 && this.props.data[1]) ? "selected" : "";
        return (
            <li className = {cName} onClick = {function(){introCategClick(p, c)}}>
                {this.props.data[0]}
            </li>
            )
    }
})