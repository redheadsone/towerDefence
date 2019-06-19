import Monster from "./monster.js";
import Environment from "./environment.js";
import GameComponent from "./game-component.js";
import Spawner from "./spawner.js";

const gameClasses = [Monster, Environment, Spawner, GameComponent];

function createGameComponentFactory(gameComponents) {
  const getGameComponents = () => gameComponents;

  return props => {
    return createGameComponent({ ...props, getGameComponents });
  };
}

function createGameComponent(props) {
  //const props = JSON.parse(jsonText);

  const currentClass = gameClasses.find(
    gameClass => gameClass.name === props["@class"]
  );

  return new currentClass(props);
}

export function delay(timeout) {
  return new Promise(resolve => setTimeout(resolve, timeout));
}

export {
  Monster,
  Environment,
  Spawner,
  GameComponent,
  createGameComponent,
  createGameComponentFactory
};
