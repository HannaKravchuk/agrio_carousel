const CONFIG = {
  DEBOUNCE_TIMEOUT: 100,
  SCROLL_CHECK_DELAY: 300,
  SWIPE_SENSITIVITY: 2
};

const SELECTORS = {
  CAROUSEL: '.carousel__track',
  LEFT_ARROW: '.carousel__arrow--left',
  RIGHT_ARROW: '.carousel__arrow--right',
  ITEM: '.carousel__item',
  CONTAINER: '.carousel__container',
  NO_SCROLL: 'carousel--no-scroll'
};

const state = {
  isDragging: false,
  startX: 0,
  scrollStart: 0,
  timer: null,
  elements: {
    carousel: null,
    leftArrow: null,
    rightArrow: null,
    container: null,
    viewAllButton: null
  }
};

function initializeElements() {
  state.elements.carousel = document.querySelector(SELECTORS.CAROUSEL);
  if (!state.elements.carousel) return false;

  state.elements.carousel.setAttribute('tabindex', '-1');
  state.elements.leftArrow = document.querySelector(SELECTORS.LEFT_ARROW);
  state.elements.rightArrow = document.querySelector(SELECTORS.RIGHT_ARROW);
  state.elements.container = state.elements.carousel.closest(SELECTORS.CONTAINER);
  state.elements.viewAllButton = document.querySelector('.carousel__view-all');

  return true;
}

function getItemWidth() {
  const item = state.elements.carousel.querySelector(SELECTORS.ITEM);
  if (!item) return 0;
  const gap = parseInt(getComputedStyle(state.elements.carousel).gap) || 0;
  return item.getBoundingClientRect().width + gap;
}

function scrollCarousel(direction) {
  const itemWidth = getItemWidth();
  const scrollAmount = direction === 'prev' ? -itemWidth : itemWidth;

  state.elements.carousel.scrollBy({
    left: scrollAmount,
    behavior: 'smooth'
  });
}

function handleDragStart(e) {
  state.isDragging = true;
  state.startX = e.pageX || e.touches[0].pageX;
  state.scrollStart = state.elements.carousel.scrollLeft;
}

function handleDragMove(e) {
  if (!state.isDragging) return;

  const x = e.pageX || e.touches[0].pageX;
  const walk = (x - state.startX) * CONFIG.SWIPE_SENSITIVITY;
  state.elements.carousel.scrollLeft = state.scrollStart - walk;
}

function handleDragEnd() {
  state.isDragging = false;
}

function handleKeyDown(e) {
  if (['ArrowLeft', 'ArrowRight'].includes(e.key)) {
    e.preventDefault();
    scrollCarousel(e.key === 'ArrowLeft' ? 'prev' : 'next');
  }
}

function updateArrowsVisibility() {
  const { carousel, container, leftArrow, rightArrow } = state.elements;
  const containerWidth = container.offsetWidth;
  const contentWidth = carousel.scrollWidth;

  const shouldHideArrows = contentWidth <= containerWidth;

  leftArrow.style.display = shouldHideArrows ? 'none' : 'block';
  rightArrow.style.display = shouldHideArrows ? 'none' : 'block';
  container.classList.toggle(SELECTORS.NO_SCROLL, shouldHideArrows);
}

function setupEventListeners() {
  const { carousel, leftArrow, rightArrow } = state.elements;

  leftArrow.addEventListener('click', () => scrollCarousel('prev'));
  rightArrow.addEventListener('click', () => scrollCarousel('next'));

  carousel.addEventListener('mousedown', handleDragStart);
  carousel.addEventListener('mousemove', handleDragMove);
  carousel.addEventListener('mouseup', handleDragEnd);
  carousel.addEventListener('mouseleave', () => state.isDragging = false);

  carousel.addEventListener('touchstart', handleDragStart);
  carousel.addEventListener('touchmove', handleDragMove);
  carousel.addEventListener('touchend', handleDragEnd);

  document.addEventListener('keydown', handleKeyDown);

  carousel.addEventListener('scroll', debounce(updateArrowsVisibility));
  window.addEventListener('resize', debounce(updateArrowsVisibility));
}

function handleViewAllClick(e) {
  e.preventDefault();

  const container = state.elements.container;
  const viewAllButton = state.elements.viewAllButton;

  if (container.classList.contains('carousel__container--expanded')) {
    container.classList.remove('carousel__container--expanded');
    updateArrowsVisibility();
    viewAllButton.textContent = 'Bekijk alles >';
  } else {
    container.classList.add('carousel__container--expanded');
    viewAllButton.textContent = '< Verberg';
  }
}

function setupViewAllButton() {
  const viewAllButton = state.elements.viewAllButton;
  if (viewAllButton) {
    viewAllButton.addEventListener('click', handleViewAllClick);
  }
}

export function initCarousel() {
  if (!initializeElements()) return;

  setupEventListeners();
  updateArrowsVisibility();
  setupViewAllButton();
}

function debounce(func, timeout = CONFIG.DEBOUNCE_TIMEOUT) {
  return (...args) => {
    clearTimeout(state.timer);
    state.timer = setTimeout(() => func.apply(this, args), timeout);
  };
}
