import { Common, HIDDEN_SCREEN, VISIBLE_SCREEN } from "./Common.esm.js";
import { canvas } from "./Canvas.esm.js";
import { DATALOADED_EVENT_NAME, loader } from "./Loader.esm.js";

const gameLevels = [
  {
    level: 1,
  },
  {
    level: 2,
  },
  {
    level: 3,
  },
  {
    level: 4,
  },
];

const LEVEL_SELECT_ID = "js-level-select-screen";
const LEVEL_SELECT_BUTTON_ID = "level-select__button";

class LevelSelect extends Common {
  constructor() {
    super(LEVEL_SELECT_ID);
    gameLevels.forEach((gameLevel) => this.createButton(gameLevel.level));
  }

  createButton(value) {
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
  }

  loadLevel(level) {
    const background = loader.loadImage("images/levelbackground.png");
    window.addEventListener(DATALOADED_EVENT_NAME, () =>
      console.log("Załadowane wszystkie media")
    );
  }
}

export const levelSelect = new LevelSelect();
