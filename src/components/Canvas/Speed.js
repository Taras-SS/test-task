import { Component, Types } from "ecsy";

class Speed extends Component {}

Speed.schema = {
  x: { type: Types.Number },
  y: { type: Types.Number },
};

export default Speed;
