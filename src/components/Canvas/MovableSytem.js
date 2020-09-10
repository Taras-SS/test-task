import { System } from "ecsy";
import Speed from "./Speed";
import Position from "./Position";
import { SHAPE_HALF_SIZE } from "../../config";

class MovableSystem extends System {
  init(data) {
    this.canvasWidth = data.canvasWidth;
    this.canvasHeight = data.canvasHeight;
  }

  execute(delta, time) {
    this.queries.moving.results.forEach((entity) => {
      const speed = entity.getComponent(Speed);
      let position = entity.getMutableComponent(Position);
      position.x += speed.x * delta;
      position.y += speed.y * delta;

      if (position.x > this.canvasWidth + SHAPE_HALF_SIZE)
        position.x = -SHAPE_HALF_SIZE;
      if (position.x <= -SHAPE_HALF_SIZE)
        position.x = this.canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > this.canvasHeight + SHAPE_HALF_SIZE)
        position.y = -SHAPE_HALF_SIZE;
      if (position.y < -SHAPE_HALF_SIZE)
        position.y = this.canvasHeight + SHAPE_HALF_SIZE;
    });
  }
}

MovableSystem.queries = {
  moving: {
    components: [Speed, Position],
  },
};

export default MovableSystem;
