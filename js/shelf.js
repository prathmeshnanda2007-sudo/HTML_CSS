/**
 * CINEVERSE Movie Shelf Renderer & Navigation
 * Dynamically renders all category shelves with scroll controls & 3D tilt FX.
 */

import { MOVIES, CATEGORIES } from './data.js';
import { watchlist } from './watchlist.js';
import { sound } from './sound.js';

export class ShelfManager {
  constructor(onMovieClick) {
    this.onMovieClick = onMovieClick;
    this.mainContent = document.getElementById('js-main-content');
    if (!this.mainContent) return;

    this.render();
    this.attachEvents();
    this.initTiltEffect();

    // Re-render watchlist shelf on changes
    window.addEventListener('watchlist:change', () => this.refreshWatchlistShelf());
  }

  render() {
    const html = CATEGORIES.map(cat => {
      const movies = MOVIES.filter(cat.filter);
      return this.renderShelf(cat, movies);
    });

    // Watchlist shelf
    html.push(this.renderWatchlistShelf());

    this.mainContent.innerHTML = html.join('');
  }

  renderShelf(cat, movies) {
    if (!movies.length) return '';
    return `
      <section class="movie-section" id="shelf-${cat.id}" data-shelf-id="${cat.id}">
        <div class="section-header">
          <h2 class="section-title">${cat.title}</h2>
          <span class="section-hint">Scroll horizontally to explore &rarr;</span>
        </div>
        <div class="shelf-wrapper">
          <button class="shelf-nav-btn shelf-prev" aria-label="Scroll left">&#8249;</button>
          <div class="movie-row" id="row-${cat.id}">
            ${movies.map(m => this.renderCard(m)).join('')}
          </div>
          <button class="shelf-nav-btn shelf-next" aria-label="Scroll right">&#8250;</button>
        </div>
      </section>
    `;
  }

  renderWatchlistShelf() {
    const ids = watchlist.getAll();
    const movies = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

    return `
      <section class="movie-section" id="shelf-mylist" data-shelf-id="mylist">
        <div class="section-header">
          <h2 class="section-title">❤️ My List</h2>
          <span class="section-hint" id="mylist-count">${movies.length} saved</span>
        </div>
        <div class="shelf-wrapper">
          <button class="shelf-nav-btn shelf-prev" aria-label="Scroll left">&#8249;</button>
          <div class="movie-row" id="row-mylist">
            ${movies.length > 0 ? movies.map(m => this.renderCard(m)).join('') : this.renderEmptyWatchlist()}
          </div>
          <button class="shelf-nav-btn shelf-next" aria-label="Scroll right">&#8250;</button>
        </div>
      </section>
    `;
  }

  renderEmptyWatchlist() {
    return `
      <div class="empty-watchlist">
        <div class="empty-watchlist-icon">🎬</div>
        <h3>Your list is empty</h3>
        <p>Click <strong>+</strong> on any movie or show to save it here.</p>
      </div>
    `;
  }

  renderCard(m) {
    const inList = watchlist.has(m.id);
    return `
      <div class="movie-card" 
           data-id="${m.id}" 
           data-genres="${m.genres.join(',')}"
           data-trending="${m.trending ? 'true' : 'false'}">
        <div class="card-poster-wrapper">
          <img class="movie-poster" 
               src="${m.poster}" 
               alt="${m.title}" 
               loading="lazy">
          <div class="card-overlay">
            <button class="card-play-btn" data-id="${m.id}" data-action="play" aria-label="Play ${m.title}">▶</button>
          </div>
          <button class="card-wl-btn ${inList ? 'in-list' : ''}" data-id="${m.id}" data-action="watchlist" title="${inList ? 'Remove from My List' : 'Add to My List'}">
            ${inList ? '✓' : '+'}
          </button>
          <div class="card-maturity">${m.maturity}</div>
        </div>
        <div class="movie-info">
          <h3 class="movie-title">${m.title}</h3>
          <div class="movie-meta-strip">
            <span class="card-rating">⭐ ${m.rating}</span>
            <span class="card-genre">${m.genres[0]}</span>
            <span class="card-year">${m.year}</span>
          </div>
        </div>
      </div>
    `;
  }

  refreshWatchlistShelf() {
    const row = document.getElementById('row-mylist');
    const countEl = document.getElementById('mylist-count');
    if (!row) return;

    const ids = watchlist.getAll();
    const movies = ids.map(id => MOVIES.find(m => m.id === id)).filter(Boolean);

    // Animate out old content
    row.style.opacity = '0';
    row.style.transform = 'translateY(8px)';

    setTimeout(() => {
      row.innerHTML = movies.length > 0
        ? movies.map(m => this.renderCard(m)).join('')
        : this.renderEmptyWatchlist();

      if (countEl) countEl.textContent = `${movies.length} saved`;

      row.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
      row.style.opacity = '1';
      row.style.transform = 'translateY(0)';

      // Re-init tilt for new cards
      this.initTiltEffect();
    }, 150);
  }

  attachEvents() {
    // Card click delegation
    document.addEventListener('click', (e) => {
      const actionBtn = e.target.closest('[data-action]');
      if (actionBtn) {
        e.stopPropagation();
        const id = actionBtn.dataset.id;
        const action = actionBtn.dataset.action;

        if (action === 'play') {
          sound.playClick();
          this.onMovieClick(id, true);
        } else if (action === 'watchlist') {
          sound.playPop();
          const added = watchlist.toggle(id);

          // Update all buttons for this movie
          document.querySelectorAll(`[data-action="watchlist"][data-id="${id}"]`).forEach(btn => {
            btn.classList.toggle('in-list', added);
            btn.textContent = added ? '✓' : '+';
            btn.title = added ? 'Remove from My List' : 'Add to My List';
          });

          window.dispatchEvent(new CustomEvent('toast:show', {
            detail: {
              message: added ? `Added to My List ❤️` : `Removed from My List`,
              type: added ? 'success' : 'neutral'
            }
          }));
        }
        return;
      }

      // Click on movie card body (not action buttons)
      const card = e.target.closest('.movie-card');
      if (card && !e.target.closest('[data-action]')) {
        sound.playClick();
        this.onMovieClick(card.dataset.id, false);
      }
    });

    // Shelf scroll navigation
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.shelf-nav-btn');
      if (!btn) return;
      sound.playClick();
      const wrapper = btn.closest('.shelf-wrapper');
      const row = wrapper?.querySelector('.movie-row');
      if (!row) return;

      const scrollAmount = row.offsetWidth * 0.75;
      const dir = btn.classList.contains('shelf-next') ? 1 : -1;
      row.scrollBy({ left: dir * scrollAmount, behavior: 'smooth' });
    });
  }

  initTiltEffect() {
    const cards = document.querySelectorAll('.movie-card');
    cards.forEach(card => {
      // Avoid re-attaching
      if (card.dataset.tiltInit) return;
      card.dataset.tiltInit = 'true';

      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const cx = rect.width / 2;
        const cy = rect.height / 2;
        const rotX = ((y - cy) / cy) * -6;
        const rotY = ((x - cx) / cx) * 6;

        card.style.transform = `perspective(600px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.04, 1.04, 1.04)`;
      });

      card.addEventListener('mouseleave', () => {
        card.style.transform = '';
        card.style.transition = 'transform 0.4s ease';
      });

      card.addEventListener('mouseenter', () => {
        card.style.transition = 'transform 0.1s ease';
      });
    });
  }
}
