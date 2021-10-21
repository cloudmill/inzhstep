import 'Styles/_app.scss';

import 'core-js';
import Swiper from 'swiper';
import './assets/scripts/TweenMax.min.js';
import 'jquery-bez';
import SmoothScroll from 'smoothscroll-for-websites';
import '@fancyapps/fancybox';
import './assets/scripts/drop.js';

const MAIN_BREAKPOINT = 1280;



// product
{
	$(() => {
		// info slider
		{
			const SPEED = 600;

			const slider = $('.product__slider');

			if (slider.length !== 0) {
				const thumbsSwiperEl = slider.find('.product__thumbs-swiper');
				const thumbsSwiper = new Swiper(thumbsSwiperEl[0], {
					speed: SPEED,
					slidesPerView: 'auto',
					spaceBetween: -1,
				});
				const thumbsSlide = slider.find('.product__thumbs-slide');

				const sliderSwiperEl = slider.find('.product__slider-swiper');
				const sliderSwiper = new Swiper(sliderSwiperEl[0], {
					speed: SPEED,
					spaceBetween: 20,
					breakpoints: {
						[MAIN_BREAKPOINT]: {
							spaceBetween: 40,
						},
					},
				});

				// control
				let lastAction = 'nothing';
				sliderSwiper.on('sliderFirstMove', () => {
					lastAction = 'slider swipe';
				})
				thumbsSwiper.on('click', event => {
					lastAction = 'thumbs click';

					sliderSwiper.slideTo(event.clickedIndex);

					thumbsSlide.removeClass('product__thumbs-slide--active');
					thumbsSlide.eq(event.clickedIndex).addClass('product__thumbs-slide--active');
				});

				sliderSwiper.on('slideChange', event => {
					if (lastAction === 'slider swipe') {
						thumbsSwiper.slideTo(event.realIndex);

						thumbsSlide.removeClass('product__thumbs-slide--active');
						thumbsSlide.eq(event.realIndex).addClass('product__thumbs-slide--active');
					}

					lastAction = 'nothing';
				});
			}
		}
	});
}

// slider
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
				// partners, product relevate
				case 7:
				case 13:
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

// fancy
{
	$(() => {
		// attrs:
		// data-fancy-button: кнопка вызова модального окна, id модального окна
		// data-fancy-modal: модальное окно, id модального окна

		// setup
		$.fancybox.defaults.closeExisting = true;
		// $.fancybox.defaults.touch = false; // ?
		
		// open
		$('[data-fancy-button]').on('click', function (event) {
			event.preventDefault();
		
			const id = $(this).data('fancy-button');
			const modal = $(`[data-fancy-modal="${id}"]`);

			$.fancybox.open(modal);
		});
	});
}

