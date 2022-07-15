var ctx = document.getElementById('myChartPolarArea').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'polarArea',
    data: {
        labels: ['Lượt xem', 'Lượt mua', 'Phản hồi','Quỹ','Người dùng'],
        datasets: [{
            title: {
                display: true,
                text: "Status"
            },
            // label: '# of Votes',
            data: [1200, 1900, 3000,2500,1003],
            backgroundColor: [
                'rgba(255, 99, 132, .6)',
                'rgba(54, 162, 235, .6)',
                'rgba(255, 206, 86, .6)',
                'rgba(255, 116, 26, .6)',
                'rgba(25, 246, 32, .6)',
            ],
        }]
    },
    options: {
        options: {
            responsive: true,
        }
    }
});
// bar ===============
var ctx = document.getElementById('myChartBar').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels:  ['Lượt xem', 'Lượt mua', 'Phản hồi','Quỹ','Người dùng'],
        datasets: [{
            label: 'Table',
            data: [120, 90, 50, 200, 300, ],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
    }
});


$(document).ready(function () {
  var select = $('.select-danhMuc').toArray();
  var liSl = $('.li').toArray();
  var inputShow = $('.i').toArray();
  var th = "";
  // show left bar
  select.forEach((e, i) => {
    $($('.sl')[i]).click(function (e) {
      $($(('.chr'))[i - 1]).toggleClass('show');
      $($('.nav-icon-down i')[i - 1]).toggleClass('fa-angle-right');
      $($('.select-danhMuc')[i]).toggleClass('addStyle');

      $($('.select-danhMuc')[i]).has('.chr').length > 0 ? $('.dir').addClass('dir2') : $('.dir').removeClass('dir2');
      $('.dir').text('');
      $('.dir1').text("/" + $(select[i]).find('.nav-title').text());

      $('.nav').removeClass('navActive');
      $('.main').removeClass('navActive');
    })
  });
  // tong quan
  $('.danhmuctong').click(function(){
    $('.container-content').addClass("hidden")
    $('.dir1').text('/Tổng quan');
    $('.tongQuan').removeClass('hidden');
    $("footer").addClass('hidden');
  })

  // show table
  function showData() {
    liSl.forEach((v, i) => {
      var t = 1;
      $(v).click(function () {
        th = "<th>" + 'STT' + "</th>";
        list_tong[i].forEach(function (v1, i1) {
          th += '<th scope="col">' + v1 + '</th>';
          t++;
        })
        $(".th").html(th);
        $(".tf").html(th);
       
        $('.tongQuan').addClass('hidden');
        $('.container-content').removeClass('hidden');
        $('.danhmuctong').removeClass('addStyle');
        $("footer").removeClass('hidden')
      })
    })
  }

  // auto change dark theme
  const toggle = document.querySelector('.toggle');
  const hours = new Date().getHours();
  toggle.checked = hours > 7 && hours < 20;
  // dark theme ======================
  const toggleSwitch = document.querySelector('#toggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);
    if (currentTheme === 'dark') {
        toggleSwitch.checked = true;
    }
}
function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
    }
}
toggleSwitch.addEventListener('change', switchTheme);
  function enableDarkMode() {
    document.body.classList.remove("light-theme");
    document.body.classList.add("dark-theme")
  }

  function enableLightMode() {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme")
  }
  
  liSl.forEach((v, i) => {
    $(v).click(function () {
      $('li').removeClass('chrFoCus');
      $($('li')[i]).addClass('chrFoCus');
      $('.i').addClass('input-show');
      $(inputShow[i]).removeClass('input-show ');
      // $(this).parent().parent().toggleClass('show');
      $('.dir2').text("/" + $(v).text());
      $('.chr .li i').addClass('far fa-arrow-alt-circle-right').removeClass('fas fa-arrow-alt-circle-right');
      $($('.chr .li i')[i]).addClass('fas fa-arrow-alt-circle-right');
      $('.chr .li i').addClass('far fa-arrow-alt-circle-right');
    })
    showData();
  })

  // title ====================
  var inputMain = $('.input-main').toArray();
  var list_tong = [];
  inputMain.forEach((v, i) => {
    let arr = $(v).find('.table-main').toArray();
    let arr2 = [];
    arr.forEach(function (v, i) {
      arr2.push(v.innerText);
    })
    list_tong.push(arr2);
    arr2 = [];
  })

  $('.nav-toggle').click(function () {
    $('.nav').toggleClass('navActive');
    $('.main').toggleClass('navActive');
    $('.nav-toggle').has('.fa-arrows-alt').length > 0 ? $('.nav-toggle i').removeClass('fa-arrows-alt') & $('.nav-toggle .fas').addClass('fa-compress') :
      $('.nav-toggle .fas').removeClass('fa-compress') & $('.nav-toggle .fas').addClass('fa-arrows-alt');
    $('.chr').removeClass('show');
    $('.select-danhMuc').removeClass("addStyle");
  })

  // click to out =====================
  $('.nav-logout').click(function () {
    bootbox.confirm({
      message: "Bạn có muốn đăng xuất không ?",
      buttons: {
        confirm: {
          label: 'Có',
          className: 'btn-success'
        },
        cancel: {
          label: 'Không',
          className: 'btn-danger'
        }
      },
      callback: function (result) {
        result == 1 ? logout() : (result = 0);
      }
    })
  })
  // click to show toggle logout
  $(document).on("click",function (e) {
    if (!$('.header-img img').is(event.target) && !$('.header-img img').has(event.target).length) {
      $('.header-select').removeClass('show-header-select');
  }
  });
  $('.header-img img').click(function () {
    $('.header-select').addClass('show-header-select');
  })
  // phân quyền ================
  function permission() {
    var datasend = {
      event: "login",
      username: localStorage.getItem("usernamebookstore"),
      password: localStorage.getItem("passwordbookstore"),
    };
    queryData("asset/php/api.php", datasend, function (data) {
      var arr = data.items;
      for (var item in arr) {
        var d = arr[item];
        $('.name-danhmuc').text(d.fullname);

        if (d.permission == 1) {
          // an del vs sua button
          $('.btndel').css('display', 'none');
          $('.btnedit').css('display', 'none');
          // an dstk
          $('.select-danhMuc').last().css('display', 'none');
          $('.title-chucVu').text('Nhân viên');
        } else if (d.permission == 2) {
          $('.btns').css('display', 'none');
          // an dstk
          $('.select-danhMuc').last().css('display', 'none');
          $('.nvdm').css('display', 'none');
          $('.ipnv').css('display', 'none');
          $('.title-chucVu').text('Người dùng');
        }
      }
    })
  }
  permission()
  buildUserDropdown()
})
// loading ==========================
window.addEventListener("load", function () {
  var load = document.querySelector('.loader');
  load.style.display = 'none'
})

