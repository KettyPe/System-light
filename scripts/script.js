'use strict';

document.addEventListener('DOMContentLoaded', () => {
     initPartnersTabs();
     initProductLineTabs();

     const faqItems = document.querySelectorAll('.faq-direction-pg__item');

     faqItems.forEach((item) => {
          const trigger = item.querySelector('.faq-direction-pg__trigger');
          const content = item.querySelector('.faq-direction-pg__content');

          if (item.classList.contains('faq-direction-pg__item--active')) {
               content.style.maxHeight = content.scrollHeight + 'px';
          }

          trigger.addEventListener('click', () => {
               const isActive = item.classList.contains('faq-direction-pg__item--active');

               faqItems.forEach((otherItem) => {
                    otherItem.classList.remove('faq-direction-pg__item--active');
                    const otherContent = otherItem.querySelector('.faq-direction-pg__content');
                    otherContent.style.maxHeight = null;
               });

               if (!isActive) {
                    item.classList.add('faq-direction-pg__item--active');
                    content.style.maxHeight = content.scrollHeight + 'px';
               }
          });
     });

     const projectsSwiper = new Swiper('.projects-direction-pg__slider', {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: true,
          speed: 500,
          navigation: {
               nextEl: '.projects-direction-pg__nav-btn--next',
               prevEl: '.projects-direction-pg__nav-btn--prev',
          },

          pagination: {
               el: '.projects-direction-pg__dotts',
               clickable: true,
               type: 'bullets'
          },

          breakpoints: {
               640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
               },
               1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
               },
               1280: {
                    slidesPerView: 4,
                    spaceBetween: 30,
               },
          },
     });

     const directionsSwiper = new Swiper('.directions-directions-pg__slider', {
          slidesPerView: 2,
          spaceBetween: 20,
          loop: true,
          navigation: {
               nextEl: '.directions-directions-pg__nav-btn--next',
               prevEl: '.directions-directions-pg__nav-btn--prev',
          },

          pagination: {
               el: '.directions-directions-pg__dotts',
               clickable: true,
               type: 'bullets'
          },

          breakpoints: {
               576: {
                    slidesPerView: 2,
                    spaceBetween: 20,
               },
               992: {
                    slidesPerView: 3,
                    spaceBetween: 30,
               },
               1200: {
                    slidesPerView: 4,
                    spaceBetween: 30,
               },
          },
     });

     const heroSlider = new Swiper('.hero-directions-pg__slider', {
          loop: true,
          speed: 800,
          parallax: true,
          autoplay: {
               delay: 4000,
               disableOnInteraction: false,
          },
          pagination: {
               el: '.hero-directions-pg__dotts',
               clickable: true,
          },
          on: {
               init: function () {
                    updateBadge(this);
               },
               slideChange: function () {
                    updateBadge(this);
               },
          },
     });

     function updateBadge(swiper) {
          const badge = document.querySelector('.hero-directions-pg__badge');
          if (!badge) return;

          const total = swiper.slides.filter(
               (slide) => !slide.classList.contains('swiper-slide-duplicate')
          ).length;

          const current = swiper.realIndex + 1;

          badge.textContent = `${current} из ${total}`;
     }
});

function createTabImageSwitcher({ items, image, resetZone, activeClass = 'is-active' }) {
     if (!items || !items.length || !image) return;

     const defaultSrc = image.getAttribute('src');
     const defaultAlt = image.getAttribute('alt');
     const defaultItem = Array.from(items).find((item) => item.classList.contains(activeClass)) || items[0];

     const isHoverCapable = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

     function setImage(src, alt) {
          if (!src || image.getAttribute('src') === src) return;
          image.style.opacity = '0';
          window.setTimeout(() => {
               image.setAttribute('src', src);
               if (alt) image.setAttribute('alt', alt);
               image.style.opacity = '1';
          }, 200);
     }

     function setActiveItem(activeItem) {
          items.forEach((item) => item.classList.remove(activeClass));
          activeItem.classList.add(activeClass);
     }

     if (isHoverCapable) {
          items.forEach((item) => {
               item.addEventListener('mouseenter', () => {
                    setActiveItem(item);
                    setImage(item.dataset.image, item.dataset.alt);
               });
          });

          resetZone?.addEventListener('mouseleave', () => {
               setActiveItem(defaultItem);
               setImage(defaultSrc, defaultAlt);
          });
     } else {
          items.forEach((item) => {
               item.addEventListener('click', (event) => {
                    event.preventDefault();
                    setActiveItem(item);
                    setImage(item.dataset.image, item.dataset.alt);
               });
          });
     }
}

function initPartnersTabs() {
     const section = document.querySelector('.partners-section');
     if (!section) return;

     createTabImageSwitcher({
          items: section.querySelectorAll('.partners-section__item'),
          image: section.querySelector('.partners-section__image'),
          resetZone: section.querySelector('.partners-section__list'),
     });
}

function initProductLineTabs() {
     const cards = document.querySelectorAll('.product-line-card');

     cards.forEach((card) => {
          createTabImageSwitcher({
               items: card.querySelectorAll('.product-line-card__item'),
               image: card.querySelector('.product-line-card__image'),
               resetZone: card.querySelector('.product-line-card__body'),
          });
     });
}