// map
{
	ymaps.ready(() => {
		const mapContainer = $('#map');

		if (mapContainer.length !== 0) {
			// vars
			const markWidth = 42;
			const markHeight = 53;

			// init
			const map = new ymaps.Map('map', {
				center: [55.76, 37.64],
				zoom: 10,
				controls: [],
			});
			const zoomControl = new ymaps.control.ZoomControl({
				options: {
					size: 'small',
					position: {
						top: 205,
						right: 10,
					},
				}
			});

			// adaptive
			const mediaQuery = window.matchMedia(`(min-width: ${MAIN_BREAKPOINT}px)`);
			function mediaQueryChange() {
				if (mediaQuery.matches) {
					// desktop
					map.controls.add(zoomControl);
				} else {
					// mobile
					map.controls.remove(zoomControl);
				}
			}
			mediaQueryChange();
			mediaQuery.addListener(mediaQueryChange);

			// balloon layout
			const layout = ymaps.templateLayoutFactory.createClass(
				[
					'<div class="balloon">',
					'<div class="balloon__content">',
					'<p class="balloon__text">',
					'{{properties.balloon}}',
					'</p>',
					'</div>',
					'<div class="balloon__arrow"></div>',
					'</div>',
				].join(''),
				{
					build: function () {
						this.constructor.superclass.build.call(this);

						this._$element = $('.balloon', this.getParentElement());

						this.applyElementOffset();
					},
					onSublayoutSizeChange: function () {
						layout.superclass.onSublayoutSizeChange.apply(this, arguments);

						if (!this._isElement(this._$element)) {
							return;
						}

						this.applyElementOffset();

						this.events.fire('shapechange');
					},
					applyElementOffset: function () {
						this._$element.css({
							left: -(this._$element[0].offsetWidth / 2),
							top: -(this._$element[0].offsetHeight + markHeight),
						});
					},
					getShape: function () {
						if (!this._isElement(this._$element)) {
							return layout.superclass.getShape.call(this);
						}

						var position = this._$element.position();

						return new ymaps.shape.Rectangle(new ymaps.geometry.pixel.Rectangle([
							[position.left, position.top], [
								position.left + this._$element[0].offsetWidth,
								position.top + this._$element[0].offsetHeight,
							]
						]));
					},
					_isElement: function (element) {
						return element && element[0];
					}
				}
			);

			// balloon close
			map.events.add('click', () => {
				if (map.balloon.isOpen()) {
					map.balloon.close();
				}
			});

			// добавление точек
			const placemarks = new ymaps.GeoObjectCollection();
			$('.placemarks__item').each(function () {
				// данные
				const balloon = $(this).find('.placemarks__balloon').text().trim();
				const latitude = $(this).find('.placemarks__latitude').text().trim();
				const longitude = $(this).find('.placemarks__longitude').text().trim();

				// placemark
				const coordinates = [latitude, longitude];
				const placemark = new ymaps.Placemark(coordinates, {
					balloon,
				}, {
					iconLayout: 'default#image',
					iconImageHref: 'assets/images/placemark.svg',
					iconImageSize: [markWidth, markHeight],
					iconImageOffset: [-markWidth / 2, -markHeight],

					balloonLayout: layout,
					balloonPanelMaxMapArea: 0,
					hideIconOnBalloonOpen: false,
				});

				placemarks.add(placemark);
			});

			// добавление на карту
			map.geoObjects.add(placemarks);

			// позиционирование на точках
			map.setBounds(placemarks.getBounds(), {
				zoomMargin: Math.max(markWidth, markHeight),
			});
		}
	});
}

// select
{
	$(() => {
		$('.select').each(function () {
			const text = $(this).find('.select__text');
			const select = $(this).find('.select__select');

			updateText();

			select.on('change', updateText);

			function updateText() {
				const selectedOption = select.find('.select__option').filter(':selected');
				const selectedText = selectedOption.text().trim();

				text.text(selectedText);
			}
		});
	});
}

// header
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

			mediaQuery.addListener(closeModal);

			// search
			const headerSearchButton = header.find('.header__search-button');
			const headerSearchModal = header.find('.header__search-modal');

			headerSearchButton.on('click', () => {
				headerSearchModal.addClass('header__search-modal--active');
			});

			headerSearchModal.on('click', event => {
				if (event.target === event.currentTarget) {
					headerSearchModal.removeClass('header__search-modal--active');
				}
			});

			const searchModal = headerSearchModal.find('.search-modal');
			const searchModalCloseButton = searchModal.find('.search-modal__close-button');

			searchModalCloseButton.on('click', () => {
				headerSearchModal.removeClass('header__search-modal--active');
			});
		}
	});
}

// header-catalog
{
	$(() => {
		const headerCatalog = $('.header-catalog');

		if (headerCatalog.length !== 0) {
			const headerCatalogPanelLink = headerCatalog.find('.panel__link');

			headerCatalogPanelLink.on('click', function (event) {
				event.preventDefault();

				const headerCatalogPanelItem = $(this).closest('.panel__item');

				const headerCatalogActiveIndex = headerCatalogPanelItem.index();

				headerCatalog.find('.panel__item').removeClass('panel__item--active');
				// с учетом того, что .header-catalog на странице в единичном экземпляре
				$('.header-catalog__tabs-item').removeClass('header-catalog__tabs-item--active');

				headerCatalog.find('.panel__item').eq(headerCatalogActiveIndex).addClass('panel__item--active');
				// с учетом того, что .header-catalog на странице в единичном экземпляре
				$('.header-catalog__tabs-item').eq(headerCatalogActiveIndex).addClass('header-catalog__tabs-item--active');
			});
		}
	});
}

// header-menu
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

