// Initialize Firebase
let config = {
    apiKey: "AIzaSyDPFSqdmCoZbkJKY98XH2wz5D6VBJK-gBc",
    authDomain: "autenticacion-red-social-7c11b.firebaseapp.com",
    databaseURL: "https://autenticacion-red-social-7c11b.firebaseio.com",
    projectId: "autenticacion-red-social-7c11b",
    storageBucket: "autenticacion-red-social-7c11b.appspot.com",
    messagingSenderId: "953460336958"
};
firebase.initializeApp(config);
//verificar si el usuario esta conectado
window.onload = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                loggedIn.style.display = "block"
                username.innerText = user.email;
                console.log(user.displayName)
            } else {
                loggedIn.style.display = "none"
            }
            console.log("user is" + JSON.stringify(user))
        });
    }
    // Registro
function registerWithFirebase() {

    const emailValue = txtEmail.value
    const passwordValue = txtPassword.value

    firebase.auth().createUserWithEmailAndPassword(emailValue, passwordValue)
        .then(() => {
            console.log('usuario creado con exito')
        })
        .catch((error) => {
            console.log('error de firebase > codigo ' + error.message)
            document.getElementById('message').innerHTML = error.message
        })
}
// Login
function loginWithFirebase() {

    const emailValue = txtEmail.value
    const passwordValue = txtPassword.value

    firebase.auth().signInWithEmailAndPassword(emailValue, passwordValue)
        .then((e) => {
            console.log('usuario inicio sesion con exito')
            document.getElementById('message').innerHTML = e.message
        })
        .catch((error) => {
            console.log('error de firebase > codigo ' + error.message)
            document.getElementById('message').innerHTML = error.message
        })
}
// logout
function logoutWithFireBase() {
    firebase.auth().signOut()
        .then(() => {
            console.log('usuario finalizo su sesion')
        })
        .catch();
}
// login with facebook
function facebookLoginwithFireBase() {
    const provider = new firebase.auth.FacebookAuthProvider();
    provider.setCustomParameters({
        'display': 'popup'
    })
    firebase.auth().signInWithPopup(provider)
        .then(() => {
            console.log('login con facebook exitoso')
        })
        .catch((error) => {
            console.log('error de firebase > codigo ' + error.code)
            console.log('error de firebase > codigo ' + error.message)
            document.getElementById('message').innerHTML = error.message
        })
}
// login with google
function googleLoginwithFireBase() {

    let provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider).then(function(result) {
        let token = result.credential.accessToken;
        let user = result.user;
    }).catch(function(error) {
        let errorCode = error.code;
        let errorMessage = error.message;
        let email = error.email;
        let credential = error.credential;
    });
}