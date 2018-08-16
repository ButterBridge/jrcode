---
templateKey: 'blog-post'
title: 'Pts.js and Gatsby - a Tale of Two ECMAScripts'
date: '2018-08-16T16:55:10.000Z'
description: >-
  Hard won battles on the transpilation front
caption: The original inspiration...
tags:
  - pts.js
  - gatsby
  - babel
  - transpilation
  - webpack
  - github
  - problem-solving
  - this-site
  - CDNs
---

After a few days holiday I was delighted to today settle something that had reared its ugly putrificent head mere hours before my departure. So annoying was it that I made a last minute decision not to take my laptop on holiday because I would have found it difficult not to spend my time trying out different fixes, instead of doing this things I was supposed to be doing (read 'relaxing' and 'parenting').

## Develop v Production

At Northcoders we cover 'environments' near the start of the course - the idea of creating a 'test' environment, which may use a different database to your 'development' environment, which may use a different dependency profile to your 'production' environment, and so on. Personally I've not had to deal a great deal with another main issue of your code running in a different place when you're developing and when in production: that it's written in a language - or at least a version of a language - that the production environment (in this case the browser) just plain doesn't know. I've only had to deal with this to the extent of a version of node on AWS not knowing `Object.values`, for example.

That one's an easy workaround. Not being able to compile an entire library because it's written in ES6 is a new one for me. Not having easy access to the Babel and Webpack config because Gatsby keeps them serenely locked away in its inner asylum somewhere is also a little kink in the ointment, if you'll pardon the expression.

## The Pt of it All

It would have been easy to write off what I was trying to do. It's the interactive pattern you can probably still see on the left hand side (I doubt I'll ditch it in a hurry, hard won gain that it was). Fun, but entirely superficial. But that would definitely have gone agains the point of me making this website - to run up against brick walls and slowly chisel them away.

This particular brick wall was formulated on one of those occasions a workmate sent round a link to something cool. The normal sequence of events in these occasions is to think *that looks interesting, I'll play around with that later* and promptly forget about it. Not this time! The link in question was to [Pts.js](https://ptsjs.org/), and having a few minutes I looked at the source code for some of the examples. I was pleasantly surprised to see that I could vaguely decipher it, at least to the extent that I could repurpose the code for my own aesthetic. Not knowing much advanced geometry and generally having a design brain, it was exciting to find *something* that I thought I could make **something** out of.

It was relatively easy to get something going in localhost. I rewrote one of their html demos in React, integrated it with my own colours and style, messed around with some CSS grid and in a few hours I had something that actually resembled what I'd been imagining in my head at the start.

## Deployment Exercise

I pushed up to Github master and triggered the automatic deployment on Netlify, and, pleased with myself I moved on to sorting some other stuff out. It was at the end of the day I looked at the site and found that I was seeing the morning's version. For the first time, I sought out the 'deploys' tab on the Netlify site admin to discover a taunting red 'FAILED' on my last few deploy build attempts.

This was a bit of a kick in the teeth, seeing how easy Gatsby has been to use up to now. The error itself was extremely specific - something to do with a missing constructor on a certain line. But the problem was much more general - the entire library I was using was written in ES6 JavaScript. Gatsby couldn't handle such a node module in its build process.

My initial research suggested that the easiest solution would also be the one I was never going to take up - wait for Gatsby v2 and its updated Uglify transpilation system (read more about this on [this issue thread](https://github.com/gatsbyjs/gatsby/issues/3780)). I won't document every step I attempted in accurate detail, mostly because I don't remember exactly and don't want to mislead, but here's a few things I tried (most of them requiring me to discover that they were even an option before I tried them):

* exposing the `.babelrc` file in the root directory and trying a range of different plugins and presets
* accessing the `exports.modifyWebpackConfig` hook in gatsby-node.js and trying out some different babel configurations in there
* bringing the entire library into the code itself and attempting to transpile / rewrite sections to be compliant with whatever Babel config I had going at the time

These produced variously useless results ranging from failure to render the component in question to failure to even finish the development build. There was a lot of making no progress and trying an entirely different tack, before thinking of a variation on what you'd been doing a couple of hours ago, and reverting to that setup. Frustrating stuff.

## Doors in Concrete Walls

Then I did something which shall henceforth recommend to all my students - get in contact with the writer of the library on Github. The saviour in question is [William Ngan](https://github.com/williamngan), and whilst it was not his expertise in React or Gatsby (which he did not know at all) that was useful, it was being able to take me a step back into what eventually became the solution that was basically staring me in the face the whole time - import the code via [this CDN](https://unpkg.com/pts@0.5.2/dist/pts.min.js) so I wasn't responsible for building it in the first place. Outside the box, but only because I was so unnecessarily constraining the dimensions of the box in the first place.

It took a few more miniature voyages of discovery to make it work - including an _extremely_ speculative addition to the aforementioned `modifyWebpackConfig` function to prevent a conflict in the ReactDOM that I couldn't quite believe solved the problem. But they were all useful ventures into the inner workings of Gatsby and Netlify, which, of course, was my aim in the first place.

The CDN is probably not the optimal solution in terms of loading efficiency but boy does it make sense in this time and place. I was so fixated on using the tools of Gatsby and React - imports, configs, transpiles, bundles - that I didn't take a step back to what was essentially page one of the docs. So the adage of flogging dead horses seems a little relevant here - when your brick wall turns out to be concrete and your chisel turns out to be a toothbrush, retreat, and discover that there was a door there the whole time.