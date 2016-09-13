var config = {
    apiKey: "AIzaSyBBhR0vk7c0kAGVl0qcRaIQC04s5_P_CRQ",
    authDomain: "trailblazer-1cc82.firebaseapp.com",
    databaseURL: "https://trailblazer-1cc82.firebaseio.com",
    storageBucket: "trailblazer-1cc82.appspot.com"
};

firebase.initializeApp(config);

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

const auth = firebase.auth();

loginPassword.keyup(function() {
    if (event.keyCode == 13) {
        btnLogin.click();
    }
});

btnLogin.click(function() {
    const promise = auth.signInWithEmailAndPassword(loginEmail.val(), loginPassword.val());
    promise.catch(e => console.log(e.message));
})

btnRegister.click(function() {
    const promise = auth.createUserWithEmailAndPassword(loginEmail.val(), loginPassword.val());
    promise.catch(e => console.log(e.message));
})

btnLogout.click(function() {
    const promise = firebase.auth().signOut().then(function() {
        fromMainToLogin();
    }, function(error) {
        // An error happened.
    });

})

firebase.auth().onAuthStateChanged(user => {
    if (user) {
        console.log(user);
        userStatus = user;
        userId = userStatus.uid;
        fromLoginToMain();
    } else {
        console.log("not logged in");
        userStatus = null;
        userId = null;
        ref_mainNode = null;
        ref_taskData = null;
        ref_status = null;
    }
})

const database = firebase.database();

storageSet = function() {
    database.ref('users/' + userId + '/mainNode').set(mainNode);
    database.ref('users/' + userId + '/status').set(STATUS);
    database.ref('users/' + userId + '/taskData').set(taskData);
    database.ref('users/' + userId + '/ver').set(ver);
}

storageGet = function() {
    console.log("storageSet begin");
    database.ref('/users/' + userId + '/ver').once('value').then(function(snapshot) {
        //load directly if version correct
        if (snapshot.val() == ver) {
            loadProper();
        }
        //fallback if previous version (futureproofing only at this point)
    })
    console.log("storageSet end");
}

loadProper = function() {
    console.log("loadProper begin");
    ref_mainNode = database.ref('users/' + userId + '/mainNode');
    ref_status = database.ref('users/' + userId + '/status');
    ref_taskData = database.ref('users/' + userId + '/taskData');

    S.render();
    N.render();

    ref_mainNode.on('value', function(snapshot) {
        N.loadAll(snapshot.val());
        N.push();
        STATUS.categ = Math.min(Math.max(STATUS.categ, 0), mainNode.length - 1);

    })

    ref_status.on('value', function(snapshot) {
        //prune STATUS to eliminate incompatability
        STATUS = snapshot.val();
        STATUS.categ = Math.min(Math.max(STATUS.categ, 0), mainNode.length - 1);
        S.push();
        N.push();
    })

    ref_taskData.on('value', function(snapshot) {
        T.loadAll(snapshot.val());
    })
    console.log("loadProper end");
}
