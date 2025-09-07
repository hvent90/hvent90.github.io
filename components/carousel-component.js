class CarouselComponent extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.currentIndex = 0;
    this.slides = [];
    this.isHovering = false;
    this.GAP = 16;
  }

  static get observedAttributes() {
    return ['data-config', 'theme', 'app-name'];
  }

  connectedCallback() {
    this.render();
    this.setupEventListeners();
    this.initializeCarousel();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
      this.initializeCarousel();
    }
  }

  get config() {
    const configAttr = this.getAttribute('data-config');
    return configAttr ? JSON.parse(configAttr) : [];
  }

  get theme() {
    return this.getAttribute('theme') || 'primary';
  }

  get appName() {
    return this.getAttribute('app-name') || 'App';
  }

  render() {
    const theme = this.theme;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          padding: 8px 0 16px 0;
          overflow: hidden;
          outline: none;
        }
        
        :host(:focus) {
          outline: none;
        }
        
        .carousel-container {
          position: relative;
        }
        
        .carousel-track {
          display: flex;
          transition: transform 0.3s ease-out;
          gap: 16px;
        }
        
        .carousel-slide {
          width: 100%;
          max-width: 400px;
          opacity: 0.4;
          transform: translateY(8px);
          transition: opacity 0.3s ease, transform 0.3s ease;
          display: flex;
          flex-direction: column;
          flex-shrink: 0;
        }
        
        .carousel-slide.active {
          opacity: 1 !important;
          transform: translateY(0px) !important;
        }
        
        .carousel-slide > div:first-child {
          flex: 0 0 auto;
        }
        
        .carousel-slide > div:nth-child(2) {
          flex: 0 0 auto;
          margin-bottom: 12px;
        }
        
        .carousel-slide > div:last-child {
          flex: 1 1 auto;
          display: flex;
          align-items: flex-end;
        }
        
        .carousel-slide > div:last-child figure {
          width: 100%;
          margin: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
        }
        
        .carousel-slide img {
          max-width: 100%;
          width: 100%;
          height: auto;
          object-fit: contain;
        }
        
        .carousel-controls {
          pointer-events: none;
          position: absolute;
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .carousel-btn {
          pointer-events: auto;
          display: inline-flex;
          height: 28px;
          width: 28px;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 14px;
          font-weight: 500;
          background: var(--card, #fff);
          color: var(--card-foreground, #000);
          border: 1px solid var(--border, #ddd);
          box-shadow: var(--shadow-2xs, 0 1px 2px rgba(0,0,0,0.1));
          cursor: pointer;
        }
        
        .carousel-indicators {
          margin-top: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
        }
        
        .carousel-dot {
          height: 6px;
          width: 6px;
          border-radius: 50%;
          background: var(--muted, #ccc);
          cursor: pointer;
          transition: background 0.2s ease;
        }
        
        .carousel-dot.active {
          background: var(--${theme}, #007bff);
        }
        
        @media (min-width: 768px) {
          .carousel-slide {
            width: 100%;
          }
        }
      </style>
      
      <div class="carousel-container">
        <div class="carousel-track"></div>
        <div class="carousel-controls">
          <button type="button" class="carousel-btn prev-btn" aria-label="Previous">‹</button>
          <button type="button" class="carousel-btn next-btn" aria-label="Next">›</button>
        </div>
        <div class="carousel-indicators"></div>
      </div>
    `;
  }

  createSlideHTML(data) {
    const messageContent = data.username 
      ? `<span style="font-weight: 500; color: var(--${this.theme}, #007bff);">${data.username}</span> ${data.message}`
      : data.message;

    const bgColor = this.theme === 'secondary' ? 'var(--card, #fff)' : 'var(--sidebar, #f8f9fa)';
    const textColor = this.theme === 'secondary' ? 'var(--card-foreground, #000)' : 'var(--sidebar-foreground, #000)';
    const borderColor = this.theme === 'secondary' ? 'var(--border, #ddd)' : 'var(--sidebar-border, #ddd)';
    const accentColor = this.theme === 'secondary' ? 'var(--secondary, #6c757d)' : 'var(--accent, #007bff)';

    return `
      <article class="carousel-slide" style="background: ${bgColor}; color: ${textColor}; border: 1px solid ${borderColor}; box-shadow: var(--shadow-xs, 0 1px 3px rgba(0,0,0,0.1)); padding: 16px; border-radius: 8px;">
        <div style="display: flex; align-items: center; gap: 12px;">
          <div style="height: 36px; width: 36px; flex-shrink: 0; border-radius: 50%; background: ${accentColor}; box-shadow: var(--shadow-2xs, 0 1px 2px rgba(0,0,0,0.1));"></div>
          <div style="display: flex; flex-wrap: wrap; align-items: center; gap: 8px; font-size: 14px;">
            <span style="font-weight: 600;">${this.appName}</span>
            <span style="display: inline-flex; align-items: center; border-radius: 4px; padding: 2px 6px; font-size: 10px; font-weight: 600; letter-spacing: 0.05em; background: var(--${this.theme}, #007bff); color: var(--${this.theme}-foreground, #fff);">APP</span>
            <span aria-hidden="true" style="font-size: 12px; color: var(--muted-foreground, #666);">•</span>
            <time style="font-size: 12px; color: var(--muted-foreground, #666);">${data.time}</time>
          </div>
        </div>
        <div style="margin-top: 12px; font-size: 14px; line-height: 1.5;">
          <p>${messageContent}</p>
        </div>
        <div style="margin-top: 16px;">
          <figure style="overflow: hidden; border-radius: 8px; border: 1px solid ${borderColor}; box-shadow: var(--shadow-sm, 0 1px 3px rgba(0,0,0,0.1));">
            <img src="${data.image}" alt="${data.imageAlt}" style="display: block; width: 100%; height: auto;" loading="lazy" />
            <figcaption style="position: absolute; width: 1px; height: 1px; padding: 0; margin: -1px; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0;">${data.imageCaptionSr}</figcaption>
          </figure>
        </div>
      </article>
    `;
  }

  initializeCarousel() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    const indicatorsContainer = this.shadowRoot.querySelector('.carousel-indicators');
    const config = this.config;
    
    if (!config.length) return;

    // Generate slides
    track.innerHTML = config.map(data => this.createSlideHTML(data)).join('');
    
    // Generate indicators
    indicatorsContainer.innerHTML = config.map((_, index) => 
      `<span class="carousel-dot" data-index="${index}"></span>`
    ).join('');

    // Get references
    this.slides = Array.from(track.children);
    this.dots = Array.from(indicatorsContainer.querySelectorAll('.carousel-dot'));
    
    // Start at middle slide
    this.currentIndex = Math.floor(this.slides.length / 2);
    
    // Initial update
    requestAnimationFrame(() => this.update());
  }

  setupEventListeners() {
    const prevBtn = this.shadowRoot.querySelector('.prev-btn');
    const nextBtn = this.shadowRoot.querySelector('.next-btn');
    const indicatorsContainer = this.shadowRoot.querySelector('.carousel-indicators');
    
    prevBtn.addEventListener('click', () => this.prev());
    nextBtn.addEventListener('click', () => this.next());
    
    // Dot indicators
    indicatorsContainer.addEventListener('click', (e) => {
      if (e.target.classList.contains('carousel-dot')) {
        const index = parseInt(e.target.getAttribute('data-index'));
        this.goToSlide(index);
      }
    });
    
    // Keyboard support
    this.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); this.prev(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); this.next(); }
    });
    this.tabIndex = 0;

    // Touch/swipe handling
    let startX = null;
    let isDragging = false;
    
    this.addEventListener('touchstart', (e) => { 
      startX = e.touches[0].clientX; 
      isDragging = false;
    }, { passive: true });
    
    this.addEventListener('touchmove', (e) => {
      if (startX == null) return;
      const dx = e.touches[0].clientX - startX;
      if (Math.abs(dx) > 50 && !isDragging) {
        isDragging = true;
        dx > 0 ? this.prev() : this.next();
        startX = null;
      }
    }, { passive: true });

    // Resize handling
    let resizeTimeout;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimeout);
      resizeTimeout = setTimeout(() => this.update(), 100);
    });
  }

  layout() {
    const containerW = this.offsetWidth;
    const track = this.shadowRoot.querySelector('.carousel-track');
    
    // Get actual slide widths after layout
    const slideWidths = this.slides.map(s => s.getBoundingClientRect().width);
    return { containerW, slideWidths };
  }

  update() {
    const track = this.shadowRoot.querySelector('.carousel-track');
    const controlsContainer = this.shadowRoot.querySelector('.carousel-controls');
    const { containerW, slideWidths } = this.layout();
    
    // Calculate offset to center the current slide
    let offset = 0;
    for (let i = 0; i < this.currentIndex; i++) {
      offset += slideWidths[i] + this.GAP;
    }
    
    // Center the current slide in the container
    const currentSlideW = slideWidths[this.currentIndex] || 380;
    const centerOffset = (containerW - currentSlideW) / 2;
    const finalOffset = -offset + centerOffset;
    
    track.style.transform = `translateX(${finalOffset}px)`;
    
    // Position controls
    const activeSlideLeft = centerOffset;
    controlsContainer.style.left = `${activeSlideLeft}px`;
    controlsContainer.style.right = `${containerW - activeSlideLeft}px`;
    controlsContainer.style.width = `${currentSlideW}px`;
    
    // Update active state
    this.slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === this.currentIndex);
    });
    
    // Update dot indicators
    this.dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.currentIndex);
    });
  }

  prev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.update();
    }
  }

  next() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.update();
    }
  }

  goToSlide(index) {
    if (index >= 0 && index < this.slides.length) {
      this.currentIndex = index;
      this.update();
    }
  }
}

customElements.define('carousel-component', CarouselComponent);
