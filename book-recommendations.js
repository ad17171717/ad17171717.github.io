'use strict';

const BOOKS_JSON_PATH = 'books.json';

document.addEventListener('DOMContentLoaded', () => {
  updateCopyrightYear();
  initializeBookTabs();
  loadBooks();
});

async function loadBooks() {
  try {
    const response = await fetch(BOOKS_JSON_PATH);

    if (!response.ok) {
      throw new Error(
        `Unable to load ${BOOKS_JSON_PATH}: ${response.status} ${response.statusText}`
      );
    }

    const data = await response.json();
    validateBookData(data);

    renderBookSection('tab-adrian', data.adrian, data.settings, false);
    renderBookSection('tab-guests', data.guests, data.settings, true);
  } catch (error) {
    console.error(error);
    showLoadError();
  }
}

function validateBookData(data) {
  if (
    !data ||
    typeof data !== 'object' ||
    !data.settings ||
    !data.adrian ||
    !data.guests
  ) {
    throw new Error('books.json does not contain the expected data structure.');
  }
}

function renderBookSection(panelId, categories, settings, isGuestSection) {
  const panel = document.getElementById(panelId);

  if (!panel) {
    throw new Error(`Missing book panel: #${panelId}`);
  }

  const fragment = document.createDocumentFragment();
  let bookIndex = 0;

  Object.entries(categories).forEach(([categoryName, books]) => {
    const heading = document.createElement('h2');
    heading.textContent = categoryName;
    fragment.appendChild(heading);

    const row = document.createElement('div');
    row.className = 'books-row';

    books.forEach(book => {
      const prioritizeImage = panelId === 'tab-adrian' && bookIndex === 0;

      row.appendChild(
        createBookCard(
          book,
          settings,
          isGuestSection,
          prioritizeImage
        )
      );

      bookIndex += 1;
    });

    fragment.appendChild(row);
  });

  panel.replaceChildren(fragment);
}

function createBookCard(
  book,
  settings,
  isGuestSection,
  prioritizeImage
) {
  const card = document.createElement('div');
  card.className = 'book';

  card.appendChild(
    createBookImage(book, settings, prioritizeImage)
  );

  const bookText = book.author
    ? `${book.title} by ${book.author}`
    : book.title;

  if (isGuestSection) {
    card.appendChild(document.createTextNode(bookText));
    card.appendChild(createRecommendationCredit(book));
  } else {
    card.appendChild(createBookLink(book, bookText));
  }

  return card;
}

function createBookImage(book, settings, prioritizeImage) {
  const imageDirectory = settings.image_directory.replace(/\/+$/, '');
  const imageWidth = settings.image_width || 320;
  const largeWidth = book.large_width || 640;

  const image = document.createElement('img');

  image.src =
    `${imageDirectory}/${book.image}-320.webp`;

  image.srcset = [
    `${imageDirectory}/${book.image}-320.webp 320w`,
    `${imageDirectory}/${book.image}-640.webp ${largeWidth}w`
  ].join(', ');

  image.sizes = settings.image_sizes;
  image.width = imageWidth;
  image.height = book.height;
  image.alt = book.title;
  image.decoding = 'async';

  if (prioritizeImage) {
    image.fetchPriority = 'high';
  } else {
    image.loading = 'lazy';
  }

  return image;
}

function createBookLink(book, bookText) {
  const link = document.createElement('a');

  link.href = book.url;
  link.target = '_blank';
  link.rel = 'noopener noreferrer';
  link.textContent = bookText;

  return link;
}

function createRecommendationCredit(book) {
  const credit = document.createElement('span');
  credit.className = 'recommendation-credit';

  credit.appendChild(
    document.createTextNode(
      `Recommended by ${book.recommended_by} (`
    )
  );

  const episodeLink = document.createElement('a');

  episodeLink.href =
    `podcast.html?episode=${book.episode}`;

  episodeLink.textContent =
    `Episode ${book.episode}`;

  credit.appendChild(episodeLink);
  credit.appendChild(document.createTextNode(')'));

  return credit;
}

function initializeBookTabs() {
  const tabButtons =
    document.querySelectorAll('.book-tab-btn');

  const tabPanels =
    document.querySelectorAll('.book-tab-panel');

  tabButtons.forEach(button => {
    button.addEventListener('click', () => {
      const targetPanel = document.getElementById(
        `tab-${button.dataset.tab}`
      );

      if (!targetPanel) {
        return;
      }

      tabButtons.forEach(item => {
        item.classList.remove('active');
      });

      tabPanels.forEach(panel => {
        panel.classList.remove('active');
      });

      button.classList.add('active');
      targetPanel.classList.add('active');
    });
  });
}

function updateCopyrightYear() {
  const yearSpan =
    document.getElementById('current-year');

  if (yearSpan) {
    yearSpan.textContent =
      new Date().getFullYear();
  }
}

function showLoadError() {
  const panel =
    document.getElementById('tab-adrian');

  if (panel) {
    const message = document.createElement('p');

    message.textContent =
      'Book recommendations could not be loaded. Please try again later.';

    panel.replaceChildren(message);
  }
}