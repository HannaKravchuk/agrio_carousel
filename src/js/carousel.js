export function initCarousel() {
  const carousel = document.querySelector('.carousel__track');
  carousel.setAttribute('tabindex', '-1');
  const leftArrow = document.querySelector('.carousel__arrow--left');
  const rightArrow = document.querySelector('.carousel__arrow--right');
  const items = document.querySelectorAll('.carousel__item');
  const gap = parseInt(getComputedStyle(carousel).gap) || 0;

  items.forEach(item => {
  item.classList.add('carousel__item--original');
  const clone = item.cloneNode(true);
  carousel.appendChild(clone);
  });

  function getItemWidth() {
    if (items.length === 0) return 0;
    return items[0].getBoundingClientRect().width + gap;
  }

  function updateArrows() {
  const containerWidth = carousel.offsetWidth;
  let contentWidth = 0;

  const originalItems = carousel.querySelectorAll('.carousel__item--original');
  const itemCount = originalItems.length;
  const minItemsToScroll = 3; 

  originalItems.forEach(item => {
    contentWidth += item.getBoundingClientRect().width + gap;
  });

  const carouselContainer = carousel.closest('.carousel__container');

  if (itemCount < minItemsToScroll || contentWidth <= containerWidth) {
    leftArrow.style.display = 'none';
    rightArrow.style.display = 'none';
    carouselContainer.classList.add('carousel--no-scroll');
  } else {
    leftArrow.style.display = 'block';
    rightArrow.style.display = 'block';
    carouselContainer.classList.remove('carousel--no-scroll');
  }
}

  leftArrow.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  });

  rightArrow.addEventListener('click', () => {
    const itemWidth = getItemWidth();
    carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
    setTimeout(checkScrollPosition, 300);
  });

  function checkScrollPosition() {
    const scrollWidth = carousel.scrollWidth;
    const halfWidth = scrollWidth / 2;
    const threshold = 5;

    if (carousel.scrollLeft >= halfWidth - threshold) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = carousel.scrollLeft - halfWidth;
      carousel.style.scrollBehavior = 'smooth';
    } else if (carousel.scrollLeft <= threshold) {
      carousel.style.scrollBehavior = 'auto';
      carousel.scrollLeft = carousel.scrollLeft + halfWidth;
      carousel.style.scrollBehavior = 'smooth';
    }
  }

  let isDown = false;
  let startX;
  let scrollLeftStart;

  carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeftStart = carousel.scrollLeft;
  });

  carousel.addEventListener('mouseleave', () => {
    isDown = false;
  });

  carousel.addEventListener('mouseup', () => {
    isDown = false;
    checkScrollPosition();
  });

  carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeftStart - walk;
  });

  carousel.addEventListener('touchstart', (e) => {
    isDown = true;
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeftStart = carousel.scrollLeft;
  });

  carousel.addEventListener('touchend', () => {
    isDown = false;
    checkScrollPosition();
  });

  carousel.addEventListener('touchmove', (e) => {
    if (!isDown) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeftStart - walk;
  });

  document.addEventListener('keydown', (event) => {
  if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
    event.preventDefault();
    const itemWidth = getItemWidth();
    if (event.key === 'ArrowLeft') {
      carousel.scrollBy({ left: -itemWidth, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
    if (event.key === 'ArrowRight') {
      carousel.scrollBy({ left: itemWidth, behavior: 'smooth' });
      setTimeout(checkScrollPosition, 300);
    }
  }
});

  carousel.addEventListener('scroll', () => {
    updateArrows();
  });

  window.addEventListener('resize', () => {
    updateArrows();
  });

  updateArrows();
}
