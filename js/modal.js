/**
 * CINEVERSE Universal Movie Details & Video Trailer Modal
 */

import { MOVIES } from './data.js';
import { watchlist } from './watchlist.js';
import { sound } from './sound.js';

export class MovieModal {
  constructor() {
    this.currentMovie = null;
    this.activeTab = 'overview';
    this.modalEl = document.getElementById('dynamic-movie-modal');
    this.init();
  }

  init() {
    if (!this.modalEl) return;

    // Close buttons & backdrop click
    this.modalEl.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-backdrop-dismiss') || e.target.closest('.modal-close-trigger')) {
        this.close();
      }
    });

    // Escape key listener
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen()) {
        this.close();
      }
    });

    // Listen to watchlist updates to update modal action button if open
    window.addEventListener('watchlist:change', () => {
      if (this.currentMovie) {
        this.updateWatchlistBtn();
      }
    });
  }

  isOpen() {
    return this.modalEl && this.modalEl.classList.contains('active');
  }

  open(movieId, autoplayTrailer = false) {
    const movie = MOVIES.find(m => m.id === movieId);
    if (!movie) return;

    this.currentMovie = movie;
    this.activeTab = 'overview';
    sound.playWhoosh();

    this.render(autoplayTrailer);

    document.body.classList.add('modal-open');
    this.modalEl.classList.add('active');
  }

  close() {
    if (!this.isOpen()) return;
    sound.playClick();
    this.modalEl.classList.remove('active');
    document.body.classList.remove('modal-open');

    // Stop video playback by removing iframe
    const playerContainer = this.modalEl.querySelector('.modal-video-container');
    if (playerContainer) {
      playerContainer.innerHTML = '';
    }
    this.currentMovie = null;
  }

  render(autoplayTrailer = false) {
    const movie = this.currentMovie;
    const inWatchlist = watchlist.has(movie.id);

    // Filter similar recommendations based on genre
    const similar = MOVIES
      .filter(m => m.id !== movie.id && m.genres.some(g => movie.genres.includes(g)))
      .slice(0, 4);

    this.modalEl.innerHTML = `
      <div class="modal-backdrop-dismiss"></div>
      <div class="modal-dialog">
        <button class="modal-close-trigger" aria-label="Close modal">&times;</button>

        <!-- Video Trailer / Hero Backdrop Banner -->
        <div class="modal-media-header">
          <div class="modal-video-container" id="modal-video-wrapper">
            ${autoplayTrailer ? this.getIframeHtml(movie.trailerId) : `
              <div class="modal-backdrop-img" style="background-image: url('${movie.backdrop}');">
                <div class="modal-media-overlay"></div>
                <button class="btn-play-trailer-hero" id="btn-start-trailer">
                  <span class="play-icon">▶</span>
                  <span>Play Official Trailer</span>
                </button>
              </div>
            `}
          </div>
        </div>

        <div class="modal-dialog-body">
          <div class="modal-header-info">
            <h2 class="modal-movie-title">${movie.title}</h2>
            <p class="modal-movie-tagline">"${movie.tagline}"</p>

            <div class="modal-meta-row">
              <span class="rating-pill">⭐ ${movie.rating}</span>
              <span class="meta-year">${movie.year}</span>
              <span class="meta-duration">${movie.duration}</span>
              <span class="quality-badge">${movie.maturity}</span>
              <span class="quality-badge">${movie.quality}</span>
              <span class="quality-badge">${movie.audio}</span>
            </div>

            <div class="modal-cta-row">
              <button class="btn btn-primary" id="modal-play-btn">
                ▶ Watch Full Movie
              </button>
              <button class="btn ${inWatchlist ? 'btn-secondary in-list' : 'btn-secondary'}" id="modal-watchlist-btn">
                ${inWatchlist ? '✓ In Watchlist' : '+ Add to My List'}
              </button>
              <button class="btn btn-icon" id="modal-share-btn" title="Share Title">
                🔗
              </button>
            </div>
          </div>

          <!-- Navigation Tabs -->
          <div class="modal-tabs">
            <button class="modal-tab-btn ${this.activeTab === 'overview' ? 'active' : ''}" data-tab="overview">
              Overview
            </button>
            <button class="modal-tab-btn ${this.activeTab === 'more' ? 'active' : ''}" data-tab="more">
              More Like This (${similar.length})
            </button>
            <button class="modal-tab-btn ${this.activeTab === 'details' ? 'active' : ''}" data-tab="details">
              Cast & Crew
            </button>
          </div>

          <!-- Tab Panels -->
          <div class="modal-tab-panels">
            <!-- Overview Panel -->
            <div class="tab-panel ${this.activeTab === 'overview' ? 'active' : ''}" id="panel-overview">
              <p class="modal-synopsis-text">${movie.description}</p>
              
              <div class="modal-tags-section">
                <div class="tag-group">
                  <span class="tag-label">Genres:</span>
                  <div class="tag-chips">
                    ${movie.genres.map(g => `<span class="tag-chip">${g}</span>`).join('')}
                  </div>
                </div>
                <div class="tag-group">
                  <span class="tag-label">Director:</span>
                  <span class="tag-val">${movie.director}</span>
                </div>
                <div class="tag-group">
                  <span class="tag-label">Starring:</span>
                  <span class="tag-val">${movie.cast.slice(0, 4).join(', ')}...</span>
                </div>
                <div class="tag-group">
                  <span class="tag-label">Mood:</span>
                  <div class="tag-chips">
                    ${movie.tags.map(t => `<span class="tag-chip subtle">${t}</span>`).join('')}
                  </div>
                </div>
              </div>
            </div>

            <!-- More Like This Panel -->
            <div class="tab-panel ${this.activeTab === 'more' ? 'active' : ''}" id="panel-more">
              <div class="modal-similar-grid">
                ${similar.map(s => `
                  <div class="similar-card" data-movie-id="${s.id}">
                    <div class="similar-poster-wrap">
                      <img src="${s.poster}" alt="${s.title}" loading="lazy">
                      <div class="similar-play-hover">▶</div>
                    </div>
                    <div class="similar-info">
                      <div class="similar-title">${s.title}</div>
                      <div class="similar-meta">
                        <span class="similar-rating">⭐ ${s.rating}</span>
                        <span>${s.year}</span>
                      </div>
                    </div>
                  </div>
                `).join('')}
              </div>
            </div>

            <!-- Cast & Details Panel -->
            <div class="tab-panel ${this.activeTab === 'details' ? 'active' : ''}" id="panel-details">
              <div class="cast-grid">
                <div class="detail-block">
                  <h4>Director</h4>
                  <p>${movie.director}</p>
                </div>
                <div class="detail-block">
                  <h4>Cast Members</h4>
                  <ul class="cast-list">
                    ${movie.cast.map(actor => `<li>${actor}</li>`).join('')}
                  </ul>
                </div>
                <div class="detail-block">
                  <h4>Audio & Video Specifications</h4>
                  <p>Quality: ${movie.quality}</p>
                  <p>Audio Format: ${movie.audio}</p>
                  <p>Maturity Classification: ${movie.maturity}</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    `;

    this.attachModalEvents();
  }

  getIframeHtml(trailerId) {
    return `
      <div class="video-responsive">
        <iframe 
          src="https://www.youtube-nocookie.com/embed/${trailerId}?autoplay=1&rel=0&modestbranding=1" 
          title="Trailer Player" 
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
          allowfullscreen>
        </iframe>
      </div>
    `;
  }

  attachModalEvents() {
    const startTrailerBtn = this.modalEl.querySelector('#btn-start-trailer');
    if (startTrailerBtn) {
      startTrailerBtn.addEventListener('click', () => {
        sound.playClick();
        const wrapper = this.modalEl.querySelector('#modal-video-wrapper');
        if (wrapper && this.currentMovie) {
          wrapper.innerHTML = this.getIframeHtml(this.currentMovie.trailerId);
        }
      });
    }

    const playFullBtn = this.modalEl.querySelector('#modal-play-btn');
    if (playFullBtn) {
      playFullBtn.addEventListener('click', () => {
        sound.playClick();
        window.dispatchEvent(new CustomEvent('toast:show', {
          detail: { message: `🎬 Starting stream for "${this.currentMovie.title}"... Enjoy the show!`, type: 'info' }
        }));
        const wrapper = this.modalEl.querySelector('#modal-video-wrapper');
        if (wrapper && this.currentMovie) {
          wrapper.innerHTML = this.getIframeHtml(this.currentMovie.trailerId);
        }
      });
    }

    const watchlistBtn = this.modalEl.querySelector('#modal-watchlist-btn');
    if (watchlistBtn) {
      watchlistBtn.addEventListener('click', () => {
        if (!this.currentMovie) return;
        sound.playPop();
        const added = watchlist.toggle(this.currentMovie.id);
        this.updateWatchlistBtn();
        window.dispatchEvent(new CustomEvent('toast:show', {
          detail: {
            message: added
              ? `Added "${this.currentMovie.title}" to My List ❤️`
              : `Removed "${this.currentMovie.title}" from My List`,
            type: added ? 'success' : 'neutral'
          }
        }));
      });
    }

    const shareBtn = this.modalEl.querySelector('#modal-share-btn');
    if (shareBtn) {
      shareBtn.addEventListener('click', () => {
        sound.playClick();
        const shareUrl = `${window.location.origin}${window.location.pathname}#movie-${this.currentMovie.id}`;
        navigator.clipboard?.writeText(shareUrl);
        window.dispatchEvent(new CustomEvent('toast:show', {
          detail: { message: `📋 Link for "${this.currentMovie.title}" copied to clipboard!`, type: 'info' }
        }));
      });
    }

    // Tab switching
    const tabBtns = this.modalEl.querySelectorAll('.modal-tab-btn');
    tabBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playClick();
        const tab = btn.dataset.tab;
        this.activeTab = tab;

        tabBtns.forEach(b => b.classList.toggle('active', b === btn));
        this.modalEl.querySelectorAll('.tab-panel').forEach(panel => {
          panel.classList.toggle('active', panel.id === `panel-${tab}`);
        });
      });
    });

    // Similar cards click handler
    const similarCards = this.modalEl.querySelectorAll('.similar-card');
    similarCards.forEach(card => {
      card.addEventListener('click', () => {
        const id = card.dataset.movieId;
        this.open(id, true);
      });
    });
  }

  updateWatchlistBtn() {
    const btn = this.modalEl.querySelector('#modal-watchlist-btn');
    if (!btn || !this.currentMovie) return;
    const inList = watchlist.has(this.currentMovie.id);
    btn.className = inList ? 'btn btn-secondary in-list' : 'btn btn-secondary';
    btn.textContent = inList ? '✓ In Watchlist' : '+ Add to My List';
  }
}
