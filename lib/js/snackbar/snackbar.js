snackbarcontainer = document.createElement('div');
snackbarlayout = document.createElement('div');
snackbartext = document.createElement('div');
snackbarcontainer.style = 'pointer-events: none; position: fixed; left: 0; top: 0; width: 100%; height: 100%; padding: 0; z-index: 1';
snackbarlayout.style = 'position: absolute; bottom: 10px; left: 2%; right: 2%; width: 96%; background-color: #ffffff; box-shadow: 0px 0px 15px #ffffff;border-radius: 15px;';
snackbartext.style = "position: relative; left: 20px; color: black; width: 90%; height: 100%; display: flex; align-items: center; padding-top: 16px; padding-bottom: 16px; font-family: 'Montserrat'; white-space: pre-line; overflow-wrap: anywere";
snackbarlayout.appendChild(snackbartext);
snackbarcontainer.appendChild(snackbarlayout);
document.body.appendChild(snackbarcontainer);
snackbarlayout.style.display = 'none';
var _snackbar_timeout_id = 0;
var snackbarimportant = false;
var snackbardur = 2000;
var snackbarcolor = '#00bcd4', snackbarshadowcolor = 'rgba(255, 255, 255, 0.7)', snackbartextcolor = 'white';
var snackbaranim = new ValueAnimator();
snackbaranim.setduration(500);
function setsnackbarcolor(color) {
  snackbarcolor = color;
  snackbarlayout.style.backgroundColor = color;
}
function setsnackbarshadowcolor(color) {
  snackbarshadowcolor = color;
}
function setsnackbartextcolor(color) {
  snackbartextcolor = color;
  snackbartext.style.color = color;
}
snackbarshown = false;
function hideSnackbar() {
  if (!snackbarshown) {return}
  snackbarshown = false;
  clearTimeout(_snackbar_timeout_id);
  snackbaranim.setrange(0, 1);
  snackbaranim.setinterpolator(new AnticipateInterpolator());
  snackbaranim.start();
  snackbaranim.onend = function(){};
}
function snackbar(txt, dur, important) {
  snackbarshown = true;
  snackbarimportant = important;
  snackbardur = dur === 0 || dur === null || dur === undefined ? 2000 : dur;
  snackbarcontainer.style.pointerEvents = 'none';
  snackbarcontainer.style.backgroundColor = 'transparent';
  if (snackbarimportant) {
    snackbarcontainer.style.pointerEvents = 'all';
  }
  snackbarlayout.style.display = 'block';
  snackbartext.innerHTML = txt;
  clearTimeout(_snackbar_timeout_id);
  snackbaranim.setlisteners([function(frac, time) {
    if (snackbarimportant) {
    snackbarcontainer.style.backgroundColor = 'rgba(0, 0, 0, '.concat((1-frac)*0.8 > 0.8 ? 0.8 : (1-frac)*0.8).concat(')');
    }
    snackbarlayout.style.transform = "translateY(".concat(100 * frac).concat("%)");
    snackbarlayout.style.opacity = 1 - frac;
    snackbarlayout.style.bottom = 10*(1-frac) + 'px';
    snackbarlayout.style.boxShadow = "0px 2px ".concat(15 * (0.7 - frac*0.7)).concat("px " + snackbarshadowcolor);
  }]);
  snackbaranim.setrange(1, 0);
  snackbaranim.setinterpolator(new OvershotInterpolator());
  snackbaranim.start();
  snackbaranim.onend = function() {
  if (snackbardur !== 'forever') {
    _snackbar_timeout_id = setTimeout(hideSnackbar, snackbardur);
  }
  };
}