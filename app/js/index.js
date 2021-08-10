$(document).ready(function () {
    $('.js-main-slider').slick({
        dots: true
    });

    const slideNumbers = $('.section-about-card').length;
    const slideWidth = $('.section-about-card').outerWidth();
    const sliderWidth = $('.js-second-slider').outerWidth();

    $('.js-second-slider').slick({
        arrows: false,
        speed: 300,
        infinite: false,
        variableWidth: true
    }).on('wheel', (function(e) {
        const currentSlide = $('.js-second-slider').slick('slickCurrentSlide');
         if (e.originalEvent.deltaY < 0 && currentSlide !== 0) {
            e.preventDefault();
            $(this).slick('slickPrev');
        } else if (e.originalEvent.deltaY > 0 && ((slideNumbers - currentSlide) * slideWidth > sliderWidth)) {

            e.preventDefault();
            $(this).slick('slickNext');
        }
    }));

    $('.to-up-js').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

    $(window).scroll(function() {
        // если пользователь прокрутил страницу более чем на 200px
        if ($(this).scrollTop()>200) {
            // то сделать кнопку scrollup видимой
            $('.button-up-wrapper-js').fadeIn();
        }
        // иначе скрыть кнопку scrollup
        else {
            $('.button-up-wrapper-js').fadeOut();
        }
    });



    // $(window).on("scroll", function() {
    //     var scrollPos = $(window).scrollTop();
    //     if (scrollPos >= 250) {
    //         $('.button-up-wrapper-js').fadeIn();
    //     } else {
    //         $('.button-up-wrapper-js').fadeOut();
    //     }
    // });
    $('.link-navigation').on('click', function (e) {
        e.preventDefault();

        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        $('.burger-wrapper-js').removeClass("burger-visible");

    });


    // let ths = $(this);
    $('.tab-item').not(':first').hide();
    $('.tab').click(function() {
        $('.tab').removeClass('active');
        $('.tabs-main').find('.tab').eq($(this).index()).addClass('active');
        $('.btn-dropdown-content-js').text($(this).text());
        $('.tabs-main').removeClass('dropdown-flex');
        $('.btn-dropdown-img').removeClass('btn-dropdown-img-up');

        $('.tab-item').hide().eq($(this).index()).fadeIn();
    });




});

const buttonMore = document.querySelectorAll('.button-more');

buttonMore.forEach((oneButton) => {
    oneButton.addEventListener('click', function()  {
        this.classList.toggle('active-button')
        const dataButton = this.getAttribute('data-content');
        const blockContent = document.querySelector(`[data-content-id = "${dataButton}"]`);
        blockContent.classList.toggle("visible");
    });

});

const btnBurger = document.querySelector('.burger-button-js');
const burgerMenuBox = document.querySelector('.burger-wrapper-js');
const burgerOverlay = document.querySelector('.burger-overlay-js');
const burgerClose = document.querySelector('.burger-close-button-js')
const burgerMenuLens = document.querySelector('.link-lens-js');
const burgerMenuMore = document.querySelector('.burger-menu-more-wrapper');
const burgerMenuMain = document.querySelector('.burger-menu-main-wrapper');
const burgerBack = document.querySelector('.button-back-js');
const btnDropdown = document.querySelector('.btn-dropdown');
const menuDropdown = document.querySelector('.tabs-main');
const btnDropdownImg = document.querySelector('.btn-dropdown-img');
btnBurger.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
    burgerMenuBox.classList.add("burger-visible");
});

burgerOverlay.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
burgerClose.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
burgerMenuLens.addEventListener('click', () => {
    burgerMenuMore.classList.add("burger-visible-block");
    burgerMenuMain.classList.add("burger-hidden");
});
burgerBack.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
});
btnDropdown.addEventListener('click', () => {
    // menuDropdown.classList.remove("dropdown-flex");
    menuDropdown.classList.toggle('dropdown-flex');
    btnDropdownImg.classList.toggle('btn-dropdown-img-up');
});

//появление и скрытие меню и кнопки вверх при скроле вверх/вниз
let prevScrollPos = window.pageYOffset;
const btnUp = document.querySelector('.button-up-wrapper-js');
const header = document.querySelector('.header-wrapper');


window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (prevScrollPos > currentScrollPos) {
        btnUp.style.bottom = "-200px";
        header.style.top = "-200px";
    } else {
        btnUp.style.bottom = "10px";
        header.style.top = "0";
    }
    prevScrollPos = currentScrollPos;
}
