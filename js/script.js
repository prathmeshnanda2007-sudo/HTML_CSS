/**
 * CINEVERSE Streaming Platform
 * Interactive Movie Hub, Search, Carousel Scroll, My List & Modal Management
 */

// --- Movie Dataset ---
const MOVIES_DATABASE = [
  // Trending Now
  {
    id: "oppenheimer",
    title: "Oppenheimer",
    rating: "8.9",
    year: "2023",
    duration: "3h 00m",
    genre: "Biography | Drama | History",
    category: "trending",
    isTrending: true,
    poster: "https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    description: "The story of American scientist J. Robert Oppenheimer and his role in the development of the atomic bomb during World War II.",
    cast: "Cillian Murphy, Emily Blunt, Matt Damon, Robert Downey Jr."
  },
  {
    id: "dune2",
    title: "Dune: Part Two",
    rating: "8.6",
    year: "2024",
    duration: "2h 46m",
    genre: "Sci-Fi | Adventure | Action",
    category: "trending",
    isTrending: true,
    poster: "https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1200&q=80",
    description: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
    cast: "Timothée Chalamet, Zendaya, Rebecca Ferguson, Javier Bardem"
  },
  {
    id: "barbie",
    title: "Barbie",
    rating: "7.0",
    year: "2023",
    duration: "1h 54m",
    genre: "Comedy | Fantasy | Adventure",
    category: "trending",
    isTrending: true,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    description: "Barbie and Ken are having the time of their lives in the colorful and seemingly perfect world of Barbie Land until an existential crisis strikes.",
    cast: "Margot Robbie, Ryan Gosling, America Ferrera, Will Ferrell"
  },
  {
    id: "avatar2",
    title: "Avatar: The Way of Water",
    rating: "7.6",
    year: "2022",
    duration: "3h 12m",
    genre: "Sci-Fi | Action | Adventure",
    category: "trending",
    isTrending: true,
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    description: "Jake Sully lives with his newfound family formed on the extrasolar moon Pandora. Once a familiar threat returns, Jake must fight to protect their home.",
    cast: "Sam Worthington, Zoe Saldana, Sigourney Weaver, Stephen Lang"
  },
  {
    id: "joker",
    title: "Joker",
    rating: "8.4",
    year: "2019",
    duration: "2h 02m",
    genre: "Crime | Drama | Thriller",
    category: "trending",
    isTrending: true,
    poster: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&w=1200&q=80",
    description: "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous figure.",
    cast: "Joaquin Phoenix, Robert De Niro, Zazie Beetz, Frances Conroy"
  },

  // Popular Movies
  {
    id: "dark-knight",
    title: "The Dark Knight",
    rating: "9.0",
    year: "2008",
    duration: "2h 32m",
    genre: "Action | Crime | Drama",
    category: "popular",
    isFeatured: true,
    poster: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=1920&q=80",
    description: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests of his ability to fight injustice.",
    cast: "Christian Bale, Heath Ledger, Aaron Eckhart, Michael Caine"
  },
  {
    id: "inception",
    title: "Inception",
    rating: "8.8",
    year: "2010",
    duration: "2h 28m",
    genre: "Action | Adventure | Sci-Fi",
    category: "popular",
    poster: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?auto=format&fit=crop&w=1200&q=80",
    description: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: "Leonardo DiCaprio, Joseph Gordon-Levitt, Elliot Page, Tom Hardy"
  },
  {
    id: "interstellar",
    title: "Interstellar",
    rating: "8.7",
    year: "2014",
    duration: "2h 49m",
    genre: "Adventure | Drama | Sci-Fi",
    category: "popular",
    poster: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80",
    description: "When Earth becomes uninhabitable in the future, a farmer and ex-NASA pilot, Joseph Cooper, is tasked to pilot a spacecraft, along with a team of researchers, to find a new planet for humans.",
    cast: "Matthew McConaughey, Anne Hathaway, Jessica Chastain, Michael Caine"
  },
  {
    id: "matrix",
    title: "The Matrix",
    rating: "8.7",
    year: "1999",
    duration: "2h 16m",
    genre: "Action | Sci-Fi",
    category: "popular",
    poster: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=1200&q=80",
    description: "When a beautiful stranger leads computer hacker Neo to a forbidding underworld, he discovers the shocking truth--the life he knows is the elaborate deception of an evil cyber-intelligence.",
    cast: "Keanu Reeves, Laurence Fishburne, Carrie-Anne Moss, Hugo Weaving"
  },
  {
    id: "titanic",
    title: "Titanic",
    rating: "7.9",
    year: "1997",
    duration: "3h 14m",
    genre: "Drama | Romance",
    category: "popular",
    poster: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1508873696983-2df5703bc20d?auto=format&fit=crop&w=1200&q=80",
    description: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    cast: "Leonardo DiCaprio, Kate Winslet, Billy Zane, Kathy Bates"
  },

  // Action Movies
  {
    id: "john-wick-4",
    title: "John Wick: Chapter 4",
    rating: "7.7",
    year: "2023",
    duration: "2h 49m",
    genre: "Action | Crime | Thriller",
    category: "action",
    poster: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1533613220915-609f661a6fe1?auto=format&fit=crop&w=1200&q=80",
    description: "John Wick uncovers a path to defeating The High Table. But before he can earn his freedom, Wick must face off against a new enemy with powerful alliances across the globe.",
    cast: "Keanu Reeves, Donnie Yen, Bill Skarsgård, Laurence Fishburne"
  },
  {
    id: "avengers-endgame",
    title: "Avengers: Endgame",
    rating: "8.4",
    year: "2019",
    duration: "3h 01m",
    genre: "Action | Adventure | Drama",
    category: "action",
    poster: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1635805737707-575885ab0820?auto=format&fit=crop&w=1200&q=80",
    description: "After the devastating events of Infinity War, the universe is in ruins. With the help of remaining allies, the Avengers assemble once more in order to reverse Thanos' actions.",
    cast: "Robert Downey Jr., Chris Evans, Mark Ruffalo, Chris Hemsworth"
  },
  {
    id: "top-gun",
    title: "Top Gun: Maverick",
    rating: "8.3",
    year: "2022",
    duration: "2h 10m",
    genre: "Action | Drama",
    category: "action",
    poster: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f4?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1519074069444-1ba4ea16e6f4?auto=format&fit=crop&w=1200&q=80",
    description: "After thirty years, Maverick is still pushing the envelope as a top naval aviator, but must confront ghosts of his past when he leads TOP GUN's elite graduates on an impossible mission.",
    cast: "Tom Cruise, Miles Teller, Jennifer Connelly, Jon Hamm"
  },
  {
    id: "mad-max",
    title: "Mad Max: Fury Road",
    rating: "8.1",
    year: "2015",
    duration: "2h 00m",
    genre: "Action | Adventure | Sci-Fi",
    category: "action",
    poster: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1511447333015-45b65e60f6d5?auto=format&fit=crop&w=1200&q=80",
    description: "In a post-apocalyptic wasteland, a woman rebels against a tyrannical ruler in search for her homeland with the aid of a group of female prisoners, a psychotic worshiper and a drifter named Max.",
    cast: "Tom Hardy, Charlize Theron, Nicholas Hoult, Hugh Keays-Byrne"
  },

  // Comedy & Adventure
  {
    id: "deadpool",
    title: "Deadpool",
    rating: "8.0",
    year: "2016",
    duration: "1h 48m",
    genre: "Action | Comedy",
    category: "comedy",
    poster: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1200&q=80",
    description: "A wisecracking mercenary gets experimented on and becomes immortal but ugly, and sets out to track down the man who ruined his looks.",
    cast: "Ryan Reynolds, Morena Baccarin, T.J. Miller, Ed Skrein"
  },
  {
    id: "free-guy",
    title: "Free Guy",
    rating: "7.1",
    year: "2021",
    duration: "1h 55m",
    genre: "Action | Adventure | Comedy",
    category: "comedy",
    poster: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=1200&q=80",
    description: "When a bank teller discovers he's actually a background player in an open-world video game, he decides to become the hero of his own story.",
    cast: "Ryan Reynolds, Jodie Comer, Taika Waititi, Lil Rel Howery"
  },
  {
    id: "the-hangover",
    title: "The Hangover",
    rating: "7.7",
    year: "2009",
    duration: "1h 40m",
    genre: "Comedy",
    category: "comedy",
    poster: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=80",
    description: "Three buddies wake up from a bachelor party in Las Vegas, with no memory of the previous night and the bachelor missing. They make their way around the city in order to find their friend before his wedding.",
    cast: "Zach Galifianakis, Bradley Cooper, Ed Helms, Justin Bartha"
  },
  {
    id: "superbad",
    title: "Superbad",
    rating: "7.6",
    year: "2007",
    duration: "1h 53m",
    genre: "Comedy",
    category: "comedy",
    poster: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80",
    description: "Two co-dependent high school seniors are forced to deal with separation anxiety after their plan to stage a booze-soaked party goes awry.",
    cast: "Michael Cera, Jonah Hill, Christopher Mintz-Plasse, Bill Hader"
  },
  {
    id: "jumanji",
    title: "Jumanji: Welcome to the Jungle",
    rating: "7.0",
    year: "2017",
    duration: "1h 59m",
    genre: "Action | Adventure | Comedy",
    category: "comedy",
    poster: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=600&q=80",
    backdrop: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=1200&q=80",
    description: "Four teenagers are sucked into a magical video game, and the only way they can escape is to work together to finish the game.",
    cast: "Dwayne Johnson, Karen Gillan, Kevin Hart, Jack Black"
  }
];

