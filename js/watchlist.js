/**
 * CINEVERSE Watchlist Manager
 * Persists saved movies to localStorage with reactive event updates.
 */

const STORAGE_KEY = 'cineverse_watchlist';

class WatchlistManager {
  constructor() {
    this.list = this._load();
  }

  _load() {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      return data ? JSON.parse(data) : ['dark-knight', 'dune-2', 'inception', 'interstellar'];
    } catch (e) {
      console.warn('Failed to load watchlist from localStorage', e);
      return ['dark-knight', 'dune-2', 'inception', 'interstellar'];
    }
  }

  _save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.list));
      window.dispatchEvent(new CustomEvent('watchlist:change', {
        detail: { list: this.list, count: this.list.length }
      }));
    } catch (e) {
      console.warn('Failed to save watchlist to localStorage', e);
    }
  }

  has(id) {
    return this.list.includes(id);
  }

  add(id) {
    if (!this.has(id)) {
      this.list.unshift(id);
      this._save();
      return true;
    }
    return false;
  }

  remove(id) {
    const index = this.list.indexOf(id);
    if (index > -1) {
      this.list.splice(index, 1);
      this._save();
      return true;
    }
    return false;
  }

  toggle(id) {
    if (this.has(id)) {
      this.remove(id);
      return false;
    } else {
      this.add(id);
      return true;
    }
  }

  getAll() {
    return [...this.list];
  }

  getCount() {
    return this.list.length;
  }
}

export const watchlist = new WatchlistManager();