// nav-card
{
	const OPEN_TEXT = 'показать все';
	const CLOSE_TEXT = 'свернуть';

	$(() => {
		const mediaQuery = window.matchMedia(`(max-width: ${MAIN_BREAKPOINT - 1}px)`);
		if (mediaQuery.matches) {
			const navCard = $('.nav-card');

			if (navCard.length !== 0) {
				navCard.each(function () {
					const navCardItem = $(this).find('.nav-card__item');
					const navCardCount = navCardItem.length;
					const navCardButton = $(this).find('.nav-card__button');

					if (navCardCount <= 4) {
						navCardButton.css('display', 'none');
					} else {
						navCardItem.css('display', 'none')
						navCardItem.slice(0, 4).css('display', '');

						let navCardOpen = false;
						navCardButton.on('click', function () {
							if (navCardOpen) {
								navCardItem.css('display', 'none')
								navCardItem.slice(0, 4).css('display', '');

								$(this).removeClass('nav-card__button--active');
								$(this).find('.nav-card__button-text').text(OPEN_TEXT);
							} else {
								navCardItem.css('display', '');

								$(this).addClass('nav-card__button--active');
								$(this).find('.nav-card__button-text').text(CLOSE_TEXT);
							}

							navCardOpen = !navCardOpen;
						});
					}
				});
			}
		}
	});
}

