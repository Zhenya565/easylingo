"use strict";

const body = document.body
const header = document.querySelector('.header')
const menuBurger = document.querySelector('.header__burger')
const hmLinks = document.querySelectorAll('.header-nav ul li a')


// Mobile menu
if (menuBurger) {
  menuBurger.onclick = function () {
    body.classList.toggle("no-scroll");
    menuBurger.classList.toggle("open");
    header.classList.toggle("mobile-menu-opened");
  };
};


for (let link of hmLinks) {
  link.addEventListener('click', () => {
    body.classList.remove("no-scroll");
    menuBurger.classList.remove("open");
    header.classList.remove("mobile-menu-opened");
  })
}