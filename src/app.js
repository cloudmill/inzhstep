import 'Styles/_app.scss';

import Swiper from 'swiper';

const MAIN_BREAKPOINT = 1024;





// --- --- SLIDER --- ---

{
	$(() => {
		$('.slider').each(function () {
			const slider = $(this);
			const slider_swiper_el = slider.find('.slider__swiper');

			const slider_swiper = new Swiper(slider_swiper_el[0], {
				spaceBetween: 20,

				slidesPerView: 'auto',

				breakpoints: {
					[MAIN_BREAKPOINT]: {
						spaceBetween: 40,
					},
				},
			});
		});
	});
}

// --- --- --- --- ---





// --- --- HEADER --- ---

{
	const SCROLL_UPDATE_INTERVAL = 1000 / 30; // 30 fps

	let isHeaderScroll = false;

	function scrollHandler() {
		$(window).off('scroll.header');

		const timeout = setTimeout(() => {
			if (isHeaderScroll) {
				if (window.pageYOffset < 1) {
					$('.header').removeClass('header--scroll');
					isHeaderScroll = false;
				}
			} else {
				if (window.pageYOffset >= 1) {
					$('.header').addClass('header--scroll');
					isHeaderScroll = true;
				}
			}

			$(window).on('scroll.header', scrollHandler);

			clearTimeout(timeout);
		}, SCROLL_UPDATE_INTERVAL);
	}

	$(() => {
		const header = $('.header');

		if (header.length !== 0) {
			if (window.pageYOffset >= 1) {
				header.addClass('header--scroll');
				isHeaderScroll = true;
			}

			$(window).on('scroll.header', scrollHandler);
		}
	});
}

// --- --- --- --- ---