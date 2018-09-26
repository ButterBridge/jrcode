import React from "react";
import { Bullet } from "..";

const withBullet = Component => ({
  componentContent,
  addition,
  colour,
  classTag = "main",
  active,
  ...props
}) => {
  return (
    <div style={{ display: "block" }}>
      <div className={`grid-${addition}`}>
        <Bullet
          colour={colour}
          className={`grid-${addition}-bullet`}
          active={active}
        />
        <Component className={`grid-${addition}-${classTag}`} {...props}>
          {componentContent}
        </Component>
      </div>
    </div>
  );
};

export default withBullet;
