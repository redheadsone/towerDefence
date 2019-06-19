import IMAGES from "../images/index.js";
import { collidePointWithCircle } from "../collision.js";
import { Monster, Spawner } from "../components/index.js";
import { getImage } from "../components/game-component.js";
import { environmentTools } from "./environment-tools.js";
import { gameComponents } from "../game-state/index.js";

let monstersSize = 40;

const tools = [
  {
    image: IMAGES.SCISSORS,
    action({ x, y }) {
      function IsThatObject(gameObject) {
        let collided = collidePointWithCircle(
          { x, y },
          {
            cx: gameObject.x + gameObject.size / 2,
            cy: gameObject.y + gameObject.size / 2,
            r: gameObject.size / 2
          }
        );

        return collided;
      }

      const GOIndex = gameComponents.findIndex(IsThatObject);
      if (GOIndex < 0) return;
      gameComponents.splice(GOIndex, 1);
    }
  },
  {
    image: IMAGES.SPAWN,
    action({ x, y }) {
      let size = 30;

      gameComponents.push(
        new Spawner({
          x: x - size / 2,
          y: y - size / 2,
          image: this.image,
          size: size,
          entryInterval: 500,
          waveCount: 4,
          waveInterval: 1500,
          //TODO: use create gc factory instead
          getGameComponents() {
            return gameComponents;
          },

          entries: [
            {
              x: 386,
              y: 506,
              size: 50,
              image: IMAGES.SCORPION,
              speed: 2,
              "@class": Monster.name
            },
            {
              x: 386,
              y: 506,
              size: 50,
              image: IMAGES.JINNY,
              speed: 2,
              "@class": Monster.name
            },
            {
              x: 386,
              y: 506,
              size: 50,
              image: IMAGES.DRAGON,
              speed: 2,
              "@class": Monster.name
            }
          ]
        })
      );
    }
  },
  ...environmentTools,
  {
    image: IMAGES.GHOST,
    //function
    action({ x, y }) {
      let size = monstersSize;

      gameComponents.push(
        new Monster({
          x: x - size / 2,
          y: y - size / 2,
          speed: 1,
          image: this.image,
          size: size
        })
      );
    }
  },
  {
    image: IMAGES.SPIDER,
    //function
    action({ x, y }) {
      let size = monstersSize;

      gameComponents.push(
        new Monster({
          x: x - size / 2,
          y: y - size / 2,
          speed: 1,
          image: this.image,
          size: size
        })
      );
    }
  },
  {
    image: IMAGES.FAIRY,
    //function
    action({ x, y }) {
      let size = monstersSize;

      gameComponents.push(
        new Monster({
          x: x - size / 2,
          y: y - size / 2,
          speed: 1,
          image: this.image,
          size: size
        })
      );
    }
  },
  {
    image: IMAGES.WORM,
    //function
    action({ x, y }) {
      let size = monstersSize;

      gameComponents.push(
        new Monster({
          x: x - size / 2,
          y: y - size / 2,
          speed: 1,
          image: this.image,
          size: size
        })
      );
    }
  }
];

let toolsEl = document.querySelector(".tools");

for (let tool of tools) {
  let toolButton = getImage(tool.image);
  toolButton.classList.add("tool");
  toolButton.setAttribute("tabindex", 0);
  toolButton.action = (...args) => tool.action(...args);

  toolsEl.appendChild(toolButton);
}

let currentTool = null;
function selectTool(event) {
  if (event.target.classList.contains("tool")) {
    currentTool = event.target;
  }
}

export function useTool(mousePosition) {
  if (currentTool) {
    currentTool.action(mousePosition);
  }
}

toolsEl.addEventListener("click", selectTool);

// use JSON.stringify() method on monsters/trees/ etc. array to get string with all stuff inside
// THEN store everything to localStorage - read about this!
