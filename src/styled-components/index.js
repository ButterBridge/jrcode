import styled from "styled-components";
import { withBullet } from "./with/withBullet";
import { withLink } from "./with/withLink";
import { withTransition } from "./with/withTransition";
import { hexToRgb } from "../utils/helpers";

export const Block = styled.span`
  padding: 0.5em;
  margin: 5px;
  height: 50%;
  max-height: 1em;
  color: ${({ colour }) => colour};
  background: ${({ colour }) => colour};
`;

export const Bullet = styled.span`
  border-radius: 50%;
  display: block;
  padding: 0.5em;
  margin: 15px;
  color: ${({ colour }) => colour};
  background: ${({ colour }) => colour};
`;

export const Button = styled.button`
  margin: 2em;
  background: none;
  border: none;
`;

export const Centraliser = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  ${({ shrink }) => (shrink ? "max-width: 50%;" : "")};
  margin: 0;

  figure {
    width: 50vw;
  }
`;

export const Container = styled.div`
  margin: 1em;
  margin-bottom: 3em;
`;
export const TransitionContainer = withTransition(Container);

export const Content = styled.div`
  border-left: 1em solid ${({ colour }) => colour};
  border-bottom: 1em solid ${({ colour }) => colour};
  border-radius: 15px;
  padding: 1.5em;
  margin-right: 1.5rem;
  margin-bottom: 1.5rem;
  height: 100%;

  @media (max-width: 500px) {
    margin-left: 0;
    margin-right: 0;
    padding-left: 0;
    border-left: none;
  }
`;

export const Detail = styled.p`
  font-size: 0.8em;
  padding: 0.3em;
  padding-left: 1em;
  padding-right: 1em;
  display: block;
  margin: 0.5em;
  background-color: ${({ colour }) => colour};
  color: white;
  border-radius: 1em;
`;

export const FlexContainer = styled.div`
  display: flex;
  justify-content: left;
  flex-wrap: wrap;
`;

export const FormButton = styled.button`
  border-radius: 15px;
  padding: 0.5em;
  margin: 1.5em;
  grid-area: ${({ gridArea: { from, to } }) => `${from} / ${to}`};
`;

export const FormInput = styled.input`
  font-size: 1em;
  grid-area: ${({ gridArea: { from, to } }) => `${from} / ${to}`};
  padding: 5px;
`;

export const FormLabel = styled.label`
  font-size: 1em;
  grid-area: ${({ gridArea: { from, to } }) => `${from} / ${to}`};
  text-align: "right";
  padding: 5px;
`;

export const FormTextarea = styled.textarea`
  font-size: 1em;
  grid-area: ${({ gridArea: { from, to } }) => `${from} / ${to}`};
  padding: 5px;
`;

export const HeadLetter = styled.span`
  font-family: ${({ font }) => `'${font}'`};
  font-size: 1.5em;
  width: 100%;
  border: 0.5px solid whitesmoke;
  background-color: ${({ colour }) => colour};
  text-align: center;
  grid-column: ${({ gridCols: { from, to } }) => `${from} / ${to}`};
`;

export const IconHolder = styled.img`
  height: 1rem;
  margin: 0;
`;

export const List = styled.ul`
  margin: 0;
  padding: 0.25em;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
`;

export const ListItem = styled.li`
  border: 3px;
  list-style-type: none;
  display: inline-block;
  background-color: ${({ background = 'white' }) => background};
  padding: 5px;
  border-radius: 5px;
  margin: 5px;

  a {
    color: ${({ colour }) => colour};
  }
`;
export const LinkedListItem = withLink(ListItem);

export const Main = styled.section`
  margin: 1em;
  border-top: 1em solid ${({ colour }) => colour};
  border-right: 1em solid ${({ colour }) => colour};
  border-radius: 15px;
`;
export const TransitionMain = withTransition(Main);

export const Meta = styled.div`
  display: block;
  border-radius: 1em;
  margin: 1px;
  background-color: ${({ colour = "white" }) => colour};
`;
export const LinkedMeta = withLink(Meta);

export const NavBar = styled.nav`
  display: flex;
  justify-content: flex-end;
  padding: 1.5em;
  padding-right: 0;
  height: 100%;
  background: transparent;
`;

export const NavBarItem = styled.span`
  padding: 0.5px;
`;

export const Opener = styled.h6`
  font-size: 1.1em;
  margin: 0;
  margin-bottom: 1em;
  padding: 0.5em;
`;

export const Option = styled.h6`
  font-size: ${({ mini = false }) => (mini ? "0.8em" : "1.1em")};
  margin: 0.15em;
  padding: 0.15em;
  color: ${({ colour = "black" }) => colour};
  transition: opacity 0.5s;
  display: flex;
  justify-content: center;
  height: 100%;
  align-items: center;

  &:hover {
    opacity: 0.5;
  }
`;
export const LinkedOption = withLink(Option);
export const BulletedOption = withBullet(Option);

export const Paragraph = styled.p`
  font-size: 1em;
  display: block;
  margin: 0;
  margin-top: 0.5em;
  margin-bottom: 0.5em;
`;

export const Rect = styled.div.attrs({
  style: ({
    colour,
    gridCols: { from, to },
    borderRadius: { tl = 0, tr = 0, br = 0, bl = 0 }
  }) => ({
    backgroundColor: colour,
    gridColumn: `${from} / ${to}`,
    borderRadius: `${tl} ${tr} ${br} ${bl}`
  })
})`
  height: 100%;
  width: 100%;
  transition: opacity 0.05s;

  &:hover {
    opacity: 0.1;
  }
`;

export const Strong = styled.h6`
  font-size: 1.1em;
  padding: 0;
  margin: 0;
`;

export const Subtitle = styled.h4`
  font-size: 1.5em;
  margin: 0.5em;
  padding: 0.5em;
`;

export const SuperTitle = styled.h2`
  font-size: 2.25em;
  background: ${({ colour = "#000000" }) => {
    const { r, g, b } = hexToRgb(colour);
    return `linear-gradient(90deg,rgba(${r},${g},${b},1) 70%,rgba(${r},${g},${b},0.7) 90%)`;
  }};
  color: white;
  border-radius: 15px;
  margin: 0.5em;
  margin-bottom: 1em;
  padding: 0.5em;
  position: relative;
  left: -1em;
  width: 100%;

  @media (max-width: 500px) {
    font-size: 1.75em;
  }
`;

export const Title = styled.h3`
  font-size: 1.75em;
  margin: 0.1em;

  @media (max-width: 500px) {
    font-size: 1.25em;
  }
`;
export const LinkedTitle = withLink(Title);
export const BulletedTitle = withBullet(Title);
export const LinkedBulletedTitle = withLink(BulletedTitle);

export const Window = styled.div`
  font-size: 0.8em;
  border: ${({ borderWidth = "0.5em" }) => borderWidth} solid
    ${({ borderColour = "black" }) => borderColour};
  height: 100%;
  width: 100%;
  border-radius: 15px;
  position: relative;
  top: ${({ moveDown = 0 }) => `${moveDown}em`};
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ colour = "black" }) => colour};
`;

export const WindowInsert = styled.div`
  padding: 0.5em;
  margin: 5px;
`;
