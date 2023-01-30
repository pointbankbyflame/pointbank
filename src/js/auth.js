/* SOME HTML ELEMENTS */


emailicon = document.getElementById('email-icon');
lockicon = document.getElementById('lock-icon');
lockicon2 = document.getElementById('lock-icon-2');


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


/* Create google auth provider */
var gprovider = new firebase.auth.GoogleAuthProvider();


var signMode = 'signIn';
var pagelang = localStorage.getItem("pageLang") == undefined ? 'EN' : localStorage.getItem("pageLang");
if (pagelang == 'AR') {
  changeUi();
}
var canSeePass = false;


/* FUNCTIONS */



emailinput.onchange = function() {
  if (correctemail) {
    passwordinput.focus();
  }
}

passwordinput.onchange = function() {
  if (correctemail && correctpass) {
    if (signMode === 'signIn') {
     signbutton.click();
    } else {
     rewritepasswordinput.focus();
    }
  }
}

rewritepasswordinput.onchange = function() {
  if (signMode === 'signUp') {
    signbutton.click();
  }
}

correctemail = false;
correctpass = false;
correctrepass = false;
allowedtorefreshdetails = true;
var ontextchange = function() {
if (allowedtorefreshdetails) {
  value = emailinput.value;
  vspt = value.split("@");
  domain = vspt[vspt.length -1];
  vspt = domain.split(".");
  badspt = false;
  for (var i = 0; i < vspt.length; i++) {
    str = vspt[i];
    if (str.includes(' ') || str.includes('\n') || str === '') {
      badspt = true;
    }
  }
  if (value === '') {
    correctemail = false;
    emailinputdetail.innerHTML = translate("Write your Email below", pagelang);
    emailinput.style.color = '#bbbbbb';
    emailicon.style.color = '#bbbbbb';
    emailinputbox.style.border = '2px solid #bbbbbb';
    emailinputdetail.style.color = '#bbbbbb';
  } else if (!(value.includes('@'))) {
    correctemail = false;
    emailinputdetail.innerHTML = translate("\"@\" missing from your email", pagelang);
    emailinput.style.color = '#F44336';
    emailicon.style.color = '#F44336';
    emailinputbox.style.border = '2px solid #F44336';
    emailinputdetail.style.color = '#F44336';
  } else if (!(domain.includes('.')) || badspt) {
    correctemail = false;
    emailinputdetail.innerHTML = translate("Bad Email domain name", pagelang);
    emailinput.style.color = '#F44336';
    emailicon.style.color = '#F44336';
    emailinputbox.style.border = '2px solid #F44336';
    emailinputdetail.style.color = '#F44336';
  } else {
    correctemail = true;
    emailinputdetail.innerHTML = translate("Correct Email", pagelang);
    emailinput.style.color = '#4CAF50';
    emailicon.style.color = '#4CAF50';
    emailinputbox.style.border = '2px solid #4CAF50';
    emailinputdetail.style.color = '#4CAF50';
  }
  
  pass = passwordinput.value;
  passstrn = checkpassword(pass);
    if (pass.length == 0) {
      correctpass = false;
      passwordinputdetail.innerHTML = translate("Write your password below", pagelang);
      passwordinput.style.color = '#bbbbbb';
      lockicon.style.color = '#bbbbbb';
      passwordinputbox.style.border = '2px solid #bbbbbb';
      passwordinputdetail.style.color = '#bbbbbb';
    } else if (passstrn >= 0 && passstrn <= 2) {
      correctpass = false;
      passwordinputdetail.innerHTML = translate("Weak password", pagelang);
      passwordinput.style.color = '#F44336';
      lockicon.style.color = '#F44336';
      passwordinputbox.style.border = '2px solid #F44336';
      passwordinputdetail.style.color = '#F44336';
    } else if (passstrn > 2 && passstrn <= 4) {
      correctpass = true;
      passwordinputdetail.innerHTML = translate("Normal password", pagelang);
      passwordinput.style.color = '#FFC107';
      lockicon.style.color = '#FFC107';
      passwordinputbox.style.border = '2px solid #FFC107';
      passwordinputdetail.style.color = '#FFC107';
    } else {
      correctpass = true;
      passwordinputdetail.innerHTML = translate("Strong password", pagelang);
      passwordinput.style.color = '#4CAF50';
      lockicon.style.color = '#4CAF50';
      passwordinputbox.style.border = '2px solid #4CAF50';
      passwordinputdetail.style.color = '#4CAF50';
    }
    
  repass = rewritepasswordinput.value;
  if (repass === '') {
     correctrepass = false;
     rewritepasswordinputdetail.innerHTML = translate("Rewrite your password below", pagelang);
     rewritepasswordinput.style.color = '#bbbbbb';
     lockicon2.style.color = '#bbbbbb';
     rewritepasswordinputbox.style.border = '2px solid #bbbbbb';
     rewritepasswordinputdetail.style.color = '#bbbbbb';
  } else if (pass === '') {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = translate("Empty password above", pagelang);
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else if (!correctpass) {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = translate("Bad password above", pagelang);
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else if (repass !== pass) {
    correctrepass = false;
    rewritepasswordinputdetail.innerHTML = translate("Wrong password rewrite", pagelang);
    rewritepasswordinput.style.color = '#F44336';
    lockicon2.style.color = '#F44336';
    rewritepasswordinputbox.style.border = '2px solid #F44336';
    rewritepasswordinputdetail.style.color = '#F44336';
  } else {
    correctrepass = true;
    rewritepasswordinputdetail.innerHTML = translate("Correct password rewrite", pagelang);
    rewritepasswordinput.style.color = '#4CAF50';
    lockicon2.style.color = '#4CAF50';
    rewritepasswordinputbox.style.border = '2px solid #4CAF50';
    rewritepasswordinputdetail.style.color = '#4CAF50';
  }
  requestAnimationFrame(ontextchange);
}
}
requestAnimationFrame(ontextchange);

function checkpassword(password) {
  var strength = 0;
  if (password.length >= 6) {
    strength += 1;
  }
  if (password.length >= 10) {
    strength += 1;
  }
  if (password.length >= 15) {
    strength += 1;
  }
  if (password.match(/[a-z]+/)) {
    strength += 1;
  }
  if (password.match(/[A-Z]+/)) {
    strength += 1;
  }
  if (password.match(/[0-9]+/)) {
    strength += 1;
  }
  if (password.match(/[$@#&!]+/)) {
    strength += 1;
  }
  return strength;
}






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

function onButtonClick(button) {
  document.activeElement.blur();
  if (button == langchanger) {
    changeLang();
  } else if (button == signbutton) {
    signInOrUp();
  } else if (button == gbutton) {
    signInWithGoogle();
  } else if (button == changebutton) {
    changeSignMode();
  } else if (button == forgotpass) {
    restorePass();
  } else if (button == eyebutton) {
    changePassVisibility();
  }
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
  if (! button.isreleased) {
    button.isreleased = true;
    /* Do your thing */
    button.style.animationName = 'release_animation';
    button.style.animationDuration = '.5s';
    button.style.animationFillMode = 'forwards';
    if (clickstatus == 'clicked') onButtonClick(button);
  }
}







function changeLang() {
  if (pagelang == 'EN') {
    pagelang = 'AR';
  } else if (pagelang == 'AR') {
    pagelang = 'EN';
  }
  localStorage.setItem("pageLang", pagelang);
  mainlayout.style.animationName = 'fadein_animation';
  mainlayout.style.animationDuration = '.3s';
  mainlayout.style.animationFillMode = 'forwards';
  allowedtorefreshdetails = false;
  hideSnackbar();
  setTimeout(function() {
    mainlayout.style.animationName = 'fadeout_animation';
    mainlayout.style.animationDuration = '.5s';
    mainlayout.style.animationFillMode = 'forwards';
  
    changeUi();
  
  }, 300);
}

function signInOrUp() {
  if (emailinput.value === '' && passwordinput.value === '') {
    emailinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate('Write your Email and Password first to ' + signMode, pagelang), 2000);
  } else if (emailinput.value === '') {
    emailinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate('Write your Email first to ' + signMode, pagelang), 2000);
  } else if (passwordinput.value === '') {
    passwordinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate('Write your Password first to ' + signMode, pagelang), 2000);
  } else if (!correctemail || !correctpass) {
    emailinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate('Bad Email and/or Password', pagelang), 2000);
  } else if (signMode == 'signUp' && !correctrepass) {
    rewritepasswordinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    if (rewritepasswordinput.value === '') {
      snackbar(translate('Rewrite your Password first to Signup', pagelang), 2000);
    } else {
      snackbar(translate('Wrong Password Rewrite', pagelang), 2000);
    }
  } else {
    if (signMode === 'signIn') {
      snackbar(translate('Logging in...', pagelang), 'forever', true);
      firebase.auth().signInWithEmailAndPassword(emailinput.value, passwordinput.value)
        .then((userCredential) => {
          hideSnackbar();
          snackbar(translate('Welcome back, logged in successfuly with email : ', pagelang) + emailinput.value, 'forever', true);
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 4000);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          hideSnackbar();
          snackbar(translate('An error occured :\n', pagelang) + translate(errorMessage, pagelang), 5000);
          console.log(errorMessage);
        });
    } else {
      snackbar(translate('Signing up...', pagelang), 'forever', true);
      firebase.auth().createUserWithEmailAndPassword(emailinput.value, passwordinput.value)
        .then((userCredential) => {
          hideSnackbar();
          snackbar(translate('Signed up successfuly with Email : ', pagelang) + emailinput.value, 'forever', true);
          setTimeout(function() {
            window.location.href = 'index.html';
          }, 4000);
        })
        .catch((error) => {
          var errorCode = error.code;
          var errorMessage = error.message;
          hideSnackbar();
          snackbar(translate('An error occured :\n', pagelang) + translate(errorMessage, pagelang), 5000);
          console.log(errorMessage);
        });
    }
  }
}

