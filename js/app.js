/**
 * CINEVERSE - Main Application Bootstrap
 * Orchestrates all modules: Hero Carousel, Shelves, Search, Modal,
 * Toast Notifications, Notification Center, and Sound controls.
 */

import { HeroCarousel } from './hero.js';
import { ShelfManager } from './shelf.js';
import { SearchSystem } from './search.js';
import { MovieModal } from './modal.js';
import { watchlist } from './watchlist.js';
import { sound } from './sound.js';

/* ============================================================
   TOAST NOTIFICATION SYSTEM
   ============================================================ */
class ToastManager {
  constructor() {
    this.container = document.getElementById('toast-container');
    window.addEventListener('toast:show', (e) => {
      this.show(e.detail.message, e.detail.type || 'info');
    });
  }

  show(message, type = 'info') {
    if (!this.container) return;
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
      <span class="toast-msg">${message}</span>
      <button class="toast-close" aria-label="Dismiss">&times;</button>
    `;

    this.container.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('toast-show');
    });

    const dismiss = () => {
      toast.classList.remove('toast-show');
      toast.addEventListener('transitionend', () => toast.remove());
    };

    toast.querySelector('.toast-close').addEventListener('click', dismiss);
    setTimeout(dismiss, 4000);
  }
}

/* ============================================================
   NOTIFICATION CENTER
   ============================================================ */
class NotificationCenter {
  constructor() {
    this.bell = document.getElementById('notif-bell');
    this.panel = document.getElementById('notif-panel');
    this.badge = document.getElementById('notif-badge');
    this.notifications = [
      { id: 1, icon: '🔥', text: 'Gladiator II is now streaming in 4K!', time: '2m ago', unread: true },
      { id: 2, icon: '⭐', text: 'New episode of Arcane Season 2 is live.', time: '1h ago', unread: true },
      { id: 3, icon: '🎬', text: 'Dune: Part Three - Official announcement!', time: '3h ago', unread: false },
    ];

    if (!this.bell || !this.panel) return;
    this.renderPanel();
    this.attachEvents();
  }

  renderPanel() {
    const unreadCount = this.notifications.filter(n => n.unread).length;
    if (this.badge) {
      this.badge.textContent = unreadCount;
      this.badge.style.display = unreadCount > 0 ? '' : 'none';
    }

    this.panel.innerHTML = `
      <div class="notif-header">
        <h4>Notifications</h4>
        <button class="notif-clear-all" id="notif-clear-btn">Mark all read</button>
      </div>
      <ul class="notif-list">
        ${this.notifications.map(n => `
          <li class="notif-item ${n.unread ? 'unread' : ''}" data-notif-id="${n.id}">
            <span class="notif-icon">${n.icon}</span>
            <div class="notif-body">
              <p class="notif-text">${n.text}</p>
              <span class="notif-time">${n.time}</span>
            </div>
            ${n.unread ? '<span class="notif-dot"></span>' : ''}
          </li>
        `).join('')}
      </ul>
    `;

    this.panel.querySelector('#notif-clear-btn')?.addEventListener('click', () => {
      sound.playClick();
      this.notifications.forEach(n => n.unread = false);
      this.renderPanel();
      this.panel.classList.remove('open');
    });
  }

  attachEvents() {
    this.bell.addEventListener('click', (e) => {
      e.stopPropagation();
      sound.playPop();
      this.panel.classList.toggle('open');
    });

    document.addEventListener('click', (e) => {
      if (!e.target.closest('#notif-bell') && !e.target.closest('#notif-panel')) {
        this.panel.classList.remove('open');
      }
    });
  }
}

/* ============================================================
   SOUND TOGGLE BUTTON
   ============================================================ */
function initSoundToggle() {
  const btn = document.getElementById('sound-toggle-btn');
  if (!btn) return;

  const update = () => {
    btn.title = sound.enabled ? 'Mute UI sounds' : 'Enable UI sounds';
    btn.querySelector('.sound-icon').textContent = sound.enabled ? '🔊' : '🔇';
  };

  update();
  btn.addEventListener('click', () => {
    sound.toggle();
    update();
  });
}

/* ============================================================
   NAVBAR SCROLL BEHAVIOR
   ============================================================ */
function initNavbarScroll() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;
  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });
}

/* ============================================================
   WATCHLIST COUNT BADGE IN NAVBAR
   ============================================================ */
function initWatchlistBadge() {
  const badge = document.getElementById('watchlist-nav-badge');
  if (!badge) return;

  const update = () => {
    const count = watchlist.getCount();
    badge.textContent = count;
    badge.style.display = count > 0 ? '' : 'none';
  };

  update();
  window.addEventListener('watchlist:change', update);
}

/* ============================================================
   PROFILE DROPDOWN
   ============================================================ */
function initProfileDropdown() {
  const profileBtn = document.querySelector('.profile-avatar-btn');
  const dropdownMenu = document.querySelector('.dropdown-menu');
  if (!profileBtn || !dropdownMenu) return;

  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    sound.playPop();
    dropdownMenu.classList.toggle('open');
  });

  document.addEventListener('click', () => dropdownMenu.classList.remove('open'));
}

/* ============================================================
   SCROLL-TO-TOP BUTTON
   ============================================================ */
function initScrollToTop() {
  const btn = document.getElementById('scroll-top-btn');
  if (!btn) return;

  window.addEventListener('scroll', () => {
    btn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  btn.addEventListener('click', () => {
    sound.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   STATS COUNTER ANIMATION
   ============================================================ */
function initCounterAnimation() {
  const counters = document.querySelectorAll('[data-count]');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count);
      let current = 0;
      const step = Math.ceil(target / 60);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current.toLocaleString() + (el.dataset.suffix || '');
        if (current >= target) clearInterval(timer);
      }, 20);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(c => observer.observe(c));
}

/* ============================================================
   LAZY LOADING IMAGES w/ Fade-in
   ============================================================ */
function initImageFadeIn() {
  const imgs = document.querySelectorAll('img[loading="lazy"]');
  imgs.forEach(img => {
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    if (img.complete) {
      img.style.opacity = '1';
    } else {
      img.addEventListener('load', () => { img.style.opacity = '1'; });
    }
  });
}

/* ============================================================
   APP INITIALIZATION
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  // Initialize modal first so shelves/hero can bind to it
  const modal = new MovieModal();

  const openMovie = (id, autoplay = false) => modal.open(id, autoplay);

  // Core sections
  new HeroCarousel(openMovie);
  new ShelfManager(openMovie);
  new SearchSystem(openMovie);

  // UI extras
  new ToastManager();
  new NotificationCenter();

  initSoundToggle();
  initNavbarScroll();
  initWatchlistBadge();
  initProfileDropdown();
  initScrollToTop();
  initCounterAnimation();
  initImageFadeIn();

  // Welcome toast
  setTimeout(() => {
    window.dispatchEvent(new CustomEvent('toast:show', {
      detail: { message: '🎬 Welcome back to CINEVERSE PRO!', type: 'info' }
    }));
  }, 800);

  console.log('%c🎬 CINEVERSE', 'color:#e50914;font-size:2rem;font-weight:bold;');
  console.log('%cFrontend powered by Vanilla JS ES6 Modules', 'color:#a1a1aa;font-size:0.9rem;');
});
