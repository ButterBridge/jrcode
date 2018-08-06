---
templateKey: 'blog-post'
title: 'The Gatsby Book of Genesis Part I'
date: 2018-08-06T16:55:10.000Z
description: >-
  How I learned to stop worrying about working from a starter kit and start working from a starter kit.
tags:
  - gatsby
  - refactoring
  - this-site
  - netlify
  - CMS
  - styling
  - styled-components
  - bulma
---

It seems like developers often dream of starting to write blogs because over the course of a week they encounter so many interesting little idiosyncrasies that they want to share with the world. But perhaps there is a big dropout rate because they encounter the same thing as me: actually composing the website in the first place is so consuming that when it comes to writing actual legible sentences for normal people to read, either your ideas, inclination, or ability to write said legible sentences dries up.

So the solution for me was to turn this conversion process into my first blog post. Here I'll let you know where I'm up to right now - but chances are you won't see what I'm describing because I'm not putting anything online until it's looking halfway reasonable.

## What am I starting with?

The short answer is [this github repo](https://github.com/AustinGreen/gatsby-starter-netlify-cms).

My co-worker Ant came across it as we were discussing the possibilities of server-side rendering (a bit advanced for Northcoders, so wasn't something we had much exposure to) and static-site generators like Gatsby. We've both been conscripted by friends and family to construct and maintain websites in the past, and never having got on board with WordPress, the idea of a React-rendered content messaging service is really exciting. It uses Github as a 'single source of truth' no matter if you're posting from the Netlify CMS or authoring on VSCode as I'm doing right now (no internet connection on the train...)

It's built as a hybrid blog / e-commerce site so the first thing I did was ditch the product page (might bring it back one day when I'm in the merch game) which was a good way of reccying the repo and getting to know how all the dots joined - and there are lots: the pages, the templates, the registration to the CMS, the yaml page outlines, the markdown posts, the GraphQL queries. It wasn't a cinch getting my bearings.

## A good reason to start with styling

When we teach front end with React at Northcoders, we teach that styling should come last. The reasons are obvious - you don't know exactly what your data is going to look like or how each component might turn out, and every decision you make early on is almost certainly going to be overtaken by events. It's a waste of time, basically.

But how about if you're gutting a pre-made site to be reformed in your own mind's image? This seems to be a good case for starting with the CSS to me. The original repo inherted all its styles from [Bulma](https://bulma.io/). I've used Bulma a few times - it's great: unobtrusive, elegant, largely declarative. But I won't learn anything using Bulma. So off it goes. I've nicked the source code for the Navbar, because I can't be bothered restructuring at the moment, but the import has gone.

In its place I'm trying out [styled components](https://www.styled-components.com/). I've brushed with these in the past and I love how they abstract all the CSS away into something that's familiar but adaptable in a way that I understand not having had much in the way of experience with CSS pre-processors like SASS. They also have the same template function syntax as GraphQL This seems like opportunity for exploring what they can do.

But not right now - for now it's purely functional. This is the CSS for my Container component:

```js
export const Container = styled.div`
    border: 1px solid green;
    margin: 1px;
```

Just enough to tease me so I feel rewarded when I finally get to spend some time on it.

## Up next?

I want to take a look at the [gatsby-image plugin](https://www.gatsbyjs.org/packages/gatsby-image/) which everyone I know who has experience with gatsby raves about. When I have an adaptable blog template, I'll get round to making it look good...