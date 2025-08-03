# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 6 - Making Interface Adjustments for Authenticated Users

At this point, we are using Firebase Auth to create an account and login. But right now, loggin in takes us to the articles page. Our React app does not even let us log out yet.

Let's update the interface, such as the page navigation bar that provides the ability to login or logout, and maybe even show the email address of the user to help visually confirm a user in logged in.

So lets up up the NavBar component and add a new link with a button to login. We will need to change the text & behavior of this button based on whether the user is logged in or not. For now we'll create a simply variable to test this out, later we will create a custom React hook to handle this.
- import `useNavigate` so we can navigate to the login page
- import `getAuth` & `signOut` from 'firebase/auth'
- for now, hardcode some variables `isLoggedIn` & `email`
- create a variable `navigate` to hold the results of calling `useNavigate()`
- modify the navigation bar to conditionally display the email if the user is logged in
- modify the navigation bar to conditionally display Sign In & Sign Out buttons. The Sign In button click will navigate to the `/signin` route, the Sign Out button will use Firebases' `signOut` function.

front-end/src/NavBar.jsx
<pre><code>import { Link, useNavigate } from 'react-router-dom';
import { getAuth, signOut } from 'firebase/auth';

export default function NavBar() {
  const isLoggedIn = true;
  const email =  'foo@example.com';

  const navigate = useNavigate();

  return (
    ...

    {isLoggedIn && (
      &lt;li style={{color: 'white'}}>
        Logged in as {email}
      &lt;/li>
    )}
    &lt;li>{ isLoggedIn
      ? (&lt;button onClick={() => signOut(getAuth())}>Sign Out&lt;/button>)
      : (&lt;button onClick={() => navigate('/signin')}>Sign In&lt;/button>)
    }
    &lt;/li>

...
</code></pre>


Let's open this in a browser. You should see the user email address and a "Log Out" button. Do NOT click the Log Out button. Instead, go back to your code and change the variable "isLoggedIn" to false, and comment out the "email" variable. Then, go back to your browser and it should display a "Log In" button but not the "Log Out" button. Click on the "Log In" button and it should take you to the Login Page.

This effectively updates the interface to the main navigation to login and logout, as well as see who is logged in. But right now we are using hard coded values for "isLoggedIn" and "email". This will be fixed soon.
