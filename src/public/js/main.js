
document.addEventListener("DOMContentLoaded", function(){
    setTimeout(function(){
        $('#preloader').hide();
        $('#app').show();
        
    }, 200);
});
$(document).ready(function() {
    // slide
    var current = 0;
    var slides = $('.container-slide__img');
    slides.eq(current).show();

    function nextSlide(n) {
        clearInterval();
        slides.eq(current).fadeOut(0);
        current = (current + n + slides.length) % slides.length;
        slides.eq(current).fadeIn(0);
    }

    setInterval(function(e) {
        nextSlide(1);
    }, 3000);

    $('.icon_left').click(function(e) {
        e.preventDefault();
        nextSlide(-1);
    });

    $('.icon_right').click(function(e) {
        e.preventDefault();
        nextSlide(1);
    });
    // lien he
    $(".action-button a").hover(function(){
        $(this).css({"transform": "rotate(360deg)"});
      }, function(){
        $(this).css({"transform": "rotate(0deg)"});
      });
})