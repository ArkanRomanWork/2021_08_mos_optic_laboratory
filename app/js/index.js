$(document).ready(function () {
    $('.js-main-slider').slick({
        dots: true
    });
/**************************************************************/
  // debounce from underscore.js
 function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};

 // use x and y mousewheel event data to navigate flickity
 function slick_handle_wheel_event(e, slick_instance, slick_is_animating) {
  // do not trigger a slide change if another is being animated
  if (!slick_is_animating) {
    // pick the larger of the two delta magnitudes (x or y) to determine nav direction
    var direction =
      Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;

    console.log("wheel scroll ", e.deltaX, e.deltaY, direction);

    if (direction > 0) {
      // next slide
      slick_instance.slick("slickNext");
    } else {
      // prev slide
      slick_instance.slick("slickPrev");
    }
  }
}

 // debounce the wheel event handling since trackpads can have a lot of inertia
 var slick_handle_wheel_event_debounced = debounce(
 slick_handle_wheel_event
 , 1000, true
 );
/************************************************/


    $('.js-second-slider').slick({
        arrows: false,
        speed: 300,
        infinite: false,
        slidesToShow: 1,
        // centerMode: true,
        variableWidth: true,
        // swipeToSlide: true,
        // slidesToScroll: 1,
        // autoplay: true,
    });


/*************************************************************/
    var slick_2_is_animating = false;

    $('.js-second-slider').on("afterChange", function(index) {
        console.log("Slide after change " + index);
        slick_2_is_animating = false;
    });

    $('.js-second-slider').on("beforeChange", function(index) {
        console.log("Slide before change " + index);
        slick_2_is_animating = true;
    });

    $('.js-second-slider').on("wheel", function(e) {
        slick_handle_wheel_event_debounced(e.originalEvent, $('.js-second-slider'), slick_2_is_animating);
    });

   /********************************************************/
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
