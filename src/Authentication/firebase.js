import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/database';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDkXQtPaZ1la_0TGQbK8JBGqew_-oGN7os",
    authDomain: "task-management-628c8.firebaseapp.com",
    databaseURL: "https://task-management-628c8-default-rtdb.firebaseio.com", 
    projectId: "task-management-628c8",
    storageBucket: "task-management-628c8.appspot.com",
    messagingSenderId: "896582133685",
    appId: "1:896582133685:web:705ad4e740a8de7b7f1bfc",
    measurementId: "G-L9YS1VRBSJ"
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = app.auth();
export const database = app.database(); 
export const storage = app.storage(); 

export default app; 