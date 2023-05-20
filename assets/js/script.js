'use strict';

/*** PRELOAD   loading will be end after document is loaded*/

const preloader = document.querySelector("[data-preaload]");// Отримання посилання на елемент прелоадера за допомогою атрибута "data-preaload"

// Додавання обробника події "load" до вікна
window.addEventListener("load", function () {
  preloader.classList.add("loaded");// Додавання класу "loaded" до елемента прелоадера
  document.body.classList.add("loaded");// Додавання класу "loaded" до елемента <body> (тіла документу)
});

/*** add event listener on multiple elements*/

// Функція для додавання обробників подій до елементів
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}
   
/*** NAVBAR*/

const navbar = document.querySelector("[data-navbar]");// Отримання посилання на елемент навігаційного меню за допомогою атрибута "data-navbar"
const navTogglers = document.querySelectorAll("[data-nav-toggler]");// Отримання посилань на елементи переключателів навігаційного меню за допомогою атрибута "data-nav-toggler"
const overlay = document.querySelector("[data-overlay]");// Отримання посилання на елемент оверлею за допомогою атрибута "data-overlay"
 
// Функція для перемикання видимості навігаційного меню
const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}
  
// Додавання обробника події "click" до елементів переключателів навігаційного меню
addEventOnElements(navTogglers, "click", toggleNavbar);
  
  
/*** HEADER & BACK TOP BTN*/
  
const header = document.querySelector("[data-header]");// Отримання посилання на елемент заголовка за допомогою атрибута "data-header"
const backTopBtn = document.querySelector("[data-back-top-btn]");// Отримання посилання на елемент кнопки "Наверх" за допомогою атрибута "data-back-top-btn"
  
let lastScrollPos = 0;// Змінна, що зберігає попереднє значення позиції прокрутки
  
// Функція для приховування/показу заголовка в залежності від напрямку прокрутки
const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}
 
// Додавання обробника події "scroll" до вікна
window.addEventListener("scroll", function () {
  // Перевірка, якщо прокрутка сторінки досягла або перевищила 50 пікселів
  if (window.scrollY >= 50) {
    header.classList.add("active");// Додавання класу "active" до заголовка
    backTopBtn.classList.add("active");// Додавання класу "active" до кнопки "Наверх"
    hideHeader();// Виклик функції для приховування/показу заголовка
  } else {
    header.classList.remove("active");// Видалення класу "active" з заголовка
    backTopBtn.classList.remove("active");// Видалення класу "active" з кнопки "Наверх"
  }
});

/*** HERO SLIDER*/

const heroSlider = document.querySelector("[data-hero-slider]");// Отримання посилання на елемент головного слайдера за допомогою атрибута "data-hero-slider"
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");// Отримання посилань на елементи слайдів головного слайдера за допомогою атрибута "data-hero-slider-item"
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");// Отримання посилання на елемент кнопки "Попередній слайд" за допомогою атрибута "data-prev-btn"
const heroSliderNextBtn = document.querySelector("[data-next-btn]");// Отримання посилання на елемент кнопки "Наступний слайд" за допомогою атрибута "data-next-btn"

let currentSlidePos = 0;// Змінна, що зберігає поточну позицію слайда
let lastActiveSliderItem = heroSliderItems[0];// Змінна, що зберігає останній активний елемент слайду

// Функція для оновлення позиції слайду
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");// Видалення класу "active" з останнього активного елемента слайду
  heroSliderItems[currentSlidePos].classList.add("active");// Додавання класу "active" до поточного елемента слайду
  lastActiveSliderItem = heroSliderItems[currentSlidePos];// Оновлення останнього активного елемента слайду
}

// Функція для перемикання наступного слайда
const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos(); // Оновлення позиції слайду
}

heroSliderNextBtn.addEventListener("click", slideNext);

// Функція для перемикання до попереднього слайда
const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}
// Додавання обробника події "click" до кнопки "Попередній слайд"
heroSliderPrevBtn.addEventListener("click", slidePrev);

/*** auto slide*/

// Змінна для зберігання інтервалу автоматичної прокрутки
let autoSlideInterval;

// Функція для автоматичної прокрутки до наступного слайда
const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

// Додавання обробника події "mouseover" до кнопок "Наступний слайд" і "Попередній слайд"
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval); // Зупинка автоматичної прокрутки при наведенні на кнопки
});

// Додавання обробника події "mouseout" до кнопок "Наступний слайд" і "Попередній слайд"
addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide); // Відновлення автоматичної прокрутки після відведення курсора від кнопок

// Додавання обробника події "load" до вікна
window.addEventListener("load", autoSlide); // Запуск автоматичної прокрутки при завантаженні сторінки


/*** PARALLAX EFFECT*/

// Отримання посилань на елементи з атрибутом "data-parallax-item"
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

// Додавання обробника події "mousemove" до вікна
window.addEventListener("mousemove", function (event) {
  // Отримання координат курсора миші відносно вікна
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // Реверс числа, наприклад, 20 стає -20, -5 стає 5
  x = x - (x * 2);
  y = y - (y * 2);

  // Прохід по всіх елементах з атрибутом "data-parallax-item"
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    // Множення координат на швидкість паралаксу, отриману з атрибута "data-parallax-speed"
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    // Застосування перетворення до стилю "transform" елемента
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }
});


/*** Pop UP*/
const modal = document.querySelector('.modal');
const modalOverlay = document.querySelector('.modal__overlay');
const closeBtn = document.querySelector('.modal__close-btn');
const discountBtn = document.querySelector('.modal__button');
// ---- ---- cookies ---- ---- //
const createCookie = () => {
  let maxAge = ';max-age=10';
  let path = ';path=/';
  document.cookie = 'modalpopup=displayed' + maxAge + path;
};

// ---- ---- add active and cookie ---- ---- //
const displayModal = () => {
  if (document.cookie.indexOf('modalpopup') == -1) {
    modal.classList.add('active');
    modalOverlay.classList.add('active');
    createCookie();
  }
};
// Виклик функції displayModal через 2 секунди
setTimeout(() => {
  displayModal();
}, 2000);
// Приховання спливаючого вікна при натисканні на кнопку закриття або знижку
// ---- ---- remove active ---- ---- //
closeBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
});
discountBtn.addEventListener('click', () => {
  modal.classList.remove('active');
  modalOverlay.classList.remove('active');
});
