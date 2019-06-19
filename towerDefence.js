import { useTool } from "./toolkit/index.js";
import { createGameComponentFactory } from "./components/index.js";
import { saveFile, loadFile } from "./file-helper.js";
import { gameComponents } from "./game-state/index.js";
import {} from "./game-component-list/index.js";

let game = document.querySelector("#game");
let ctx = game.getContext("2d");

//todo: extract gamecomponents to game state

function gameLoop() {
  ctx.clearRect(0, 0, game.width, game.height);

  for (let gameComponent of gameComponents
    .slice()
    .sort((a, b) => a.y + a.size - b.y - b.size)) {
    // let collided = collidePointWithCircle(mousePoint, {
    //   cx: tree.x + tree.size / 2,
    //   cy: tree.y + tree.size / 2,
    //   r: tree.size / 2
    // });

    gameComponent.draw(ctx);
  }

  for (let gameComponent of gameComponents) {
    gameComponent.update();
  }

  requestAnimationFrame(gameLoop);
}

gameLoop();

let toolActive = true;

game.addEventListener("click", function({ layerX: x, layerY: y }) {
  // console.log(x, y);
  toolActive && useTool({ x, y });
});

function saveLevel() {
  let levelData = JSON.stringify(gameComponents);

  saveFile({ data: levelData, fileName: "level.json", type: "text/json" });
}

function loadLevelFile() {
  function loadLevel(levelData) {
    let gamecomps = JSON.parse(levelData).map(
      createGameComponentFactory(gameComponents)
    );

    gameComponents.splice(0);
    if (gamecomps.length > 0) {
      gameComponents.push(...gamecomps);
    }
  }

  loadFile(loadLevel);
}

document.querySelector(".btn-save").addEventListener("click", saveLevel);
document.querySelector(".btn-load").addEventListener("click", loadLevelFile);
