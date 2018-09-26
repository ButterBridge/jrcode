import React from "react";
import Transition from "../../components/Transition";

export default Component => ({ linkTo, ...props }) => (
  <Transition>
    <Component {...props} />
  </Transition>
);
