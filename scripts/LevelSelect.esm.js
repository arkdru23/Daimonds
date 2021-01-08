import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { canvas } from "./Canvas.esm.js";
import { DATALOADED_EVENT_NAME, loader } from "./Loader.esm.js";
import { game } from "./Game.esm.js";
import { media } from "./Media.esm.js";
import { resultScreen } from "./ResultScreen.esm.js";
import { gameLevels } from "./gameLevels.esm.js";
import { userData } from "./UserData.esm.js";

const LEVEL_SELECT_ID = "js-level-select-screen";
const LEVEL_SELECT_BUTTON_ID = "level-select__button";

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
  }

  createButtons() {
    while (this.element.firstChild) {
      this.element.removeChild(this.element.firstChild);
    }

    gameLevels.some((gameLevel) => this.createButton(gameLevel.level));
  }

  createButton(value) {
    if (!userData.checkAvailibityLevel(value)) {
      return true;
    }

    const button = document.createElement("button");

    button.type = "button";
    button.classList.add(LEVEL_SELECT_BUTTON_ID);
    button.textContent = value;
    button.value = value;
    button.addEventListener("click", (e) => this.buttonOnClickHandler(e));
    this.element.appendChild(button);
  }

  buttonOnClickHandler(e) {
    this.changeVisibilityScreen(this.element, HIDDEN_SCREEN);
    this.changeVisibilityScreen(canvas.element, VISIBLE_SCREEN);

    this.loadLevel(e.currentTarget.value);
    this.changeVisibilityScreen(resultScreen.element, HIDDEN_SCREEN);
  }

  loadLevel(level) {
    media.diamondsSprite = loader.loadImage("images/diamonds-transparent.png");
    media.backgroundImage = loader.loadImage("images/levelbackground.png");
    window.addEventListener(DATALOADED_EVENT_NAME, () => game.playLevel(level));
    game.animate();
  }
}

export const levelSelect = new LevelSelect();
