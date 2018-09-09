---
templateKey: 'blog-post'
title: 'Reduce: Five Unusual Uses'
date: '2018-09-09T16:55:10.000Z'
description: >-
  ...for the best thing in JavaScript
caption: Pretend to be a wizard by picking up a stick, pointing it at your computer, and commanding 'Reduce!'
tags:
  - reduce
  - functional-programming
  - third-party-APIs
  - lodash
  - arrays
---

`reduce` is the best thing in JavaScript, but it's only existed as a native method of the language since 2009 or so, when the [5th Edition of ECMAScript](https://en.wikipedia.org/wiki/ECMAScript#5th_Edition)] was released. Before then, people would have relied on their own or other implementations. Even now, there are arguments for going elsewhere - [lodash's reduce](https://lodash.com/docs/4.17.10#reduce), for example, can handle objects too.

### Master of Reduction

Learning `reduce` (or becoming a Master of Reduction, to give this process its formal name) is one of those release moments in learning JavaScript. The [MDN docs](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce) are a touch impenetrable, with some not intuitive use cases and weird terminology like 'initial value' and 'accumulator' crazying up your mind. Thankfully, the internet is littered with blog posts from developers of all statures giving their two-penneth and most of them will tell you everything you need to know for its every-day use.

I have little to add on teaching you the common use cases of reduce. If you can use it to:
* total up values
* tally into an object
* flatten an array
* identify unique values
* coalesce `.map` and `.filter` logic

then you're in no bad place. But here's some more interesting cases you might come across one day.

#### Averaging

Here's an implementation of reduce that averages an array of numbers. It totals up, and then on the last element of the array, it divides by the length of the array passed in.

```js
  const myFaveNums = [3, 6, 42];
  const average = myFaveNums.reduce((acc, num, index, array) => {
    acc = acc + num;
    if (index === array.length - 1) { 
      return acc / array.length;
    } else { 
      return total;
    }
  });

  // average = 17
```

OK, nothing too fancy, but it gives us the opportunity to see all four arguments that reduce will pass to the function given to it.

_So why not this?_ I hear you cry in righteous consternation:

```js
  const myFaveNums = [3, 6, 42];
  const average = myFaveNums.reduce((acc, num) => {
    return acc + num;
  }) / myFaveNums.length;

  // average = 17
```

Yes, this will work fine, in this case. But it's important to remember that the array you start off with is not necessarily the same array as the fourth argument in the callback - if you're chaining methods, for example:

```js
  const myFaveNums = [3, 6, 42];
  const average = myFaveNums.slice(1).reduce((acc, num) => {
    return acc + num;
  }) / myFaveNums.length;

  // average = 16?
```

Of course, you could slice your divisor at the end too, but this who approach goes against one of the principles of functional programming - give functions the arguments they need to do their job so they don't need to look outside. My version isn't perfect, to be fair - it would be nice to be able to extract and rename the function to be shared elsewhere, but what would I call it? It has very specific behaviour - sometimes total, sometimes divide. Not likely to be useful elsewhere.

#### Piping

You can use reduce to send a value through a number of functions and squeeze it out the other end. This makes use of JavaScript's treament of functions as 'first class citizens' - they can be passed around as values just like any other.

```js
  const reverse = str => str.split('').reverse().join('');

  const capitalise = str => str[0].toUpperCase() + str.slice(1);

  const filterVowels = str => str.split('').filter(char => !'aeiou'.includes(char)).join('');

  const encode = secretMessage => [reverse, capitalise, filterVowels].reduce((processedMessage, cipher) => {
    return cipher(processedMessage);
  }, secretMessage);

  const encodedMessage = encode('i am a walrus');

  //encodedMessage = 'Srlw  m'
```

This is great for composability and shows the strength in isolating atomic behaviour into individual functions. Reorder your initial array and what result would you get?

Unlike the previous examples, this makes use of the mythical second argument reduce can take, the initial value. You'll almost always need it (unless you're ok with `reduce` using the first item from the array as its initial argument), but it doesn't have to be an empty string / array / object etc - start with what ever you want.

On that note :

#### Data transformation

Say you don't have control of the data that's coming in from a third party API or a database you didn't design. Then say you need to process that data into a format you don't control either - say, for a third party React component. Reduce is, essentially, for turning a collection into something else, and that can be any value you like. Define an initial value that looks like what you want it to look like. This is an example that turns a response from the [Google Books API](https://developers.google.com/books/) into data for a [chart.js](https://www.chartjs.org/) pie chart.

```js
  const chartData = books.reduce(
    ({labels, dataset}, book) => {
      const labelIndex = labels.indexOf(book.volumeInfo.author);
      if (labelIndex > -1) {
        dataset.data[labelIndex]++;
      } else {
        labels.push(book.volumeInfo.author);
        dataset.data.push(1);
      }
      return {labels, dataset};
    },
    {
      labels: [],
      dataset: {
        data: [],
        backgroundColor: //style data
      }
    }
  );
```

If this looks a bit like a tally to you, it essentially is. And by the same logic, if you know what you'll be tallying, you could declare it in your initial value to save yourself some key checking in the reduce:

```js
  const tally = faveHolidayDestinations.reduce((acc, place) => {
    acc[place]++;
    return acc;
  }, {
    Bali: 0,
    Milan: 0,
    Slough: 0
  });
```

#### Checking value existence

You may have found yourself in the position of wanting to check if a value exists inside a nested object, but not have any guarantee of the structural integirty of this object. `console.log(galaxy.solarSystem.planet.satellite.manInTheMoon)` won't cut it, because not all planets have satellites and not all satellites have strange men staring down at you through your bedroom window so you can't sleep. So you find yourself doing a run of every increasing nested checking: `console.log(galaxy.solarSystem && galaxy.solarSystem.planet //etc...)`

Clunky and chunky. Lodash has a `.get` method that will take a dot-separated string and return either the existent value or undefined. But why not make our own with our newfound skills?

```js
  const manInTheMoon = 'solarSystem.planet.satellite.manInTheMoon'.split('.').reduce((acc, key) => {
    if (acc === undefined) return;
    if (acc[key] === undefined) return;
    else return acc[key];
  }, galaxy);
```

See if you can make a version that can parse a string representing nested arrays too!

#### Sequencing

Reduce can be a way of avoiding recursion without resorting to a for loop too. I'll let you figure out what this one does.

```js
  const [_, mysteryNumber] = Array(100).fill().reduce(sequence => {
    const nextNumber = sequence[0] + sequence[1];
    return [sequence[1], nextNumber];
  }, [0, 1]);
```

If you've never made an Array directly with the constructor before, give it a go. It'll make this strangely empty, 'sparsely populated' array, for which even `undefined` is too corporeal. It has the length you'd expect, but as it is devoid of constituent values, it cannot be mapped, filtered, reduced etc. `.fill()` is a neat way of populating it with undefineds, something which can at least be iterated over.

Any more interesting ones? Please post me a message in the contact box and I will be sure to credit any addenda.