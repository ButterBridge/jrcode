---
templateKey: "blog-post"
title: "Prerendering & Proxies"
date: "2018-10-01T16:55:10.000Z"
description: >-
  The tale of the missing window, and the proxy that found it
caption: '"Rear Window is not defined"'
tags:
  - SSR
  - browsers
  - proxies
  - recursion
  - error handling
  - ES6
  - react
  - gatsby
---

Here's a little gotcha you'll likely have to overcome if you prerender your React app, like I had to using the static site generator [Gatsby](https://www.gatsbyjs.org/) on this site, and how it leads you to some murky ES6 JavaScript concepts.

## When I'm Coding Window

So you want your server or host (in my case, [netlify](https://www.netlify.com/)) to prerender your React app, so it gets sent to the browser as - at least to some degree - pure html and CSS. It's speedier and possibly better for SEO ([though this is much debated](https://www.elephate.com/blog/ultimate-guide-javascript-seo/)). This means the server reading, compiling and executing your front end code.

Node has removed a lot of the issues here, as JavaScript at the back end is very similar to what we use at the front end. Many of the differences can be handled by a transpiler like [babel](https://babeljs.io/) - ES6 imports for examples. But one thing the server will not abide is a reference in your code to `window`, or the browser global object. For what is a 'window' in the dark recesses of the server cellar? Naught but a dream, that's what. And a reference to a dream in JavaScript is your quickest route to a Reference Error (aka, `'window' is not defined`). Unsurprisingly, it's the same situation for `document`.

## Let the Light in

In general, references to the browser window in a React lifecycle method - i.e. `componentDidMount` - should cause no issue. If the code is not run server-side, this function is not called and the contents are not examined. It's only when you get round to pre-rendering that this becomes problematic - running the code and compiling it into HTML is exactly what you want to happen.

If your instincts on how to solve this problem lead you somewhere near `if (window) window.addEventListener(etc...)` then you won't be the first to have had your instincts fail you. Unfortunately you're just transferring the problem to the condition - the reference is no less real just because you're wondering if it's there. Or, in other words, a `Reference Error` isn't a falsy value.

The solution is to make `window` _mean_ something server side, but still mean the browser window come sunny client-side up.

## Anything's possible, right?

The key to the cellar lies with the humble and much maligned `typeof` operator. Checking types can indicate dodgy JavaScript and leads to very strange strangenesses (I'll do another post on those one day), but here's a great use case, and it is predictable. `window` on the server side throws a `Reference Error`... but `typeof window` gives `'undefined'` - note the string, just like any other type checked value.

That's something concrete we can work with. How about:

```js
const window = typeof window === "undefined" ? {} : window;
```

Now window can point to the browser window object - or if that's undefined, then an empty object. No more reference errors on windows, no more reference errors on properties of windows, all is ticketyboo in the Webdevelopmentville.

Well that is, until you use window to actually do anything useful. `window.addEventListener` - undefined, can deal with that. `window.addEventListener()` however - even if you don't know JS, you can hazard a guess that something that doesn't exist can't be called as a function (that's a `Type Error` for those who are filling in their error spotter checklists).

We need to do better than this really - actually, anything that could come out of window should just lead us nowhere. No matter what we chain, what property or index we attempt to access, or how we try to invoke it. But nothing fatal enough to throw an error should happen, else the build process will fail.

## By proxy

As trailed, Proxies are the solution here. These are new to ES6. I won't pretend to be an expert, and what I do know I can credit to [this super duper set of articles](https://ponyfoo.com/articles/tagged/es6-in-depth). The idea behind a proxy is that you set a 'trap' to determine what happens when the property of an object is accessed. This could be immensely helpful here - instead of actually returning an object property, we can intercept and return something else.

```js
const absence = (() => {
  const mockFunction = () => absence;

  return new Proxy(mockFunction, {
    get: (object, key) => (object.hasOwnProperty(key) ? object[key] : absence)
  });
})();

const window = typeof window === "undefined" ? absence : window;
```

Firstly the proxy: the first argument is the _target_. That's what we'll end up trying to get the property of. The second argument is our _handlers_ - in this case, just a `get` trap. This function is run every time we try to 'get' a property from our `mockFunction` proxy - the value we assign to `window` should it be undefined.

The `get` function is relatively simple: check if such a property exists, and if so, return it. It's legit! If not, then return... itself! And if you didn't smell recursion coming in from a mile off then check yourself for overpowering stenches for at the root of this is a classic recursion problem: how do we handle output when the input is of unknown depth? We don't know how many times we might want to chain properties of our window - the DOM is a multi-faceted beast and not averse to its own self-referential recursive patterns either.

This is all tied together as an IIFE, or 'immediately invoked function expression'. It is - again - not something I normally venture to in JavaScript, but it's necessary here to tie `absence` into itself initially. Now I can call whatever I want off window and look mum, no hands!

```js
// server side
console.log(
  window, // [Function: mockFunction]
  window.scroll, // [Function: mockFunction]
  window.self, // [Function: mockFunction]
  window.addEventListener(doStuff), // still [Function: mockFunction]
  window.lindo.kindo[4].bindo["jindo"].zindo(), // ...yep, still.
  window.document, // or just set up your own document mock

  localStorage.getItem("shoes"), // :( - reference error
  window.localStorage.getItem("shoes"), // :) - all ok again!
  window.fetch("www.cool-url.com") // no problemo
);
```

I hope you enjoyed this little trip into one of the shadier nooks of JavaScript. If you just don't want to deal with any of this, or if you came down looking for TL,DR like some half-baked looooser, then you got lucky this time. I like this [`browser-monads`](https://www.npmjs.com/package/browser-monads) package which employs exactly the same theory. 61 weekly downloads at time of writing - give it a boost, huh?
