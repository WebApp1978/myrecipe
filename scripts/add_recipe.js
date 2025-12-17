import { initializeApp } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-app.js";
import { getFirestore, serverTimestamp, setDoc, arrayUnion, collection, addDoc, getDoc, doc, updateDoc } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-firestore.js"
import { getAuth, onAuthStateChanged, signOut, updateProfile } from "https://www.gstatic.com/firebasejs/12.5.0/firebase-auth.js";
//import { getDatabase, ref, set, push } from 'https://www.gstatic.com/firebasejs/12.5.0/firebase-database.js'

const firebaseConfig = {
  apiKey: "AIzaSyC7MI_jaZfCZwGn8nzGEgDw60wjkA-Ivng",
  authDomain: "test-script-27e3c.firebaseapp.com",
  projectId: "test-script-27e3c",
  storageBucket: "test-script-27e3c.firebasestorage.app",
  messagingSenderId: "606340762693",
  appId: "1:606340762693:web:0a858eb6e6adb7dec8e72c",
  databaseURL: "https://test-script-27e3c-default-rtdb.firebaseio.com/",

  //firestoreURL: "https://firestore.googleapis.com/v1/projects/js-project-55157/databases/(default)/documents"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//const db_realtime = getDatabase(app);
const db = getFirestore(app);
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    // userId = uid;
    // console.log(auth.currentUser)
  }
});

let categoryGlobal = ''



const listCategory = [
  'Pierwsze dania', 'Drugie dania', 'Ryby', 'Przystawki', 'Salatki',
  'Ciastka','Desery', 'Drozdiowe', 'Inne'
]
const listUrlImg = [
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true',
  'https://github.com/Bombel1234/source/blob/main/photo/generated_image.png?raw=true'
]
const container_scroll = document.getElementById('box-scroll')
container_scroll.classList.add('box-scroll')

function createBoxCategory(data) {
  for (let index = 0; index < data.length; index++) {
    const element = data[index];
    const url_img = listUrlImg[index];

    const item = document.createElement('div');
    item.classList.add('card')
  
    const img = document.createElement('img');
    img.src = url_img

    const p_title = document.createElement('p');
    p_title.innerText = element;
    p_title.classList.add('header-bottom')

    const btn = document.createElement('button');
    btn.innerText = 'Dodaj Przepis';
    btn.classList.add('App-button');
    btn.addEventListener('click', e=>{
      clickButton(element)
    })
    
    item.appendChild(img)
    item.appendChild(p_title);
    item.appendChild(btn) 
    container_scroll.appendChild(item)
  }
  
}

createBoxCategory(listCategory)

function clickButton(name_category) {
    dialog_add_recipe.style.display = 'block'
    categoryGlobal = name_category;
}

// const buttons = document.querySelectorAll('.App-button');
// buttons.forEach(button => {
//   button.addEventListener('click', function () {
//     dialog_add_recipe.style.display = 'block'
//     // Находим родительскую карточку текущей кнопки
//     const card = this.closest('.card');
//     // Находим текст внутри карточки
//     const cardText = card.querySelector('.header-bottom').textContent;
//     // Выводим текст в консоль

//     category = cardText;

//   });
// });

const dialog_add_recipe = document.getElementById('dialog')

const form = document.querySelector('form');
form.onsubmit = async (e) => {
  e.preventDefault();
  let name_recipe = form.input1.value;
  let text_recipe = form.input2.value;
  const userId = auth.currentUser.uid;
  if (name_recipe && text_recipe) {

    const newRecipe = {
      title: name_recipe.toLowerCase(),
      text: text_recipe,
      supportText: 'Support Text',
      category: categoryGlobal
    };
    save_recipe_base(userId, newRecipe)
  }
  else{
    dialog_add_recipe.style.display = 'none';
  }
  

}


// 1. Добавление документа с автоматически сгенерированным ID
async function save_recipe_base(userId, recipeData) {

  //----------//
  try {
    // Получаем ссылку на коллекцию /users/{userId}/recipes
    const recipesCollectionRef = collection(db, "users", userId, "recipes");

    // Добавляем новый документ в эту коллекцию с автоматическим ID
    const docRef = await addDoc(recipesCollectionRef, {
      ...recipeData,
      createdAt: serverTimestamp() // Добавляем метку времени создания на стороне сервера
    });
    showSnackbar('Przepis dodano!!!')
    return docRef.id; // Возвращает ID нового рецепта

  } catch (e) {
    showSnackbar('Error!!! Wystapil blad')
    throw e; // Пробрасываем ошибку для дальнейшей обработки
  }
}

// Эта функция вызывается при клике на кнопку в HTML
function showSnackbar(message) {
  
  // 1. Получаем элемент snackbar
  const snackbar = document.getElementById("snackbar");

  // Опционально: Обновляем текст сообщения, если передан новый
  if (message) {
    snackbar.textContent = message;
  }
  
  // 2. Добавляем класс .show, который запускает CSS-анимацию
  snackbar.classList.add("show");
  
  // 3. Удаляем класс .show через 3 секунды (3000ms), 
  // чтобы окно снова скрылось и можно было показать его еще раз
  setTimeout(function(){ 
    snackbar.classList.remove("show"); 
    dialog_add_recipe.style.display = 'none';
    setTimeout(function(){
        window.location.href = 'home.html'
    }, 1000)
  }, 3000); // 3000 миллисекунд = 3 секунды
}


