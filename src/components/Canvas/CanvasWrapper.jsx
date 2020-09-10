import React, { useState, useEffect } from "react";
import { Button } from "semantic-ui-react";
import Canvas from "./Canvas";
import styles from "./Canvas.module.css";
import { animationStopped } from "../../store/actions/animationAction";
import { connect } from "react-redux";

const mapDsiaptchToProps = (dispatch) => {
  return {
    animStopped: () => dispatch(animationStopped()),
  };
};

const CanvasWrapper = ({ animStopped }) => {
  const [isActive, setIsActive] = useState(true);

  const handleStop = () => {
    setIsActive(false);
    animStopped();
  };

  useEffect(() => {}, []);

  return (
    <main>
      <div className={styles.btnsWrapper}>
        <Button
          content="Stop"
          icon="pause"
          labelPosition="left"
          onClick={handleStop}
          disabled={isActive ? false : true}
          className={styles.btn}
        />
        <Button
          content="Continue"
          icon="right arrow"
          labelPosition="right"
          onClick={() => setIsActive(true)}
          disabled={isActive ? true : false}
          className={styles.btn}
        />
      </div>
      <Canvas isActive={isActive} />
    </main>
  );
};

export default connect(null, mapDsiaptchToProps)(CanvasWrapper);