function queryData(url, dataSend, callBack) {
  $.ajax({
    type: 'POST',
    url: url,
    data: dataSend,
    async: true,
    dataType: 'json',
    success: callBack
  });
}
// alert =====================
function alert_error(mes) {
  bootbox.alert({
    size: "small",
    title: "<span style='color: red'>Thất bại</span>",
    message: mes,
    callback: function () {
      /* your callback code */
    }
  });
}

function alert_success(mes, callback) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: callback
  });
}

function alert_info(mes) {
  bootbox.alert({
    size: "small",
    title: "",
    message: mes,
    callback: function () {}
  });
}

// search ==============================
function myFunctions() {
  var input, filter, table, found, tr, td, i, j, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("myTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
    td = tr[i].getElementsByTagName("td");
    for (j = 0; j < td.length; j++) {
      txtValue = td[j].innerHTML || td[j].innerText || id[j].textContent || $(td[j]).text() || $(td[j]).html();
      if (txtValue.toUpperCase().indexOf(filter) > -1) {
        found = true;
      }
    }
    if (found) {
      tr[i].style.display = "";
      // $('tfoot').css('display','none')
    } else {
      tr[i].style.display = "none";
    }
  }
}


// logout ========================
function logout() {
  location.href = "Login.html";
  localStorage.removeItem("rememberbookstore");
  localStorage.removeItem("usernamebookstore");
  localStorage.removeItem("passwordbookstore");	   
      localStorage.removeItem("userbookstore");
}
// click to show pass =====================
function myFunction() {
  var x = $('.form-content .wn')
  if (x.attr("type") == "password") {
    x.attr("type", "text");
  } else {
    x.attr("type", "password");
  }
}

