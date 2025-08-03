# Errata - LinkedIn Learning - React: Creating and Hosting a Full-Stack Site by Shaun Wassell
## Course Feedback and Errors

### Chapter 2-3 Testing an Express Server with Postman
FEEDBACK: lack of clear description for Express use() method
Provide a better description of Express use() method and "middleware", or include a reference to better explain these topics.

### Chapter 2-5 Upvoting articles.<br>
ISSUE: lack of error handling<br>
The post() route to '/api/articles/:name/upvote' does not provide error handling and the application crashes when an unknown article name is provided.<br>
It is important to talk about application security. Make sure validation/sanitization is used on both the client & server. This can be using built-in features such as input types (email, password), and server-side validation to escape special characters before inserting data into a database.

### Chapter 5-3 Adding Firebase Auth to React
ISSUE: The video transcript has a few errors of "firebase off" instead of "Firebase Auth". 
- The 7th sentence incorrectly says "fire base off" instead of "Firebase Auth".
- About half way down the transcript it says "Firebase off" instead of "Firebase Auth", when it talks about copying the code from Firebase after installing the firebase package.
- There are other places in the transcript where this occurs.

### Chapter 5-4 Build a login form
ISSUE: Security. The input field for the email does not include `type='email'`, which is HTML's built-in client-side validation. You could add this or mention how/if React automatically handles input validation/sanitizing

### Chapter 5-5 Build a Create Account Page
ISSUE: Security. The input field for the email does not include `type='email'`, which is HTML's built-in client-side validation. You could add this or mention how/if React automatically handles input validation/sanitizing
