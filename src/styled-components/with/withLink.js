import React from "react";
import Link from "gatsby-link";

const withLink = Component => ({ linkTo, ...props }) => (
  <Link to={linkTo}>
    <Component {...props} />
  </Link>
);

export default withLink;