// update pass
$('.changePass').click(function(){
    $('.form-content').addClass('activeForm');
    $('.passo').val("");
    $('.passn').val("");
    $('.passn2').val("");
})
$('.cancel').click(function(){
  $('.form-content').removeClass('activeForm');
})
$('.submit').click(function(){
  var passo = $('.passo').val();
  var passn = $('.passn').val();
  var passn2 = $('.passn2').val();
  if (passo==""){
    alert("Vui lòng nhập mật khẩu cũ");
    $('.passo').focus();
  } else if (passn==""){
    alert("Vui lòng nhập mật khẩu mới");
    $('.passn').focus();
  } else if (passn2==""){
    alert("Vui lòng nhập mật khẩu lại mật khẩu");
    $('.passn2').focus();
  } else if (passn != passn2) {
    alert("Mật khẩu mới không khớp")
  } else {
    var dataClient = {
      passo : passo,
      passn : passn,
      username: localStorage.getItem("usernamebookstore"),
      event: 'changePasss',
    }
    queryData("asset/php/api.php", dataClient, function (data) {
      if (data.success == 1) {
        alert_success("Đã thay đổi thành công");
        $('.form-content').removeClass('activeForm');
      } else {
        alert_info ('Không thành công. Vui lòng thử lại');
      }
    })
  }
})
// check image ==========================
function checkImg() {
  const file = document.querySelector('.input-name input[type=file]').files[0];
  const reader = new FileReader();
  var fileType = file["type"];
  var validImageTypes = ["image/gif", "image/jpeg", "image/png"];
  if ($.inArray(fileType, validImageTypes) < 0) {
    return true;
  } else {
    return false;
  }
}

//Hàm upload ảnh =============================
function initUploadAllCommon() {
  'use strict';
  var resize = new window.resize();
  resize.init();
  event.preventDefault();
  var files = event.target.files;
  for (var i in files) {
    if (typeof files[i] !== 'object') return false;
    (function () {
      resize.photo(files[i], 1200, 'file', function (resizedFile) {
        upload(resizedFile, function (res) {
          console.log(JSON.parse(res));
          upImgs(JSON.parse(res));
        });
        resize.photo(resizedFile, 600, 'dataURL', function (thumbnail) {
        });
      });
    }());
  }
}
var upload = function (photo, callback) {
  var formData = new FormData();
  formData.append('photo', photo);
  $.ajax({
    url: './asset/php/process.php',
    type: 'POST',
    data: formData,
    async: true,
    xhrFields: {
      withCredentials: true
    },
    processData: false, // tell jQuery not to process the data
    contentType: false, // tell jQuery not to set contentType
    success: callback
  });
};


function buildUserDropdown() {
  myUser = JSON.parse(localStorage.getItem("userbookstore"));
  var avartar = localStorage.getItem("avartarbookstore");
  if (myUser == undefined || myUser == null || myUser == "") {
    // location.href = "login.html";
  } else {
    if (avartar == "" || avartar == undefined || avartar == "null") {
      $(".personal-avatar").attr("src", "asset/img/imgs/noAvt.png");
    } else {
      $(".personal-avatar").attr("src", "asset/img/imgs/" + avartar);
    }
  }
}
buildUserDropdown();

(function() {
  var load_chart;
  load_chart = function() {
    $("body").removeClass("loaded");
    return setTimeout(function() {
      return $("body").addClass("loaded");
    }, 500);
  };
  $(".js-do-it-again").on("click", function() {
    return load_chart();
  });
  load_chart();
}).call(this);

