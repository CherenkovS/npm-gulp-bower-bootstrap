/* Form without modal */
$(document).ready(function () {
    $("#form").submit(function () {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = $('#' + formID);
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: formNm.serialize(),
        }).done(function() {
      swal("Спасибо!", "Наш менеджер свяжется с вами в ближайшее время.");
      setTimeout(function() {
        // Done Functions
        formNm.trigger("reset");
      }, 1000);
    });
        return false;
  });
});

/* Form with modal */
$(document).ready(function () {
    $("#callback").submit(function () {
        // Получение ID формы
        var formID = $(this).attr('id');
        // Добавление решётки к имени ID
        var formNm = $('#' + formID);
        $.ajax({
            type: "POST",
            url: 'mail.php',
            data: formNm.serialize(),
            success: function (data) {
                // Вывод текста результата отправки
                $(formNm).html(data);
            },
            error: function (jqXHR, text, error) {
                // Вывод текста ошибки отправки
                $(formNm).html(error);
            }
        });
        return false;
    });
});

/* Slider */
$(document).ready(function () {
$('.item-slider').slick({
  dots: true,
  arrow: false,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
  // prevArrow: false,
  // nextArrow: false,
  });
});

/* Clear placeholder */
$(document).ready(function () {
 $('input,textarea').focus(function(){
   $(this).data('placeholder',$(this).attr('placeholder'))
   $(this).attr('placeholder','');
 });
 $('input,textarea').blur(function(){
   $(this).attr('placeholder',$(this).data('placeholder'));
 });
 });

/* Gallery fancybox */
$(document).ready(function() {
    $(".fancybox").fancybox({
        openEffect  : 'fade',
        closeEffect : 'fade'
    });
});

/*Scroll*/
$(document).ready(function(){
  $("#menu").on("click","a", function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
      top = $(id).offset().top; 
    $('body,html').animate({scrollTop: top}, 1000);
  });
});