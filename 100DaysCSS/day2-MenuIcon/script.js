let menu = document.querySelector(".menu-icon");
menu.addEventListener('click', ()=> {
  menu.classList.toggle('active');
  menu.classList.remove('no-animation');
});