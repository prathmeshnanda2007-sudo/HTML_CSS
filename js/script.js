/* ==========================================================================
   CINEVERSE — Simple JavaScript
   Features: Navbar scroll, Search/filter, Movie modal, Watchlist toggle
   ========================================================================== */

// ── Movie Data ───────────────────────────────────────────────────────────────
const MOVIES = {
  'dark-knight':   { title: 'THE DARK KNIGHT',   year: '2008', duration: '2h 32m', rating: '9.0', maturity: 'PG-13', genre: 'Action | Crime | Drama', desc: 'When the menace known as the Joker wreaks havoc on the people of Gotham, Batman must accept one of the greatest psychological tests of his ability to fight injustice.', cast: 'Starring: Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=760&q=80' },
  'oppenheimer':   { title: 'OPPENHEIMER',        year: '2023', duration: '3h 00m', rating: '8.9', maturity: 'R',     genre: 'Biography | Drama | History', desc: 'The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during the Manhattan Project.', cast: 'Starring: Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr.', img: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=760&q=80' },
  'dune2':         { title: 'DUNE: PART TWO',     year: '2024', duration: '2h 46m', rating: '8.6', maturity: 'PG-13', genre: 'Sci-Fi | Adventure | Action', desc: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.', cast: 'Starring: Timothée Chalamet, Zendaya, Rebecca Ferguson, Austin Butler', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=760&q=80' },
  'inception':     { title: 'INCEPTION',          year: '2010', duration: '2h 28m', rating: '8.8', maturity: 'PG-13', genre: 'Action | Sci-Fi | Thriller', desc: 'A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.', cast: 'Starring: Leonardo DiCaprio, Joseph Gordon-Levitt, Tom Hardy, Elliot Page', img: 'https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=760&q=80' },
  'johnwick4':     { title: 'JOHN WICK: CHAPTER 4', year: '2023', duration: '2h 49m', rating: '8.2', maturity: 'R', genre: 'Action | Crime | Thriller', desc: 'John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances.', cast: 'Starring: Keanu Reeves, Donnie Yen, Bill Skarsgård, Laurence Fishburne', img: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=760&q=80' },
  'gladiator2':    { title: 'GLADIATOR II',       year: '2024', duration: '2h 28m', rating: '8.1', maturity: 'R',     genre: 'Action | Adventure | Drama', desc: 'Lucius must enter the Colosseum after his home is conquered by the tyrannical Emperors who now lead Rome with an iron fist.', cast: 'Starring: Paul Mescal, Pedro Pascal, Denzel Washington, Connie Nielsen', img: 'https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=760&q=80' },
  'strangerthings':{ title: 'STRANGER THINGS',    year: '2022', duration: '4 Seasons', rating: '8.7', maturity: 'TV-14', genre: 'Drama | Fantasy | Horror', desc: 'When a young boy vanishes, a small town uncovers a mystery involving secret experiments, terrifying supernatural forces and one strange little girl.', cast: 'Starring: Millie Bobby Brown, Finn Wolfhard, Winona Ryder, David Harbour', img: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=760&q=80' },
  'interstellar':  { title: 'INTERSTELLAR',       year: '2014', duration: '2h 49m', rating: '8.7', maturity: 'PG-13', genre: 'Sci-Fi | Adventure | Drama', desc: 'A farmer and ex-NASA pilot is tasked to pilot a spacecraft through a wormhole in search of a new home for humanity.', cast: 'Starring: Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine', img: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=760&q=80' },
  'arcane':        { title: 'ARCANE',             year: '2021', duration: '2 Seasons', rating: '9.0', maturity: 'TV-14', genre: 'Animation | Action | Sci-Fi', desc: 'Set in the utopian region of Piltover and the oppressed underground of Zaun, two sisters find themselves on opposing sides of a brewing revolution.', cast: 'Starring: Hailee Steinfeld, Ella Purnell, Kevin Alejandro, Katie Leung', img: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=760&q=80' },
  'spiderverse':   { title: 'SPIDER-MAN: ACROSS THE SPIDER-VERSE', year: '2023', duration: '2h 20m', rating: '8.7', maturity: 'PG', genre: 'Animation | Action | Adventure', desc: 'Miles Morales catapults across the Multiverse, encountering a team of Spider-People charged with protecting its existence.', cast: 'Starring: Shameik Moore, Hailee Steinfeld, Oscar Isaac, Daniel Kaluuya', img: 'https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=760&q=80' },
  'pulpfiction':   { title: 'PULP FICTION',       year: '1994', duration: '2h 34m', rating: '8.9', maturity: 'R',     genre: 'Crime | Drama | Thriller', desc: 'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.', cast: 'Starring: John Travolta, Uma Thurman, Samuel L. Jackson, Bruce Willis', img: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=760&q=80' },
  'edgerunners':   { title: 'CYBERPUNK: EDGERUNNERS', year: '2022', duration: '10 Episodes', rating: '8.3', maturity: 'TV-MA', genre: 'Animation | Action | Sci-Fi', desc: 'A street kid tries to survive in a technology and body modification-obsessed city of the future by becoming an outlaw mercenary.', cast: 'Starring: KENN, Aoi Yuuki, Hiroki Touchi (Animated Series)', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=760&q=80' },
  'godfather':     { title: 'THE GODFATHER',      year: '1972', duration: '2h 55m', rating: '9.2', maturity: 'R',     genre: 'Crime | Drama', desc: 'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant youngest son.', cast: 'Starring: Marlon Brando, Al Pacino, James Caan, Robert Duvall', img: 'https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=760&q=80' },
};

// ── State ────────────────────────────────────────────────────────────────────
const watchlist = new Set();
let currentModalId = null;

// ── Navbar: Add scrolled class ───────────────────────────────────────────────
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ── Search ───────────────────────────────────────────────────────────────────
document.getElementById('searchInput').addEventListener('input', function () {
  const query = this.value.trim().toLowerCase();
  const bar   = document.getElementById('searchResultsBar');
  const main  = document.getElementById('mainContent');

  if (!query) {
    bar.style.display  = 'none';
    main.style.display = '';
    return;
  }

  const results = Object.entries(MOVIES).filter(([, m]) =>
    m.title.toLowerCase().includes(query) ||
    m.genre.toLowerCase().includes(query)
  );

  document.getElementById('searchQuery').textContent = this.value;
  const row = document.getElementById('searchResults');

  if (results.length === 0) {
    row.innerHTML = `<p style="padding:20px;color:#a1a1aa;font-size:0.88rem;">No results found for "<strong style="color:#fff">${this.value}</strong>".</p>`;
  } else {
    row.innerHTML = results.map(([id, m]) => buildCardHTML(id, m)).join('');
    attachCardEvents(row);
  }

  bar.style.display  = '';
  main.style.display = 'none';
});

function clearSearch() {
  document.getElementById('searchInput').value = '';
  document.getElementById('searchResultsBar').style.display = 'none';
  document.getElementById('mainContent').style.display = '';
}

// ── Build a card HTML string (for search results) ────────────────────────────
function buildCardHTML(id, m) {
  const inList = watchlist.has(id);
  return `
    <div class="movie-card" data-id="${id}">
      <div class="poster-wrap">
        <img src="${m.img}" alt="${m.title}" loading="lazy">
        <div class="card-overlay">
          <button class="play-btn" data-id="${id}">▶</button>
        </div>
        <button class="wl-btn ${inList ? 'in-list' : ''}" data-id="${id}">${inList ? '✓' : '+'}</button>
      </div>
      <div class="card-info">
        <h3>${m.title}</h3>
        <div class="card-meta">
          <span class="gold">⭐ ${m.rating}</span>
          <span>${m.genre.split('|')[0].trim()}</span>
          <span>${m.year}</span>
        </div>
      </div>
    </div>
  `;
}

function attachCardEvents(container) {
  container.querySelectorAll('.play-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); openModal(btn.dataset.id); });
  });
  container.querySelectorAll('.wl-btn').forEach(btn => {
    btn.addEventListener('click', (e) => { e.stopPropagation(); toggleWatchlist(btn, btn.dataset.id); });
  });
}

// ── Modal ────────────────────────────────────────────────────────────────────
function openModal(id) {
  const m = MOVIES[id];
  if (!m) return;

  currentModalId = id;

  document.getElementById('modal-img').src      = m.img;
  document.getElementById('modal-img').alt      = m.title;
  document.getElementById('modal-title').textContent = m.title;
  document.getElementById('modal-desc').textContent  = m.desc;
  document.getElementById('modal-cast').innerHTML    = `${m.cast}`;

  document.getElementById('modal-meta').innerHTML = `
    <span class="rating-pill">⭐ ${m.rating}</span>
    <span class="tag">${m.year}</span>
    <span class="tag">${m.duration}</span>
    <span class="tag">${m.maturity}</span>
    <span class="tag">${m.genre.split('|')[0].trim()}</span>
  `;

  // Watchlist button in modal
  const wlBtn = document.getElementById('modal-wl-btn');
  const inList = watchlist.has(id);
  wlBtn.textContent = inList ? '✓ In My List' : '+ My List';
  wlBtn.className   = inList ? 'btn btn-secondary in-list' : 'btn btn-secondary';
  wlBtn.onclick     = () => { toggleWatchlist(wlBtn, id, true); };

  document.getElementById('modal').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeModal(e) {
  // Close only if clicking the overlay backdrop or the × button
  if (e && e.target !== document.getElementById('modal')) return;
  document.getElementById('modal').classList.remove('open');
  document.body.style.overflow = '';
  currentModalId = null;
}

// Close on Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    document.getElementById('modal').classList.remove('open');
    document.body.style.overflow = '';
    currentModalId = null;
  }
});

// ── Watchlist ────────────────────────────────────────────────────────────────
function toggleWatchlist(btn, id, isModal = false) {
  const added = !watchlist.has(id);

  if (added) {
    watchlist.add(id);
  } else {
    watchlist.delete(id);
  }

  // Update the clicked button
  btn.textContent = added ? (isModal ? '✓ In My List' : '✓') : (isModal ? '+ My List' : '+');
  btn.className   = added
    ? (isModal ? 'btn btn-secondary in-list' : 'wl-btn in-list')
    : (isModal ? 'btn btn-secondary'         : 'wl-btn');

  // Sync all buttons with this id across the page
  document.querySelectorAll(`.wl-btn[onclick*="${id}"]`).forEach(b => {
    b.textContent = added ? '✓' : '+';
    b.classList.toggle('in-list', added);
  });

  // Refresh the My List shelf
  renderMyList();
}

function renderMyList() {
  const row       = document.getElementById('mylistRow');
  const countEl   = document.getElementById('mylistCount');
  const ids       = [...watchlist];

  countEl.textContent = `${ids.length} saved`;

  if (ids.length === 0) {
    row.innerHTML = `
      <div class="empty-list">
        <div>🎬</div>
        <p>Your list is empty. Click <strong>+</strong> on any movie to save it here.</p>
      </div>
    `;
    return;
  }

  row.innerHTML = ids.map(id => {
    const m = MOVIES[id];
    if (!m) return '';
    return `
      <div class="movie-card">
        <div class="poster-wrap">
          <img src="${m.img}" alt="${m.title}" loading="lazy">
          <div class="card-overlay">
            <button class="play-btn" onclick="openModal('${id}')">▶</button>
          </div>
          <button class="wl-btn in-list" onclick="toggleWatchlist(this,'${id}')" title="Remove from My List">✓</button>
        </div>
        <div class="card-info">
          <h3>${m.title}</h3>
          <div class="card-meta">
            <span class="gold">⭐ ${m.rating}</span>
            <span>${m.genre.split('|')[0].trim()}</span>
            <span>${m.year}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');
}
