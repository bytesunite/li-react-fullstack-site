# Errata - LinkedIn Learning - React: Creating and Hosting a Full-Stack Site by Shaun Wassell
## Course Feedback and Errors

### General Issues
ISSUE: lack of error handling, validation/sanitization<br>
Chapter 5-8 shows how to add Firebase to the backend, which is a good thing, but more needs to be done to stress the importance of validating and sanitizing ALL data to and from the server, which also means sanitizing client-side input.

ISSUE: Article content location. Why is the article content is stored in a static file "front-end/src/article-content.js", instead of in the database? 

SUGGESTION: Address secure coding practices throughout the course. Students should be thinking about best security practices from the beginner. Security could be introduced in small additional videos throughout the course as not to distract from the main course.
- Discuss how React defends you from bad code
- Stress the importance of validation/sanitization of both the client & server
- Discuss some simple injection vunerabilities (style tags, script tags, SQL commands)
- Discuss how HTML provides built-in validation, such as input attributes (email,password, etc.) and how React does/doesn't assist with this.
- Point out some simple/basic JavaScript security pitfalls such as eval(), setInterval(), setTimeout(), 

ISSUE: lack of software testing
SUGGESTION: Consider adding a chapter on testing. Or to prevent making this course too large, consider creating additional modules that can be applied to this course, such as learning testing with React Testing Library, Jest, etc.


### Chapter 2-3 Testing an Express Server with Postman
FEEDBACK: lack of clear description for Express use() method
Provide a better description of Express use() method and "middleware", or include a reference to better explain these topics.


### Chapter 2-5 Upvoting articles.<br>
ISSUE: lack of error handling, validation/sanitization<br>
SUGGESTION: Address secure coding practices
- Discuss how React defends you from bad code
- Stress the importance of validation/sanitization of both the client & server
- Discuss how HTML provides built-in validation, such as input attributes (email,password, etc.)
The post() route to '/api/articles/:name/upvote' does not provide error handling and the application crashes when an unknown article name is provided.<br>
It is important to talk about application security. Make sure validation/sanitization is used on both the client & server. This can be using built-in features such as input types (email, password), and server-side validation to escape special characters before inserting data into a database.


### Chapter 5
ISSUE: Typos (auth vs off). Multiple lessons in chapter 5 have mistakes in the Video transcript. Instead of "Firebase Auth", the transcript repeatedly thinks the instructor is saying "Firebase off".<br>


### Chapter 5-3 Adding Firebase Auth to React
ISSUE: The video transcript has a few errors of "firebase off" instead of "Firebase Auth". 
- The 7th sentence incorrectly says "fire base off" instead of "Firebase Auth".
- About half way down the transcript it says "Firebase off" instead of "Firebase Auth", when it talks about copying the code from Firebase after installing the firebase package.
- There are other places in the transcript where this occurs.


### Chapter 5-4 Build a login form
ISSUE: Security. The input field for the email does not include `type='email'`, which is HTML's built-in client-side validation. You could add this or mention how/if React automatically handles input validation/sanitizing


### Chapter 5-5 Build a Create Account Page
ISSUE: Security. The input field for the email does not include `type='email'`, which is HTML's built-in client-side validation. You could add this or mention how/if React automatically handles input validation/sanitizing


### Chapter 5-8 Adding Firebase Auth to Node.js
ISSUE: Security. After adding "back-end/credentials.json" to the .gitignore file, does this pose a security issue when you perform your next commit? Would a misconfigured server potentially be able to see or modify the .gitignore file? Is this the most secure way to store sensitive information that is accessible to your node server?
