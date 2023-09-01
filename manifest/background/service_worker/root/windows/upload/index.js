import { initializeApp } from "/lib/firebase/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "/lib/firebase/firebase-auth.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "/lib/firebase/firebase-storage.js";

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
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on("state_changed",
        (snapshot) => {
            // Observe state change events such as progress, pause, and resume
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            
            window.document.getElementsByTagName("progress")[0].value = snapshot.bytesTransferred;
            window.document.getElementsByTagName("progress")[0].max = snapshot.totalBytes;
        },
        (error) => {
            // Handle unsuccessful uploads
        },
        () => {
            // Handle successful uploads on complete
            // For instance, get the download URL: https://firebasestorage.googleapis.com/...
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                window.document.body.innerHTML = `<a href="${downloadURL}">${downloadURL}</a>`;
            });
        }
    );
});
