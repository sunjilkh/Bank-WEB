'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabContainer = document.querySelector('.operations__tab-container');
const tabContent = document.querySelectorAll('.operations__content');


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



//Tabbed component

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

//Reveal Sections

const allSections = document.querySelectorAll('.section');
const revealSection = function(entries, observer){
  // console.log(entries);
  entries.forEach(entry => {
    if(!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);      
  })
}
const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
})
allSections.forEach(function(section){
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
})

//Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

const loadImg = function(entries, Observer){
  const [entry] = entries;
  // console.log(entry);

  if(!entry.isIntersecting) return;

  //Replace src with data-src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function(){
    entry.target.classList.remove('lazy-img')
  });
  Observer.unobserve(entry.target);
}

const imgObs = new IntersectionObserver( loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTargets.forEach( img=> imgObs.observe(img));

///////////////////////////////////////////////
 //Slider 

 const slide = function(){

const slides = document.querySelectorAll('.slide');
const butnLeft = document.querySelector('.slider__btn--left');
const butnRight = document.querySelector('.slider__btn--right');
const dotContain = document.querySelector('.dots');
let curSlide = 0;
const maxSlide = slides.length;

const slider = document.querySelector('.slider');

//Functions
const createDots  = function(){
  slides.forEach(function(_,i){
    dotContain.insertAdjacentHTML('beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
}

const selectActivateDot = function(slide){
document.querySelectorAll('.dots__dot').forEach(
  dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide ="${slide}"]`).classList.add('dots__dot--active');
};
//go to slide
const goTo = function(curSlide){
  slides.forEach(
    (s, i) => (s.style.transform = `translateX(${100 * (i - curSlide)}%)`)
  );
}



//next Slide
const nextSlide = function(){
    if(curSlide === maxSlide-1) {
      curSlide = 0;}
    else {
      curSlide++;}
    goTo(curSlide);
    selectActivateDot(curSlide);
  };
const previouSlide = function(){
  if(curSlide === 0) {
    curSlide = maxSlide-1;}
  else {
    curSlide--;}
  goTo(curSlide);
  selectActivateDot(curSlide);
}


const init  = function(){
  goTo(0);
  createDots();
  selectActivateDot(0);
}
init();

//Events
butnRight.addEventListener('click', nextSlide);
butnLeft.addEventListener('click', previouSlide);

document.addEventListener('keydown', function(e){
  // console.log(e);
  if(e.key === 'ArrowLeft') previouSlide();
  e.key === 'ArrowRight' && nextSlide();
});

dotContain.addEventListener('click', function(e){
  curSlide = Number(e.target.dataset.slide);
  console.log(curSlide);
  if(e.target.classList.contains('dots__dot')){
    // const {slide} = curSlide;
    goTo(curSlide)
    selectActivateDot(curSlide)
  }
});
};
slide();


//Menu fade animation
/*
const handleHover = function(e){
  if(e.target.classList.contains('nav__link')){
    const linked = e.target;
    const siblings =  linked.closest('.nav').querySelectorAll('.nav__link');
    const logo = linked.closest('.nav').querySelector('img');
  
    siblings.forEach((el) =>{
      if(el !== linked) el.style.opacity = this;
    });
    logo.style.opacity = this;
    }
}
nav.addEventListener('mouseover', (e)=>{
  handleHover.call(0.5, e);
});
//bind returns a function
nav.addEventListener('mouseout', handleHover.bind(1));

//Sticky navigation
const initialCoords = section1.getBoundingClientRect();
window.addEventListener('scroll', function(){
  // console.log(this.window.scrollY);
  if(window.scrollY > initialCoords.top){
    nav.classList.add('sticky');
  }else{
    nav.classList.remove('sticky');
  }
})
*/

// Sticky Navigator : Intersection Observer API

// const observerCallback = function(entries, observer){
//   entries.forEach(entry => {
//     console.log(entry);
//   })
// }
// const  observeOptions = {
//   root: null,
//   threshold:[0,  0.05]
// };

// const observer = new IntersectionObserver(observerCallback,
//   observeOptions
// );

// observer.observe(section1);

const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height;
// console.log(navHeight);
const stickyNavi = function(entries){
  const [entry] = entries;
  // console.log(entry);
  if(!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
}
const headerObserver = new IntersectionObserver(
  stickyNavi, {
    root: null,
    threshold: 0,
    rootMargin: `-${navHeight}px`,
  }
)
headerObserver.observe(header);




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

///////////////////////////////////

//Dom Traversing
/*
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
*/



//Should not be used casually
// window.addEventListener('beforeunload', function(e){
//   e.preventDefault();
//   console.log(e);
//   e.returnValue = '';
// })