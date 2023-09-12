import { initializeApp } from "/lib/firebase/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "/lib/firebase/firebase-auth.js";
import { getStorage, ref, listAll, getDownloadURL } from "/lib/firebase/firebase-storage.js";

const app = initializeApp(PRIVATE.firebaseConfig);

const auth = getAuth();
let USER = null;
onAuthStateChanged(auth, (user) => {
    if (user) {
        USER = user;
        listFiles();
    } else {
        signIn();
    }
});

function signIn() {
    signInAnonymously(auth)
        .catch((error) => {
            alert(error.message);
        });
}

function listFiles() {
    const storageRef = getStorage(app, PRIVATE.firebaseStorageBucket);
    const listRef = ref(storageRef, USER["uid"]);
    listAll(listRef)
        .then((res) => {
            res.items.forEach((itemRef) => {
                console.log(itemRef);
                const file = document.createElement("a");
                getDownloadURL(itemRef).then((downloadURL) => {
                    file.href = downloadURL;
                }).catch((error) => {
                    alert(error.message);
                });
                file.innerText = itemRef.name;
                window.document.body.querySelector("div.files").appendChild(file);
            });
        })
        .catch((error) => {
            alert(error.message);
        });
}
