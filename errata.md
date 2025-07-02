# Errata
LinkedIn Learning - React:Creating and Hosting a Full-Stack Site

LinkedIn Learning [React:Creating and Hosting a Full-stack Site](https://www.linkedin.com/learning/react-creating-and-hosting-a-full-stack-site-24928483/)

Shaun Wassell is the instructor for this course

*NOTE: The errata will contain errors and feedback while taking the course.*

## Ch1-6 URL parameters with React Router
-  An uncaught error is displayed on the ArticlePage when a route does not match an article. The instructor fails to check for a valid article before attempting to display the article title.
- The ArticlePage could be improved with semantic HTML, such as the &lt;article> tag.

## Ch1-8 Creating a 404 page in React
- The instructor creates an NotFoundPage component for routes not found. It is also mentioned this general error page may not be the best solution for all cases but fails to go into details on the why or when. 
It would help to demonstate error handling in the ArticlePage to provide a message that an article was not found. I would also help to demonstrate cases where a general not found page should not be used.
