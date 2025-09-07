class CritterOSCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  static get observedAttributes() {
    return ['media-path'];
  }

  connectedCallback() {
    this.render();
  }

  attributeChangedCallback(name, oldValue, newValue) {
    if (oldValue !== newValue) {
      this.render();
    }
  }

  get mediaPath() {
    return this.getAttribute('media-path') || './media/';
  }

  render() {
    this.shadowRoot.innerHTML = `
      <carousel-component 
        id="critter-carousel"
        theme="primary" 
        app-name="CritterOS"
        data-config='[
          {
            "username": "@hv",
            "time": "Sep 5, 2:46 PM",
            "message": "Peter Pringles had an absolute blast playing! They are bouncing with pure joy and energy!",
            "image": "${this.mediaPath}pringle-keyboardcat.webp",
            "imageAlt": "Billy playing and having fun",
            "imageCaptionSr": "Billy enjoying playtime."
          },
          {
            "username": "@hv",
            "time": "Sep 5, 3:15 PM",
            "message": "Peter Pringles devoured their meal with gusto! They are absolutely stuffed and content.",
            "image": "${this.mediaPath}pringle-eating.webp",
            "imageAlt": "Billy eating their meal",
            "imageCaptionSr": "Billy enjoying a meal."
          },
          {
            "username": "@hv",
            "time": "Sep 5, 10:38 AM",
            "message": "Welcome to the world, Table Tom! This adorable EGG is just beginning their journey as your digital companion. Take good care of them!",
            "image": "${this.mediaPath}table-baby.webp",
            "imageAlt": "Billy, the table critter, as a baby",
            "imageCaptionSr": "Billy in baby stage."
          },
          {
            "username": "@hv",
            "time": "Sep 5, 11:15 AM",
            "message": "Table Tom is sparkling clean and smells wonderful! They are practically glowing with freshness. ✨🛁",
            "image": "${this.mediaPath}table-critter.webp",
            "imageAlt": "Billy, the table critter, freshly cleaned",
            "imageCaptionSr": "A clean table critter."
          },
          {
            "username": "@hv",
            "time": "Sep 5, 4:22 PM",
            "message": "Welcome to the world, Filthy Frank! This adorable hamburger critter is just beginning their journey as your digital companion. Take good care of them! ✨🥳",
            "image": "${this.mediaPath}hamburger-baby.webp",
            "imageAlt": "Filthy Frank in BABY stage",
            "imageCaptionSr": "Hamburger critter in baby stage."
          },
          {
            "username": null,
            "time": "Sep 5, 5:45 PM",
            "message": "<span style=\\"font-weight: 600;\\">🎉 EVOLUTION ALERT!</span><br /><span style=\\"font-weight: 500;\\">Filthy Frank</span> has evolved from <span style=\\"font-weight: 600;\\">BABY</span> to <span style=\\"font-weight: 600;\\">ADULT</span>!",
            "image": "${this.mediaPath}hamburger-critter.webp",
            "imageAlt": "Filthy Frank evolved to adult stage",
            "imageCaptionSr": "Hamburger critter fully evolved."
          }
        ]'>
      </carousel-component>
    `;
  }
}

customElements.define('critteros-carousel', CritterOSCarousel);
