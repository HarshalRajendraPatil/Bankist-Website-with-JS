'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const nav = document.querySelector('.nav');
const header = document.querySelector('.header');
const allSection = document.querySelectorAll('.section');

///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//Implementation of smooth Scrolling for learn more button

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////////
// Page Navigation
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    document.querySelectorAll('.nav__link').forEach(el => {
      el.addEventListener('click', function (e) {
        const id = e.target.getAttribute('href');
        if (id !== '#') {
          document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
  }
});

///////////////////////////////////////
// Tabbed Componen

tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');

  //Guard Claus
  if (!clicked) return;

  // Removing the old data
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(e => e.classList.remove('operations__content--active'));

  //Active Tab
  clicked.classList.add('operations__tab--active');

  // Active Content Area
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

///////////////////////////////////////
// Menu Fade Animation

const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('nav').querySelector('img');

    siblings.forEach(el => {
      if (el !== link) {
        el.style.opacity = this;
      }
      logo.style.opacity = this;
    });
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

// Sticky Navigation
const stickyNav = function (entries) {
  const [entry] = entries;
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const navHeight = nav.getBoundingClientRect().height;
const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});
headerObserver.observe(header);

// Revealing sections as approched
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});
allSection.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function () {
    console.log(entry.target.classList.remove('lazy-img'));
  });
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach(img => {
  imgObserver.observe(img);
});

// Slider
const slider = function () {
  const slides = document.querySelectorAll('.slide');
  const btnLeft = document.querySelector('.slider__btn--left');
  const btnRight = document.querySelector('.slider__btn--right');
  const dotContainer = document.querySelector('.dots');

  let currentSlide = 0;
  const maxSlide = slides.length - 1;

  // Function
  const activateDots = function (slide) {
    document
      .querySelectorAll('.dots__dot')
      .forEach(el => el.classList.remove('dots__dot--active'));
    document
      .querySelector(`.dots__dot[data-slide = "${slide}"]`)
      .classList.add('dots__dot--active');
  };

  const goToSlide = function (slide) {
    slides.forEach(
      (s, i) => (s.style.transform = `translateX(${(i - slide) * 100}%)`)
    );
  };

  const nextSlide = function () {
    currentSlide === maxSlide ? (currentSlide = 0) : currentSlide++;

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const prevSlide = function () {
    currentSlide === 0 ? (currentSlide = maxSlide) : currentSlide--;

    goToSlide(currentSlide);
    activateDots(currentSlide);
  };

  const init = function () {
    goToSlide(0);
    activateDots(0);
  };

  init();

  // Event handlers
  btnRight.addEventListener('click', nextSlide);

  btnLeft.addEventListener('click', prevSlide);

  document.body.addEventListener('keypress', function (e) {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
  });

  dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains('dots__dot')) {
      const slide = e.target.dataset.slide;
      console.log(slide);
      goToSlide(slide);
      activateDots(slide);
    }
  });
};

slider();

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Experiment codes
//Selecting Elements
// console.log(document.documentElement);
// console.log(document.head);
// console.log(document.body);

// const header = document.querySelector('.header');
// console.log(header);

// const allSection = document.querySelectorAll('.section');
// console.log(allSection);

// const allButtons = document.getElementsByTagName('button');
// console.log(allButtons);

//Creating and inserting elements
// const message = document.createElement('div');
// message.classList.add('cookie-message');
// // message.textContent = 'We use cookies for improved functinality and analytics';
// message.innerHTML = `We use cookies for improved functionality and analytics. <button class = "btn btn--close--cookie">Got it!</button>`;

// header.prepend(message);
// header.append(message);

// header.before(message);
// header.after(message);

//Deleting Elements
// document
//   .querySelector('.btn--close--cookie')
//   .addEventListener('click', function () {
//     message.remove();
//     // message.parentElement.removeChild(message); Long method
//   });

//Styles
// message.style.backgroundColor = '#37383d';
// message.style.width = '104%';
// message.style.height = '10%';
// console.log(message.style.height);
// console.log(getComputedStyle(message).backgroundColor);
// message.style.height =
// Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

// document.documentElement.style.setProperty('--color-primary', 'orangered');

//Attributes
// const logo = document.querySelector('.nav__logo');
// console.log(logo.alt);
// console.log(logo.src);
// console.log(logo.getAttribute('alt'));
// logo.setAttribute('alt', 'hell');
// console.log(logo.getAttribute('alt'));

// Page navigation
// document.querySelectorAll('.nav__link').forEach(el => {
//   el.addEventListener('click', function (e) {
//     const id = this.getAttribute('href');
//     console.log(id);
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });

//Implementation of smooth Scrolling
// const btnScrollTo = document.querySelector('.btn--scroll-to');
// const section1 = document.querySelector('#section--1');

// btnScrollTo.addEventListener('click', function (e) {
// const s1Coords = section1.getBoundingClientRect();
// console.log(s1Coords.y);
// console.log(e.target.getBoundingClientRect());

// console.log(window.pageXOffset, window.pageYOffset);
// console.log(
//   document.documentElement.clientHeight,
//   document.documentElement.clientWidth
// );

//scrolling without smooth animation
// window.scrollTo(
//   s1Coords.x + window.pageXOffset,
//   s1Coords.y + window.pageYOffset
// );

//scrolling with smooth animation
// window.scrollTo({
//   left: s1Coords.left + window.pageXOffset,
//   top: s1Coords.top + window.pageYOffset,
//   behavior: 'smooth',
// });

//Modern way of implementing smooth scrolling
//   section1.scrollIntoView({ behavior: 'smooth' });
// });

//adding eventlisteners
// const h1 = document.querySelector('h1');
// const alertmsg = function () {
//   window.alert(`You are a gandu ! :)`);
//   h1.removeEventListener('mouseleave', alertmsg);
//   h1.onmouseleave(alertmsg);
// };
// h1.addEventListener('mouseleave', alertmsg);

//Event propogation: capturing phase and bubbling phase
// const ranodomInt = (max, min) => {
//   return Math.floor(Math.random() * (max - min + 1) + min);
// };
// const randomColor = () => {
//   return `rgb(${ranodomInt(0, 255)}, ${ranodomInt(0, 255)}, ${ranodomInt(
//     0,
//     255
//   )})`;
// };

// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
//   e.stopPropagation();
// });

// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randomColor();
// });

// Going downward the tree
// const h1 = document.querySelector('h4');
// console.log(h1.childNodes);
// console.log(h1.children);
// console.log(h1.firstChild);
// console.log(h1.firstElementChild);
// console.log(h1.lastElementChild);
// console.log(h1.lastChild);
// h1.firstElementChild.style.color = 'white';
// console.log(h1.firstElementChild.style.color);
// console.log(getComputedStyle(h1).firstElementChild.color);

// h1.closest('body').style.background = 'black';
// console.log(h1.previousElementSibling);
// console.log(h1.nextlementSibling);

//sticky navigation
// const initialCoords = section1.getBoundingClientRect();

// window.addEventListener('scroll', function (e) {
//   if (initialCoords.top < this.window.scrollY) nav.classList.add('sticky');
//   else nav.classList.remove('sticky');
// }); Not a efficient method
