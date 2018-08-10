---
templateKey: 'blog-post'
title: 'Gatsby and the Hybrids'
date: '2018-08-07T21:24:10.000Z'
description: >-
  Gatsby, the mad scientist, creates a hybridised component - because he can.
caption: Hot stuff
tags:
  - gatsby
  - react
  - SSR
  - static-sites
  - this-site
---

I've made some progress with structuring the website, but will save that for another blog post. In the meanwhile I'm going to take a moment to discuss hybrid components in Gatsby.

## I miss React state

React and the way it managed browser state was a revelation to me. The idea of keeping the essence of your application in one place with some hard and fast rules about how to change it (no mutants allowed) makes such wonderful sense. I started off making these complex, intricate, but admittedly bloated states, and later taught myself to pare them down to something elegant and essential. State as a driver of the rendering of your application is a beautiful thing.

React's state gives you access to hyper-market: endless ingredients and endless possibilities and you will try everything in the store. Gatsby is more like an artisan delicatessen: there's a set of beautiful dishes that you can craft nicely on a plate, but you're not going to be cooking anything. There's a sense that when there's something nice on the page, *you didn't really do it*.

It's not really a criticism, just as I wouldn't criticise a party host for not making their own canapés. But sometimes you want a little flourish of your own doing, not just submit to a beautiful [typography](https://kyleamathews.github.io/typography.js/) theme.

## Hybrid cookery

Thankfully, for the sake of this metaphor, the deli near mine serves some great raw ingredients too - and so we reach the concept of a hybrid component. I stumbled on [this page on the Gatsby guides](https://www.gatsbyjs.org/docs/building-apps-with-gatsby/) - specifically the second subheading - and realised that just because Gatsby was principally server-side rendered, that didn't mean I couldn't have my React playtime too. Sure, you sacrifice a *tiny* amount of loading speed as that portion of your app isn't pre-rendered, but if you are clever about your componentisation, it's nothing. And that Gatsby handles this code-splitting for you, well...

So I've ben messing around with some random colour and font generation on user activity in the top left corner. Whether it'll still be there when I publish the website, I'm not sure, but I image there will be something to engage a user a bit beyond what I can do with CSS pseudo-selectors.

## Other mad scientists

People [ask online](https://github.com/gatsbyjs/gatsby/issues/2258) about what is suitable to make with Gatsby, and it seems the limitations come only when you attempt to break the [react-router](https://reacttraining.com/react-router/web/example/basic) powered page model. So for 'freeform' apps, not so great - go with create-react-app to get going quickly. But for anything a bit more classically engineered, Gatsby's your man. I do wonder if this is part of the appeal of Gatsby - playing on a sort of nostalgia for those four / five page personal websites everybody built in the late 90s.

But what is actually made with Gatsby are not such pointless exercises in narcissism. No less than the [react documentation](https://reactjs.org/) is written with Gatsby. And lots of blogs. Of which probably some are pointless exercises in narcissism. It hasn't exactly taken over the internet - after all, Gatsby is one of [literally hundreds](https://www.staticgen.com/) of static site generators, and being based in React is going to limit its application to some degree - even though they are backing the right horse, for sure. But being 'blazing fast' whilst maintaining that flexibiltiy through code splitting and freeing up that beautiful React state machine, surely gives it an edge.