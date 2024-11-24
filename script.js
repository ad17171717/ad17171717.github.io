document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = '<div></div><div></div><div></div>';
    document.querySelector('nav').appendChild(burger);

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });
});