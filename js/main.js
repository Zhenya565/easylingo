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



// переключение вкладок

document.querySelectorAll( '.courses-box' ).forEach( ( box ) => {
  const tabButtons = box.querySelectorAll( '.courses-level-btn' );
  const tabContents = box.querySelectorAll( '.courses-tab' );

  tabButtons.forEach( ( button ) => {
    button.addEventListener( 'click', () => {
      // Удалить активные классы у всех кнопок
      tabButtons.forEach( ( btn ) => btn.classList.remove( 'courses-level-btn--active' ) );
      button.classList.add( 'courses-level-btn--active' );

      // Определить тип уровня из класса
      const levelClass = Array.from( button.classList ).find( cls =>
        cls.startsWith( 'courses-level-btn--' ) && cls !== 'courses-level-btn--active'
      );
      const level = levelClass?.split( '--' )[1];

      // Показать соответствующий таб
      tabContents.forEach( ( tab ) => {
        if ( tab.classList.contains( `courses-tab--${level}` ) ) {
          tab.style.display = 'block';
        } else {
          tab.style.display = 'none';
        }
      });
    });
  });
});


// popups

const popupOverlay = document.querySelector(".popup-overlay");
const openPopupBtns = document.querySelectorAll(".open-popup");
const closePopupBtn = document.querySelector(".popup-close");

if (popupOverlay && openPopupBtns.length > 0 && closePopupBtn) {
    openPopupBtns.forEach(btn => {
        btn.addEventListener("click", (evt) => {
            evt.preventDefault();
            popupOverlay.classList.add("active");
        });
    });

    closePopupBtn.addEventListener("click", () => {
        popupOverlay.classList.remove("active");
    });

    popupOverlay.addEventListener("click", (e) => {
        if (e.target === popupOverlay) {
            popupOverlay.classList.remove("active");
        }
    });
}