// --- Application State ---
let userMyList = JSON.parse(localStorage.getItem('cineverse_mylist') || localStorage.getItem('cinemax_mylist')) || ['interstellar', 'dark-knight', 'inception'];

// --- DOM References ---
const navbar = document.getElementById('navbar');
const searchInput = document.getElementById('searchInput');
const clearSearchBtn = document.getElementById('clearSearchBtn');
const searchResultsSection = document.getElementById('searchResultsSection');
const searchResultsGrid = document.getElementById('searchResultsGrid');
const searchResultsCount = document.getElementById('searchResultsCount');

const trendingRow = document.getElementById('trendingRow');
const popularRow = document.getElementById('popularRow');
const actionRow = document.getElementById('actionRow');
const comedyRow = document.getElementById('comedyRow');
const myListRow = document.getElementById('myListRow');

const myListBadge = document.getElementById('myListBadge');
const movieModal = document.getElementById('movieModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const toast = document.getElementById('toastNotification');
const toastMessage = document.getElementById('toastMessage');

const profileBtn = document.getElementById('profileBtn');
const profileDropdown = document.getElementById('profileDropdown');

// --- Helper: Generate Card HTML ---
function createMovieCardElement(movie) {
  const isInList = userMyList.includes(movie.id);
  
  const card = document.createElement('div');
  card.className = 'movie-card';
  card.setAttribute('data-id', movie.id);

  card.innerHTML = `
    <div class="card-poster-wrapper">
      <img class="movie-poster" src="${movie.poster}" alt="${movie.title}" loading="lazy" onerror="this.src='https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=600&q=80';">
      <div class="play-overlay">
        <div class="play-circle">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <polygon points="5 3 19 12 5 21 5 3"/>
          </svg>
        </div>
      </div>
    </div>
    <div class="movie-info">
      <h3 class="movie-title" title="${movie.title}">${movie.title}</h3>
      <div class="movie-meta-strip">
        <span class="card-rating">
          <svg viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
          </svg>
          ${movie.rating}
        </span>
        <span>${movie.year}</span>
        <div class="card-actions-quick">
          <button class="quick-btn ${isInList ? 'active' : ''}" title="${isInList ? 'Remove from My List' : 'Add to My List'}" data-action="toggle-list" data-id="${movie.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
              ${isInList ? '<polyline points="20 6 9 17 4 12"/>' : '<line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/>'}
            </svg>
          </button>
        </div>
      </div>
    </div>
  `;

  // Click on card opens details modal (unless clicking the quick button)
  card.addEventListener('click', (e) => {
    if (e.target.closest('[data-action="toggle-list"]')) {
      e.stopPropagation();
      toggleMyList(movie.id);
      return;
    }
    openMovieDetails(movie);
  });

  return card;
}

// --- Render Category Rows ---
function renderMovies() {
  if (trendingRow) trendingRow.innerHTML = '';
  if (popularRow) popularRow.innerHTML = '';
  if (actionRow) actionRow.innerHTML = '';
  if (comedyRow) comedyRow.innerHTML = '';

  MOVIES_DATABASE.forEach(movie => {
    const card = createMovieCardElement(movie);

    if (movie.category === 'trending' && trendingRow) trendingRow.appendChild(card.cloneNode(true));
    if (movie.category === 'popular' && popularRow) popularRow.appendChild(card.cloneNode(true));
    if (movie.category === 'action' && actionRow) actionRow.appendChild(card.cloneNode(true));
    if (movie.category === 'comedy' && comedyRow) comedyRow.appendChild(card.cloneNode(true));
  });

  // Attach event listeners to cloned elements
  attachCardEvents();
  renderMyListRow();
}

function attachCardEvents() {
  document.querySelectorAll('.movie-card').forEach(card => {
    const id = card.getAttribute('data-id');
    const movie = MOVIES_DATABASE.find(m => m.id === id);
    if (!movie) return;

    card.onclick = (e) => {
      const toggleBtn = e.target.closest('[data-action="toggle-list"]');
      if (toggleBtn) {
        e.stopPropagation();
        toggleMyList(id);
      } else {
        openMovieDetails(movie);
      }
    };
  });
}

// --- Render My List Row ---
function renderMyListRow() {
  if (!myListRow) return;
  myListRow.innerHTML = '';

  const listMovies = MOVIES_DATABASE.filter(m => userMyList.includes(m.id));

  if (listMovies.length === 0) {
    myListRow.innerHTML = `
      <div class="empty-list-card">
        <p>Your list is currently empty.</p>
        <p style="font-size: 0.8rem; margin-top: 6px;">Hover over any movie card and click the <strong>+</strong> button to add titles to your personal watchlist.</p>
      </div>
    `;
  } else {
    listMovies.forEach(movie => {
      myListRow.appendChild(createMovieCardElement(movie));
    });
  }

  if (myListBadge) {
    myListBadge.textContent = userMyList.length;
    myListBadge.style.display = userMyList.length > 0 ? 'flex' : 'none';
  }

  // Update Hero My List Button state if featured movie is in list
  const heroListBtn = document.getElementById('heroListBtn');
  if (heroListBtn) {
    const isHeroInList = userMyList.includes('dark-knight');
    heroListBtn.innerHTML = isHeroInList 
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> In My List`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> My List`;
  }
}

// --- Toggle My List ---
function toggleMyList(movieId) {
  const movie = MOVIES_DATABASE.find(m => m.id === movieId);
  if (!movie) return;

  const index = userMyList.indexOf(movieId);
  if (index > -1) {
    userMyList.splice(index, 1);
    showToast(`Removed "${movie.title}" from My List`);
  } else {
    userMyList.push(movieId);
    showToast(`Added "${movie.title}" to My List`);
  }

  localStorage.setItem('cineverse_mylist', JSON.stringify(userMyList));
  renderMovies();
}

// --- Toast Notification ---
let toastTimeout;
function showToast(message) {
  if (!toast) return;
  toastMessage.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// --- Real-time Live Search ---
if (searchInput) {
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim().toLowerCase();

    if (query.length > 0) {
      clearSearchBtn.classList.add('show');
      const filtered = MOVIES_DATABASE.filter(m => 
        m.title.toLowerCase().includes(query) ||
        m.genre.toLowerCase().includes(query) ||
        m.cast.toLowerCase().includes(query)
      );

      searchResultsSection.classList.add('active');
      searchResultsCount.textContent = `${filtered.length} movie${filtered.length === 1 ? '' : 's'} found`;
      searchResultsGrid.innerHTML = '';

      if (filtered.length === 0) {
        searchResultsGrid.innerHTML = `<p style="color: var(--text-muted); grid-column: 1 / -1; padding: 20px 0;">No matching movies found for "${query}". Try searching for Action, Inception, Nolan, etc.</p>`;
      } else {
        filtered.forEach(movie => {
          searchResultsGrid.appendChild(createMovieCardElement(movie));
        });
      }
      attachCardEvents();
    } else {
      clearSearchBtn.classList.remove('show');
      searchResultsSection.classList.remove('active');
    }
  });

  clearSearchBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearSearchBtn.classList.remove('show');
    searchResultsSection.classList.remove('active');
    searchInput.focus();
  });
}

