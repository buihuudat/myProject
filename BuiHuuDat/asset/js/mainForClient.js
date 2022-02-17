// scroll animation
window.onscroll = function () {
  scrollFunction()
};

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

// SCROLL ACTIVE
const sections = document.querySelectorAll('section[id]')
function scrollActive() {
    const scrollY = window.pageYOffset
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 200;

        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav-link a[href*=' + sectionId + ']').classList.add('active-link')
        } else {
            document.querySelector('.nav-link a[href$=' + sectionId + ']').classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)


function scrollFunction() {
  document.body.scrollTop > 50 || document.documentElement.scrollTop > 50 ?
    $('.nav').css('padding', '.5rem 0').css('box-shadow', 'rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px') :
    $('.nav').css('padding', '1rem 0');
    
    // scroll to up
  var scrollUp = $('.scrollup')
  if (this.scrollY >= 560) {
    scrollUp.addClass('show-scroll');
  } else {
    scrollUp.removeClass('show-scroll');
  };
}

// Animation Text
var typed = new Typed(".home-tt2", {
  strings: ["BEST <span>PRICE!</span>",
    "EASY <span>TO USE</span>",
    "ATTRACTIVE <span>DESIGNS</span>"
  ],
  showCursor: 0,
  typeSpeed: 100,
  backDelay: 900,
  backSpeed: 50,
  loop: 1
});

// click to show home-select
$(document).ready(function () {
  $('.home--setting').click(function () {
    $('.select-bottom ').toggle('show');
  })
})

// Swiper vehicle
let swiperVehicle = new Swiper(".mySwiper", {
  paginationClickable: true,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: !1,
  },
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
// Swiper Review
let swiperReview = new Swiper(".review", {
  paginationClickable: true,
  centeredSlides: true,
  loop: true,
  grabCursor: true,
  autoplay: {
    delay: 5000,
    disableOnInteraction: !1,
  },

  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    768: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    },
  },
});
// Swiper Logo
let swiperLogo = new Swiper(".company__scroll", {

  slidesPerView: 'auto',
  spaceBetween: 0,
  loop: true,
  speed: 5000,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },

});

// BROWSE MODELS
$(document).ready(function () {
  // click đổi title trong BROWSE MODELS
  var btns = $('.browse__select-title span');
  var tables = $('.models__table').toArray();
  tables.forEach((e, i) => {
    $(btns[i]).click(function () {
      btns.removeClass('active-model');
      $(this).addClass('active-model');
      $('.models__table').addClass('hide');
      $(e).removeClass('hide');
      $('.model-hide').css("display", "none");
      $('.btn-model').text('Show all');
    })
    // $('.model-hide').addClass('hide');
    $($('.btn-model')[i]).click(function () {
      $($('.model-hide')[i]).slideToggle();
      $('.btn-model').text() == "Show allShow allShow all" ? $('.btn-model').text('Hide all') : $('.btn-model').text('Show all');
      console.log($('.btn-model').text())
    })
  });

  // click to show form testCar
  $('.btnTestCar').click(function() {
    $('.testCarForm').removeClass('hide');
  })

  // click to show content service
  var btnService = $('.service-button').toArray();
  var contentService = $('.service-content').toArray();
  btnService.forEach((e, i) => {
    $($(btnService)[i]).click(function () {
      $(this).text() == "Show more" ?
        $($(contentService)[i]).addClass('service-show') & $(this).text('Show less') & (this) :
        $($(contentService)[i]).removeClass('service-show') & $(this).text('Show more');
    })
  })


  // show time footer
  function get_time() {
    var show = $('.footer-show');
    const dt = new Date();
    var y = dt.getFullYear();
    var m = dt.getMonth();
    var d = dt.getDate();
    var w = dt.getDay();
    var h = dt.getHours();
    var tm = dt.getMinutes();
    var ampm;

    h < 12 ? (ampm = 'am') : (ampm = 'pm');
    show.text((dt.getDay() !== 0 ? ('T' + (w += 1)) : (w = 'CN')) + ' ' + d + '/' + (m + 1) + '/' + y + ' ' + h + ':' + ((tm == 0 ? tm + '0' : tm) < 10 ? '0' + tm : tm) + ampm);
  }
  get_time();
  setInterval(() => {
    get_time();
  }, 50000)
});

var testCar__title = $('.testCar__title').toArray();
var count = 0;
function revealTestCar(count) {
  $(testCar__title[count]).addClass('hideTTTestCar');
  count<2?++count:(count=0);
  $(testCar__title[count]).removeClass('hideTTTestCar');
}
setInterval(function() {
  for (let i = 0; i < testCar__title.length; i++) {
    count < testCar__title.length ? count : (count=0);
    revealTestCar(count);
    ++count;
    return count;
  }
},6000)


// ===================

$(document).ready(function() {
  $('.heart').click(function(){
    var likeNumber = $('.likeNumber').text();
    $('.heart i').removeClass('far fa-heart');
    $('.heart i').addClass('fas fa-heart');
 
    $('.likeNumber').text(Number(likeNumber) + 1);
  })
})


