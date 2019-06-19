import { Environment } from "../components/index.js";
import IMAGES from "../images/index.js";
import { gameComponents } from "../game-state/index.js";

let flowersSize = 30;
let treesSize = 80;

function defaultToolAction({ x, y }) {
  gameComponents.push(
    new Environment({
      x: x - this.size / 2,
      y: y - this.size / 2,
      image: this.image,
      size: this.size
    })
  );
}

export const environmentTools = [
  {
    image: IMAGES.PINE,
    size: treesSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.OAK,
    size: treesSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.PALM,

    size: treesSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.MUSHROOM,
    size: flowersSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.SPIDERWEB,
    size: 20,
    action: defaultToolAction
  },
  {
    image: IMAGES.FLOWER,

    size: flowersSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.BLOSSOM,
    size: flowersSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.TULIP,
    size: flowersSize,
    action: defaultToolAction
  },
  {
    image: IMAGES.CACTUS,
    size: treesSize,
    action: defaultToolAction
  }
];
