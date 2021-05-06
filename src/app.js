import 'Styles/_app.scss';

import Swiper from 'swiper';

const MAIN_BREAKPOINT = 1024;





// --- --- SLIDER --- ---

{
	$(() => {
		$('.slider').each(function () {
			const slider = $(this);
			const slider_id = slider.data('slider-id');
			const slider_swiper_el = slider.find('.slider__swiper');

			const slider_prev_id = slider.data('slider-prev-id');
			const slider_next_id = slider.data('slider-next-id');

			let slider_swiper = null;
			switch (slider_id) {
				// partners
				case 7:
					slider_swiper = new Swiper(slider_swiper_el[0], {
						spaceBetween: -1,

						slidesPerView: 'auto',
					});
					break;
				// default
				default:
					slider_swiper = new Swiper(slider_swiper_el[0], {
						spaceBetween: 20,

						slidesPerView: 'auto',

						breakpoints: {
							[MAIN_BREAKPOINT]: {
								spaceBetween: 40,
							},
						},
					});
					break;
			}

			$('[data-slider-id="' + slider_prev_id + '"]').on('click', () => {
				slider_swiper.slidePrev();
			});

			$('[data-slider-id="' + slider_next_id + '"]').on('click', () => {
				slider_swiper.slideNext();
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

		const headerModal = header.find('.header__modal');
		let headerModalCurrent = null;

		if (header.length !== 0) {
			// scroll
			if (window.pageYOffset >= 1) {
				header.addClass('header--scroll');
				isHeaderScroll = true;
			}

			$(window).on('scroll.header', scrollHandler);

			function openModal(headerModal) {
				headerModalCurrent = headerModal;

				// header modal layout
				header.addClass('header--modal');
				header.addClass('header--modal--' + headerModalCurrent);

				// header current modal
				header.find('.' + headerModalCurrent).addClass(headerModalCurrent + '--active');
			}

			function closeModal() {
				if (headerModalCurrent !== null) {
					// header modal layout
					header.removeClass('header--modal');
					header.removeClass('header--modal--' + headerModalCurrent);

					// header current modal
					header.find('.' + headerModalCurrent).removeClass(headerModalCurrent + '--active');

					headerModalCurrent = null;
				}
			}

			// modal
			header.find('[data-header-modal]').on('click', function () {
				if (headerModalCurrent) {
					if (headerModalCurrent === $(this).data('header-modal')) {
						closeModal();
					}
				} else {
					openModal($(this).data('header-modal'));
				}
			});

			headerModal.on('click', event => {
				if (event.target === event.currentTarget) {
					closeModal();
				}
			});

			const mediaQuery = window.matchMedia(`(min-width: ${MAIN_BREAKPOINT}px)`);

			mediaQuery.addEventListener('change', () => {
				closeModal();
			});
		}
	});
}

// --- --- --- --- ---





// --- --- HEADER-CATALOG --- ---

{
	$(() => {
		const headerCatalog = $('.header-catalog');

		if (headerCatalog.length !== 0) {
			const headerCatalogPanelText = headerCatalog.find('.header-catalog__panel-text');

			headerCatalogPanelText.on('click', function () {
				const headerCatalogPanelItem = $(this).closest('.header-catalog__panel-item');

				const headerCatalogActiveIndex = headerCatalogPanelItem.index();

				$('.header-catalog__panel-item').removeClass('header-catalog__panel-item--active');
				$('.header-catalog__tabs-item').removeClass('header-catalog__tabs-item--active');

				$('.header-catalog__panel-item').eq(headerCatalogActiveIndex).addClass('header-catalog__panel-item--active');
				$('.header-catalog__tabs-item').eq(headerCatalogActiveIndex).addClass('header-catalog__tabs-item--active');
			});
		}
	});
}

// --- --- --- --- ---





// --- --- HEADER-MENU --- ---

{
	$(() => {
		const headerMenu = $('.header-menu');

		if (headerMenu.length !== 0) {
			// catalog
			const headerMenuCatalog = headerMenu.find('.header-menu__catalog');

			headerMenuCatalog.find('.header-menu__catalog-button').on('click', function () {
				headerMenuCatalog.find('.header-menu__catalog-dropdown').slideToggle(650);
				headerMenuCatalog.toggleClass('header-menu__catalog--active');
			});

			// section
			const headerMenuSection = headerMenu.find('.header-menu__section');
			const headerMenuSectionButton = headerMenuSection.find('.header-menu__section-button');

			headerMenuSectionButton.on('click', function () {
				const headerMenuSectionClicked = $(this).closest('.header-menu__section');

				if (headerMenuSectionClicked.hasClass('header-menu__section--active')) {
					headerMenuSectionClicked.find('.header-menu__section-dropdown').slideUp(650);
					headerMenuSectionClicked.removeClass('header-menu__section--active');
				} else {
					$('.header-menu__section--active').find('.header-menu__section-dropdown').slideUp(650);
					$('.header-menu__section--active').removeClass('header-menu__section--active');

					headerMenuSectionClicked.find('.header-menu__section-dropdown').slideDown(650);
					headerMenuSectionClicked.addClass('header-menu__section--active');
				}
			});
		}
	});
}

// --- --- --- --- ---