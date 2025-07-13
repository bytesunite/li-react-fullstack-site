# Errata - LinkedIn Learning - React: Creating and Hosting a Full-Stack Site by Shaun Wassell
## Course Feedback and Errors

### Chapter 2-3 Testing an Express Server with Postman
FEEDBACK: lack of clear description for Express use() method
Provide a better description of Express use() method and "middleware", or include a reference to better explain these topics.

### Chapter 2-5 Upvoting articles.<br>
ISSUE: lack of error handling<br>
The post() route to '/api/articles/:name/upvote' does not provide error handling and the application crashes when an unknown article name is provided.
