---
templateKey: 'blog-post'
title: 'Getting Going With Parcel.js'
date: '2018-08-10T16:55:10.000Z'
description: >-
  An alternative to webpack?
caption: It's not beautiful, but it is parcelled...
tags:
  - parcel.js
  - webpack
  - create-react-app
  - react
  - teaching
  - jest
  - enzyme
  - babel
  - source-maps
  - local-storage
  - bundling
---

[Create-react-app](https://github.com/facebook/create-react-app) is something of a teaching godsend. Everything you need - transpilation, testing frameworks... even a service worker(!) all wrapped up in one neat, hyper-documented package. But you can have too much of a good thing...

## Instant gratification

So yes, create-react-app (henceforth 'CRA', for all our sakes) has a lot going for it, from both a developer and a teacher point of view. There's enough to learn in **react** without having to learn babel and webpack first. But we do promise to demystify most of what we teach, and there's a lot of mystery wrapped up in CRA and its rather sterile sound package.json 'react-scripts'.

Still, configuring a webpack setup is just no fun. Doable, for sure, but somehow... bureaucratic. So, I was excited to learn about [parcel.js](https://parceljs.org/), which promises to be, in their words, a 'blazing fast, zero configuration web application bundler'. I won't deny it, zero configuration is the sell here. I like speed as much as the next guy, but for the purposes of giving some insight into the build process of a react app, having one fewer config files was the clincher.

I decided to make a little todo application, because... I lacked imagination at that moment. And it's the sort of thing we'd use to introduce react to a student. So here's a breakdown of what I needed to do to get it to work.

## Assembling the packaging

There was definitely the odd bit of googling going on here as I came across the odd little stumbling block here and there, and I didn't always take note of where I found this information so please forgive me for not crediting the sources of some of this. What I can say is not a great deal of it came from the parcel.js website, which is rather terse in its 'recipe' for a react project (I'm guessing they don't want to add too much for fear of 'zero-configuration' appearing to be the unkeepable promise that it is destined to be).

Anyhoo, after the `npm install -g parcel-bundler` I added the following to my package.json scripts:

```json
{
    "dev": "NODE_ENV=development parcel ./src/index.html",
    "build": "parcel build ./src/index.html/",
}
```

I also needed a bit of babel config. Babel is the go-to transpiler for React code - it converts their proprietary JSX 'language' (and any other modern / experimental JavaScript) into friendly, ugly trad-Javascript (the stuff of which nightmares are made, but IE9 can gobble up contentedly).

It took a bit of experimentation to discover which babel packages I needed for this little app, but I ended up with the following installed in my devDependencies (I'm not entirely sure both the bottom ones are necessary, but I am sure I can't be bothered to find out right now):

```json
{
    "babel-core": "^6.26.3",
    "babel-plugin-transform-class-properties": "^6.24.1",
    "babel-plugin-transform-object-rest-spread": "^6.26.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-react-app": "^3.1.0"
}
```

And the following .babelrc file in the root of my project:

```json
{
    "presets": ["react-app", "env",  "react"],
    "plugins": ["transform-object-rest-spread", "transform-class-properties"]
}
```

The plugins are important for a couple of experimental syntaxes I've used, and which many people do. The first allows object spreading, which is super useful for keeping your code a bit cleaner when avoid mutation. The second allows the declaration of properties (such as state) and methods in a class without a constructor (and as such allows arrow functions when declaring a class too, so no need to bind either). Here I am making use of both of these is the function below, in my App component.

```js
handleToggleComplete = todoToToggle => {
    const {todos} = this.state;
    this.setState({
        todos : todos.map(todo => {
            return todo === todoToToggle ?
                {
                    ...todo,
                    completed : !todo.completed
                } :
                todo
        })
    })
}
```

And that was enough to run my dev script in the package.json! No need to configure for importing .css files, or anything like that, which is lovely. On running dev, parcel creates a dist folder in your root containing the compiled code, which is always a grand thing to explore if you are looking for a way to hurt your eyes.

## Use case

So setting up is great, but how about usage? One possibly underappreciated aspect of CRA is its error messaging. It's top notch stuff - the messages are descriptive, accurate and suggestive (in a good way), they interrupt your run so you know something has gone wrong, and they can even link you back to your code if you cmd-click on the line number.

It was interesting to discover which of these messages I'd grown to love came from CRA and which were pure react. I found the react error messages to be sufficient, to be honest. They don't have some of the elegance of the CRA ones, and I only knew my app wasn't working, because, well, it didn't work, rather than something flashing up to let me know.

A near-decisive blow against parcel was source maps for the errors. There point you towards the original line of code that prompted your code to error so you can address it there, as opposed to the line of code in the labyrinthine transpiled version which is of sod all use to anyone. These source maps didn't appear to work initially, but after some exploring online I found that these had just become a default-enabled feature, and after a bit of tinkering (possibly just installing an updated version of parcel) they did start working. Working on anything of any size at all without source maps with a module-based apprach like React is absolutely untenable, so this was a relief.

## Testing times

I went through a few more tribulations getting testing set up with **jest** and **enzyme**. These are already set up and configured in CRA - not so here. So this was my first time seeing what I needed to do in order to set up a react test environment from scratch.

First I installed jest, enzyme, and enzyme's adapter for react version 16, giving me these additional devDependencies:

```json
{
    "enzyme": "^3.4.1",
    "enzyme-adapter-react-16": "^1.2.0",
    "jest": "^23.4.2"
}
```

I configured these according to instructions on this neat [tutorial video from Jack Franklin](https://www.youtube.com/watch?v=aSQ8v9JH5C8&t=11s), giving me this in a setup.js in a 'tests' directory:

```js
import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({adapter : new Adapter()});
```

I used a jest.config.file in the root directory to point to this in setupFiles (this code a bit below), and added a package.json test script that was initially a rather poetic `"test": "jest"` (as jest is capable of searching for files that meet naming conventions) but I later changed to `"test": "jest src/tests"` because it seemed to be going a bit slow, and I thought this would help (I don't think it did). Finally a test in the directory described in that script...

```js
import React from 'react';
import App from '../components/App';
import {shallow} from 'enzyme';

describe('App', () => {
    it('starts with nothing in the newTodoText input', () => {
        const wrapper = shallow(<App />);
        const newTodoTextState = wrapper.state().newTodoText;
        expect(newTodoTextState).toEqual('');
    })
})
```

...thinking this would be a neat way of getting going, but immediately hit a brick wall, with the unfriendly error message 'SecurityError: localStorage is not available for opaque origins'. Opaque as the error message is, it was pretty obvious what the problem was - the localStorage I was using for storing the todos is a browser API, but here I was trying to access it in lowly node.

This took me much longer to source an answer for than I would have liked. I tried various things, including writing a mock local storage API object, installing packages that purported to do the same thing, and trying to get it to work with jsdom like CRA does. I don't know why it took me so long but eventually I found [this stack overflow question](https://stackoverflow.com/questions/51554366/jest-securityerror-localstorage-is-not-available-for-opaque-origins) (titled exactly the same as my error message...) which pointed me in the direction of some configuration options I needed in my jest.config.js. I ran the test script again, to finally see progress, but trip up again, this time on trying to import a CSS file.

But I was on a role and quickly found the jest docs on webpack static file imports. Much the same pattern here, so I added the moduleNameMapper object you see below, leaving me with a complete jest.config.js file:

```js
module.exports = {
    setupFiles: ["<rootDir>/tests/setup.js"],
    verbose: true,
    testURL: "http://localhost/",
    moduleNameMapper: {
        "\\.(css|less|sass|scss)$": "<rootDir>/tests/styleMock.js",
        "\\.(gif|ttf|eot|svg)$": "<rootDir>/tests/fileMock.js"
    }
}
```

...and these sweet little mock files you can see referenced there:

```js
//styleMock.js
module.exports = {};

//fileMock.js
module.exports = 'test-file-stub';
```

And then it worked.

## In conclusion

I'm not entirely convinced I've come across every issue that it likely to rear its head if we were to set this loose on students for them to do whatever with. I've already read that sessionStorage is treated differently to localStorage, and I'm sure there's a plethora of other headaches in the system. But it certainly has given me a bit of insight into the build process and so, in a 'controlled environment', it could do the same for our students too.