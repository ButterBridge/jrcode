---
templateKey: "blog-post"
title: "Using Context in Gatsby v2"
date: "2018-10-08T16:55:10.000Z"
description: >-
  A mini migration challenge
tags:
  - react
  - SSR
  - gatsby
---

Here's a quick one on how to use React's Context API with Gatsby, and why things have changed in Version 2.

### Forced migration

I recently started working on a new Gatsby site and kicked off with a template I'd used before ([this one, in fact](https://github.com/AustinGreen/gatsby-starter-netlify-cms)). Gatsby v2 was released [less than a month ago](https://www.gatsbyjs.org/blog/2018-09-17-gatsby-v2/) and I had no intention on jumping straight into something that I knew would introduce breaking changes into a framework I'm starting to get my head around. Needless to say, it wasn't long before I discovered that Gatsby community operates at a faster pace than I, and that the aforementioned template had already refactored to version 2. I would be coming along for the ride whether I liked it or not.

The first indication that something was up was that my `layout/index.js` component wasn't rendering. I'd heard that layout components were no longer automatically wrapped around in v2 and needed to be constructed like any other component. What I hadn't appreciated was that this meant I couldn't use the consistent presence of Layout on the DOM tree. That is to say, you could treat it like an 'App' or top level component from any other React project: like a would-be chevalier thrown violently from his horse unafraid of dodgy metaphors, you knew it would not mount again.

### Give me some context

This meant that whereas once upon at time I could do as I do in this site and define an external state provider using React's Context API, then incorporate it at the top of the layout component tree, now I was left with no obvious hook for it to purchase on. None of the components in my `/src` were the grandaddy of all other components, so there was nowhere to put the `Context.Provider`.

A bit of research and I discovered the API on which presumably the Layout component behaviour was previously built. It's called `wrapRootElement` and you enact it by exporting something with that name from `gatsby-browser.js` ([docs](https://www.gatsbyjs.org/docs/browser-apis/#wrapRootElement)). It's apparently designed to act as a state provider - there's a [separate API](https://www.gatsbyjs.org/docs/browser-apis/#wrapPageElement) called `wrapPageElement` for that. Both have versions executed server-side for that pre-rendery sweetness.

Here's what I first tried. Spoiler: IT'S WRONG.

```js
import React from "react";

export const AuthContext = React.createContext();

export class wrapRootElement extends React.Component {
  state = {
    code: "temp",
    codeInputted: false
  };

  attemptCodeInput = codeAttempt => {
    const { code } = this.state;
    if (codeAttempt === code) {
      this.setState({
        codeInputted: true
      });
    }
  };

  render() {
    const { children } = this.props;
    const { codeInputted } = this.state;
    return (
      <AuthContext.Provider
        value={{
          codeInputted,
          attemptCodeInput: this.attemptCodeInput
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}
```

From this I got this very unfriendly error message...

```js
"Objects are not valid as a React child (found: [object Module])";
```

...via the hot reloader that didn't give me any source mapping or anything useful at all really. On top of that, according to 'the internet', I appear to be the first person to have ever got the `[object Module]` variant.

It took me a little while to figure out what the syntax for creating this Provider wrapper would be. The only example in the docs is a brief one related to redux. The problem was that the export needs to be a function, so if you want to use a class as I do here, then it needs to jump through a little functional component loop. Here it is, amended, viable, and with it I bid you farewell.

```js
import React from "react";
import PT from "prop-types";

export const AuthContext = React.createContext();

class AuthProvider extends React.Component {
  state = {
    code: "temp",
    codeInputted: false
  };

  attemptCodeInput = codeAttempt => {
    const { code } = this.state;
    if (codeAttempt === code) {
      this.setState({
        codeInputted: true
      });
    }
  };

  render() {
    const { children } = this.props;
    const { codeInputted } = this.state;
    return (
      <AuthContext.Provider
        value={{
          codeInputted,
          attemptCodeInput: this.attemptCodeInput
        }}
      >
        {children}
      </AuthContext.Provider>
    );
  }
}

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
);
```
