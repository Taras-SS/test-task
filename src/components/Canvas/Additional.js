import { SPEED_MULTIPLIER } from "../../config";

export const getRandomSpeed = () => {
  return {
    x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
  };
};

export const getRandomShape = () => {
  return {
    primitive: Math.random() >= 0.5 ? "circle" : "box",
  };
};

export const getRandomPosition = (canvasWidth, canvasHeight) => {
  return {
    x: Math.random() * canvasWidth,
    y: Math.random() * canvasHeight,
  };
};

export const getRandomAmountOfShapes = (min, max) =>
  Math.round(Math.random() * (max - min) + min);

let lastTime = performance.now();

export const run = (world) => {
  const time = performance.now();
  const delta = time - lastTime;

  world.execute(delta, time);

  lastTime = time;
  requestAnimationFrame(() => {
    run(world);
  });
};
