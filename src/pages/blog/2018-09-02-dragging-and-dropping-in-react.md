---
templateKey: "blog-post"
title: "Dragging and Dropping in React"
date: "2018-09-02T16:55:10.000Z"
description: >-
  ...and drawing a line on external libraries
caption: Mid-drag!
tags:
  - react
  - drag-and-drop
  - third-party-APIs
  - learning-to-code
---

This rather overheated [opinion piece on dev.to](https://dev.to/gypsydave5/why-you-shouldnt-use-a-web-framework-3g24) caused a little consternation. The conversation about where to draw the line between making your own implementation and adopting a framework is a sure-fire opinion-eliciter though few people draw it quite so close to the perimeter as the author of that article (though the clickbait title is a bit more audacious than the actual content). Is it really plausible to only use your own code, sculpted from only the purest innards of JavaScript? And desirable, at that?

### Know then go

I'm sympathetic. At Northcoders, we don't teach Express before students have got to grips with Node's HTTP module. But parsing your own HTTP? When somebody's already gone through that pain? It would be rude _not_ to use their code. Besides, where does it end? Are you allowed to use frameworks you've contributed to on open-source? Are you allowed to use frameworks implemented by previous work colleagues, that you know passes tests but haven't delved into the intricacies of yet, because, well, there's shit to do?

But - I promise - I _am_ sympathetic. Particularly on the front end. React is a tech worth learning and a wheel not worth reinventing, hands down ([here's why I'm wrong](https://medium.com/@sweetpalma/gooact-react-in-160-lines-of-javascript-44e0742ad60f)), but almost everything inside the React ecosystem is unlikely to be beyond the comfort of any somewhat practised React dev. Take Redux, for example - what does it do that a) you couldn't achieve with a litte study on the nicely, newly cleaned up [context API](https://reactjs.org/docs/context.html), and b) - crucial, this - _you actually need_?

### What to drop

It gets even more ridiculous with creating components. I don't tend to be unequivocal (take this sentence as an example) but you shouldn't be using a third party toggle component without knowing that you could have made one if you thought it was worth the effort. Or a dropdown, or a form, or a modal box. So here at last we get to the title - I had to pinch myself, when trying to implement drag and drop for reordering in my Todo app [previously mentioned in this post about Parcel](https://www.jrcode.co.uk/blog/2018-08-10-getting-going-with-parcel/), I found myself reading the [docs for React DnD](http://react-dnd.github.io/react-dnd/).

I cast no aspersions and make no criticisms at the devs behind it. It's clearly a capable, extensible and well-supported piece of kit and the fact it doesn't come with its own component library I like to think advocates my point somewhat. If I was working for a client, I'd probably use it. But the whole point of this endeavour was to try and look behind some of these smokescreens, so, and I think you for your patience, here's how I harnessed the HTML5 drag and drop API to do what I needed myself.

### Such a drag

This [W3Schools tutorial](https://www.w3schools.com/html/html5_draganddrop.asp) formed the basis for my experimentation. It's based around vanilla DOM JS but the transitions to React are simple enough to imagine - instead of existing in a script tag, our event handlers can be held by the appropriate components. Instead of them imperatively interacting with the DOM, we can change state. Here, it's being used to reorder items in a list, so that's what the indexes you'll see below refer to.

At its core, we need five - count 'em - handlers. For me, they all lived in my `Todos` class, and were passed to the `Todo` component if necessary.

```js
handleDragStart = dragStartIndex => {
  this.setState({
    dragStartIndex
  });
};
```

This is where it begins! When a user begins dragging an element, we log in state which index is being dragged. Note that this is only possible if the element is given the `draggable` property. It's called by my list item's `onDragStart` listener.

```js
handleDragOver = e => {
  e.preventDefault();
};
```

This is necessary for elements that could permit the 'drop' to register. By default, this doesn't happen.

```js
handleDragEnter = currentOverDragIndex => {
  this.setState({
    currentOverDragIndex
  });
};

handleDragEnd = () => {
  this.setState({
    currentOverDragIndex: null
  });
};
```

This is perhaps not entirely necessary, but the way I handled this was to slightly enlarge the gap between the two todos if they were currently being dragged over - seemed like a good idea, purely from a UX perspective. So this gets logged `onDragOver`, and cancelled out `onDragEnd` (which is differend to `onDrop`), which affects the CSS on render.

```js
handleDrop = () => {
  const { reorderTodo } = this.props;
  const { dragStartIndex, currentOverDragIndex } = this.state;
  const offset = dragStartIndex < currentOverDragIndex ? -1 : 0;
  reorderTodo(dragStartIndex, currentOverDragIndex + offset);
  this.setState({
    currentOverDragIndex: null
  });
};
```

And this is where the magic happens! `onDrop`, this function lets my top level state-affecting function know the details it needs in order to reorder my items, using what I've kept track of in state. Here's how it does that:

```js
reorderTodo = (from, to) => {
  const { todos } = this.state;
  const newlyOrderedTodos = [...todos];
  const [swappedOutTodo] = newlyOrderedTodos.splice(from, 1);
  newlyOrderedTodos.splice(to, 0, swappedOutTodo);
  this.setState({
    todos: newlyOrderedTodos
  });
};
```

(An aside - I think this is the first time I have used `.splice` in a project... and twice!)

So really nothing too crazy there. Took an hour or so to get to grips with. You can maybe see one of the miniature headaches - getting it to handle things going in either direction. But that's what ternaries are for! (arguments for another day). Most importantly, I got to know a new HTML API for me, and I know it now whether I'm working with a vanilla DOM & JS app or with React or Angular or whatever else. Definitely a wheel worth reinventing.
