---
templateKey: "blog-post"
title: "Setting Up With Styled Components"
date: "2018-09-23T16:55:10.000Z"
description: >-
  Stay DRY with Styled Components
caption: Stylish, but DRY.
canonical: "https://www.jrcode.co.uk/blog/2018-09-23-setting-up-with-styled-components/"
tags:
  - styled-components
  - react
  - coding-principles
  - projects
  - CSS
  - composition
---

Many of you will have heard of the perils of [premature optimisation](https://stackify.com/premature-optimization-evil/), but how about premature aestheticisation? Probably not, principally because I just made it up. But what it denotes is common behaviour in a front-end project - don't get hung-up on styling before everything else is in place. In fact, don't even touch a CSS file. Why? It's just wasted time. When you start getting more elements in place and start to introduce data, the look and layout of your page is bound to need some adaptation. It's folly to buy your wallpaper before you've built your walls.

### Rules to be broken

But if you count the above as a rule, then it is behoven upon us as developers to question it, especially when it impedes on other so-called rules. Coding principles have a habit of being borne from good intentions, then swelling up to ingest situations which weren't on the cards at the time of their genesis ('premature optimisation' is a good example - here's a [counterargument](https://ubiquity.acm.org/article.cfm?id=1513451) to the above link).

One principle which has held fast for me is to keep code DRY. Don't repeat yourself. If the adages we follow as programmers should be judged by their practical implications, then keeping things DRY is as good as a Swiss Army Knife. Repeated code takes up time at the point of writing - but it takes up a lot more at the point of *re*writing. Time taken to find all of that [copypasta](https://www.urbandictionary.com/define.php?term=copypasta) code is not time well spent. In fact, whilst I've got you, don't save extraction of variables and separating out functions for a refactor - that's missing the point! Do it as you go, for the thanks of your future selves.

However, there is one part of your codebase where you're almost certain to be repeating yourself, over and over again - the HTML. HTML tags actually extract away a lot of DRYness for you - the default behaviours of a buttons, such as its ability to be disabled, its tag index and its beautifully 90s default styling are all encompassed within its name so we don't have to implement them each time. But a button is just a button - it's not a 'link button' or a 'form submit button' or a 'continue button'. It's up to us to branch off from the DOM tree and curate our beautiful leaves as we see fit.

### Styled by name

The most common way to do this is with CSS classes - perhaps with a CSS preprocessor like SASS or Stylus to help along the way. But there awkwardnesses to manage here - if you don't assign class names as you write your html, you have to search through your murky indentations when it comes to assigning later. Even if you've been organised and done some as you go, changing your class naming convention leaves you similarly scouring your code like kids at a rock pool.

So here's an alternative available to us using React - Styled Components. [Docs are here](https://www.styled-components.com/), they're fab, read them. They're part of a growing number of CSS-in-JS libraries - [glamorous](https://glamorous.rocks/) being the only other one I've had any experience with. Here's an [article](https://hackernoon.com/all-you-need-to-know-about-css-in-js-984a72d48ebc) on all you need to know about CSS in JS. It's called 'All You Need to Know About CSS-in-JS'. But if you've learnt anything from this article, it's that good things can happen when we question the rules. Separation of concerns? That means keep your stylesheets away from your page views, right? Well, React has already played havoc with that principle by combining the logic and state of your site inextricably with its structure, so let's keep riding this train.

CSS-in-JS is not an approach without logic. It entirely suits the compositional componentisation that React encourages - identifying discrete aspects of your application and isolating them. If we isolate them at the planning stage - [and we should (according to Step 1)](https://reactjs.org/docs/thinking-in-react.html) - then - with the aid of Styled Components - we can also plan in a way that will make the styling process more painless when it's bevel and border time.

### Styled by nature

The standard syntax for a styled component looks like this:

```js
import styled from "styled-components";

export const Subheading = styled.h3`
  font-size: 1.5em;
  background: palegoldenrod;
`;
```

(If you haven't come across tag functions before, as I hadn't shortly before starting to play around with graphQL, then I got everything I needed to know from the second half of [this article](https://codeburst.io/javascript-template-literals-tag-functions-for-beginners-758a041160e1). Don't be scared of tem, _they're JavaScript_. And this is a great use case for them, to take advantage of the familiar CSS syntax.)

I've been naughty and added a couple of styling attributes in there already. But you will have more restraint. Here's how I might use some styled components in a React component:

```js
import {
  Main,
  Subheading,
  FlexCollection,
  FlexButton,
  ButtonText
} from "./styled";

const Tags = ({ tags }) => (
  <Main>
    <Subheading>All tags...</Subheading>
    <FlexCollection>
      {tags.map(tag => (
        <Link to={`/tags/${tag}`} key={tag}>
          <FlexButton>
            <ButtonText>{tag}</ButtonText>
          </FlexButton>
        </Link>
      ))}
    </FlexCollection>
  </Main>
);
```

You can see how a styled components is used as, well, a component - a compositional component in fact, that accepts and renders child props, with styling attached. To me, the above looks beautifully descriptive and declarative - far more so than having to scan and parse an endless melange of BEM class names.

When I want to reuse the component (this won't be my only subheading), I can just import it again. Even if I've exercised restraint in not applying my own styles at this early stage, I still get the browser's default styling to go off, because the component is initialised with Styled Components `h3` function, and so gets that behaviour off the cart, just as if I'd used an `h3` tag in the first place. The biggest benefits come later though, when I start to apply the style. The component is already there to receive it - no searching through and adding classes. And as it's just JavaScript, variables are your faithful friends once more. Here's one way to bring props into a Styled Component:

```js
const Button = styled.a`
  background: transparent;
  border: 2px solid red;
  color: ${props => (props.primary ? "cyan" : "palevioletred")};
`;
```

### Start as you mean to go on

At the start of a project I now copy in and adapt two files to `src/components/styled-components` - one called `elements.js` and one called `structures.js`. After adaptation, both will contain skeletal styled component descriptions for every component I identified in the planning stage of my project. Here's an `elements.js`, containing every element I expected to use in the project, that I did recently:

```js
import styled from "styled-components";

export const SuperHeading = styled.h1``;
export const Heading = styled.h3``;
export const Subheading = styled.h4``;
export const Opening = styled.p``;
export const Extract = styled.p``;
export const MediaHeading = styled.h5``;
export const MediaDetail = styled.span``;
export const Extra = styled.p``;
export const FormLabel = styled.label``;
export const FormInput = styled.input``;
export const SubmitButton = styled.button``;
export const DownloadButton = styled.button``;
export const FlexButton = styled.button``;
export const ButtonText = styled.span``;
export const NavLink = styled.button``;
export const InlineLink = styled.button``;
```

I might go a little further with some of the layout aspects even at the early stage in the `structures.js` file - there's no harm in declaring a flex container or a potential basic grid layout if it's not going to get in the way of the rest of your project.

```js
export const Banner = styled.header``;
export const Main = styled.section``;
export const FlexCollection = styled.div`
  display: flex;
  justify-content: space-between;
`;
export const EqualColumns = styled.div`
  display: grid;
  grid-template-columns: ${({ numberOfCols }) =>
    `repeat(${numberOfCols}, 1fr)`};
`;
export const Column = styled.div`
  grid-column: ${({ colStart }) => colStart};
`;
export const Footer = styled.footer``;
export const Form = styled.form``;
```

All easily findable, easily identifiable, easily adaptable. We've broken the styling-last rule - but not in an essential way; a way that undermines the good intentions behind it, right? I mean, at least it's not inline styling...
