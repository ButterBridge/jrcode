---
templateKey: "blog-post"
title: "Refactoring Katas"
date: "2018-11-04T16:55:10.000Z"
description: >-
  A bit on 'what for' and 'how to'
caption: ""
canonical: ""
tags:
  - reduce
  - refactoring
  - teaching
  - functional-programming
  - northcoders
---

First off, an apology on not posting an update in a month. I'm working on this site's first tutorial series, and hope to be able to reveal this in a couple of weeks. For the meanwhile, I wanted to share this experience of refactoring a kata with a student.

### It works

Katas, or miniature self-contained coding challenges, are an essential part of our curriculum at Northcoders. We encourage students to pick up points on [codewars](https://www.codewars.com/dashboard) before they even arrive to study the curriculum, and they continue to work on them, developing problem solving, self-sufficiency and spec skills throughout the course. It's good practise for a tech test interview, but these are itches every programmer should be scratching.

In our mentor meetings, we'll check in on students' katas. We hear reflections ranging from _"I can't do this one please just make it stop"_ - it's obvious how we can help in that situtation - to something that on the face of it is very positive: _"All my tests pass!"_ But this is heartening to hear for many reasons - not least because it just could provide us an opportunity to model _refactoring_ code. [Here's more with Uncle Bob on the various elicitations of red-green-refactor](https://blog.cleancoder.com/uncle-bob/2014/12/17/TheCyclesOfTDD.html) but it's the essence of that phrase that matters - when you've got your tests green, let's see what can be done to improve things.

In the example I'm going to show you, the specification was to create a function that took a number of pennies, and return an object representing the denominations and amount of the fewest number of coins needed to equal that number.

Alongside a selection of comprehensive, well-organised tests, this is what the student created:

```js
const changeCalculator = num => {
  const change = {};
  const changePusher = coin => {
    change.hasOwnProperty(coin) ? change[coin]++ : (change[coin] = 1);
    num -= coin;
  };
  const coins = [50, 20, 10, 5, 2, 1];
  for (let coinInd = 0; coinInd < coins.length; coinInd++) {
    while (num - coins[coinInd] >= 0) {
      changePusher(coins[coinInd]);
    }
  }
  return change;
};
```

This was one of the _"All my tests pass"_ situations, but you'll notice a lack of euphoric exclamation mark - he knew that improvements could be made. There's a bit more functionality to add - it only handles up to a denomination of '50', and nothing to specify the currency. But at this time, we were more interested in writing _better_ code, not _more_ code.

Well, as polar bear cubs play with each other in infancy so that they can maul seals to death to adulthood, we work on katas to practise skills that we will employ in larger systems. Clarity and maintainability are easy to ignore in the search for functionality - but that would fulfil our _red-green_ obligations... but no _-refactor_.

### Logical choices

First let's look at the logic. We're effectively starting with two pieces of information - a `num` representing the number of pennies, which is passed in as an argument, and a 'reference array' of the coin denominations, which is defined within the function. That's fine for the kata, but 'in real life', it would make more sense for the denominations to be passed in, as the function is limited to use these coins and any other function that used this information would have to define it too.

Two other small things before moving on: first, some naming. Let's call the functions `calculateChange` and `tallyChange` - prefer verbs for functions, and we're not 'pushing'. And we'll rename `num` to `pennies`, to be more specific.

Second, there's nothing wrong with `.hasOwnProperty` here - if anything, it's more semantically expressive of what we are checking here than the 'neater' version I'm about to suggest. But in the context of a function with a clear agenda - the values it adds to the object will always be numbers greater than or equal to 1 - I think we are ok using a 'truthy' as the condition. Let's see the changes so far.

```js
const calculateChange = (pennies, coins) => {
  const change = {};
  const tallyChange = coin => {
    change[coin] ? change[coin]++ : (change[coin] = 1);
    pennies -= coin;
  };
  for (let coinInd = 0; coinInd < coins.length; coinInd++) {
    while (pennies - coins[coinInd] >= 0) {
      tallyChange(coins[coinInd]);
    }
  }
  return change;
};
```

That's cleared up some clutter, and brought some other issues in to relief. I would have renamed `coinInd` to `i`, because that's an accepted standard for iterating with a for loop, but why use a for loop here? We're iterating through an array, and using this information to build an object. If that's not a job for `.reduce`, I don't know what is. I've extolled the less obvious virtues of reduce in [this blog post](https://www.jrcode.co.uk/blog/2018-09-09-reduce-five-unusual-uses/) but here's relatively simple tally case, albeit with a couple of kinks we'll explore later. How would this look like with `.reduce` taking over the iterative logic?

```js
const calculateChange = (pennies, coins) => {
  const tallyChange = (coin, change) => {
    change[coin] ? change[coin]++ : (change[coin] = 1);
    pennies -= coin;
  };

  return coins.reduce((change, coin) => {
    while (pennies - coin >= 0) {
      tallyChange(coin, change);
    }
    return change;
  }, {});
};
```

It's neater without the for loop detritus, but there's some serious functional programming issues at play now. I'll reiterate - tests are still passing, but that's not the point. We want to make _better code_. My main problem is with `pennies`. Both my `reduce` callback function and `tallyChange` reach outside of their scope; the first to read the value of `pennies`, the second to write it. Let's simplify things, and bring everything within the `reduce`.

Yep, everything - nobody said that pennies couldn't be part of the `reduce`. If it's incorporated within the initial value of the 'accumulator', then it remains within the remit of the reduce function, and we avoid our `reduce` committing any side effect atrocities - reaching outside of the function unnecessarily. We can then discard it at the end.

Whilst we're dealing with side effects, let's re-evaluate the ternary too. Making re-assignments inside a ternary makes it like an 'if-else statement' - one of the benefits of ternaries is that they return values. I think we can make it mildly more semantic with the following though.

```js
const calculateChange = (pennies, coins) => {
  const { change } = coins.reduce(
    ({ pennies, change }, coin) => {
      while (pennies - coin >= 0) {
        change[coin] = (change[coin] || 0) + 1;
        pennies -= coin;
      }
      return { pennies, change };
    },
    { pennies, change: {} }
  );

  return change;
};
```

At this stage, I'm close to happy. This is decent functional programming. But it wouldn't hurt to pull out the function we passed into the reduce again. But this time, let's make it a function in its own terms - no point sticking it inside the parent function. More modular -> more reusable.

```js
const tallyAndDeduct = ({ amount, tally }, value) => {
  while (amount - value >= 0) {
    change[value] = (change[value] || 0) + 1;
    amount -= value;
  }
  return { amount, change };
};

const calculateChange = (pennies, coins) => {
  const { tally: change } = coins.reduce(tallyAndDeduct, {
    amount: pennies,
    tally: {}
  });

  return change;
};
```

I'm tempted to do something about the while statement - some simple Maths might elicit the data we need, without requiring repeating lines of code. But this is a good place to leave it. I don't claim that this is the best solution, but it does meet our intentions - to refactor our code, considering what might be best practise should this, or something similar, be brought into a larger project. If you've got other ideas, [please send a message!](https://www.jrcode.co.uk/contact).
