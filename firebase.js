  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-app.js";
  import { getFirestore, collection, 
    addDoc, getDocs, onSnapshot,
deleteDoc, doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/9.16.0/firebase-firestore.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  const firebaseConfig = {
    apiKey: "AIzaSyAALMBoQXw_asmTWTVYwoz1cok4ORB61YQ",
    authDomain: "listadetareas-40284.firebaseapp.com",
    projectId: "listadetareas-40284",
    storageBucket: "listadetareas-40284.appspot.com",
    messagingSenderId: "106196546627",
    appId: "1:106196546627:web:f998cc8945ea91369c10f6"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const db = getFirestore();

  export const guardarTarea = (titulo, fecha) =>
    addDoc(collection(db, 'Tareas'), {titulo: titulo, fecha: fecha})
  

    export const obtenerTareas = () => getDocs(collection(db, 'Tareas'))

    export const onGetTasks = (callback) => onSnapshot(collection(db, 'Tareas'), callback)

    export const borrarTarea = (id) => deleteDoc(doc(db, 'Tareas', id));

    export const obtenerTarea = id => getDoc(doc(db, 'Tareas', id))

    export const editarTarea = (id, newFields) => updateDoc(doc(db, 'Tareas', id), newFields)