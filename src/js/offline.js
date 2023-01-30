var pagelang = localStorage.getItem("pageLang") == undefined ? 'EN' : localStorage.getItem("pageLang");
if (pagelang == 'AR') {
  changeUi();
}

function changeUi() {
  if (pagelang == 'AR') {
    message.innerHTML = 'أنت حاليا غير متصل بالأنترنت'
  } else {
    message.innerHTML = "You are currently offline"
  }
}