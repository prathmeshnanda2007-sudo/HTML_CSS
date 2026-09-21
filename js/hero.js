/**
 * CINEVERSE Hero Carousel
 * Auto-sliding featured banner with dynamic content and dot navigation.
 */

import { MOVIES } from './data.js';
import { watchlist } from './watchlist.js';
import { sound } from './sound.js';

export class HeroCarousel {
  constructor(onMovieClick) {
    this.featured = MOVIES.filter(m => m.featured);
    this.current = 0;
    this.timer = null;
    this.onMovieClick = onMovieClick;
    this.paused = false;

    this.heroEl = document.getElementById('js-hero');
    if (!this.heroEl) return;

    this.render();
    this.startAutoplay();
    this.attachEvents();
  }

  render() {
    this.heroEl.innerHTML = `
      <div class="hero-slides-container" id="hero-slides">
        ${this.featured.map((m, i) => `
          <div class="hero-slide ${i === 0 ? 'active' : ''}" 
               data-index="${i}"
               style="background-image: url('${m.backdrop}')">
            <div class="hero-gradient-overlay"></div>
            <div class="hero-content-block">
              <div class="featured-badge">
                <span>★ FEATURED BLOCKBUSTER</span>
              </div>
              <h1 class="hero-slide-title">${m.title}</h1>
              <div class="hero-meta-strip">
                <span class="rating-pill">⭐ ${m.rating}</span>
                <span>${m.year}</span>
                <span>${m.duration}</span>
                <span class="quality-badge">${m.quality}</span>
                <span class="quality-badge">${m.audio}</span>
                <span class="genre-tags">${m.genres.join(' | ')}</span>
              </div>
              <p class="hero-slide-desc">${m.description.substring(0, 160)}...</p>
              <div class="hero-cta-row">
                <button class="btn btn-primary hero-play-btn" data-id="${m.id}" data-action="play">
                  ▶ Play Trailer
                </button>
                <button class="btn btn-secondary hero-info-btn" data-id="${m.id}" data-action="info">
                  ℹ More Info
                </button>
                <button class="btn btn-icon hero-wl-btn ${watchlist.has(m.id) ? 'in-list' : ''}" 
                        data-id="${m.id}" data-action="watchlist" title="Add to My List">
                  ${watchlist.has(m.id) ? '✓' : '+'}
                </button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- Dot Navigation -->
      <div class="hero-dots">
        ${this.featured.map((_, i) => `
          <button class="hero-dot ${i === 0 ? 'active' : ''}" data-idx="${i}" aria-label="Slide ${i + 1}"></button>
        `).join('')}
      </div>

      <!-- Progress Bar -->
      <div class="hero-progress-bar">
        <div class="hero-progress-fill" id="hero-progress-fill"></div>
      </div>

      <!-- Prev/Next Arrows -->
      <button class="hero-arrow hero-arrow-prev" id="hero-prev" aria-label="Previous slide">&#8249;</button>
      <button class="hero-arrow hero-arrow-next" id="hero-next" aria-label="Next slide">&#8250;</button>
    `;
  }

  goto(index, playSound = true) {
    const slides = this.heroEl.querySelectorAll('.hero-slide');
    const dots = this.heroEl.querySelectorAll('.hero-dot');

    slides[this.current]?.classList.remove('active');
    dots[this.current]?.classList.remove('active');

    this.current = (index + this.featured.length) % this.featured.length;

    slides[this.current]?.classList.add('active');
    dots[this.current]?.classList.add('active');

    if (playSound) sound.playWhoosh();
    this.resetProgress();
  }

  next() { this.goto(this.current + 1); }
  prev() { this.goto(this.current - 1); }

  resetProgress() {
    const fill = document.getElementById('hero-progress-fill');
    if (!fill) return;
    fill.style.transition = 'none';
    fill.style.width = '0%';
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        fill.style.transition = 'width 5s linear';
        fill.style.width = '100%';
      });
    });
  }

  startAutoplay() {
    this.resetProgress();
    this.timer = setInterval(() => {
      if (!this.paused) this.next();
    }, 5000);
  }

  stopAutoplay() {
    if (this.timer) clearInterval(this.timer);
  }

  attachEvents() {
    // Dots
    this.heroEl.querySelectorAll('.hero-dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        this.goto(parseInt(e.currentTarget.dataset.idx));
        this.stopAutoplay();
        this.startAutoplay();
      });
    });

    // Arrows
    this.heroEl.querySelector('#hero-prev')?.addEventListener('click', () => {
      this.prev();
      this.stopAutoplay();
      this.startAutoplay();
    });

    this.heroEl.querySelector('#hero-next')?.addEventListener('click', () => {
      this.next();
      this.stopAutoplay();
      this.startAutoplay();
    });

    // Hero action buttons
    this.heroEl.addEventListener('click', (e) => {
      const btn = e.target.closest('[data-action]');
      if (!btn) return;
      const id = btn.dataset.id;
      const action = btn.dataset.action;

      if (action === 'play') {
        sound.playClick();
        this.onMovieClick(id, true); // autoplay trailer
      } else if (action === 'info') {
        sound.playClick();
        this.onMovieClick(id, false);
      } else if (action === 'watchlist') {
        sound.playPop();
        const added = watchlist.toggle(id);
        btn.classList.toggle('in-list', added);
        btn.textContent = added ? '✓' : '+';
        window.dispatchEvent(new CustomEvent('toast:show', {
          detail: {
            message: added ? `Added to My List ❤️` : `Removed from My List`,
            type: added ? 'success' : 'neutral'
          }
        }));
      }
    });

    // Pause on hover
    this.heroEl.addEventListener('mouseenter', () => { this.paused = true; });
    this.heroEl.addEventListener('mouseleave', () => { this.paused = false; });

    // Touch/swipe support
    let touchStartX = 0;
    this.heroEl.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    this.heroEl.addEventListener('touchend', (e) => {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? this.next() : this.prev();
      }
    }, { passive: true });

    // Update watchlist buttons on external changes
    window.addEventListener('watchlist:change', () => {
      this.heroEl.querySelectorAll('[data-action="watchlist"]').forEach(btn => {
        const id = btn.dataset.id;
        const inList = watchlist.has(id);
        btn.classList.toggle('in-list', inList);
        btn.textContent = inList ? '✓' : '+';
      });
    });
  }
}
