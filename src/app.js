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