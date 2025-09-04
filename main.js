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

        // Determine which category to filter by; map custom names to internal ones
        let category = tab.dataset.category;
        // Normalize custom categories: branded-content tab filters the 'branded' cards
        let normalizedCategory = category;
        if (category === 'branded-content') {
          normalizedCategory = 'branded';
        }

        cards.forEach((card) => {
          const cardCategory = card.dataset.category;
          // Show all cards if 'all' is still used elsewhere; otherwise filter by normalized category
          if (normalizedCategory === 'all' || cardCategory === normalizedCategory) {
            card.style.display = '';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });

    // On initial load, filter cards based on the tab marked as active
    const activeTab = document.querySelector('.tab.active');
    if (activeTab) {
      // Simulate a click to apply filtering logic and set the correct active styling
      activeTab.click();
    }
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