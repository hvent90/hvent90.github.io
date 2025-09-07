class VillageOSCarousel extends HTMLElement {
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
        id="critter-carousel-2"
        theme="secondary" 
        app-name="VillageOS"
        data-config='[
          {
            "username": "@hv",
            "time": "Sep 6, 9:15 AM",
            "message": "Just planted my first amoeba-plant hybrid! This fascinating organism should help establish the foundation of our village ecosystem. 🌱🦠",
            "image": "${this.mediaPath}village-macro-1.webp",
            "imageAlt": "@hv planting an amoeba-plant hybrid in the village",
            "imageCaptionSr": "Planting an amoeba-plant hybrid organism."
          },
          {
            "username": "@hv",
            "time": "Sep 6, 11:30 AM",
            "message": "Construction complete! Built my first amoeba-house using bio-architectural techniques. The living walls are already adapting to the environment! 🏠🧬",
            "image": "${this.mediaPath}village-macro-2.webp",
            "imageAlt": "@hv having built an amoeba-house structure",
            "imageCaptionSr": "Newly constructed amoeba-house with living walls."
          },
          {
            "username": "@hv",
            "time": "Sep 6, 3:22 PM",
            "message": "Village gathering time! Here is our group photo with all the active villagers who have joined our thriving bio-community. What an amazing crew! 📸👥",
            "image": "${this.mediaPath}village-macro-3.webp",
            "imageAlt": "Group photo of all active villagers in the village",
            "imageCaptionSr": "Group photo showing all active village community members."
          },
          {
            "username": "@hv",
            "time": "Sep 6, 5:30 PM",
            "message": "The golden hour captures the magic perfectly as I plant another seedling. The way the light catches the emerging flames is absolutely breathtaking! ✨🌅",
            "image": "${this.mediaPath}village-fire-2.webp",
            "imageAlt": "Cinematic shot of @hv planting in golden hour lighting",
            "imageCaptionSr": "Cinematic planting scene with dramatic lighting."
          },
          {
            "username": "@hv",
            "time": "Sep 6, 4:15 PM",
            "message": "Just planted my first fire-apple tree! The flames dancing around its branches are mesmerizing. This should provide both warmth and sustenance for the village! 🔥🍎",
            "image": "${this.mediaPath}village-fire-1.webp",
            "imageAlt": "@hv having just planted a fire-apple tree",
            "imageCaptionSr": "Fire-apple tree with flames dancing around its branches."
          }
        ]'>
      </carousel-component>
    `;
  }
}

customElements.define('villageos-carousel', VillageOSCarousel);
