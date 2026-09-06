/**
 * ============================================================================
 * BIRMINGHAM MUSIC STORIES — EXHIBITION INTERACTIVE ENGINE (script.js)
 * ============================================================================
 * This script powers the interactive features of the exhibition:
 * 1. Story Data Store: The structured data for Birmingham music stories.
 * 2. Genre Filtering: Instant filtering by the five musical categories.
 * 3. Interactive Sound Map: Graphical SVG map nodes and detail panel.
 * 4. Story Modal View: Detailed exhibition dossier dialog for each artist.
 * 5. Visual Timeline: Interactive horizontal timeline navigation.
 * 6. Audio Tape Deck: Archival deck simulation with Web Audio synthesis.
 * ============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================================================
     SECTION 1: STORY & ARCHIVE DATA
     All copy strictly adheres to supplied exhibition records.
     ========================================================================== */
  const musicStories = [
    {
      id: 'black-sabbath',
      artist: 'Black Sabbath',
      location: 'Aston',
      year: '1968',
      genre: 'Heavy Metal',
      genreSlug: 'metal',
      copy: 'Black Sabbath formed in Aston in 1968 and became one of the groups most closely associated with the emergence of heavy metal.',
      catalogNo: 'BMS-HM-01',
      audioTitle: 'Black Sabbath — Aston Foundry Master (1968 Session)',
      mapNode: 'aston'
    },
    {
      id: 'steel-pulse',
      artist: 'Steel Pulse',
      location: 'Handsworth',
      year: '1970s',
      genre: 'Reggae',
      genreSlug: 'reggae',
      copy: 'Steel Pulse emerged from Handsworth and became internationally recognised for politically conscious reggae rooted in Birmingham\'s multicultural communities.',
      catalogNo: 'BMS-REG-01',
      audioTitle: 'Steel Pulse — Handsworth Revolution (Archival Reel)',
      mapNode: 'handsworth'
    },
    {
      id: 'ub40',
      artist: 'UB40',
      location: 'Birmingham',
      year: '1978',
      genre: 'Reggae',
      genreSlug: 'reggae',
      copy: 'UB40 formed in Birmingham in 1978 and took a distinctly Birmingham reggae sound to an international audience.',
      catalogNo: 'BMS-REG-02',
      audioTitle: 'UB40 — Signing Off (Birmingham 1978 Demo)',
      mapNode: 'city-centre'
    },
    {
      id: 'duran-duran',
      artist: 'Duran Duran',
      location: 'The Rum Runner, Birmingham',
      year: '1978',
      genre: 'New Wave',
      genreSlug: 'newwave',
      copy: 'Duran Duran formed in Birmingham in 1978 and developed around the city\'s Rum Runner nightclub before becoming internationally successful.',
      catalogNo: 'BMS-NW-01',
      audioTitle: 'Duran Duran — Rum Runner Rehearsal Tape (1978)',
      mapNode: 'broad-street'
    },
    {
      id: 'electric-light-orchestra',
      artist: 'Electric Light Orchestra',
      location: 'Birmingham',
      year: 'Early 1970s',
      genre: 'Rock & Pop',
      genreSlug: 'rockpop',
      copy: 'Electric Light Orchestra emerged from Birmingham and combined rock and pop songwriting with orchestral arrangements.',
      catalogNo: 'BMS-RP-01',
      audioTitle: 'Electric Light Orchestra — Birmingham Symphonic Reel',
      mapNode: 'city-centre'
    },
    {
      id: 'birmingham-bhangra',
      artist: 'Birmingham Bhangra Movement',
      location: 'Soho Road, Birmingham',
      year: '1980s Onward',
      genre: 'Bhangra',
      genreSlug: 'bhangra',
      copy: 'Birmingham\'s musical history was shaped by its neighbourhoods and multicultural communities. Soho Road and local venues became the UK hub for Bhangra, blending traditional Punjabi folk with modern urban beats and daytime club events.',
      catalogNo: 'BMS-BH-01',
      audioTitle: 'Birmingham Bhangra — Soho Road Dhol & Cassette Archive',
      mapNode: 'handsworth'
    }
  ];

  /* Map location narratives */
  const mapLocations = {
    aston: {
      name: 'Aston',
      landmark: 'Foundries & The Crown',
      catalog: 'MAP-LOC-01',
      artists: 'Black Sabbath',
      genre: 'Heavy Metal',
      description: 'Aston\'s industrial backdrop and community spaces were the birthplace of Black Sabbath in 1968, setting the foundation for heavy metal\'s thunderous global emergence.'
    },
    handsworth: {
      name: 'Handsworth',
      landmark: 'Handsworth Park & Soho Road',
      catalog: 'MAP-LOC-02',
      artists: 'Steel Pulse & Bhangra Communities',
      genre: 'Reggae & Bhangra',
      description: 'Handsworth gave rise to Steel Pulse and internationally celebrated sound system culture, rooted deeply in Birmingham\'s vibrant multicultural neighborhoods and social consciousness.'
    },
    'broad-street': {
      name: 'Broad Street',
      landmark: 'The Rum Runner Nightclub',
      catalog: 'MAP-LOC-03',
      artists: 'Duran Duran',
      genre: 'New Wave / New Romantic',
      description: 'The legendary Rum Runner nightclub on Broad Street served as the creative crucible and rehearsal home for Duran Duran as they formed in 1978 and spearheaded the New Wave sound.'
    },
    'city-centre': {
      name: 'City Centre',
      landmark: 'Town Hall & Central Venues',
      catalog: 'MAP-LOC-04',
      artists: 'Electric Light Orchestra, UB40',
      genre: 'Rock & Pop, Reggae',
      description: 'Birmingham\'s central hub brought together musicians from across the city, giving rise to UB40\'s international reggae reach in 1978 and Electric Light Orchestra\'s symphonic pop arrangements.'
    }
  };

  /* ==========================================================================
     SECTION 2: DYNAMIC STORY RENDERING & PHOTOGRAPHS
     Locally stored subject photographs; no third-party image requests.
     ========================================================================== */
  const storiesGrid = document.getElementById('stories-grid');

  // Source, creator, licence and actual photo dates: assets/images/credits.json.
  const archivePhotos = {
    "black-sabbath": { src: new URL("./assets/images/artists/black-sabbath-1970.jpg", import.meta.url).href, alt: "Black Sabbath in London, 1970", width: 759, height: 490 },
    "steel-pulse": { src: new URL("./assets/images/artists/steel-pulse.jpg", import.meta.url).href, alt: "Steel Pulse performing in 2010", width: 1280, height: 960 },
    "ub40": { src: new URL("./assets/images/artists/ub40-birmingham-2010.jpg", import.meta.url).href, alt: "UB40 performing in Birmingham, 2010", width: 1280, height: 938 },
    "duran-duran": { src: new URL("./assets/images/artists/duran-duran-chicago-2008.jpg", import.meta.url).href, alt: "Duran Duran performing in Chicago, 2008", width: 1096, height: 728 },
    "electric-light-orchestra": { src: new URL("./assets/images/artists/electric-light-orchestra-oslo-1978.jpg", import.meta.url).href, alt: "Electric Light Orchestra performing in Oslo, 1978", width: 800, height: 495 },
    "birmingham-bhangra": { src: new URL("./assets/images/locations/soho-road-shops.jpg", import.meta.url).href, alt: "Shops on Soho Road, Birmingham, 2011 — a neighbourhood central to UK Bhangra", width: 640, height: 480 },
    "aston": { src: new URL("./assets/images/history/aston-grazebrook-beam-engine.jpg", import.meta.url).href, alt: "Grazebrook beam engine at Dartmouth Circus, Aston, photographed in 2011", width: 803, height: 600 },
    "handsworth": { src: new URL("./assets/images/locations/handsworth-park.jpg", import.meta.url).href, alt: "Aerial photograph of Handsworth Park, Birmingham, 2008", width: 1280, height: 850 },
    "broad-street": { src: new URL("./assets/images/venues/rum-runner-dj-paul-anthony-1977.jpg", import.meta.url).href, alt: "Resident DJ Paul Anthony at the Rum Runner, Birmingham, 1977", width: 1280, height: 1804 },
    "city-centre": { src: new URL("./assets/images/venues/birmingham-town-hall.jpg", import.meta.url).href, alt: "Birmingham Town Hall from Chamberlain Square, 2009", width: 1280, height: 873 },
  };

  function renderArchivePhoto(key) {
    const photo = archivePhotos[key];
    return `<img class="archive-photo" src="${photo.src}" alt="${photo.alt}" title="${photo.alt}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async" />`;
  }

  function renderStoryCards(stories) {
    if (!storiesGrid) return;
    storiesGrid.innerHTML = '';

    stories.forEach((story) => {
      const card = document.createElement('article');
      card.className = 'story-card';
      card.setAttribute('data-genre', story.genreSlug);
      card.setAttribute('data-id', story.id);
      card.setAttribute('tabindex', '0');
      card.setAttribute('role', 'button');
      card.setAttribute('aria-label', `View exhibition dossier for ${story.artist}`);

      card.innerHTML = `
        <div class="story-card-top">
          <span class="specimen-tag tag-brass">${story.catalogNo}</span>
          <span class="specimen-tag">${story.year || 'ERA SPEC'}</span>
        </div>
        <div class="story-artwork-box">
          ${renderArchivePhoto(story.id)}
        </div>
        <div class="story-card-body">
          <div>
            <div class="story-meta-pills">
              <span class="specimen-tag">${story.genre}</span>
              <span class="specimen-tag tag-crimson">${story.location}</span>
            </div>
            <h3 class="story-artist-name">${story.artist}</h3>
            <p class="story-excerpt">${story.copy}</p>
          </div>
        </div>
        <div class="story-card-action">
          <span>INSPECT EXHIBITION DOSSIER</span>
          <span aria-hidden="true">→</span>
        </div>
      `;

      // Click and keyboard interaction
      card.addEventListener('click', () => openStoryModal(story.id));
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          openStoryModal(story.id);
        }
      });

      storiesGrid.appendChild(card);
    });
  }

  // Initial render of all featured stories
  renderStoryCards(musicStories);

  /* ==========================================================================
     SECTION 3: GENRE FILTERING (INTERACTIVE FEATURE 1)
     Instantly filters and highlights relevant music stories without page reload.
     ========================================================================== */
  const genreButtons = document.querySelectorAll('.genre-filter-btn');

  genreButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      // Update active state on buttons
      genreButtons.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedGenre = btn.getAttribute('data-filter');
      filterStoriesByGenre(selectedGenre);
    });
  });

  function filterStoriesByGenre(genreKey) {
    const cards = document.querySelectorAll('.story-card');
    
    cards.forEach((card) => {
      const cardGenre = card.getAttribute('data-genre');
      
      if (genreKey === 'all' || cardGenre === genreKey) {
        card.classList.remove('filtered-out');
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      } else {
        card.classList.add('filtered-out');
      }
    });

    // Provide immediate auditory and visual reassurance
    const count = genreKey === 'all' 
      ? musicStories.length 
      : musicStories.filter(s => s.genreSlug === genreKey).length;
    
    const countDisplay = document.getElementById('active-filter-status');
    if (countDisplay) {
      countDisplay.textContent = `DISPLAYING: ${genreKey.toUpperCase()} (${count} SPECIMEN${count !== 1 ? 'S' : ''})`;
    }
  }

  // Global helper to trigger genre filter from external links (e.g., marquee)
  window.triggerGenreFilter = function(genreKey) {
    const targetBtn = document.querySelector(`.genre-filter-btn[data-filter="${genreKey}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
    const storiesSection = document.getElementById('featured-stories');
    if (storiesSection) {
      storiesSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  /* ==========================================================================
     SECTION 4: BIRMINGHAM SOUND MAP (INTERACTIVE FEATURE 2)
     Clickable locations for Aston, Handsworth, City Centre, Broad Street.
     ========================================================================== */
  const mapNodes = document.querySelectorAll('.map-location-group');
  const mapTabs = document.querySelectorAll('.map-tab-btn');

  function updateSoundMapLocation(locationKey) {
    const locationData = mapLocations[locationKey];
    if (!locationData) return;

    // Update map SVG markers active state
    mapNodes.forEach((node) => {
      if (node.getAttribute('data-location') === locationKey) {
        node.classList.add('active');
        node.setAttribute('aria-pressed', 'true');
      } else {
        node.classList.remove('active');
        node.setAttribute('aria-pressed', 'false');
      }
    });

    // Update tab button selectors below the map
    mapTabs.forEach((tab) => {
      if (tab.getAttribute('data-location') === locationKey) {
        tab.classList.add('active');
      } else {
        tab.classList.remove('active');
      }
    });

    // Update the dossier detail panel
    const dossierTitle = document.getElementById('map-dossier-title');
    const dossierDesc = document.getElementById('map-dossier-desc');
    const dossierArtists = document.getElementById('map-dossier-artists');
    const dossierLandmark = document.getElementById('map-dossier-landmark');
    const dossierGenre = document.getElementById('map-dossier-genre');
    const dossierCat = document.getElementById('map-dossier-cat');
    const dossierArt = document.getElementById('map-dossier-artwork');

    if (dossierTitle) dossierTitle.textContent = locationData.name;
    if (dossierDesc) dossierDesc.textContent = locationData.description;
    if (dossierArtists) dossierArtists.textContent = locationData.artists;
    if (dossierLandmark) dossierLandmark.textContent = locationData.landmark;
    if (dossierGenre) dossierGenre.textContent = locationData.genre;
    if (dossierCat) dossierCat.textContent = locationData.catalog;

    if (dossierArt) {
      dossierArt.innerHTML = renderArchivePhoto(locationKey);
    }
  }

  // Bind clicks to SVG location markers
  mapNodes.forEach((node) => {
    node.addEventListener('click', () => {
      const loc = node.getAttribute('data-location');
      updateSoundMapLocation(loc);
    });
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        const loc = node.getAttribute('data-location');
        updateSoundMapLocation(loc);
      }
    });
  });

  // Bind clicks to map tab buttons
  mapTabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const loc = tab.getAttribute('data-location');
      updateSoundMapLocation(loc);
    });
  });

  // Default selection on load
  updateSoundMapLocation('aston');

  /* ==========================================================================
     SECTION 5: STORY VIEW MODAL (INTERACTIVE FEATURE 3)
     Opens detailed modal showing artist, location, genre, era/year, copy.
     ========================================================================== */
  const modalOverlay = document.getElementById('story-modal');
  const modalCloseBtn = document.getElementById('modal-close-btn');

  function openStoryModal(storyId) {
    const story = musicStories.find((s) => s.id === storyId);
    if (!story || !modalOverlay) return;

    document.getElementById('modal-artist').textContent = story.artist;
    document.getElementById('modal-location').textContent = story.location;
    document.getElementById('modal-genre').textContent = story.genre;
    document.getElementById('modal-year').textContent = story.year || 'Historical Specimen';
    document.getElementById('modal-catalog').textContent = story.catalogNo;
    document.getElementById('modal-description').textContent = story.copy;
    
    // Show the same subject photograph as the story card
    const modalArtwork = document.getElementById('modal-artwork');
    if (modalArtwork) {
      modalArtwork.innerHTML = renderArchivePhoto(story.id);
    }

    // Bind modal audio button
    const modalAudioBtn = document.getElementById('modal-play-audio');
    if (modalAudioBtn) {
      modalAudioBtn.onclick = () => {
        loadAudioTrack(story.audioTitle, story.catalogNo);
        closeStoryModal();
      };
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    modalCloseBtn?.focus();
  }

  function closeStoryModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) {
    modalCloseBtn.addEventListener('click', closeStoryModal);
  }

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) {
        closeStoryModal();
      }
    });
  }

  // Keyboard accessibility: ESC key to close modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay?.classList.contains('active')) {
      closeStoryModal();
    }
  });

  // Global trigger
  window.openStoryById = openStoryModal;

  /* ==========================================================================
     SECTION 6: MUSIC THROUGH TIME (VISUAL TIMELINE)
     Horizontal scrolling and interactive milestone selection.
     ========================================================================== */
  const timelineTrack = document.getElementById('timeline-track');
  const timelinePrevBtn = document.getElementById('timeline-prev');
  const timelineNextBtn = document.getElementById('timeline-next');

  if (timelinePrevBtn && timelineTrack) {
    timelinePrevBtn.addEventListener('click', () => {
      timelineTrack.scrollBy({ left: -320, behavior: 'smooth' });
    });
  }

  if (timelineNextBtn && timelineTrack) {
    timelineNextBtn.addEventListener('click', () => {
      timelineTrack.scrollBy({ left: 320, behavior: 'smooth' });
    });
  }

  // Bind milestone cards to highlight or open respective stories
  const timelineCards = document.querySelectorAll('.timeline-node-card');
  timelineCards.forEach((card) => {
    card.addEventListener('click', () => {
      timelineCards.forEach((c) => c.classList.remove('selected'));
      card.classList.add('selected');
      const associatedStoryId = card.getAttribute('data-story-id');
      if (associatedStoryId) {
        openStoryModal(associatedStoryId);
      }
    });
  });

  /* ==========================================================================
     SECTION 7: AUDIO TAPE DECK & WEB AUDIO TONE GENERATION
     Safe, zero-dependency archival tape deck with atmospheric vinyl warmth.
     ========================================================================== */
  let isPlaying = false;
  let audioCtx = null;
  let synthOscillator = null;
  let synthGain = null;

  const deckBar = document.getElementById('audio-deck');
  const deckPlayBtn = document.getElementById('deck-play-btn');
  const deckTrackTitle = document.getElementById('deck-track-title');
  const deckDismissBtn = document.getElementById('deck-dismiss-btn');
  const freqBars = document.querySelectorAll('.freq-bar');

  function initWebAudioTone() {
    try {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (!AudioContextClass) return;
      if (!audioCtx) {
        audioCtx = new AudioContextClass();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Warm analog chord simulator (pentatonic warm chime)
      if (!synthOscillator) {
        synthOscillator = audioCtx.createOscillator();
        synthGain = audioCtx.createGain();

        synthOscillator.type = 'triangle';
        synthOscillator.frequency.setValueAtTime(110, audioCtx.currentTime); // Deep A2 note

        synthGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
        synthGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 0.3);

        synthOscillator.connect(synthGain);
        synthGain.connect(audioCtx.destination);
        synthOscillator.start();
      }
    } catch {
      // Graceful fallback for restricted environments
    }
  }

  function stopWebAudioTone() {
    if (synthGain && audioCtx) {
      synthGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.2);
    }
  }

  function toggleAudioPlayback() {
    isPlaying = !isPlaying;

    if (deckPlayBtn) {
      const icon = deckPlayBtn.querySelector('span');
      if (icon) {
        icon.textContent = isPlaying ? '⏸' : '▶';
      }
      deckPlayBtn.setAttribute('aria-label', isPlaying ? 'Pause master audio' : 'Play master audio');
    }

    freqBars.forEach((bar) => {
      if (isPlaying) {
        bar.classList.add('playing');
      } else {
        bar.classList.remove('playing');
      }
    });

    if (isPlaying) {
      initWebAudioTone();
    } else {
      stopWebAudioTone();
    }
  }

  function loadAudioTrack(title, catalogNo) {
    if (deckBar) {
      deckBar.classList.remove('hidden');
    }
    if (deckTrackTitle) {
      deckTrackTitle.textContent = title.toUpperCase();
    }
    const catDisplay = document.getElementById('deck-cat-no');
    if (catDisplay) {
      catDisplay.textContent = `SPECIMEN ${catalogNo}`;
    }

    isPlaying = false;
    toggleAudioPlayback();
  }

  if (deckPlayBtn) {
    deckPlayBtn.addEventListener('click', toggleAudioPlayback);
  }

  if (deckDismissBtn && deckBar) {
    deckDismissBtn.addEventListener('click', () => {
      if (isPlaying) toggleAudioPlayback();
      deckBar.classList.add('hidden');
    });
  }

  window.loadTrack = loadAudioTrack;

  /* ==========================================================================
     SECTION 8: MOBILE NAVIGATION TOGGLE
     ========================================================================== */
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileDrawer.classList.toggle('open');
      mobileToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });

    // Close mobile drawer when link is clicked
    mobileDrawer.querySelectorAll('.nav-link').forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        mobileToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

});
