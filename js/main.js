"use strict";

const body = document.body
const header = document.querySelector('.header')
const menuBurger = document.querySelector('.header__burger')
const hmLinks = document.querySelectorAll('.header-nav li a')


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




// кнопка наверх

const upButton = document.querySelector( ".up-btn" );

window.addEventListener( "scroll", () => {
  if ( window.scrollY > 200 ) {
    upButton.classList.remove( "hide" );
  } else {
    upButton.classList.add( "hide" );
  }
} );

upButton.addEventListener( "click", () => {
  window.scrollTo( {
    top: 0,
    behavior: "smooth"
  } );
} );




// faq 

const faqItems = document.querySelectorAll( ".faq-item" );

faqItems.forEach( ( item ) => {
  const question = item.querySelector( ".faq-item__question" );
  const answer = item.querySelector( ".faq-item__answer" );

  question.addEventListener( "click", () => {

    if ( answer.style.maxHeight ) {
      answer.style.maxHeight = null;
      item.classList.remove('faq-item--active');
    } else {
      answer.style.maxHeight = answer.scrollHeight + "px";
      item.classList.add('faq-item--active');
    }
  } );
} );


// переход к секции с заявкой

document.querySelectorAll('[data-modal="request"]').forEach((button) => {
  button.addEventListener('click', () => {
    const target = document.getElementById('request');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});