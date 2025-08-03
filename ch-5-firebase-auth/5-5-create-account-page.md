# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 5 - Build a Create Account Page

With the LoginPage done, it's time to build the CreateAccountPage. The Create Account page will be very similar to the Login Page so it is suggested to simply copy the contents of LoginPage.jsx, past it into the CreateAccountPage.jsx file, and then modify it by changing the component name, etc.

If you copied and pasted the contents of LoginPage.jsx all you need to do is
- change the import function name "createUserWithEmailAndPassword"
- change the component function name to "CreateAccountPage"
- change the `<h1>` text to "Create Account"
- create a new state variable "confirmPassword"
- add a new form field to confirm the password
- replace the text in the button to "Create Account", and the onClick attribute value to "createAccount"
- change the `<Link>` details. The text is "Already have an account? Log In" and the `to` is `/login`.
- rename the function from 'logIn' to 'createAccount' and update the code.
  - verify password and confirmed password are the same. If not return from the function
  - use the correct Firebase function, createUserWithEmailAndPassword() to create an account, instead of logging in
  - leave the `navigate('/articles')` because creating a new account will log them in

front-end/src/pages/CreateAccountPage.jsx (snippet)
<pre></code>...
import { getAuth, createUserWithEmailAndPassword} from 'firebase/auth';
...

export default function CreateAccountPage() {
  ...
  async function createAccount() {
    if(password !== confirmPassword) {
      setError('Password and Confirm Password do not match!');
      return;
    }
    try {
      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate('/articles');
    } catch(e){
      setError(e.message);
    }
  }

  return (
    &lt;>
      &lt;h1>Create Account&lt;/h1>
      ...
      &lt;input
        placeholder='Confirm password'
        type='password'
        value={confirmPassword}
        onChange={e => setConfirmPassword({confirmPassword})} />
      &lt;button onClick={createAccount}>Create Account&lt;/button>
      &lt;Link to='/login'>Already have an account? Log In&lt;/Link>
  );
}
</code></pre>

Go ahead and save your changes. Open your app in a browser to make sure it is displaying correctly. Do NOT click the "Create Account" button. Just verify the heading text, confirm password field, and the button text, and the link to the Login Page is displaying correctly. Click on the link at the bottom of the page to see if you can navigate to the Login Page from the Create Account page.

Now it is time to test if an error is displayed if passwords are different. Put in a fake email such as `foo@example.com`, a password of your choice, and then a different password in the confirm password field. Click the "Create Account" button.<br>
If all went well you should see an error message, letting you know the two passwords are different.

Next, we can try to create a new user account. This will fail but it is important to see that an error was caught. Provide a fake email such as `bar@example.com`, then enter a password of your choice, enter the same password in the confirm password field, and press the "Create Account" button.<br>
If all went well you should see a Firebase error message, "Firebase: Error (auth/configuration-not-found)".<br>
OOPS! What happened?

This error is not due to our code. It is telling us to login to our Firebase account to add some additional configuration. Last time we were in Firebase we copied and pasted the script into our code but we did not finish the process in Firebase. Under the script that we copied there is a "Continue to Console" button. Click on it.<br>
This should take you to what is known as the "Firebase Console" for your project. We need to actually tell Firebase what methods of authentication we want to allow.<br>
Click on the "Authentication" link in your Firebase console. The friendly interface should provide a "Get Started" button, click on it. A full list of options is displayed to you. Select "Email/Password" under the heading "Native Providers". Then, enable "Email/Password". Leave the "Email Link" feature disabled, which provides a feature to send an email with a link to click to login. Then click the "Save" button to save your authentication sign-in options.

With the email/password authentication sign-in configured, go ahead and try it again. Provide an email such as `foo@exmple.com` and the same password for password and confirm password. Then click the "Create Account" button. If all went well you should see the Articles page. If you see a warning from Google about the password it may be that the password is not secure. For example, the instructor entered "abc123" as a password to test the app & Google flagged this and a security warning popped up. If you browser asks you to save the password, say NO! This is a demo.

If you see the articles page, congrats!<br>
Now, go back to the Firebase console and click on the "users" tab and you should see the new email, along with the creation/last signed in date, and a generated User UID.

So that is how to login. But right now our React app does not provide a way to "log out". This will be discussed shortly.
