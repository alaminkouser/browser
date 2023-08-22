import { initializeApp } from "/lib/firebase/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "/lib/firebase/firebase-auth.js";
import { getStorage, ref, uploadBytes } from "/lib/firebase/firebase-storage.js";

let USER = null;
const app = initializeApp(PRIVATE.firebaseConfig);
const storage = getStorage();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        USER = user;
        console.log("user is signed in");
    } else {
        signIn();
    }
});

function signIn() {
    signInAnonymously(auth)
        .then(() => {
            console.log("signed in");
        })
        .catch((error) => {
            console.log(error);
        });
}

window.document.getElementById("file").addEventListener("change", (event) => {
    const file = event.target.files[0];
    const storageRef = ref(storage, USER.uid + "/" + file.name);
    uploadBytes(storageRef, file).then((snapshot) => {
        console.log('Uploaded a blob or file!');
      });
})
