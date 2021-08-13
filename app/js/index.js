$(document).ready(function () {
    //first slider
    $('.js-main-slider').slick({
        dots: true
    });
    //card-slider
    if (document.documentElement.clientWidth <= 1023) {
        $('.js-second-slider').slick({
            dots: false,
            arrows: false,
            speed: 300,
            infinite: false,
            variableWidth: true,
            slidesToScroll: 1,
        })
    }
    //scroll to up
    $('.to-up-js').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

    //visibility button up
    $(window).on('scroll', function() {
        if ($(this).scrollTop()>200) {
            $('.button-up-wrapper-js').fadeIn();
        }
        else {
            $('.button-up-wrapper-js').fadeOut();
        }
    });
    //link scroll
    $('.link-navigation').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        $('.burger-wrapper-js').removeClass("burger-visible");

    });
    //tab menu
    $('.tab-item').not(':first').hide();
    $('.tab').click(function() {
        let dataIndex = $(this).data('index') || $(this).index();
        if ($(this).data('index') === 0) {
            dataIndex = 0;
        }
        $('.tab').removeClass('active');
        $('.tabs-main').find('.tab').eq(dataIndex).addClass('active');
        $('.btn-dropdown-content-js').text($(this).text());
        $('.tabs-main').removeClass('dropdown-flex');
        $('.btn-dropdown-img').removeClass('btn-dropdown-img-up');
        $('.tab-item').hide().eq(dataIndex).fadeIn();
    });
    //button more
    $(".button-more").click(function(){
        const dataButton = this.getAttribute('data-content');
        $(`[data-content-id = "${dataButton}"]`).slideToggle("slow",() =>
        {
            this.classList.toggle('active-button');
        });
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
//show burger menu
btnBurger.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
    burgerMenuBox.classList.add("burger-visible");
});
//close burger menu
burgerOverlay.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
burgerClose.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
//hide menu in burger
burgerMenuLens.addEventListener('click', () => {
    burgerMenuMore.classList.add("burger-visible-block");
    burgerMenuMain.classList.add("burger-hidden");
});
//button back in burger
burgerBack.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
});
const btnDropdown = document.querySelector('.btn-dropdown');
const menuDropdown = document.querySelector('.tabs-main');
const btnDropdownImg = document.querySelector('.btn-dropdown-img');
btnDropdown.addEventListener('click', () => {
    menuDropdown.classList.toggle('dropdown-flex');
    btnDropdownImg.classList.toggle('btn-dropdown-img-up');
});
//show and hide button to up, when scroll up/down
let prevScrollPos = window.pageYOffset;
const btnUp = document.querySelector('.button-up-wrapper-js');
const header = document.querySelector('.header-wrapper');
window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (document.documentElement.clientWidth < 1023) {
        if (currentScrollPos <= 600) {
            header.style.top = "0";
        } else if (prevScrollPos > currentScrollPos) {
            btnUp.style.bottom = "-200px";
            header.style.top = "0";
        } else {
            btnUp.style.bottom = "10px";
            header.style.top = "-200px";
        }
    }
    prevScrollPos = currentScrollPos;
}
function initGsapSlider () {
    let s = document.querySelectorAll('.scroll__section');
    let offset = s[s.length-1].offsetLeft,
      width = s[s.length-1].offsetWidth,
      windowWidth = window.innerWidth,
      containerWidth = document.querySelector('.container').offsetWidth,
      sectionPaddingRight = parseInt(getComputedStyle(s[0]).paddingRight),
      offsetX = width - (containerWidth - offset) - (windowWidth - containerWidth) / 2 - sectionPaddingRight;

    if (document.documentElement.clientWidth >= 1024) {
        gsap.registerPlugin(ScrollTrigger);
        let sections = gsap.utils.toArray(".scroll__section");
        gsap.to(sections, {
            x: -offsetX,
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll",
                pin: true,
                scrub: true,
                start: "top top",
                end: "bottom",
            }
        });
    }
}

window.addEventListener('load', initGsapSlider);