function signInWithGoogle() {
  if (signMode === 'signIn') {
    snackbar(translate('Logging in with Google...', pagelang), 'forever', true);
  } else {
    snackbar(translate('Signing up with Google...', pagelang), 'forever', true);
  }
  firebase.auth()
    .signInWithPopup(gprovider)
    .then((result) => {
      /*
       * When google auth seccuss
       */
       
      var email = result.user.email;
      hideSnackbar();
      if (signMode == "signIn") {
        snackbar(translate('Welcome back, logged in successfuly with Gmail : ', pagelang) + email, 'forever', true);
      } else {
        snackbar(translate('Signed up successfuly with Gmail : ', pagelang) + email, 'forever', true);
      }
      setTimeout(function() {
        window.location.href = 'index.html';
      }, 4000);
    }).catch((error) => {
      
      var errorCode = error.code;
      var errorMessage = error.message;
      
      var email = error.email;
      
      var credential = error.credential;
      
      snackbar(translate("Cannot continue with Gmail : ", pagelang) + email == undefined || email == null ? "" : email + "\n" + errorMessage, 4000);
      console.log(errorMessage);
    });
    
}

function changePassVisibility() {
  if (!canSeePass) {
    canSeePass = true;
    eyebutton.innerHTML = "visibility_off";
    eyebutton.style.border = "2px solid #bbbbbb";
    eyebutton.style.background = "black";
    eyebutton.style.color = "#bbbbbb";
    eyebutton.style.padding = "10px";
    eyebutton.style.fontSize = "21px";
    passwordinput.type = "text";
    rewritepasswordinput.type = "text";
  } else {
    canSeePass = false;
    eyebutton.innerHTML = "visibility";
    eyebutton.style.border = "none";
    eyebutton.style.background = "white";
    eyebutton.style.color = "black";
    eyebutton.style.padding = "12px";
    eyebutton.style.fontSize = "25px";
    passwordinput.type = "password";
    rewritepasswordinput.type = "password";
  }
}

