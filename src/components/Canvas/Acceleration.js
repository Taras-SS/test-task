import { DEFAULT_ACCELERATION } from "../../config";
import { Component, Types } from "ecsy";

class Acceleration extends Component {}

Acceleration.shema = {
  value: { type: Types.Number, default: DEFAULT_ACCELERATION },
};

export default Acceleration;
