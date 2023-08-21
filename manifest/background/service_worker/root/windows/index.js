import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js"
import { getAuth } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js"
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js"

const app = initializeApp(PRIVATE.firebaseConfig);

app.auth().onAuthStateChanged(function (user) {
    if (user) {
        console.log("user is signed in")
    } else {
        console.log("user is not signed in")
    }
});