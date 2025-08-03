# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 7 - Creating a Custom Auth Hook

In the last lesson we updated our interface to provide reactive sign/in out buttons. But we used static content for the email address and to determine if the user was signed in or out.

To fix this, we can create a custom solution (a custom hook) to plug into any page to determine if the user is logged in a gain access to details such as the user's email address.

Creating a custom Hook is pretty straight forward in React.
React Hook names start with "use", by convention.<br> 
The goal is to create a custom hook to determine if a user is logged in and who is the user. This way we can import the Hook and use it in a page,like the Article page, to determine if a user is allowed to comment on an article. For example, we want to be able to use it like `const {user} useUser()`.

Create a new file "front-end/src/useUser.js", which is a plain JavaScript file.<br> 
ATTENTION: Hook names must start with "use". It is React convention.
- Import `useState` and `useEffect` hooks from 'react'
- Import `getAuth` and `onAuthStateChanged` from 'firebase/auth'
- use state to determine if Firebase is currently loading the user's authenticated state. Let's call this "isLoading" and initialize it's value as true. It starts off as true because it takes a little time to connect with Firebase.
- use state to hold the user data we are getting from Firebase. We will call this "user". The initial value will be null.
- `useEffect` will be used to subscribe to the Firebase state with help of `onAuthStateChanged`. The useEffect() function does not return a value, it accepts a callback and a dependency array. The dependency array with be empty in this hook to make it run once. Within the useEffect function we will call the Firebase onAuthStateChanged function, passing getAuth() as the first argument. The second argument is the callback, which will be called whenever the user first signs in or the auth state changes. The callback will take a "user". The return value for this function will be null or an object with the user's auth state data.
- return the state values in an object, from the custom hook function
- export the useUser function

The onAuthStateChanged() function creates a subscription, but can cause a memory leak, if we don't provide a was to unsubscribe. To do this, pass the return value from onAuthStateChanged to a variable. Then provide this a return value to useEffect.

Also make sure to provide an empty dependency array, which tells React to run this once, and only once, when the app first loads.<br>
NOTE: In a development environment, strict mode will run twice, which can be tracked down a tag in main.jsx:  `<StrictMode>`.

front-end/src/useUser.js
<pre><code>import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const useUser = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(()=>{
    const unsubscribe = onAuthStateChanged(getAuth(), function(user){
    setUser(user);
    setIsLoading(false);
    });

    return unsubscribe;
  },[])

  return { isLoading, user };
}

export default useUser;
</code></pre>


So to use our custom hook, let's replace the hard coded "email" and "isLogged" in variables. Then, import the hook and use this instead.

front-end/src/NavBar.jsx
<pre><code>...
import useUser from './useUser.js';

...

export default function NavBar() {
  const { isLoading, user } = useUser();
}
</code></pre>

The tricky part is we need to update the interface a little while the content is loading (requesting auth data from Firebase). 
- wrap the new Navbar list items in a conditional, displaying "Loading..." while Firebase is authenticating, using the "isLoading" variable
- replace the two hard coded "isLoggedIn" references with the "user" variable. If the user exists, the user is logged in.
- replace the hard coded "email" with "user.email"

front-end/src/NavBar.jsx
<pre><code>...
import useUser from './useUser.js';

...

export default function NavBar() {
  const { isLoading, user } = useUser();

  ...
  return (
    ...
    {isLoading ? &lt;li>Loading...&lt;/li> : (
      &lt;>
        {user && (
        &lt;li style={{color: 'white'}}>
          Logged in as {user.email}
        &lt;/li>
        )}
        &lt;li>{ user
          ? (&lt;button onClick={() => signOut(getAuth())}>Sign Out&lt;/button>)
          : (&lt;button onClick={() => navigate('/signin')}>Sign In&lt;/button>)
        }
        &lt;/li>
      &lt;/>  
    )}

...
</code></pre>

Go ahead a view your page in a browser. You should see the email is still displayed, showing you are logged in. We now have coded a way to log out, so go ahead and press the "Sign Out" button. Then click the "Sign In" button, which should take you to the Log In page where you can enter the email & password you used to create your account to log back in. If everything worked correctly you should be logged back in and your email should be displayed in the navigation bar, next to a "Sign Out" button. You should be on the articles page.


The next task will to update the React app to make sure only logged in users can upvote and submit comments.
