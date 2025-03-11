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

const btnScrolTo  = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
// console.log(section1.getBoundingClientRect());
btnScrolTo.addEventListener(
  'click', function(e){
    // const scrl = section1.getBoundingClientRect();
    // console.log(e.target.getBoundingClientRect());
    // console.log(
    //   'height/width',
    //   document.documentElement.clientHeight,
    //   document.documentElement.clientWidth
    // );
    section1.scrollIntoView({behavior: 'smooth'});
  }
)

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
