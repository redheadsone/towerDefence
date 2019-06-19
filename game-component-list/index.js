import { gameComponents, onStateChange } from "../game-state/index.js";

const gameComponentList = document.querySelector(".game-component-list");

onStateChange(function() {
  console.log(`sostoyznie changed, gc count is ${gameComponents.length}`);
});
