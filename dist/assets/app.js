!function(e){function a(a){for(var t,o,d=a[0],c=a[1],s=a[2],u=0,f=[];u<d.length;u++)o=d[u],Object.prototype.hasOwnProperty.call(i,o)&&i[o]&&f.push(i[o][0]),i[o]=0;for(t in c)Object.prototype.hasOwnProperty.call(c,t)&&(e[t]=c[t]);for(l&&l(a);f.length;)f.shift()();return r.push.apply(r,s||[]),n()}function n(){for(var e,a=0;a<r.length;a++){for(var n=r[a],t=!0,d=1;d<n.length;d++){var c=n[d];0!==i[c]&&(t=!1)}t&&(r.splice(a--,1),e=o(o.s=n[0]))}return e}var t={},i={0:0},r=[];function o(a){if(t[a])return t[a].exports;var n=t[a]={i:a,l:!1,exports:{}};return e[a].call(n.exports,n,n.exports,o),n.l=!0,n.exports}o.m=e,o.c=t,o.d=function(e,a,n){o.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:n})},o.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,a){if(1&a&&(e=o(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var t in e)o.d(n,t,function(a){return e[a]}.bind(null,t));return n},o.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return o.d(a,"a",a),a},o.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},o.p="";var d=window.webpackJsonp=window.webpackJsonp||[],c=d.push.bind(d);d.push=a,d=d.slice();for(var s=0;s<d.length;s++)a(d[s]);var l=c;r.push([1,1]),n()}([,function(e,a,n){"use strict";n.r(a),function(e){n(3);var a=n(0);function t(e,a,n){return a in e?Object.defineProperty(e,a,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[a]=n,e}e((function(){e(".slider").each((function(){var n=e(this),i=n.data("slider-id"),r=n.find(".slider__swiper"),o=n.data("slider-prev-id"),d=n.data("slider-next-id"),c=null;switch(i){case 7:c=new a.a(r[0],{spaceBetween:-1,slidesPerView:"auto"});break;case 10:default:c=new a.a(r[0],{spaceBetween:20,slidesPerView:"auto",breakpoints:t({},1024,{spaceBetween:40})})}e('[data-slider-id="'+o+'"]').on("click",(function(){c.slidePrev()})),e('[data-slider-id="'+d+'"]').on("click",(function(){c.slideNext()}))}))}));var i=function a(){e(window).off("scroll.header");var n=setTimeout((function(){o?window.pageYOffset<1&&(e(".header").removeClass("header--scroll"),o=!1):window.pageYOffset>=1&&(e(".header").addClass("header--scroll"),o=!0),e(window).on("scroll.header",a),clearTimeout(n)}),r)},r=1e3/30,o=!1;e((function(){var a=e(".header"),n=a.find(".header__modal"),t=null;if(0!==a.length){var r=function(){null!==t&&(a.removeClass("header--modal"),a.removeClass("header--modal--"+t),a.find("."+t).removeClass(t+"--active"),t=null)};window.pageYOffset>=1&&(a.addClass("header--scroll"),o=!0),e(window).on("scroll.header",i),a.find("[data-header-modal]").on("click",(function(){t?t===e(this).data("header-modal")&&r():function(e){t=e,a.addClass("header--modal"),a.addClass("header--modal--"+t),a.find("."+t).addClass(t+"--active")}(e(this).data("header-modal"))})),n.on("click",(function(e){e.target===e.currentTarget&&r()})),window.matchMedia("(min-width: ".concat(1024,"px)")).addEventListener("change",(function(){r()}));var d=a.find(".header__search-button"),c=a.find(".header__search-modal");d.on("click",(function(){c.addClass("header__search-modal--active")})),c.on("click",(function(e){e.target===e.currentTarget&&c.removeClass("header__search-modal--active")}));var s=c.find(".search-modal");s.find(".search-modal__close-button").on("click",(function(){c.removeClass("header__search-modal--active")}));var l=s.find(".search-modal__input"),u=s.find(".search-modal__label");l.on("focus",(function(){u.css("display","none")})),l.on("blur",(function(){""===l.val().trim()&&(u.css("display",""),l.val(""))}))}})),e((function(){var a=e(".header-catalog");0!==a.length&&a.find(".header-catalog__panel-text").on("click",(function(){var a=e(this).closest(".header-catalog__panel-item").index();e(".header-catalog__panel-item").removeClass("header-catalog__panel-item--active"),e(".header-catalog__tabs-item").removeClass("header-catalog__tabs-item--active"),e(".header-catalog__panel-item").eq(a).addClass("header-catalog__panel-item--active"),e(".header-catalog__tabs-item").eq(a).addClass("header-catalog__tabs-item--active")}))})),e((function(){var a=e(".header-menu");if(0!==a.length){var n=a.find(".header-menu__catalog");n.find(".header-menu__catalog-button").on("click",(function(){n.find(".header-menu__catalog-dropdown").slideToggle(650),n.toggleClass("header-menu__catalog--active")})),a.find(".header-menu__section").find(".header-menu__section-button").on("click",(function(){var a=e(this).closest(".header-menu__section");a.hasClass("header-menu__section--active")?(a.find(".header-menu__section-dropdown").slideUp(650),a.removeClass("header-menu__section--active")):(e(".header-menu__section--active").find(".header-menu__section-dropdown").slideUp(650),e(".header-menu__section--active").removeClass("header-menu__section--active"),a.find(".header-menu__section-dropdown").slideDown(650),a.addClass("header-menu__section--active"))}))}}));e((function(){if(window.matchMedia("(max-width: ".concat(1023,"px)")).matches){var a=e(".nav-card");0!==a.length&&a.each((function(){var a=e(this).find(".nav-card__item"),n=a.length,t=e(this).find(".nav-card__button");if(n<=4)t.css("display","none");else{a.css("display","none"),a.slice(0,4).css("display","");var i=!1;t.on("click",(function(){i?(a.css("display","none"),a.slice(0,4).css("display",""),e(this).removeClass("nav-card__button--active"),e(this).find(".nav-card__button-text").text("показать все")):(a.css("display",""),e(this).addClass("nav-card__button--active"),e(this).find(".nav-card__button-text").text("свернуть")),i=!i}))}}))}}))}.call(this,n(2))},,function(e,a,n){}]);