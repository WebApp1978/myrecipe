import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut} from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyC7MI_jaZfCZwGn8nzGEgDw60wjkA-Ivng",
    authDomain: "test-script-27e3c.firebaseapp.com",
    projectId: "test-script-27e3c",
    storageBucket: "test-script-27e3c.firebasestorage.app",
    messagingSenderId: "606340762693",
    appId: "1:606340762693:web:0a858eb6e6adb7dec8e72c",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();



let email = document.getElementById('email');
    onAuthStateChanged(auth, (user) => {
        if (user) {
            email.innerText = user.email;
            console.log(user.displayName)
        } else {
        }
    });

const button = document.querySelector('button');
button.addEventListener('click', (e) => {
    
    signOut(auth).then(() => {
        window.location.href = '../index.html'
    }).catch((error) => {

    });

})


