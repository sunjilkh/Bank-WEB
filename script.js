'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));
//replacing for loop over btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

///////////////////////////////////
// Button Controller
const btnScrolTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// console.log(section1.getBoundingClientRect());
btnScrolTo.addEventListener('click', function (e) {
  // const scrl = section1.getBoundingClientRect();
  // console.log(e.target.getBoundingClientRect());
  // console.log(
  //   'height/width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );
  section1.scrollIntoView({ behavior: 'smooth' });
});

///////////////////////////////////
//Smooth scrolling
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', e => {
//     e.preventDefault();
//     const id = el.getAttribute('href');
//     // console.log(id);
//     const dest = document.querySelector(id);
//     dest.scrollIntoView({ behavior: 'smooth' });
//   });
// });

//1. Add event listener to common parent element
//2. Determine what element originated the event
document.querySelector('.nav__links').addEventListener('click', e => {
  e.preventDefault();
  // console.log(e.target);

  //Matching strategy
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    // console.log(id);
    const dest = document.querySelector(id);
    dest.scrollIntoView({ behavior: 'smooth' });
  }
});

///////////////////////////////////
//Dom Traversing
const h1 = document.querySelector('h1');

//going downwards: child
console.log(h1.querySelectorAll('.highlight'));
console.log(h1.childNodes);
console.log(h1.children);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'white';

//Going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);

h1.closest('.header').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.background = 'var(--gradient-primary)';

//Selecting sibling
//only direct sigbing accessible
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);

console.log(h1.previousSibling);
console.log(h1.nextSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(el => {
  if (el !== h1) el.style.transform = 'scale(0.8)';
});

//Tabbed component
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');

tabContainer.addEventListener('click', (e)=>{
  const clicked  = e.target.closest('.operations__tab');
  
  //guard clause
  if(!clicked) return;

  //Activate tab
  tabs.forEach((el) =>el.classList.remove('operations__tab--active'));
  clicked.classList.add('operations__tab--active');

  //Activate content area
  tabContent.forEach((el) => el.classList.remove('operations__content--active'));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add('operations__content--active');
});

///////////////////////////////////
///////////////////////////////////
///////////////////////////////////

//Introducing DOM
/*
console.log(document.documentElement);
console.log(document.head);
console.log(document.body);

const nodeList = document.querySelectorAll('.section');
console.log(nodeList);

const allButtons = document.getElementsByTagName('button');
console.log(allButtons);

console.log(document.getElementsByClassName('btn'));

//Creating and inserting element
// .insertAdjacentHTML

const message = document.createElement('div');
message.classList.add('cookie-message');
message.textContent = 'Cookies for waste...';
message.innerHTML =
  'Cookies for waste... <btton class="btn btn--close--cookie">Got it!</btton>';

const headerSelector = document.querySelector('.header');
headerSelector.prepend(message);
// headerSelector.append(message.cloneNode(true));
headerSelector.before(message);
headerSelector.after(message);

//delete element
document
  .querySelector('.btn--close--cookie')
  .addEventListener('click', function () {
    message.remove();
  });

//Styles, Attributes
message.style.backgroundColor ='#37383d';  
message.style.width = '140%';

console.log(message.style.backgroundColor);
console.log(getComputedStyle(message).height);
message.style.height = Number.parseFloat(getComputedStyle(message).height)+ 40 + 'px';

document.documentElement.style.setProperty('--color-primary', 'orange')

//Attributes

const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);

//not standard
console.log(logo.tester);
console.log(logo.getAttribute('tester'));
logo.setAttribute('company', 'Bankist');
console.log(logo.src);
console.log(logo.getAttribute('src'));

const link = document.querySelector('.nav__link--btn');
console.log(link.href);
console.log(link.getAttribute('href'));

//Data Attributes
console.log(logo.dataset.versionNumber);

//Classes
logo.classList.add('cin','jonson');
logo.classList.remove();
logo.classList.toggle();
logo.classList.contains();
*/

//Adding event listner
// const h1 = document.querySelector('h1');
// h1.addEventListener('mouseenter', function(e){
//   alert('hello');

//   // h1.removeEventListener('mouseenter');
//   //or
//   setTimeout(function(){
//     h1.removeEventListener('mouseenter');
//   }, 2000)
//   }
// )

//rgb(255,255,255)
/*
const ranInt = (max, min) => Math.floor(Math.random() * (max - min) + min);

const ranColor = () =>
  `rgb(${ranInt(0, 255)},${ranInt(0, 255)},${ranInt(0, 255)})`;
console.log(ranColor());

document.querySelector('.nav__link').addEventListener('click', function (e) {
  e.preventDefault();
  console.log('Link here', e.target, e.currentTarget);
  this.style.backgroundColor = ranColor();

  // //Stop propagation
  // e.stopPropagation();
});

document.querySelector('.nav').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Link here');
  console.log('Nav_Link here', e.target, e.currentTarget);

  this.style.backgroundColor = ranColor();
});

document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  // console.log('Link here');
  console.log('Nav here', e.target, e.currentTarget);
  console.log(this === e.currentTarget);

  this.style.backgroundColor = ranColor();
});
*/
