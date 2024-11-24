document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelector('.nav-links');
    const burger = document.createElement('div');
    burger.classList.add('burger');
    burger.innerHTML = '<div></div><div></div><div></div>';
    document.querySelector('nav').appendChild(burger);

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('nav-active');
    });

    const episodeSelect = document.getElementById('episode-select');
    const podcastVideo = document.getElementById('podcast-video');

    const episodes = {
        episode1: "https://www.youtube.com/embed/Rbjf5pnkK4w",
        episode2: "https://www.youtube.com/embed/TIpb_2nspk0",
        episode3: "https://www.youtube.com/embed/HDTf9yqTUzI",
        episode4: "https://www.youtube.com/embed/VP1uZ51vHm4",
        episode5: "https://www.youtube.com/embed/0vL5qU5qWJg"
    };

    episodeSelect.addEventListener('change', function () {
        const selectedEpisode = this.value;
        if (episodes[selectedEpisode]) {
            console.log(`Selected Episode: ${selectedEpisode}`);
            console.log(`Updating iframe src to: ${episodes[selectedEpisode]}`);
            podcastVideo.src = `${episodes[selectedEpisode]}&autoplay=1`;
        } else {
            console.error("Selected episode not found in episodes map.");
        }
    });
});