// top
{
	const PARALLAX_RATIO = 5;

	$(() => {
		const top = $('.top');

		if (top.length !== 0) {
			// slider (https://github.com/codrops/SlideOutBoxMenu/)
			{
				// The Slide (Product) class.
				class Slide {
					constructor(el, settings) {
						this.DOM = { el: el };

						this.settings = {
							detailsEl: null,
							onHideDetails: () => { return false; }
						}
						Object.assign(this.settings, settings);

						// The slide´s container.
						this.DOM.wrap = this.DOM.el.querySelector('.slide__wrap');
						// The image element.
						this.DOM.img = this.DOM.wrap.querySelector('.slide__img');
						// The title container.
						this.DOM.titleWrap = this.DOM.wrap.querySelector('.slide__title-wrap');
						// The details boxes.
						this.DOM.detailsItems = Array.from(this.settings.detailsEl.querySelectorAll('.details__item'));
						this.totalDetailItems = this.DOM.detailsItems.length;
						// The details box that has the close control. When clicking on it call the onHideDetails passed in the initialization options.
						this.DOM.hideDetailsCtrl = this.DOM.detailsItems.filter(item => item.classList.contains('details__item--close'))[0];
						this.DOM.hideDetailsCtrl.addEventListener('click', () => this.settings.onHideDetails());
						// Some config values.
						this.config = {
							animation: {
								duration: 1.2,
								ease: Expo.easeInOut
							}
						};
					}
					// Sets the current class.
					setCurrent(isCurrent = true) {
						this.DOM.el.classList[isCurrent ? 'add' : 'remove']('slide--current');
					}
					// Hide the slide.
					hide(direction) {
						return this.toggle('hide', direction);
					}
					// Show the slide.
					show(direction) {
						this.DOM.el.style.zIndex = 1000;
						return this.toggle('show', direction);
					}
					// Show/Hide the slide.
					toggle(action, direction) {
						return new Promise((resolve, reject) => {
							// When showing a slide, the slide´s container will move 100% from the right or left depending on the direction.
							// At the same time, both title wrap and the image will move the other way around thus creating the unreveal effect.
							// Also, when showing or hiding a slide, we scale it from or to a value of 1.1.
							if (action === 'show') {
								TweenMax.to(this.DOM.wrap, this.config.animation.duration, {
									ease: this.config.animation.ease,
									startAt: { x: direction === 'right' ? '100%' : '-100%' },
									x: '0%'
								});
								TweenMax.to(this.DOM.titleWrap, this.config.animation.duration, {
									ease: this.config.animation.ease,
									startAt: { x: direction === 'right' ? '-100%' : '100%' },
									x: '0%'
								});
							}

							TweenMax.to(this.DOM.img, this.config.animation.duration, {
								ease: this.config.animation.ease,
								startAt: action === 'hide' ? {} : { x: direction === 'right' ? '-100%' : '100%', scale: 1.1 },
								x: '0%',
								scale: action === 'hide' ? 1.1 : 1,
								onStart: () => {
									this.DOM.img.style.transformOrigin = action === 'hide' ?
										direction === 'right' ? '100% 50%' : '0% 50%' :
										direction === 'right' ? '0% 50%' : '100% 50%';
									this.DOM.el.style.opacity = 1;
								},
								onComplete: () => {
									this.DOM.el.style.zIndex = 999;
									this.DOM.el.style.opacity = action === 'hide' ? 0 : 1;
									resolve();
								}
							});
						});
					}
					// Show the details boxes.
					showDetails() {
						return new Promise((resolve, reject) => {
							// If open already then do nothing.
							if (this.isDetailsOpen) {
								resolve();
								return false;
							}

							// We want to achieve here the same reveal/unreveal effect of the slideshow.
							// The item animates from 100% to 0% (top,bottom,left or right) while its inner element does the reverse movement.
							const processItem = (item, pos) => {
								return new Promise((resolve, reject) => {
									// The duration and easing for the last 3 elements will be different to create a different feeling for the animation.
									const duration = pos >= this.totalDetailItems - 3 ? 0.7 : 0.2;
									const ease = pos >= this.totalDetailItems - 3 ? 'Expo.easeOut' : 'Power2.easeInOut';
									// Every box will have a delay. 
									const delay = pos * 0.08;
									// The direction to animate the box. We can specify this as a data attribute otherwise we assume a default of rtl ("right to left")
									// right to left (rtl) | left to right (ltr) | bottom to top (btt) | top to bottom (ttb).
									const direction = item.dataset.direction || 'rtl';

									let itemAnimOpts = {
										ease: ease,
										delay: delay,
										x: '0%',
										y: '0%'
									};

									let innerAnimOpts = {
										ease: ease,
										delay: delay,
										x: '0%',
										y: '0%',
										onComplete: resolve
									};

									if (direction === 'rtl' || direction === 'ltr') {
										itemAnimOpts.startAt = direction === 'rtl' ? { x: '100%', y: '0%' } : { x: '-100%', y: '0%' };
										innerAnimOpts.startAt = direction === 'rtl' ? { x: '-100%', y: '0%' } : { x: '100%', y: '0%' };
									}
									else {
										itemAnimOpts.startAt = direction === 'btt' ? { x: '0%', y: '100%' } : { x: '0%', y: '-100%' };
										innerAnimOpts.startAt = direction === 'btt' ? { x: '0%', y: '-100%' } : { x: '0%', y: '100%' };
									}

									TweenMax.to(item, duration, itemAnimOpts);
									TweenMax.to(item.querySelector('.details__inner'), duration, innerAnimOpts);
								});
							};

							// Process each one of the boxes..
							let processing = [];
							this.DOM.detailsItems.forEach((item, pos) => processing.push(processItem(item, pos)));
							Promise.all(processing).then(() => {
								this.isDetailsOpen = true;
								resolve();
							});
						});
					}
					hideDetails() {
						return new Promise((resolve, reject) => {

							if (!this.isDetailsOpen) {
								resolve();
								return false;
							}

							const processItem = (item, pos) => {
								return new Promise((resolve, reject) => {
									const duration = pos === 0 ? 0.7 : 0.2;
									const ease = pos === 0 ? 'Expo.easeOut' : 'Power2.easeInOut';
									const delay = (this.totalDetailItems - pos - 1) * 0.08;
									const direction = item.dataset.direction || 'rtl'; // right to left (rtl) | left to right (ltr) | bottom to top (btt) | top to bottom (ttb).

									let itemAnimOpts = {
										ease: ease,
										delay: delay
									};

									let innerAnimOpts = {
										ease: ease,
										delay: delay,
										onComplete: resolve
									};

									if (direction === 'rtl' || direction === 'ltr') {
										itemAnimOpts.x = direction === 'rtl' ? '100%' : '-100%';
										itemAnimOpts.y = '0%';
										innerAnimOpts.x = direction === 'rtl' ? '-100%' : '100%';
										innerAnimOpts.y = '0%';
									}
									else {
										itemAnimOpts.y = direction === 'btt' ? '100%' : '-100%';
										itemAnimOpts.x = '0%';
										innerAnimOpts.y = direction === 'btt' ? '-100%' : '100%';
										innerAnimOpts.x = '0%';
									}

									TweenMax.to(item, duration, itemAnimOpts);
									TweenMax.to(item.querySelector('.details__inner'), duration, innerAnimOpts);
								});
							};

							let processing = [];
							this.DOM.detailsItems.forEach((item, pos) => processing.push(processItem(item, pos)));
							Promise.all(processing).then(() => {
								this.isDetailsOpen = false;
								resolve();
							});

						});
					}
				}

				// The navigation class. Controls the .boxnav animations (e.g. pagination animation).
				class Navigation {
					constructor(el, settings) {
						this.DOM = { el: el };

						this.settings = {
							next: () => { return false; },
							prev: () => { return false; }
						}
						Object.assign(this.settings, settings);

						// Navigation controls (prev and next)
						this.DOM.prevCtrl = this.DOM.el.querySelector('.boxnav__item--prev');
						this.DOM.nextCtrl = this.DOM.el.querySelector('.boxnav__item--next');
						// The current and total pages elements.
						this.DOM.pagination = {
							current: this.DOM.el.querySelector('.boxnav__label--current'),
							total: this.DOM.el.querySelector('.boxnav__label--total')
						};
						this.initEvents();
					}
					// Updates the current page element value.
					// Animate the element up, update the value and finally animate it in from bottom up.
					setCurrent(val, direction) {
						//this.DOM.pagination.current.innerHTML = val;
						TweenMax.to(this.DOM.pagination.current, 0.4, {
							ease: 'Back.easeIn',
							y: direction === 'right' ? '-100%' : '100%',
							opacity: 0,
							onComplete: () => {
								this.DOM.pagination.current.innerHTML = val;
								TweenMax.to(this.DOM.pagination.current, 0.8, {
									ease: 'Expo.easeOut',
									startAt: { y: direction === 'right' ? '50%' : '-50%', opacity: 0 },
									y: '0%',
									opacity: 1
								});
							}
						});
					}
					// Sets the total pages value.
					setTotal(val) {
						this.DOM.pagination.total.innerHTML = val;
					}
					// Initialize the events on the next/prev controls.
					initEvents() {
						this.DOM.prevCtrl.addEventListener('click', () => this.settings.prev());
						this.DOM.nextCtrl.addEventListener('click', () => this.settings.next());
					}
				}

				// The Slideshow class.
				class Slideshow {
					constructor(el) {
						this.DOM = { el: el };
						// Initialize the navigation instance. When clicking the next or prev ctrl buttons, trigger the navigate function.
						this.navigation = new Navigation(document.querySelector('.boxnav'), {
							next: () => this.navigate('right'),
							prev: () => this.navigate('left')
						});
						// The details ctrl button.
						this.DOM.detailsCtrl = document.querySelector('.action--details');
						// The details container.
						this.DOM.detailsWrap = document.querySelector('.details-wrap');
						// Each group of details boxes for each slide/product.
						this.DOM.details = Array.from(this.DOM.detailsWrap.querySelectorAll('.details'));
						// The slides.
						this.slides = [];
						// Initialize/Create the slides instances.
						Array.from(this.DOM.el.querySelectorAll('.slide')).forEach((slideEl, pos) => this.slides.push(new Slide(slideEl, {
							// this slide's details element.
							detailsEl: this.DOM.details[pos],
							// When clicking the close details ctrl button call the closeDetailsBoxes function.
							onHideDetails: () => {
								if (this.isAnimating) return;
								this.isAnimating = true;
								this.closeDetailsBoxes().then(() => this.isAnimating = false);
							}
						})));
						// The total number of slides.
						this.slidesTotal = this.slides.length;
						// Set the total number of slides in the navigation box.
						this.navigation.setTotal(this.slidesTotal);
						// At least 2 slides to continue...
						if (this.slidesTotal < 2) {
							return false;
						}
						// Current slide position.
						this.current = 0;
						// Initialize the slideshow.
						this.init();
					}
					// Set the current slide and initialize some events.
					init() {
						this.slides[this.current].setCurrent();
						this.initEvents();
					}
					initEvents() {
						// Open the details boxes.
						this.DOM.detailsCtrl.addEventListener('click', () => this.openDetailsBoxes());
					}
					openDetailsBoxes() {
						if (this.isAnimating) return;
						this.isAnimating = true;

						// Overlay
						this.DOM.el.classList.add('slideshow--details');

						this.DOM.detailsWrap.classList.add('details-wrap--open');
						this.DOM.details[this.current].classList.add('details--current');
						this.slides[this.current].showDetails().then(() => this.isAnimating = false);
					}
					closeDetailsBoxes() {
						return new Promise((resolve, reject) => {
							// Overlay.
							this.DOM.el.classList.remove('slideshow--details');
							this.slides[this.current].hideDetails().then(() => {
								this.DOM.details[this.current].classList.remove('details--current');
								this.DOM.detailsWrap.classList.remove('details-wrap--open');
								resolve()
							});
						});
					}
					// Navigate the slideshow.
					navigate(direction) {
						// If animating return.
						if (this.isAnimating) return;
						this.isAnimating = true;

						// The next/prev slide´s position.
						const nextSlidePos = direction === 'right' ?
							this.current < this.slidesTotal - 1 ? this.current + 1 : 0 :
							this.current > 0 ? this.current - 1 : this.slidesTotal - 1;

						// Close the details boxes (if open) and then hide the current slide and show the next/previous one.
						this.closeDetailsBoxes().then(() => {
							// Update the current page element.
							this.navigation.setCurrent(nextSlidePos + 1, direction);

							Promise.all([this.slides[this.current].hide(direction), this.slides[nextSlidePos].show(direction)])
								.then(() => {
									// Update current.
									this.slides[this.current].setCurrent(false);
									this.current = nextSlidePos;
									this.slides[this.current].setCurrent();
									this.isAnimating = false;
								});
						});
					}
				}

				// Initialize the slideshow
				const slideshow = new Slideshow(document.querySelector('.slideshow'));
			}

			// scroll to 2th section
			{
				const scrollButton = top.find('.top__ui-scroll');
				const scrollTarget = $('[data-scroll]');
				const scrollTargetOffsetTop = scrollTarget.offset().top;

				scrollButton.on('click', function (event) {
					console.log(scrollTargetOffsetTop);

					$([document.documentElement, document.body]).animate({
						scrollTop: scrollTargetOffsetTop,
					}, 600, $.bez([0.65, 0, 0.35, 1]));
				});
			}

			// parallax
			{
				const background = top.find('.top__background');

				$(window).on('scroll', function () {
					if ($(this).scrollTop() <= top.offset().top + top.height()) {
						const parallax = ($(this).scrollTop() - background.offset().top) / PARALLAX_RATIO;

						background.css('transform', `translateY(${parallax}px)`);
					}
				});
			}
		}
	});
}

