export const gameComponents = new Proxy([], {
  get(target, prop) {
    if (prop === "push" || prop === "splice") {
      //todo: call hadler async
      stateChanged();
    }

    return target[prop];
  },
  set(target, prop, value) {
    target[prop] = value;
    return true;
  }
});

const handlers = [];

export function onStateChange(handler) {
  handlers.push(handler);
}

function stateChanged() {
  handlers.forEach(function(handler) {
    handler();
  });
}
