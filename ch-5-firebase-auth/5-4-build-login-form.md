# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 4 - Build a Login Form

The next task is to build the LoginPage component in our React front-end.

Open up 'front-end/src/pages/LoginPage.jsx' and start by importing the following.
- **useState** (from react)<br>
  This hooke is used to keep track of the data entered into the email/password fields.
- **Link** (from react-router-dom)<br>
  If you remember, this is used by React Router to navigate to other pages of our site without a firing a request for a page from the server.
- **useNavigate** (from firebase/auth)<br>
  This hook is used to programmically redirect to another page/route in our React app once a running task is complete.
- **getAuth** (from firebase/auth)<br>
  This Firebase function is called as the first argument to the function below.
- **signInWithEmailAndPassword** (from firebase/auth)
  This will send a request to your Firebase Auth account with the email/password data.

After importing the pieces we need, let's create the state variables that will hold the text entered into the form, and one to display errors.

front-end/src/pages/LoginForm.jsx
<pre><code>export default function LoginPage('') {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  ...
}
</code></pre>

Then, create a new HTML form with 2 input fields and a button to submit the form. One input is for the user's email, and one for the user's password. The input for the password uses `type="password"` to hide the characters that are being typed to increase security.<br>
We will also add a link to the "CreateAccountPage" component on the LoginPage, to help visitors find how to create an account before they can sign in.<br>
Also add a small section to display any errors<br>
NOTE: The instructor chooses not to, or forgets, to set `type="email"` for the first input. This HTML attributes provides automatic client-side validation to make sure the input is a valid email.

front-end/src/pages/LoginPage.jsx
<pre><code>...
export default function LoginPage('') {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  return (
    &lt;>
      &lt;h1>Log In&lt;/h1>
      {error && &lt;p>{error}&lt;/>}
      &lt;input
        placeholder='Your email address'
        type='email'
        value={email}
        onChange={e => setEmail(e.target.value)} />
      &lt;input
        placeholder='Your password'
        type='password'
        value={password}
        onChange={e => setPassword(e.target.value)} />
      &lt;button>Log In&lt;/button>
      &lt;Link to='/create-account'>Don't have an account? Create One here&lt;/Link>
    &lt;/>
  )
}
</code></pre>


Next, create an asychronous function, within the LoginPage component funtion, that will attempt to call Firebase when the user logs in. We imported 2 functions from FireBase and one gets called as the first argument of the other, followed by the email and password data. If the request to Firebase fails, will need to catch the error and handle it. We can call this function from the form button's "onClick" attribute.<br>
We can take advantage of the `useNavigate` hook from React Router, which allows us programmically navigate to the *ArticlesPage* after the request to Firebase Auth concludes.

front-end/src/pages/LoginPage.jsx
<pre><code>...
export default function LoginPage('') {
  ...

  const navigate = useNavigate();

  async function logIn() {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch(e) {
      setError(e.message);
    }
  }
  ...
  &lt;button onClick={logIn}>Log In&lt;/button>
}


With all our efforts, let's look at our page. Do NOT click on the "Log In" button. Before we can login we need to finish the CreateAccountPage, which is the topic of the next lesson. Instead, look to see if the inputs, button, and link to the Create Page are displaying. It may not look pretty but functional. Go ahead and click the link at the bottom of the page to make sure it navigates to the Create Account page.
