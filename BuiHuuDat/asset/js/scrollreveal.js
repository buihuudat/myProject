// SCROLLREVEAL
const sr = ScrollReveal({
  distance:'50px',
  duration:2800,
  reset: 0
});
// sr.reveal('.testCar__title, .ctt2 p', {
//   origin:'left',
//   // interval: 200,
// })

sr.reveal('.footer_left-content, .footer-h-title, .footer-h-title, .footer-if-title, .footer-cont-title, .footer-addr-title',{
  origin: 'top',
  interval: 100
})
sr.reveal('.footer-icon a ,.footer-map', {
  origin: 'top',
  interval: 50,
  delay: 100
})
sr.reveal('.footer-hour .rs, .footer-if-content, .footer-cont-content, .footer-addr-content', {
  origin: 'left',
  interval: 50,
  delay: 200
})
sr.reveal('.footer-bottom', {
  origin: 'top',
  distance: '20px',
  delay: 300
})

