!function(e){function a(a){for(var r,l,i=a[0],d=a[1],c=a[2],u=0,f=[];u<i.length;u++)l=i[u],Object.prototype.hasOwnProperty.call(n,l)&&n[l]&&f.push(n[l][0]),n[l]=0;for(r in d)Object.prototype.hasOwnProperty.call(d,r)&&(e[r]=d[r]);for(s&&s(a);f.length;)f.shift()();return o.push.apply(o,c||[]),t()}function t(){for(var e,a=0;a<o.length;a++){for(var t=o[a],r=!0,i=1;i<t.length;i++){var d=t[i];0!==n[d]&&(r=!1)}r&&(o.splice(a--,1),e=l(l.s=t[0]))}return e}var r={},n={0:0},o=[];function l(a){if(r[a])return r[a].exports;var t=r[a]={i:a,l:!1,exports:{}};return e[a].call(t.exports,t,t.exports,l),t.l=!0,t.exports}l.m=e,l.c=r,l.d=function(e,a,t){l.o(e,a)||Object.defineProperty(e,a,{enumerable:!0,get:t})},l.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},l.t=function(e,a){if(1&a&&(e=l(e)),8&a)return e;if(4&a&&"object"==typeof e&&e&&e.__esModule)return e;var t=Object.create(null);if(l.r(t),Object.defineProperty(t,"default",{enumerable:!0,value:e}),2&a&&"string"!=typeof e)for(var r in e)l.d(t,r,function(a){return e[a]}.bind(null,r));return t},l.n=function(e){var a=e&&e.__esModule?function(){return e.default}:function(){return e};return l.d(a,"a",a),a},l.o=function(e,a){return Object.prototype.hasOwnProperty.call(e,a)},l.p="";var i=window.webpackJsonp=window.webpackJsonp||[],d=i.push.bind(i);i.push=a,i=i.slice();for(var c=0;c<i.length;c++)a(i[c]);var s=d;o.push([1,1]),t()}([,function(e,a,t){"use strict";t.r(a),function(e){t(3);var a=t(0);e((function(){e(".slider").each((function(){var t,r,n,o=e(this),l=o.data("slider-id"),i=o.find(".slider__swiper"),d=o.data("slider-prev-id"),c=o.data("slider-next-id"),s=null;switch(l){case 7:s=new a.a(i[0],{spaceBetween:-1,slidesPerView:"auto"});break;default:s=new a.a(i[0],{spaceBetween:20,slidesPerView:"auto",breakpoints:(t={},r=1024,n={spaceBetween:40},r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t)})}e('[data-slider-id="'+d+'"]').on("click",(function(){s.slidePrev()})),e('[data-slider-id="'+c+'"]').on("click",(function(){s.slideNext()}))}))}));var r=function a(){e(window).off("scroll.header");var t=setTimeout((function(){o?window.pageYOffset<1&&(e(".header").removeClass("header--scroll"),o=!1):window.pageYOffset>=1&&(e(".header").addClass("header--scroll"),o=!0),e(window).on("scroll.header",a),clearTimeout(t)}),n)},n=1e3/30,o=!1;e((function(){var a=e(".header"),t=a.find(".header__modal"),n=null;if(0!==a.length){var l=function(){a.removeClass("header--modal"),a.removeClass("header--modal--"+n),a.find("."+n).removeClass(n+"--active"),n=null};window.pageYOffset>=1&&(a.addClass("header--scroll"),o=!0),e(window).on("scroll.header",r),a.find("[data-header-modal]").on("click",(function(){n?n===e(this).data("header-modal")&&l():(n=e(this).data("header-modal"),a.addClass("header--modal"),a.addClass("header--modal--"+n),a.find("."+n).addClass(n+"--active"))})),t.on("click",(function(e){e.target===e.currentTarget&&l()}))}})),e((function(){var a=e(".header-catalog");0!==a.length&&a.find(".header-catalog__panel-text").on("click",(function(){console.log(987);var a=e(this).closest(".header-catalog__panel-item").index();e(".header-catalog__panel-item").removeClass("header-catalog__panel-item--active"),e(".header-catalog__tabs-item").removeClass("header-catalog__tabs-item--active"),e(".header-catalog__panel-item").eq(a).addClass("header-catalog__panel-item--active"),e(".header-catalog__tabs-item").eq(a).addClass("header-catalog__tabs-item--active")}))}))}.call(this,t(2))},,function(e,a,t){}]);