$(document).ready(function () {
    //первый слайдер
    $('.js-main-slider').slick({
        dots: true
    });



//скролл наверх
    $('.to-up-js').click(function () {
        $('body, html').animate({
            scrollTop: 0
        }, 1000);
    });

//видимость кнопки наеверх
    $(window).scroll(function() {
        if ($(this).scrollTop()>200) {
            $('.button-up-wrapper-js').fadeIn();
        }
        else {
            $('.button-up-wrapper-js').fadeOut();
        }
    });
    //скрол ссылки
    $('.link-navigation').on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        }, 1000);
        $('.burger-wrapper-js').removeClass("burger-visible");

    });

//функционал табов
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

    //кнопка подробнее
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

//показ бургер меню
btnBurger.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
    burgerMenuBox.classList.add("burger-visible");
});
//закрытие бургер меню
burgerOverlay.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
burgerClose.addEventListener('click', () => {
    burgerMenuBox.classList.remove("burger-visible");
});
//скрытое меню в бургере
burgerMenuLens.addEventListener('click', () => {
    burgerMenuMore.classList.add("burger-visible-block");
    burgerMenuMain.classList.add("burger-hidden");
});
//бургер кнопка назад
burgerBack.addEventListener('click', () => {
    burgerMenuMore.classList.remove("burger-visible-block");
    burgerMenuMain.classList.remove("burger-hidden");
});
//
const btnDropdown = document.querySelector('.btn-dropdown');
const menuDropdown = document.querySelector('.tabs-main');
const btnDropdownImg = document.querySelector('.btn-dropdown-img');
btnDropdown.addEventListener('click', () => {
    menuDropdown.classList.toggle('dropdown-flex');
    btnDropdownImg.classList.toggle('btn-dropdown-img-up');
});

//появление и скрытие меню и кнопки вверх при скроле вверх/вниз
let prevScrollPos = window.pageYOffset;
const btnUp = document.querySelector('.button-up-wrapper-js');
const header = document.querySelector('.header-wrapper');

window.onscroll = function() {
    let currentScrollPos = window.pageYOffset;
    if (document.documentElement.clientWidth < 1023) {
        if (currentScrollPos <= 600) {
            header.style.top = "0";//пок
        } else if (prevScrollPos > currentScrollPos) {
            btnUp.style.bottom = "-200px";//хов
            header.style.top = "0";//пок
        } else {
            btnUp.style.bottom = "10px";//пок
            header.style.top = "-200px";//хов
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
            // xPercent: -100 * (sections.length - 1),
            ease: "none",
            scrollTrigger: {
                trigger: ".scroll",
                pin: true,
                scrub: true,
                start: "top top",
                end: "bottom",
            }
        });
    } else {
        gsap.registerPlugin(Draggable);
        let slides = gsap.utils.toArray(".slide"),
            numSlides = slides.length,
            slideWidth = slides[0].offsetWidth, totalWidth = slideWidth * numSlides,
            animation = gsap.to(slides, {
                x: -offsetX,
                // xPercent: "-=" + ((numSlides - 1) * 100),
                duration: 1,
                ease: "none",
                paused: true
            }),
            draggable = new Draggable(document.createElement("div"), { // use a proxy element
                trigger: ".slides-container",
                onPress() {
                    gsap.killTweensOf(animation);
                    this.startProgress = animation.progress();
                },
                onDrag() {
                    let change = (draggable.startX - draggable.x) / totalWidth;
                    animation.progress(draggable.startProgress + change);
                },

            });
    }
}

window.addEventListener('load', initGsapSlider);