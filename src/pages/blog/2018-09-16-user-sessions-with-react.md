---
templateKey: 'blog-post'
title: 'User Sessions With React'
date: '2018-09-16T16:55:10.000Z'
description: >-
  Render props in React make authorising your application easy
caption: They remember each other, like old friends.
tags:
  - react
  - composition
  - firebase
  - authentication
  - user-accounts
  - local-storage
  - moment
---

In this little tutorial I'll share how I handle user sessions - or, a browser remembering that it was _you_ looking at those videos of cats or children falling over or most likely, cats falling over. We'll use firebase as the validating backend as it's easy to get up and running. Getting Firebase set up in the first place is documented [here](https://firebase.google.com/docs/web/setup) and working with their authentication API is summed up in a page which I imagine Medium would helpfully sum up as a 'two-minute read' [here](https://firebase.google.com/docs/auth/web/start).

### Flexible / secure

So let's assume you've got a sign in page hooked up to Firebase's authentication. The user logs in and everything is dandy - he or she can browse your site about which dictator from history their Twitter history says they are most like to his or her heart's content. But they close the browser in shame and shock on discovering that it's Tony Blair, before deciding to fetch a friend to take the survey, only to discover that they have to sign in again, even though it has only been five minutes.

This is where the idea of a session token comes in. Essentially, the application will check the browser to see if it recognises the user from a previous session, then validates on its database whether the session has elapsed or not.

Firebase authentication actually has a facility built in to handle this, but you're limited to tokens that last exactly one hour. This is a secure alternative that gives you more flexibility over the non-sensitive aspects of authentication data.

### Compose a solution

First, let's look at how to set up your application. There's multiple ways to do this, but I like this [render props pattern](https://reactjs.org/docs/render-props.html). You could use composition or just plain old conditional rendering, but this way you get an overview on the top level of your application of all the potential next level views (the homepage or the sign in page) as well as creating a potentially extensible `Auth` component you could use at different levels of your application.

```js
import React, { Component } from 'react';
import SignIn from './SignIn';
import RestOfMyApplication from './RestOfMyApplication';
import LoadingScreen from './LoadingScreen';

class App extends Component {
  state = {
    currentUser: null,
  }

  changeCurrentUser = (user = null) => {
    this.setState({
      currentUser: user,
    });
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Auth 
        currentUser={currentUser}
        render={(isCheckingUserStatus, errorMessage) => (
          isCheckingUserStatus
            ? <LoadingScreen />
            : errorMessage
              ? <RestOfMyApplication currentUser={currentUser} /> 
              : <SignIn 
                errorMessage={errorMessage}
                changeCurrentUser={this.changeCurrentUser} 
              />
        )}
      />
    );
  }
}

export default App;
```

(Before moving on, if you're put off by the nested ternary, I subscribe to [Eric Elliot's defense](https://medium.com/javascript-scene/nested-ternaries-are-great-361bddd0f340) of them - have a read before unleashing the volley. Seems to me that when it comes to readability, good variable naming far outweighs the structure of the expression.)

What's going on here then? Well, our top level `App` component is responsible for rendering an `Auth` component. However, instead of conditionally rendering either `SignIn` or `RestOfMyApplication` inside `Auth`, we pass Auth a callback function (a 'render prop') for it to call based on the state of `currentUser`. This will massively neaten up our Auth render function. (This works because of [JavaScript closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures), by the way.)

So whatever is happening in Auth, it must be calling this render prop with two variables - `isCheckingUserStatus` and any `errorMessage` - which hopefully need no further explanation. Let's see how they are arrived at in `Auth`.

```js
import React, { Component } from 'react';
import moment from 'moment';
import db from '../firebase/database'; //initialised elsewhere

class Auth extends Component {
  state = {
    finishedChecking: false,
    errorMessage: null
  }

  // Extract this helper function as it's used multiple times.
  finishChecking = ({message = null}) => {
    this.setState({
      finishedChecking: true,
      errorMessage: message,
    })
  }

  // This uses moment to check whether an arbitrary amount has passed since the timestamp was posted.
  getIsSessionNotExpired = time => moment(timestamp).isAfter(moment().subtract(1, 'hour'));

  // A little util to format the data as it comes back from Firebase.
  incorporateId = res => ({
    ...res.data(),
    id: res.id,
  });

  // A generic API function to find a document from a collection via its id. Note that this method and the two above have little to do with React and could and should be held elsewhere so as to be reusable.
  getWithIdFromDb = (collection, id) => db.collection(collection).doc(id).get().catch(() => `fetching doc from ${collection} failed`);

  componentDidMount = () => {
    const { currentUser, changeCurrentUser } = this.props;

    // If we are passing in a user (not null), all is good! Let the component know we've finished checking, and the rest of the application will be rendered.
    if (currentUser) return this.finishChecking();

    // Else let's look for a session token in local storage.
    const sessionToken = localStorage.getItem('sessionToken');

    // No session token? We're done. Send a message back for reference, and SignIn will be rendered
    if (!sessionToken) {
      return this.finishChecking('no session stored!');
    } else {

      // Connect with db using the session token
      this.getWithIdFromDb('sessions', sessionToken);
        .then(res => {

          // Convert the firebase document into an object using the helper method above
          const session = this.incorporateId(res);

          // Check if the session is expired using the helper method abover
          if (this.getIsSessionNotExpired(session.timestamp)) {

            // If it's ok, fetch the user from the database, otherwise throw to catch with a session expired message
            return this.getWithIdFromDb('users', session.userId);
          } else throw 'session expired!';
        })
        .then(res => {

          // Format the user and store it in App's state using the prop method. When App re-renders, it will render Auth with a current user object prop, which will allow it to render the rest of the application.
          const user = this.incorporateId(res);
          changeCurrentUser(user);
        })
        .catch(message => {

          // If the db fails or the process otherwise throws, finish checking to trigger the sign in page.
          this.finishChecking(message);
        })
    }
  }

  render() {
    const { render, currentUser } = this.props;
    const { finishedChecking, errorMessage } = this.state;
    return render(finishedChecking || currentUser, errorMessage);

    // That was pleasant, huh?
  }
}

export default Auth;
```

There is of course one missing piece to complete this labyrinth - how did that session token get into local storage in the first place? Simple enough - when a user logs in, and perhaps when they create an account, generate a session token and store it both in the database and in local storage. Something like this, held in the `SignIn` component:

```js
import auth from '../firebase/auth';

handleLoginSubmit = () => {
  const { loginEmail, loginPassword } = this.state;
  const { changeCurrentUser } = this.props;
  auth.signInWithEmailAndPassword(loginEmail, loginPassword)
    .then(() => dbApi.getUserByEmail(loginEmail))
    .then((loggedInUser) => {
      changeCurrentUser(loggedInUser);
      return db.collection('sessions').add({
        userId: loggedInUser.id,
        timestamp: moment().format(),
      });
    })
    .then(({ id }) => {
      localStorage.setItem('sessionId', id);
    })
    .catch(/* handle errors */)
}
```

So, sign in via Firebase's Authentication API. If successful, grab the user data we hold from the database and put that user in state (we know from earlier that this will allow the App to render the rest of the application). But don't quit there - create a session token with reference to the user and the current time (use `moment().format()` because you can't send in whole moment object) and grab the automatically generated id to use as a token in local storage.

There you have it - a bit of a puzzle, but essentially a neat and secure way of controlling how long a user has access to those artistic videos... of cats falling over.