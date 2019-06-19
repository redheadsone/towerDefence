import GameComponent from "./game-component.js";
import { delay } from "./index.js";
import { collidePointWithCircle } from "../collision.js";
import IMAGES from "../images/index.js";

export default class Monster extends GameComponent {
  constructor(props) {
    super(props);

    this.ai().catch(function(err) {
      console.warn(err);
    });
  }

  async ai() {
    this.targets = [
      { x: 0, y: 0 },
      { x: 0, y: 500 },
      { x: 600, y: 0 },
      { x: 200, y: 100 }
    ].map(
      props => new GameComponent({ ...props, image: IMAGES.WAYPOINT, size: 20 })
    );

    let gameComponents = this.getGameComponents();

    gameComponents.push(...this.targets);

    for (let target of this.targets) {
      while (
        !collidePointWithCircle(target, {
          //todo: create cx cy in base gc class
          cx: this.x + this.size / 4,
          cy: this.y + this.size / 4,
          r: this.size / 2
        })
      ) {
        let distance = { x: target.x - this.x, y: target.y - this.y };

        let length = Math.sqrt(distance.x ** 2 + distance.y ** 2);

        let direction = { x: distance.x / length, y: distance.y / length };

        //for (;;) {}

        this.x += direction.x * this.speed;
        this.y += direction.y * this.speed;

        await delay(10);
      }

      await delay(1000);
    }
  }
}