// --- Movie Detail Modal ---
function openMovieDetails(movie) {
  if (!movieModal) return;
  const isInList = userMyList.includes(movie.id);

  document.getElementById('modalBackdrop').style.backgroundImage = `url('${movie.backdrop || movie.poster}')`;
  document.getElementById('modalTitle').textContent = movie.title;
  document.getElementById('modalRating').textContent = movie.rating;
  document.getElementById('modalYear').textContent = movie.year;
  document.getElementById('modalDuration').textContent = movie.duration;
  document.getElementById('modalGenre').textContent = movie.genre;
  document.getElementById('modalSynopsis').textContent = movie.description;
  document.getElementById('modalCast').textContent = movie.cast;

  const modalListBtn = document.getElementById('modalListBtn');
  if (modalListBtn) {
    modalListBtn.innerHTML = isInList
      ? `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg> In My List`
      : `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg> Add to My List`;
    
    modalListBtn.onclick = () => {
      toggleMyList(movie.id);
      openMovieDetails(movie); // refresh modal state
    };
  }

  movieModal.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeMovieDetails() {
  if (!movieModal) return;
  movieModal.classList.remove('open');
  document.body.style.overflow = '';
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeMovieDetails);
}

if (movieModal) {
  movieModal.addEventListener('click', (e) => {
    if (e.target === movieModal) {
      closeMovieDetails();
    }
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeMovieDetails();
});

// --- Horizontal Carousel Scroll Arrows ---
document.querySelectorAll('.carousel-arrow').forEach(button => {
  button.addEventListener('click', () => {
    const targetRowId = button.getAttribute('data-target');
    const direction = button.getAttribute('data-direction');
    const row = document.getElementById(targetRowId);

    if (row) {
      const scrollAmount = row.clientWidth * 0.75;
      row.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  });
});

// --- Navbar Scroll Dynamics ---
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// --- Profile Dropdown Toggle ---
if (profileBtn && profileDropdown) {
  profileBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('active');
  });

  document.addEventListener('click', () => {
    profileDropdown.classList.remove('active');
  });
}

// --- Featured Hero Actions ---
const heroPlayBtn = document.getElementById('heroPlayBtn');
const heroListBtn = document.getElementById('heroListBtn');
const heroInfoBtn = document.getElementById('heroInfoBtn');

if (heroPlayBtn) {
  heroPlayBtn.addEventListener('click', () => {
    const darkKnight = MOVIES_DATABASE.find(m => m.id === 'dark-knight');
    openMovieDetails(darkKnight);
  });
}

if (heroListBtn) {
  heroListBtn.addEventListener('click', () => {
    toggleMyList('dark-knight');
  });
}

if (heroInfoBtn) {
  heroInfoBtn.addEventListener('click', () => {
    const darkKnight = MOVIES_DATABASE.find(m => m.id === 'dark-knight');
    openMovieDetails(darkKnight);
  });
}

// --- Smooth Category Links in Navbar ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', (e) => {
    const target = link.getAttribute('href');
    if (target.startsWith('#')) {
      e.preventDefault();
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');

      const element = document.querySelector(target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  });
});

// --- Initialize App ---
document.addEventListener('DOMContentLoaded', () => {
  renderMovies();
});
