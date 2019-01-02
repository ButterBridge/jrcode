---
templateKey: 'blog-post'
title: 'Should I Test With Cypress?'
date: '2018-11-04T16:55:10.000Z'
description: >-
  Probably.
caption: 'At peace.'
canonical: ''
tags:
  - testing
  - cypress
  - TDD
  - front-end
---

Once again, apologies with the low output. Various things are in the works that I hope to reveal in the new year, but for now take this as a modest advent offering.

### Front End Testing

As proponents of test-driven development (TDD) at Northcoders, it feels easy, healthy and natural using this approach to test and develop utility functions and APIs. Starting to test with the simplest application of a function is nevertheless generally useful as it remains as a document of your code's ability, even when you cede control of it to others / your future, clueless self.

Does the same stand for the simplest application of your front end? Does a front end even have a simplest application? Well, yes, obviously - visiting the site, and it working. That could be something worth testing. Then there's all the data - wherever it comes from, does it return in such a way that the front end expects it? And there are all the ways you can interact with the site - filling in forms, requesting new data, user settings... It's usually pretty vital that you can expect these to work in whatever situation, so they are surely prime candidates for testing too.

But the process is not always as clear cut. Let's assume the position that when you create a test, you want it to be enduring. That is to say, an early test of a fundamental aspect of your application is still useful down the line when you start applying the bells and whistles. But then, what do you test? Data being received when a GET request is made - that's the responsibility of the browser, and presumably that's already tested. That the data is rendered on the screen - ok, but in what form? What should be tested - the html? The text content? But a lot of this is subject to a change of approach or opinion. The decisions to change from pagination to lazy loading, from explicit to automatic login, to add filtering and sorting to your queries, to adopt a more semantically appropriate or accessible html tag - all of these can change how processes are instigated _and_ the final result, which makes testing very brittle indeed, and can consume a large amount of time if you keep adapting on the fly.

### Approaches with Caution

**Create React App** comes with Jest [neatly integrated](https://facebook.github.io/create-react-app/docs/running-tests) and a little smoke test file for your application ('does not render without crashing' - doesn't come more fundamental than that). There are several ways to approach and prioritise testing within this framework and I won't aim to improve on the guidelines explored in [this Medium article](https://medium.freecodecamp.org/components-testing-in-react-what-and-how-to-test-with-jest-and-enzyme-7c1cace99de5) but I will emphasise one of its key messages - it's pointless and fruitless to aim for 100% coverage. Rationalise what will give you the most benefit for the least effort (and use this approach to modularise your code accordingly) - and key behaviours like financial transactions and personal data should obviously take precedence too.

In any of these cases though, you may be best advised to be implementing your code first and feel somewhat settled on a direction before you start testing, for the reasons outlined above. This is decidedly not TDD, so if you're wanting that approach, then you might want to consider [Cypress](https://www.cypress.io/). If you're sold already, you can stop reading the article here. The docs I've just linked to are gorgeous - the epitome of good reference. Well organised, useful examples, even hints on what not to do - it's a beginner developer's dream.

As for the API itself, I have reached nowhere near its limits but it's assuredly decidedly powerful. Most beautifully, it lends itself to TDD, because it allows you to create a 'process' (think: _function_) and draw expectations at the end of that (think: _return values_ - except not really return values, but your application state). Here's an example, that presumes you've got Cypress up and running according to [these instructions](https://docs.cypress.io/guides/getting-started/installing-cypress.html#System-requirements). If you've used mocha (JavaScript test runner) and/or chai (JavaScript assertion library) before then it may look familiar.

```js
describe('monster counter', () => {
  it('shows number of monsters left to destroy', () => {
    cy.visit('http://localhost:3000');
    cy.get('#medium-difficulty').click();
    cy.get('#monster-counter').contains('3 monsters remaining!');
    cy.get('.monster')
      .first()
      .click();
    cy.get('p').contains('2 monsters remaining');
  });
});
```

I really like this, because it tells the story of the user experience, and through its description, designs a way in which the application is expected to be used. Here's the story-teller version: I visit localhost, find (using selection strings akin to `document.querySelectorAll`) the element id'd `medium-difficulty` and click that, then make my first expectation - that within the monster counter element is the text '3 monsters remaining'. The next chapter: I find one of those monster classes, click it, then I expect that text to have noted my hard-won victory over the evil Exampli beasts.

### The solution to all your problems?

Those of you familiar with Cypress (or those of you who have discovered it and already become infatuated with the docs and read them start to finish) will know it advertises itself as effectively all the tools you need to conduct end-to-end testing. This is not atomic, focused unit-testing purity, by any stretch. So we don't test the implementation of any of these state changes (how did it come to be that choosing medium difficulty resulted in 3 monsters appearing?), but that's ok from a TDD point of view in my opinion, because we rarely demand testing of how things happen in unit testing either. That said, if there was any logic dependent on more variables than a linear reference between the number of monsters and the difficulty of the game, should I write a unit test for the function that determines that? Certainly - it's critical behaviour, and it would be far more efficient than writing end-to-end Cypress tests that covered every eventuality.

But it does offer an alternative structure for testing alongside development - I think it allows you to start developing without having all your unit tests in place, and let you discover which ones would be useful to implement as you go. It is not, and does not aim to be a panacea, but it is an excellent developer experience which holds your hand as long as you need it to, so give it a go!

