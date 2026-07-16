document.addEventListener('DOMContentLoaded', () => {
     initPartnersTabs();
     initProductLineTabs();
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