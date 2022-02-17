
function checkNumber(e) {
  !isNaN(e)?1:0;
}

$('.d input').attr('type','date');
$('.g input').attr('type','email');
$('.n input').attr('type','number').attr("min",0);

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

