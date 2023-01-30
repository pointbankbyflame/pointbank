/* VARIABLES */

const firebaseConfig = {
  apiKey: "AIzaSyCdPibjp4acLc3WQfE2soDAL_iVpuHXlKo",
  authDomain: "pointbank-flame.firebaseapp.com",
  projectId: "pointbank-flame",
  storageBucket: "pointbank-flame.appspot.com",
  messagingSenderId: "926385914282",
  appId: "1:926385914282:web:57b3015437468a76752bd3",
  measurementId: "G-26QQ4YH1F4"
};

/* Initialize Firebase */
const app = firebase.initializeApp(firebaseConfig);


/* Load current user */
var user = firebase.auth().currentUser;

var signMode = 'signIn';
var pagelang = localStorage.getItem("pageLang") == undefined ? 'EN' : localStorage.getItem("pageLang");
if (pagelang == 'AR') {
  changeUi();
}


/* FUNCTIONS */


function changeUi() {
  
  message.innerHTML = translate("Congratulations !, you're one of the few people who's viewing the test version right now.", pagelang);
  signout.innerHTML = translate("Signout", pagelang);
  
  if (pagelang == 'AR') {
    snackbartext.style.fontFamily = 'Almarai';
    snackbartext.style.flexDirection = "row-reverse";
    message.style.fontFamily = 'Almarai';
    signout.style.fontFamily = 'Almarai';
  } else {
    snackbartext.style.fontFamily = 'Montserrat';
    snackbartext.style.flexDirection = "row";
    message.style.fontFamily = 'Montserrat';
    signout.style.fontFamily = 'Montserrat';
  }
  
}



/* Buttons click animation */
const allbuttons = document.getElementsByClassName("button");
const buttonstouchstartcoords = new Map();

for (let i = 0; i < allbuttons.length; i++) {
  const button = allbuttons[i];
  button.addEventListener('touchstart', function(e) {
    e.preventDefault();
    buttonstouchstartcoords.set(button, [e.touches[0].pageX, e.touches[0].pageY]);
    buttonPressAnim(button, 'touch');
  }, false);
  button.addEventListener('touchend', function(e) {
    e.preventDefault();
    buttonReleaseAnim(button, 'clicked');
  }, false);
  button.addEventListener('touchcancel', function(e) {
    e.preventDefault();
    buttonReleaseAnim(button, 'canceled');
  }, false);
  button.addEventListener('touchmove', function(e) {
    e.preventDefault();
    let startPageX = buttonstouchstartcoords.get(button)[0];
    let startPageY = buttonstouchstartcoords.get(button)[1];
    if (Math.sqrt(Math.pow(e.touches[0].pageX - startPageX, 2) + Math.pow(e.touches[0].pageY - startPageY, 2)) > 10) {
      buttonReleaseAnim(button, 'canceled');
    }
  }, false);
}

function buttonPressAnim(button) {
  if (button.isreleased || button.isreleased === undefined) {
    button.isreleased = false;
    /* Do your thing */
    button.style.animationName = 'press_animation';
    button.style.animationDuration = '.5s';
    button.style.animationFillMode = 'forwards';
  }
}

function buttonReleaseAnim(button, clickstatus) {
  if (!button.isreleased) {
    button.isreleased = true;
    /* Do your thing */
    button.style.animationName = 'release_animation';
    button.style.animationDuration = '.5s';
    button.style.animationFillMode = 'forwards';
    if (clickstatus == 'clicked') onButtonClick(button);
  }
}

function onButtonClick(button) {
  document.activeElement.blur();
  if (button == signout) {
    signOut();
  }
}

function signOut() {
  snackbar(translate('Signing out...', pagelang), 'forever', true);
  firebase.auth().signOut().then(() => {
    window.location.href = "index.html";
  }).catch((error) => {
    hideSnackbar();
    snackbar(translate('An error occurred while signing out :\n', pagelang) + error.message, 2000);
  });
}