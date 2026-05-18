document.addEventListener('DOMContentLoaded', () => {
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const socialLinks = document.querySelector('.social-links');

    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.setAttribute('role', 'button');
    burger.setAttribute('aria-label', 'Toggle menu');
    burger.setAttribute('aria-expanded', 'false');
    burger.innerHTML = '<div></div><div></div><div></div>';
    nav.appendChild(burger);

    function toggleMenu() {
        const isOpen = navLinks.classList.toggle('nav-active');
        if (socialLinks) {
            socialLinks.classList.toggle('nav-active');
        }
        burger.classList.toggle('toggle');
        burger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    }

    function closeMenu() {
        navLinks.classList.remove('nav-active');
        if (socialLinks) {
            socialLinks.classList.remove('nav-active');
        }
        burger.classList.remove('toggle');
        burger.setAttribute('aria-expanded', 'false');
    }

    burger.addEventListener('click', toggleMenu);

    // Close drawer when a nav link is tapped
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });
});