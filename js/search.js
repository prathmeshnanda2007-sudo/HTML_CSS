/**
 * CINEVERSE Live Search & Genre Filter System
 */

import { MOVIES, GENRE_FILTERS } from './data.js';
import { sound } from './sound.js';

export class SearchSystem {
  constructor(onMovieClick) {
    this.onMovieClick = onMovieClick;
    this.query = '';
    this.debounceTimer = null;

    this.searchInput = document.getElementById('js-search-input');
    this.searchResults = document.getElementById('js-search-results');
    this.filterBar = document.getElementById('js-genre-filter-bar');

    this.initFilterBar();
    this.initSearch();
  }

  initFilterBar() {
    if (!this.filterBar) return;
    this.filterBar.innerHTML = GENRE_FILTERS.map(f => `
      <button class="genre-pill ${f.id === 'all' ? 'active' : ''}" data-genre="${f.id}">
        ${f.label}
      </button>
    `).join('');

    this.filterBar.addEventListener('click', (e) => {
      const pill = e.target.closest('.genre-pill');
      if (!pill) return;
      sound.playClick();

      this.filterBar.querySelectorAll('.genre-pill').forEach(p => p.classList.remove('active'));
      pill.classList.add('active');

      const genre = pill.dataset.genre;
      this.filterShelves(genre);
    });
  }

  filterShelves(genre) {
    const allCards = document.querySelectorAll('.movie-card[data-genres]');
    const allSections = document.querySelectorAll('.movie-section[data-shelf-id]');

    allCards.forEach(card => {
      const cardGenres = (card.dataset.genres || '').toLowerCase();
      const trending = card.dataset.trending === 'true';
      const shows = genre === 'all'
        || (genre === 'trending' && trending)
        || cardGenres.includes(genre.toLowerCase());

      card.style.display = shows ? '' : 'none';
      if (shows) {
        card.classList.add('filter-highlight');
        setTimeout(() => card.classList.remove('filter-highlight'), 400);
      }
    });

    // Hide sections where all cards are hidden
    allSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.movie-card:not([style*="display: none"])');
      section.style.opacity = visibleCards.length === 0 ? '0.3' : '1';
    });
  }

  initSearch() {
    if (!this.searchInput) return;

    this.searchInput.addEventListener('input', (e) => {
      this.query = e.target.value.trim();
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => this.doSearch(), 200);
    });

    this.searchInput.addEventListener('focus', () => {
      if (this.query) this.showResults(this.getResults(this.query));
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('.search-box')) {
        this.hideResults();
      }
    });

    this.searchInput.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.searchInput.value = '';
        this.query = '';
        this.hideResults();
      }
    });
  }

  doSearch() {
    if (!this.query) {
      this.hideResults();
      return;
    }
    const results = this.getResults(this.query);
    this.showResults(results);
  }

  getResults(q) {
    const lq = q.toLowerCase();
    return MOVIES.filter(m =>
      m.title.toLowerCase().includes(lq) ||
      m.director.toLowerCase().includes(lq) ||
      m.genres.some(g => g.toLowerCase().includes(lq)) ||
      m.cast.some(c => c.toLowerCase().includes(lq)) ||
      m.tags.some(t => t.toLowerCase().includes(lq))
    ).slice(0, 6);
  }

  highlightText(text, q) {
    if (!q) return text;
    const regex = new RegExp(`(${q.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    return text.replace(regex, '<mark class="search-highlight">$1</mark>');
  }

  showResults(results) {
    if (!this.searchResults) return;

    if (results.length === 0) {
      this.searchResults.innerHTML = `
        <div class="search-no-results">
          <span>🔍</span>
          <p>No results for "<strong>${this.query}</strong>"</p>
          <small>Try another title, genre, or actor name.</small>
        </div>
      `;
      this.searchResults.classList.add('visible');
      return;
    }

    this.searchResults.innerHTML = `
      <div class="search-results-header">
        <span>${results.length} result${results.length !== 1 ? 's' : ''} for "<strong>${this.query}</strong>"</span>
      </div>
      <ul class="search-results-list">
        ${results.map(m => `
          <li class="search-result-item" data-id="${m.id}" role="option">
            <img class="sr-thumb" src="${m.poster}" alt="${m.title}" loading="lazy">
            <div class="sr-info">
              <div class="sr-title">${this.highlightText(m.title, this.query)}</div>
              <div class="sr-meta">
                <span class="sr-rating">⭐ ${m.rating}</span>
                <span>${m.year}</span>
                <span>${m.genres[0]}</span>
                <span class="quality-badge sr-quality">${m.maturity}</span>
              </div>
            </div>
            <div class="sr-arrow">→</div>
          </li>
        `).join('')}
      </ul>
    `;

    this.searchResults.classList.add('visible');

    // Wire click on result items
    this.searchResults.querySelectorAll('.search-result-item').forEach(item => {
      item.addEventListener('click', () => {
        sound.playClick();
        const id = item.dataset.id;
        this.hideResults();
        this.searchInput.value = '';
        this.query = '';
        this.onMovieClick(id, false);
      });
    });
  }

  hideResults() {
    if (this.searchResults) {
      this.searchResults.classList.remove('visible');
    }
  }
}
