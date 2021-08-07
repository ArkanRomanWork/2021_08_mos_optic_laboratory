$(document).ready(function () {
    $('.js-main-slider').slick({
        dots: true
    });

    $('.js-second-slider').slick({
        arrows: false,
        speed: 300,
        infinite: false,
        slidesToShow: 1,
        centerMode: true,
        variableWidth: true
    });

    $('.button-up-text').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

    $('.link-navigation').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
    });

    // $('.tabs-wrapper').each(function() {
    //     let ths = $(this);
    //     ths.find('.tab-item').not(':first').hide();
    //     ths.find('.tab').click(function() {
    //         ths.find('.tab').removeClass('active').eq($(this).index()).addClass('active');
    //         ths.find('.tab-item').hide().eq($(this).index()).fadeIn()
    //     }).eq(0).addClass('active');
    //
    // });

    // let ths = $(this);
    $('.tab-item').not(':first').hide();
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $('.tabs-main').find('.tab').eq($(this).index()).addClass('active');
        $('.tab-item').hide().eq($(this).index()).fadeIn()
    });




});

const buttonMore = document.querySelectorAll('.button-more');

buttonMore.forEach((oneButton) => {
    oneButton.addEventListener('click', function()  {
console.log(this);
        this.classList.toggle('active-button')
        const dataButton = this.getAttribute('data-content');
        const blockContent = document.querySelector(`[data-content-id = "${dataButton}"]`);
        blockContent.classList.toggle("visible");
    });

});

