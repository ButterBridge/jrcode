import React from "react";
import Transition from "../../components/Transition";

const withTransition = Component => ({ linkTo, ...props }) => (
  <Transition>
    <Component {...props} />
  </Transition>
);

export default withTransition;
