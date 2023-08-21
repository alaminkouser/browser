import { initializeApp } from "/lib/firebase/firebase-app.js";
import { getAuth, onAuthStateChanged, signInAnonymously } from "/lib/firebase/firebase-auth.js";

const app = initializeApp(PRIVATE.firebaseConfig);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        console.log("user is signed in");
    } else {
        console.log("user is signed out");
    }
});

function signIn() {
    // anonymous sign in
    signInAnonymously(auth)
        .then(() => {
            console.log("signed in");
        })
        .catch((error) => {
            console.log(error);
        });
}
