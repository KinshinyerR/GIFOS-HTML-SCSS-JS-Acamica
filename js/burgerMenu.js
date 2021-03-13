const menuBurger = document.querySelector('.menu');
const nav = document.querySelector('.nav');

menuBurger.addEventListener('click', () => {
    nav.classList.toggle('navActivo');
    if (nav.classList.contains('navActivo')) {
        menuBurger.src = 'img/close.svg';
        if (body.classList.contains('dark')) {
            menuBurger.src = 'img/close-modo-noct.svg';
        }
    }else{
        menuBurger.src = 'img/burger.svg';
        if (body.classList.contains('dark')) {
            menuBurger.src = 'img/burger-modo-noct.svg';
        }
    }
});
