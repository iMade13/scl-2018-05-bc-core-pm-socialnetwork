//Para colocar imagenes y nombres 
let currentUser = '';
let fullProfile = '';
window.onload = () => {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                mostrarPublicaciones()
                currentUser = firebase.auth().currentUser
                firebase.database().ref(`users/${currentUser.uid}`)
                    .once('value')
                    .then((user) => {
                        fullProfile = user.val()
                        $('.displayName').html(`${fullProfile.displayName}`)
                        $('.imagen').html(`<img class="" width="30" src="${fullProfile.photoUrl}">`)

                    })
                    .catch((error) => {
                        console.log("Database error > " + JSON.stringify(error));
                    });
            }
        });
    }
    //Publicaciones
publicar = () => {
    let comments = document.getElementById('comment').value;
    if (comments == '') {
        alert('Ingrese un texto')
    } else {
        let time = new Date().toLocaleString()
        const photoFile = file.files[0];
        if (photoFile != undefined) {

            const photoFileName = photoFile.name
            const task = firebase.storage().ref('images').child(photoFileName).put(photoFile);
            task.then(snapshot => snapshot.ref.getDownloadURL())
                .then(url => {
                    urlPhoto = url
                    console.log('URL del archivo > ' + url);
                    const newPost2Key = firebase.database().ref().child(`posts`).push().key;
                    firebase.database().ref(`posts/${newPost2Key}`).update({ contenido: comments, likes: 0, user: currentUser.displayName, userUid: currentUser.uid, time: time, imageUrl: url });
                });
            document.getElementById('comment').value = '';
        } else {
            const newPost2Key = firebase.database().ref().child(`posts`).push().key;
            firebase.database().ref(`posts/${newPost2Key}`).update({ contenido: comments, likes: 0, user: currentUser.displayName, userUid: currentUser.uid, time: time });
            document.getElementById('comment').value = '';
        }
    }
}
mostrarPublicaciones = () => {
    console.log(fullProfile)
    contentPublicaciones.innerHTML = ''
    let profileUserPost = ''
    firebase.database().ref(`posts`).limitToLast(5).orderByChild("time").on('child_added', (post) => {
        let userKeyPost = post.val().userUid
        firebase.database().ref(`users/${userKeyPost}`)
            .once('value')
            .then((user) => {
                profileUserPost = user.val()
                contentPublicaciones.innerHTML += `
     <div class="row postTop" >
         <div class="col-auto foto">
           <a href="" class="commentName mr-0"><img class="profile-comment" width="30" src="${profileUserPost.photoUrl}"></a>
         </div>
         <div class="col-9">
           <h4>${profileUserPost.displayName}</h4>
           <h6>${profileUserPost.rol}</h6>
         </div>
     </div> `
                if (post.val().imageUrl != undefined) {
                    contentPublicaciones.innerHTML += ` 
    <div class="row postImageDiv">
        <div class="col">
             <img class="img-post" src="${post.val().imageUrl}">
        </div> 
    </div> `
                }
                contentPublicaciones.innerHTML += ` 
    <div class="row">   
        <div class="col" id="cont">
            <textarea id="post${post.key}" class="col-12 col-md-12" style="height: ${post.val().contenido.length}px" disabled>${post.val().contenido}</textarea>
         <div class="caja-botones d-flex justify-content-between align-items-center">
          <span>${post.val().time}</span>
          <span><i class="fas fa-thumbs-up iconPost" onclick="like('${post.key}')"></i>  ${post.val().likes}</span>
          <i class="far fa-edit iconPost" id="edit${post.key}" onclick="editPost('${post.key}')"></i>
          <i class="far fa-trash-alt iconPost" id="delete${post.key}" onclick="deletePost('${post.key}')"></i>
        </div>
        </div>
    </div>
    <div class="row"> 
     <div class="col">
       
        </div>
    </div>
  `;
                if (userKeyPost != currentUser.uid) {
                    let editIconId = 'edit' + post.key
                    let editIcon = document.getElementById(editIconId)
                    editIcon.style.display = 'none';

                    let deleteIconId = 'delete' + post.key
                    let deleteIcon = document.getElementById(deleteIconId)
                    deleteIcon.style.display = 'none';
                }
            })
            .catch((error) => {
                console.log("Database error > " + JSON.stringify(error));
            });
    })
}
editPost = (keyPost) => {
    let inputId = 'post' + keyPost
    let input = document.getElementById(inputId)
    input.disabled = false;
    input.addEventListener("change", function() {
        firebase.database().ref(`posts/${keyPost}`).update({ contenido: input.value });
    });
}
deletePost = (keyPost) => {
    let confirmar = confirm("Estas seguro");
    if (confirmar == true) {
        firebase.database().ref(`posts/${keyPost}`).remove()
        mostrarPublicaciones()
    }
}
like = (keyPost) => {
    let postRef = firebase.database().ref(`posts/${keyPost}`)
    postRef.once('value').then((post) => {
        let postLikes = (post.val().likes) + 1
        postRef.update({ likes: postLikes });
    })
    mostrarPublicaciones()
}

module.export = publicar;