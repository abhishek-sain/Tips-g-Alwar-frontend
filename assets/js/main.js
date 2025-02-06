

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
      }
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      e.preventDefault();
      this.parentNode.classList.toggle('active');
      this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
      e.stopImmediatePropagation();
    });
  });

  /**
   * Preloader
   */
  const preloader = document.querySelector('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove();
    });
  }

  /**
   * Scroll top button
   */
  let scrollTop = document.querySelector('.scroll-top');

  function toggleScrollTop() {
    if (scrollTop) {
      window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
    }
  }
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });

  window.addEventListener('load', toggleScrollTop);
  document.addEventListener('scroll', toggleScrollTop);

  /**
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 400,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
  window.addEventListener('load', aosInit);

  /**
   * Initiate glightbox
   */
  const glightbox = GLightbox({
    selector: '.glightbox'
  });

  /**
   * Initiate Pure Counter
   */
  new PureCounter();

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll(".init-swiper").forEach(function(swiperElement) {
      let config = JSON.parse(
        swiperElement.querySelector(".swiper-config").innerHTML.trim()
      );

      if (swiperElement.classList.contains("swiper-tab")) {
        initSwiperWithCustomPagination(swiperElement, config);
      } else {
        new Swiper(swiperElement, config);
      }
    });
  }

  window.addEventListener("load", initSwiper);

})();




document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "Empower Your Future\nwith Practical Skills!",
    "Shape Your Career with Us!",
    "Unlock Your Potential with\nExpert Guidance!",    
    "Your Success Starts Here!",
    "Achieve More with\nReal-World Training!"
];

  const typingElement = document.getElementById("typing-text");
  const typingSpeed = 50; // Typing speed
  const erasingSpeed = 25; // Erasing speed
  const delayBetweenCycles = 1000; // Delay between cycles
  let textIndex = 0; // Tracks the current text
  let charIndex = 0; // Tracks the character index in the current text
  let isErasing = false;

  function typeText() {
    const currentText = texts[textIndex];

    if (!isErasing) {
      // Typing phase
      if (charIndex < currentText.length) {
        if (currentText[charIndex] === "\n") {
          typingElement.innerHTML += "<br />";
        } else {
          typingElement.innerHTML += currentText[charIndex];
        }
        charIndex++;
        setTimeout(typeText, typingSpeed);
      } else {
        // Delay before erasing starts
        setTimeout(() => {
          isErasing = true;
          typeText();
        }, delayBetweenCycles);
      }
    } else {
      // Erasing phase
      if (charIndex > 0) {
        const visibleText = currentText.substring(0, charIndex);
        typingElement.innerHTML = visibleText.replace(/\n/g, "<br />");
        charIndex--;
        setTimeout(typeText, erasingSpeed);
      } else {
        // Move to the next text and reset content
        isErasing = false;
        typingElement.innerHTML = ""; // Clear content completely
        textIndex = (textIndex + 1) % texts.length; // Move to the next line
        setTimeout(typeText, typingSpeed);
      }
    }
  }

  typeText();
});


