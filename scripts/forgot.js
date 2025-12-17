import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";



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
const auth = getAuth(app);

onAuthStateChanged(auth, (user) => {
    if (user) {
        const uid = user.uid;
        console.log(auth.currentUser)
    }
});
document.getElementById('reset').addEventListener('click', e => {
    const email = localStorage.getItem('email')
    sendPasswordReset(email)

})
function sendPasswordReset(emailAddress) {
    sendPasswordResetEmail(auth, emailAddress)
        .then(() => {
            // Письмо для сброса пароля успешно отправлено.
            alert(`Инструкции по сбросу пароля отправлены на адрес ${emailAddress}. Проверьте почту.`);
        })
        .catch((error) => {
            // Произошла ошибка при отправке
            const errorCode = error.code;
            const errorMessage = error.message;
            console.error("Ошибка отправки письма:", errorMessage);

            // Обработка ошибок (например, если такого пользователя не существует)
            if (errorCode === 'auth/user-not-found') {
                alert("Пользователь с таким email не зарегистрирован.");
            } else {
                alert("Произошла ошибка при отправке письма: " + errorMessage);
            }
        });
}