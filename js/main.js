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

const popupOverlay = document.querySelector( ".popup-overlay" );

if (popupOverlay) {
  const teacherButtons = document.querySelectorAll( "[data-teacher]" );
  const closePopupBtns = popupOverlay.querySelectorAll( ".popup-close" );
  const zpButtons = popupOverlay.querySelectorAll( ".zp-btn" );

  const closeAllPopups = () => {
    popupOverlay.classList.remove( "active" );
    const allPopups = popupOverlay.querySelectorAll( ".popup" );
    allPopups.forEach( (popup) => popup.classList.remove( "active" ) );
  };

  if (teacherButtons.length) {
    teacherButtons.forEach( (btn) => {
      btn.addEventListener( "click", (evt) => {
        evt.preventDefault();
        const popupId = "teacher-popup--" + btn.dataset.teacher.replace( "teacher-", "" );
        const targetPopup = document.getElementById( popupId );

        if (targetPopup) {
          closeAllPopups();
          targetPopup.classList.add( "active" );
          popupOverlay.classList.add( "active" );
        }
      } );
    } );
  }

  if (closePopupBtns.length) {
    closePopupBtns.forEach( (btn) => {
      btn.addEventListener( "click", () => {
        closeAllPopups();
      } );
    } );
  }

  popupOverlay.addEventListener( "click", (e) => {
    if (e.target === popupOverlay) {
      closeAllPopups();
    }
  } );

  if (zpButtons.length) {
    zpButtons.forEach( (btn) => {
      btn.addEventListener( "click", () => {
        closeAllPopups();
      } );
    } );
  }
}




// Скрипт отправки формы 

document.querySelectorAll( ".main-form" ).forEach( (form) => {
  const inputs = form.querySelectorAll( ".main-input" );
  const submitBtn = form.querySelector( ".main-submit" );
  const successMessage = form.querySelector( ".success-message" );
  let wasSubmitted = false;

  const validateForm = () => {
    let isValid = true;

    inputs.forEach( (input) => {
      const required = input.hasAttribute( "required" );
      const value = input.value.trim();
      let inputValid = true;

      if (required && value === "") {
        inputValid = false;
      }

      if (input.placeholder.includes( "электронной почты" ) && value) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test( value )) {
          inputValid = false;
        }
      }

      if (input.placeholder.includes( "телефона" )) {
        const phoneRegex = /^[\d\+\-\s\(\)]{7,}$/;
        if (!phoneRegex.test( value )) {
          inputValid = false;
        }
      }

      if (wasSubmitted) {
        input.classList.toggle( "invalid", !inputValid );
      }

      if (!inputValid) {
        isValid = false;
      }
    } );

    submitBtn.disabled = !isValid;
    return isValid;
  };

  inputs.forEach( (input) => {
    input.addEventListener( "input", () => {
      validateForm();
    } );
  } );

  form.addEventListener( "submit", async (e) => {
    e.preventDefault();
    wasSubmitted = true;

    const isValid = validateForm();
    if (!isValid) return;

    const formData = new FormData();
    formData.append( "your-name", inputs[0].value.trim() );
    formData.append( "your-tel", inputs[1].value.trim() );

    submitBtn.disabled = true;

    try {
      const res = await fetch( "send.php", {
        method: "POST",
        body: formData,
      } );

      const result = await res.json();

      if (result.result === "success") {
        form.reset();
        submitBtn.disabled = true;
        successMessage.classList.add( "show" );
        form.classList.add('success');
        setTimeout( () => {
          successMessage.classList.remove( "show" );
          form.classList.remove('success');
        }, 7000 );
      } else {
        alert( result.info || "Произошла ошибка. Повторите попытку позже." );
        console.error( result.desc || "" );
      }
    } catch (err) {
      alert( "Ошибка отправки. Попробуйте позже." );
      console.error( err );
    } finally {
      submitBtn.disabled = false;
    }
  } );

  validateForm();
} );