function changeSignMode() {
  if (signMode == 'signIn') {
    signMode = 'signUp';
  } else {
    signMode = 'signIn';
  }
  mainlayout.style.animationName = 'fadein_animation';
  mainlayout.style.animationDuration = '.3s';
  mainlayout.style.animationFillMode = 'forwards';
  allowedtorefreshdetails = false;
  hideSnackbar();
  setTimeout(function() {
    /* We scroll the page to the top then we fade out */
    window.scrollTo({top: 0});
    mainlayout.style.animationName = 'fadeout_animation';
    mainlayout.style.animationDuration = '.5s';
    mainlayout.style.animationFillMode = 'forwards';
    
    changeUi();
    
  }, 300);
}

function restorePass() {
  if (emailinput.value === '') {
    emailinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate("Write your Email above first", pagelang), 2000)
  } else if (!(correctemail)) {
    emailinputbox.scrollIntoView({behavior: "smooth", block: "end", inline: "nearest"});
    snackbar(translate("Bad written Email above", pagelang))
  } else {
    snackbar(translate("Sending password restoration Email...", pagelang));
    firebase.auth().sendPasswordResetEmail(emailinput.value)
      .then(() => {
        snackbar(translate("Password restoration Email sent successfully to :\n", pagelang) + emailinput.value + translate("\n\n\n\nPlease check your Email Inbox and search for PointBank Password Restoration Email, open it then open the provided link to change your password,      remember all that just for your account safety.", pagelang), 15000);
        setsnackbartextcolor("white");
        setsnackbarcolor("#f44336");
        setsnackbarshadowcolor("#f44336");
        setTimeout(function() {
          setsnackbartextcolor("black");
          setsnackbarcolor("#ffffff");
          setsnackbarshadowcolor("rgba(255, 255, 255, 0.7)");
        }, 16000);
      })
      .catch((error) => {
        snackbar(translate("An error occured :\n", pagelang) + translate(error.message, pagelang), 5000);
        console.log(error.message);
      });
  }
}

