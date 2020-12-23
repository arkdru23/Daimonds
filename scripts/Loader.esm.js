import { Common, HIDDEN_CLASS, VISIBLE_SCREEN } from "./Common.esm.js";

export const DATALOADED_EVENT_NAME = "dataLoaded";
const LOADER_ELEMENT_ID = "js-loading-screen";
const LOAD_CURRENT_ID = "js-loading-screen-current";
const LOADER_TOTAL_ID = "js-loading-screen-total";

class Loader extends Common {
  constructor() {
    super(LOADER_ELEMENT_ID);
    this.bindsToElements();
    this.clearFlags();
  }

  bindsToElements() {
    this.currentElement = this.bindToElement(LOAD_CURRENT_ID);
    this.totalElement = this.bindToElement(LOADER_TOTAL_ID);
  }

  loadImage(imageUrl) {
    this.changeVisibilityScreen(this.element, VISIBLE_SCREEN);
    this.isAllLoaded = false;
    this.totalCounter++;
    this.totalElement = this.totalCounter;
    const image = new Image();

    image.src = imageUrl;
    image.addEventListener("load", (e) => this.itemLoaded(e), false);

    return image;
  }

  itemLoaded(e) {
    e.target.removeEventListener(e.type, this.itemLoaded, false);
    this.loadedCounter++;
    this.currentElement.textContent = this.loadedCounter;

    if (this.loadedCounter === this.totalCounter) {
      this.clearFlags();
      this.changeVisibilityScreen(this.element, HIDDEN_CLASS);
      window.dispatchEvent(new CustomEvent(DATALOADED_EVENT_NAME));
    }
  }

  clearFlags() {
    this.isAllLoaded = true;
    this.loadedCounter = 0;
    this.totalCounter = 0;
  }
}

export const loader = new Loader();
