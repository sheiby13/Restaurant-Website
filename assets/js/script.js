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

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);


