const firebaseConfig = {
    apiKey: "AIzaSyCdPibjp4acLc3WQfE2soDAL_iVpuHXlKo",
    authDomain: "pointbank-flame.firebaseapp.com",
    projectId: "pointbank-flame",
    storageBucket: "pointbank-flame.appspot.com",
    messagingSenderId: "926385914282",
    appId: "1:926385914282:web:57b3015437468a76752bd3",
    measurementId: "G-26QQ4YH1F4"
  };

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Load current user
var user = firebase.auth().currentUser;

// If there is no authentication, then we send the user to auth page
setTimeout(function() {
    firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          window.location.href = "main.html";
        } else {
          window.location.href = "auth.html";
        }
      });
  }, 6000);