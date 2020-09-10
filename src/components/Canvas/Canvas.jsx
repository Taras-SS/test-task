import React, { useState, useEffect, createRef } from "react";
import { World } from "ecsy";
import Speed from "./Speed";
import Shape from "./Shape";
import Position from "./Position";
import { Renderable } from "./Renderable";
import MovableSystem from "./MovableSytem";
import RendererSystem from "./RenderingSystem";
import {
  getRandomShape,
  getRandomSpeed,
  getRandomPosition,
  run,
  getRandomAmountOfShapes,
} from "./Additional";
import {
  animationStarted,
  animationUpdated,
} from "../../store/actions/animationAction";
import { connect } from "react-redux";
import {INITIAL_NUM_OF_ELEMS, AMOUNT_OF_SHAPES_FROM, AMOUNT_OF_SHAPES_TO} from "../../config";
import styles from "./Canvas.module.css";

const mapDispatchToProps = (dispatch) => {
  return {
    animStarted: (shapesAmoutn) => dispatch(animationStarted(shapesAmoutn)),
    animUpdated: (shapesAmount) => dispatch(animationUpdated(shapesAmount)),
  };
};

const Canvas = ({ isActive, animStarted, animUpdated }) => {
  const [MyWorld] = useState(new World());
  const [canvas] = useState(createRef());
  const [numOfElements, setNumOfElements] = useState(INITIAL_NUM_OF_ELEMS);
  const [prevNumOfElements, setPrevNumOfElements] = useState(0);

  useEffect(() => {
    animStarted(numOfElements);
    run(MyWorld);
  }, []);

  useEffect(() => {
    MyWorld.registerComponent(Speed)
      .registerComponent(Shape)
      .registerComponent(Position)
      .registerComponent(Renderable)
      .registerSystem(MovableSystem, {
        canvasWidth: canvas.current.width,
        canvasHeight: canvas.current.height,
      })
      .registerSystem(RendererSystem, {
        canvas: canvas.current,
        canvasWidth: canvas.current.width,
        canvasHeight: canvas.current.height,
      }).enabled = isActive;

    if (!isActive) {
      setPrevNumOfElements(numOfElements);
      setNumOfElements(getRandomAmountOfShapes(AMOUNT_OF_SHAPES_FROM, AMOUNT_OF_SHAPES_TO));
    }
  }, [isActive]);

  useEffect(() => {
    prevNumOfElements - numOfElements <= 0 ? addShapes() : removeShapes();
  }, [numOfElements]);

  const addShapes = () => {
    const amount = Math.abs(prevNumOfElements - numOfElements);
      prevNumOfElements !== 0 && (animUpdated(numOfElements))
    for (let i = 0; i < amount; i++) {
      MyWorld.createEntity()
        .addComponent(Speed, getRandomSpeed())
        .addComponent(Shape, getRandomShape())
        .addComponent(
          Position,
          getRandomPosition(canvas.current.width, canvas.current.height)
        )
        .addComponent(Renderable);
    }
  };

  const removeShapes = () => {
    const amount = prevNumOfElements - numOfElements;
    let amountOfElems = 0;
    MyWorld.entityManager._entities.filter((item, index) => {
      amountOfElems = MyWorld.entityManager._entities.length;
      if (numOfElements <= index + 1) {
        item.removeAllComponents(true);
        item.remove(true);
      }
    });

    amountOfElems > numOfElements ? removeShapes() : animUpdated(numOfElements);
  };

  return <canvas ref={canvas} className={styles.canvas}></canvas>;
};

export default connect(null, mapDispatchToProps)(Canvas);