// smooth scroll
{
	$(window).on('load', () => {
		SmoothScroll();
	});
}

// video
{
	$(() => {
		const component = $('.news-detail__video');

		component.each(function () {
			const video = $(this).find('.news-detail__video-video');
			const play = $(this).find('.news-detail__video-play');

			play.on('click', () => {
				play.addClass('news-detail__video-play--hide');

				video[0].play();
				video.attr('controls', '');
			});
		});
	});
}

// about
{
	$(() => {
		const background = $('.about__background');

		if (background.length !== 0) {
			$(window).on('scroll', function () {
				const parallax = $(this).scrollTop() / 5;

				background.css('top', `${parallax}px`);
			});
		}
	});
}

// panel
{
	$(() => {
		const panelButtons = $('[data-section]')

		if (panelButtons.length) {
			const MOVE_DURATION = 650

			// panel button click
			panelButtons.on('click', function (event) {
				event.preventDefault()

				const activeIndex = [...document.querySelectorAll('[data-section]')].indexOf(this)
				try {
					$('html, body').animate({ 
						scrollTop: $(`.sections__block:nth-child(${activeIndex + 1})`).offset().top - 100
					}, MOVE_DURATION)
				} catch {}
			})

			// scroll y
			let prevScrollY = null
			let nextScrollY = pageYOffset

			function updateScrollY() {
				prevScrollY = nextScrollY
				nextScrollY = pageYOffset
			}

			updateScrollY()

			window.addEventListener('load', updateScrollY)
			window.addEventListener('resize', updateScrollY)
			window.addEventListener('scroll', updateScrollY)

			// sections y
			let blocksY = null

			function getBlockY(block) {
				const blockRect = block.getBoundingClientRect()
				return blockRect.y + pageYOffset
			}
			function getBlocksY() {
				const blocksY = []

				const blocks = document.querySelectorAll('.sections__block')
				blocks.forEach(block => blocksY.push(getBlockY(block)))

				return blocksY
			}
			function updateBlocksY() {
				blocksY = getBlocksY()
			}

			updateBlocksY()
		
			window.addEventListener('load', updateBlocksY)
			window.addEventListener('resize', updateBlocksY)
			window.addEventListener('scroll', updateBlocksY)

			// panel active item
			function updatePanelActiveItem() {
				let activeIndex = blocksY.findIndex((blockY) => {
					return (nextScrollY + 100) < blockY
				})
				if (activeIndex === 0) {
					activeIndex = 1
				} else if (activeIndex < 0) {
					activeIndex = blocksY.length
				}

				$('.panel__item').removeClass('panel__item--active')
				$(`.panel__item:nth-child(${activeIndex})`).addClass('panel__item--active')
			}

			updatePanelActiveItem()

			window.addEventListener('load', updatePanelActiveItem)
			window.addEventListener('resize', updatePanelActiveItem)
			window.addEventListener('scroll', updatePanelActiveItem)
		}
	})
}
