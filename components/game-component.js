import IMAGES from "../images/index.js";

export function getImage(path) {
  let imgElement = document.createElement("img");
  imgElement.src = "images/" + path;
  return imgElement;
}

const defaults = {
  x: 0,
  y: 0,
  size: 50,
  image: IMAGES.DEBUG
};

export default class GameComponent {
  constructor(props) {
    Object.assign(this, defaults, props);
    this["@class"] = this.constructor.name;
    this._imageEl = getImage(props.image);
  }

  /**
   *  draws image on provided canvas
   * @param ctx canvas context
   */
  draw(ctx) {
    let { x, y, size, _imageEl } = this;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.font = `${size}px Arial`;
    ctx.fillStyle = "magenta";

    ctx.drawImage(_imageEl, x, y, size, size);
  }

  /**
   * 🚫OBSOLETE
   */
  update() {}

  getGameComponents() {
    throw "📛gc is not provided";
  }
}
