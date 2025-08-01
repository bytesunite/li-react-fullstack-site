# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 3 - Adding Firebase Auth to React

If everything worked as expected, you should now have a new Firebase project and you are looking at your main interface for your new project.

The next step will be to connect Firebase to our React application. This will take a few steps, and we will learn how to intergrate this with the backend in a later lesson.

First, look for the button the looks like a React fragment closing tag `</>`. If you hover of this is should show "Web". What this does is allow us to add an "app". A single Firebase project can support multiple apps. For example, think about if you had an iPhone app, and Android app, and a web app. You could have a single Firebase auth project that serves all three of those.

1. Click on the `</>` icon
2. Give your app a name such as "React Web App". Do NOT check the box to setup Firebase hosting because this course uses another solution.
3. Click "Register App". <br>
It might think for a bit before it spits out instructions on how to add the Firebase SDK, as well as generate a bunch of code to use.

Now what we'll do is make sure the "npm" option is selected. It should show us the command to install the "firebase" package. Click to the right of "npm install firebase" to copy the command.<br>
Then back in your editor such as VSCode, go to the console and stop the webserver if it is running. Make sure you are in the "front-end" folder and past the command and press enter to execute the "npm install firebase" command.

Next, go back to your Firebase project and copy the code that shows how to import firebase, create a "firebaseConfig" object, etc.<br>
Basically this is just a block of code that will be run when our React application is loaded in the browser that will connect it to Firebase auth and enable us to do things like figure out whether or not a user is authenticated.

With the copied code from Firebase, go into the "front-end" directory and inside the "src" folder find the "main.jsx" file. You will paste the code just above the `createRoot().render()` that renders your App component.

front-end/src/main.jsx (snippet)
<pre><code>...

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  ...
}

const app = initializeApp(firebaseConfig);

createRoot(document.getElementById('root')).render({
  &lt;StrictMode>
    <App>
  &lt;/StrictMode>
});
</code></pre>


Thats all we need for now. But we need to start creating some HTML forms to sign in and create a new account in our React app.

Create a couple new component in the "front-end/src/pages" directory
- LoginPage.jsx
- CreateAccountPage.jsx

To start just create a basic page like we did with other pages at the start of the course.

front-end/src/pages/CreateAccountPage.jsx
<pre><code>export default function CreateAccountPage() {
  return (
    &lt;h1>Create Account&lt;/h1>
  );
}
</code></pre>

front-end/src/pages/LoginPage.jsx
<pre><code>export default function LoginPage() {
  return (
    &lt;h1>Log In&lt;/h1>
  );
}
</code></pre>

Before we get into creating the forms, lets make sure we update the routes to display these pages. Go to "front-end/src/App.jsx" and update the routes children array.

front-end/src/App.jsx (snippet)
<pre><code>
...
import CreateAccountPage from './pages/CreateAccountPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
...
const routes = [{
  ...
  children: [{
    ...
  }, {
    path: '/login',
    element: &lt;LoginPage />
  }, {
    path: '/create-account',
    element: &lt;CreateAccountPage />
  }]
}];
...
</code></pre>


With those changes, lets test this to see the new components we created. Start up mongodb, the backend server, and frontend server and open the browser to test it.
You should be able to go the the new routes
- http://localhost:5173/create-account
- http://localhost:5173/login

If all went well you should see the heading for both pages when you type in the urls. Right now we don't have any links to these pages so you'll have to type the url out.

