/*
 * Main JavaScript for VDO.ape portfolio
 *
 * This script wires up interactivity for the Works page, including
 * tab-based filtering of projects by category and a simple lightbox
 * for viewing thumbnails at a larger size. It gracefully degrades in
 * environments without JavaScript — the default behaviour is for all
 * projects to be shown.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Tab filtering for Works page
  const tabs = document.querySelectorAll('.tab');
  // Select all project elements within the works grid that have a data-category attribute.
  // This includes both image-based work cards and embedded video cards for AI films.
  const cards = document.querySelectorAll('.works-grid [data-category]');
  if (tabs.length && cards.length) {
    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        // Set active state on selected tab
        tabs.forEach((t) => t.classList.remove('active'));
        tab.classList.add('active');

        const category = tab.dataset.category;
        cards.forEach((card) => {
          // Show all cards if category is 'all' otherwise filter
          const cardCategory = card.dataset.category;
          if (category === 'all' || cardCategory === category) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // Lightbox for viewing project thumbnails
  const lightbox = document.getElementById('lightbox');
  if (lightbox) {
    const lightboxImage = lightbox.querySelector('img');
    const closeButton = lightbox.querySelector('.close');
    const clickableCards = document.querySelectorAll('.work-card');
    clickableCards.forEach((card) => {
      card.addEventListener('click', () => {
        const img = card.querySelector('img');
        lightboxImage.src = img.src;
        lightbox.style.display = 'flex';
      });
    });
    closeButton.addEventListener('click', () => {
      lightbox.style.display = 'none';
      lightboxImage.src = '';
    });
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
        lightboxImage.src = '';
      }
    });
  }
});