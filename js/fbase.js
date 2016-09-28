//
//  FBASE
//  All things Firebase Related
//

//
//  VARIABLES
//

var config = {
    apiKey: "AIzaSyBBhR0vk7c0kAGVl0qcRaIQC04s5_P_CRQ",
    authDomain: "trailblazer-1cc82.firebaseapp.com",
    databaseURL: "https://trailblazer-1cc82.firebaseio.com",
    storageBucket: "trailblazer-1cc82.appspot.com"
};

loginEmail = $("#loginEmail");
loginPassword = $("#loginPassword");
const btnLogin = $("#btnLogin");
const btnRegister = $("#btnRegister");
const btnLogout = $("#btnLogout");

userStatus = null;
userId = null;

ref_mainNode = null;
ref_taskData = null;
ref_status = null;

firebase.initializeApp(config);
const auth = firebase.auth();
const database = firebase.database();

//
//  DOM PREPPING FUNCTIONS
//

loginPassword.keyup(function() {
    if (event.keyCode == 13) {
        btnLogin.click();
    }
});
btnLogin.click(function() {
    const promise = auth.signInWithEmailAndPassword(loginEmail.val(), loginPassword.val());
    promise.catch(e => alert(e.message));
})
btnRegister.click(function() {
    const promise = auth.createUserWithEmailAndPassword(loginEmail.val(), loginPassword.val());
    promise.catch(e => alert(e.message));
})
btnLogout.click(function() {
    const promise = firebase.auth().signOut().then(function() {
        fromMainToLogin();
    }, function(error) {
        // An error happened.
    });

})

//
//  STATE FUNCTIONS
//

//listens to firebase login change, then either starts logging in or out
firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        userStatus = user;
        userId = userStatus.uid;
        $("#login_page").hide();
        storageGet();
    } else {
        console.log("not logged in");
        userStatus = null;
        userId = null;
        ref_mainNode = null;
        ref_taskData = null;
        ref_status = null;
    }
})

//sets all firebase storage according to current user state
storageSet = function() {
    database.ref('users/' + userId + '/mainNode').set(mainNode);
    database.ref('users/' + userId + '/status').set(STATUS);
    database.ref('users/' + userId + '/taskData').set(taskData);
    database.ref('users/' + userId + '/nbData').set(nbData);
    database.ref('users/' + userId + '/ver').set(ver);
}

//determines whether to start introduction (new user), load properly (typical), 
//or update storage format (if user ver < current)
storageGet = function() {
    console.log("storageSet begin");
    database.ref('/users/' + userId + '/ver').once('value').then(function(snapshot) {
        //load directly if version correct
        if (snapshot.val() == ver) {
            loadProper();
        }
        //load this to start introduction
        else{
            initIntro();
        }
        //fallback if previous version (futureproofing only at this point)
    })
    console.log("storageSet end");
}

//loads data from database into user state, pushes accordingly
//links storage change listeners
loadProper = function() {
    console.log("loadProper begin");
    ref_mainNode = database.ref('users/' + userId + '/mainNode');
    ref_status = database.ref('users/' + userId + '/status');
    ref_taskData = database.ref('users/' + userId + '/taskData');
    ref_nbData = database.ref('users/' + userId + '/nbData');

    S.render();
    N.render();

    ref_mainNode.on('value', function(snapshot) {
        N.loadAll(snapshot.val());
        N.push();
        STATUS.categ = clampNum(0, STATUS.categ, mainNode.length - 1);
    })

    ref_status.on('value', function(snapshot) {
        //prune STATUS to eliminate incompatability
        STATUS = snapshot.val();
        STATUS.categ = clampNum(0, STATUS.categ, mainNode.length - 1);
        S.push();
        N.push();
    })

    ref_taskData.on('value', function(snapshot) {
        T.loadAll(snapshot.val());
    })

    ref_nbData.on('value', function(snapshot) {
        load_nb(snapshot.val());
    })

    console.log("loadProper end");
}
