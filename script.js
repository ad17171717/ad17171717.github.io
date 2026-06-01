document.addEventListener('DOMContentLoaded', () => {
    /*
     * Mobile navigation menu
     */
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    const socialLinks = document.querySelector('.social-links');

    if (nav && navLinks) {
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

        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', closeMenu);
        });
    }

    /*
     * Dynamic footer year
     */
    const yearSpan = document.getElementById('current-year');

    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    /*
     * Podcast episode selector
     * Only runs on podcast.html because the required elements exist there.
     */
    const episodeSelect = document.getElementById('episode-select');
    const podcastVideo = document.getElementById('podcast-video');

    if (episodeSelect && podcastVideo) {
        episodeSelect.addEventListener('change', function () {
            podcastVideo.src = this.value;
        });

        function selectEpisodeFromURL() {
            const params = new URLSearchParams(window.location.search);
            const epParam = params.get('episode');

            if (!epParam) {
                return;
            }

            const options = episodeSelect.options;

            for (let i = 0; i < options.length; i++) {
                if (options[i].text.includes('#' + epParam)) {
                    episodeSelect.selectedIndex = i;
                    podcastVideo.src = options[i].value;
                    break;
                }
            }
        }

        selectEpisodeFromURL();

        window.addEventListener('pageshow', selectEpisodeFromURL);
    }
});