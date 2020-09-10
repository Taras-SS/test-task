import { System } from "ecsy";
import Shape from "./Shape";
import Position from "./Position";
import { SHAPE_HALF_SIZE, SHAPE_SIZE, CANVAS_BACKGROUND } from "../../config";
import { Renderable } from "./Renderable";

class RendererSystem extends System {
  init(data) {
    this.ctx = data.canvas.getContext("2d");
    this.canvasWidth = data.canvasWidth;
    this.canvasHeight = data.canvasHeight;
  }

  execute(delta, time) {
    this.ctx.fillStyle = CANVAS_BACKGROUND;
    this.ctx.fillRect(0, 0, this.canvasWidth, this.canvasHeight);

    this.queries.renderables.results.forEach((entity) => {
      const shape = entity.getComponent(Shape);
      const position = entity.getComponent(Position);
      if (shape.primitive === "box") {
        this.drawBox(position);
      } else {
        this.drawCircle(position);
      }
    });
  }

  drawCircle(position) {
    this.ctx.beginPath();
    this.ctx.arc(
      position.x,
      position.y,
      SHAPE_HALF_SIZE,
      0,
      2 * Math.PI,
      false
    );
    this.ctx.fillStyle = "#39c495";
    this.ctx.fill();
  }

  drawBox(position) {
    this.ctx.beginPath();
    this.ctx.rect(
      position.x - SHAPE_HALF_SIZE,
      position.y - SHAPE_HALF_SIZE,
      SHAPE_SIZE,
      SHAPE_SIZE
    );
    this.ctx.fillStyle = "#e2736e";
    this.ctx.fill();
  }
}

RendererSystem.queries = {
  renderables: { components: [Renderable, Shape] },
};

export default RendererSystem;
