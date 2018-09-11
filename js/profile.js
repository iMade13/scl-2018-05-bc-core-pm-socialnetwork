let currentUser = '';
let fullProfile = '';
window.onload = () => {
    firebase.auth().onAuthStateChanged(user => {
        if (user) {
            currentUser = firebase.auth().currentUser
            let params = new URLSearchParams(document.location.search.substring(1));
            let userKey = params.get("user");
            firebase.database().ref(`users/${currentUser.uid}`)
                .once('value')
                .then((user) => {
                    fullProfile = user.val()
                    $('.displayName').html(`${fullProfile.displayName}`)
                    $('.imagen').html(`<img class="" width="30" src="${fullProfile.photoUrl}">`)
                    mostrarPublicaciones()
                })
                .catch((error) => {
                    console.log("Database error > " + JSON.stringify(error));
                });
            if (userKey == null) {
                showProfile(currentUser.uid)
            } else {
                showProfile(userKey)
            }
        }
    });
}
showProfile = (userKey) => {
        firebase.database().ref(`users/${userKey}`)
            .once('value')
            .then((user) => {
                userName.innerText = user.val().displayName
                userEmail.innerText = user.val().email
                rol.value = user.val().rol
                country.value = user.val().pais
                photo.innerHTML += ` 
            <img class="profile-photo" width="150" src="${user.val().photoUrl}">`
                console.log(user.val().displayName);
            })
            .catch((error) => {
                console.log("Database error > " + JSON.stringify(error));
            });
    if (userKey != currentUser.uid) {
        enabledRol.style.display = 'none';
        enabledCountry.style.display = 'none';
    }
    }

    // cada vez que se cambia el rol se actualiza en la base de datos
rol.addEventListener("change", function() {
    firebase.database().ref(`users/${currentUser.uid}`).update({ rol: rol.value });
});
// cada vez que se cambia el pais se actualiza en la base de datos
country.addEventListener("change", function() {
    firebase.database().ref(`users/${currentUser.uid}`).update({ pais: country.value });
});
// para activar el input del rol y que se pueda editar
enabledRol.addEventListener("click", function() {
    rol.disabled = false;
});
// para activar el input del pais y que se pueda editar
enabledCountry.addEventListener("click", function() {
    country.disabled = false;
});
sendMessage = () => {
    msnOk.style.display = 'block';
    let time = new Date().toLocaleString()
    let params = new URLSearchParams(document.location.search.substring(1));
    let userKey = params.get("user");
    firebase.database().ref(`users/${userKey}`) //ref es la ruta para llegar a los datos
        .once('value')
        .then((user) => {
            const newMsnSendKey = firebase.database().ref().child(`users/${currentUser.uid}/messages-send/${userKey}/`).push().key;
            firebase.database().ref(`users/${currentUser.uid}/messages-send/${userKey}/${newMsnSendKey}`).update({ destino: user.val().displayName, mensaje: messageText.value, time: time });

        })
        .catch((error) => {
            console.log("Database error > " + JSON.stringify(error));
        });

    const newMsnReceivedKey = firebase.database().ref().child(`users/${userKey}/messages-received/${currentUser.uid}/`).push().key;
    firebase.database().ref(`users/${userKey}/messages-received/${currentUser.uid}/${newMsnReceivedKey}`).update({ remitente: currentUser.displayName, mensaje: messageText.value, time: time });

}