function changeUi() {
  /* Special case for the eye button for unknoun reason */
  
  if (signMode == "signIn") {
    eyebutton.style.marginTop = "0";
  } else {
    eyebutton.style.marginTop = "10%";
  }
  
  /* First we change texts font */
  
  if (pagelang == 'EN') {
    langchanger.style.fontFamily = 'Almarai';
    emailinputdetail.style.fontFamily = 'Montserrat';
    passwordinputdetail.style.fontFamily = 'Montserrat';
    rewritepasswordinputdetail.style.fontFamily = 'Montserrat';
    ortxt.style.fontFamily = 'Montserrat';
    fypasstxt.style.fontFamily = 'Montserrat';
    forgotpass.style.fontFamily = 'Montserrat';
    title.style.fontFamily = 'Montserrat';
    signbutton.style.fontFamily = 'Montserrat';
    othermtdstxt.style.fontFamily = 'Montserrat';
    changebutton.style.fontFamily = 'Montserrat';
    snackbartext.style.fontFamily = 'Montserrat';
    
  } else if (pagelang == 'AR') {
  
    langchanger.style.fontFamily = 'Montserrat';
    emailinputdetail.style.fontFamily = 'Almarai';
    passwordinputdetail.style.fontFamily = 'Almarai';
    rewritepasswordinputdetail.style.fontFamily = 'Almarai';
    ortxt.style.fontFamily = 'Almarai';
    fypasstxt.style.fontFamily = 'Almarai';
    forgotpass.style.fontFamily = 'Almarai';
    title.style.fontFamily = 'Almarai';
    signbutton.style.fontFamily = 'Almarai';
    othermtdstxt.style.fontFamily = 'Almarai';
    changebutton.style.fontFamily = 'Almarai';
    snackbartext.style.fontFamily = 'Almarai';
  }
  
  /* Then we translate text */
  
  allowedtorefreshdetails = true;
  try {
    requestAnimationFrame(ontextchange);
  } catch (ex) {}
  langchanger.innerHTML = translate("Change to English", pagelang == 'EN' ? 'AR' : 'EN');
  emailinputdetail.innerHTML = translate("Write your Email below", pagelang);
  passwordinputdetail.innerHTML = translate("Write your password below", pagelang);
  rewritepasswordinputdetail.innerHTML = translate("Rewrite your password below", pagelang);
  ortxt.innerHTML = translate("OR", pagelang);
  fypasstxt.innerHTML = translate("Forgot your password", pagelang);
  forgotpass.innerHTML = translate("Restore password", pagelang);
  
  
  if (pagelang == "AR") {
    snackbartext.style.flexDirection = "row-reverse";
    
    title.style.textAlign = "right";
    pointbank_logo.style.marginLeft = "auto";
    langchanger.style.float = "left";
    divider2.style.flexDirection = "row-reverse";
    emailtitlelayout.style.flexDirection = "row-reverse";
    passwordtitlelayout.style.flexDirection = "row-reverse";
    rewritepasswordtitlelayout.style.flexDirection = "row-reverse";
    emailinputdetail.style.textAlign = "right";
    passwordinputdetail.style.textAlign = "right";
    rewritepasswordinputdetail.style.textAlign = "right";
    emailinputdetail.style.paddingLeft = "0";
    emailinputdetail.style.paddingRight = "8px";
    passwordinputdetail.style.paddingLeft = "0";
    passwordinputdetail.style.paddingRight = "8px";
    rewritepasswordinputdetail.style.paddingLeft = "0";
    rewritepasswordinputdetail.style.paddingRight = "8px";
    ortxt.style.left = "0";
    ortxt.style.right = "10%";
    changebutton.style.marginRight = "auto";
    changebutton.style.marginLeft = "0";
    signbutton.style.marginRight = "auto";
    signbutton.style.marginLeft = "0";
  } else if (pagelang == "EN") {
    snackbartext.style.flexDirection = "row";
    
    title.style.textAlign = "left";
    pointbank_logo.style.marginLeft = "0";
    langchanger.style.float = "right";
    divider2.style.flexDirection = "row";
    emailtitlelayout.style.flexDirection = "row";
    passwordtitlelayout.style.flexDirection = "row";
    rewritepasswordtitlelayout.style.flexDirection = "row";
    emailinputdetail.style.textAlign = "left";
    passwordinputdetail.style.textAlign = "left";
    rewritepasswordinputdetail.style.textAlign = "left";
    emailinputdetail.style.paddingLeft = "8px";
    emailinputdetail.style.paddingRight = "0";
    passwordinputdetail.style.paddingLeft = "8px";
    passwordinputdetail.style.paddingRight = "0";
    rewritepasswordinputdetail.style.paddingLeft = "8px";
    rewritepasswordinputdetail.style.paddingRight = "0";
    ortxt.style.left = "10%";
    ortxt.style.right = "0";
    changebutton.style.marginRight = "0";
    changebutton.style.marginLeft = "auto";
    signbutton.style.marginRight = "0";
    signbutton.style.marginLeft = "auto"
  }
  
  
  if (signMode == 'signUp') {
    rewritepasswordinputbox.style.display = 'block';
    title.innerHTML = translate("Signup to continue", pagelang);
    signbutton.innerHTML = translate("Signup", pagelang);
    othermtdstxt.innerHTML = translate("Or Signup using Google", pagelang);
    changebutton.innerHTML = translate("Login", pagelang);
  } else {
    rewritepasswordinputbox.style.display = 'none';
    title.innerHTML = translate("Login to continue", pagelang);
    signbutton.innerHTML = translate("Login", pagelang);
    othermtdstxt.innerHTML = translate("Or Login using Google", pagelang);
    changebutton.innerHTML = translate("Signup", pagelang);
  }
}


