# Chapter 4 - Connecting the Front-End and Back-End
## Lesson 1 - The Axios Library

At this point we have a working front-end and working back-end, so the next step is to connect them using network requests. To do this is similar to how we have been using Postman to make requests. Instead of manually making requests, our front-end code will make network requests in response to things like button clicks.

*Axios* is one popular library to help streamline network requests. You certainly don't need to use Axios, as the browser's Fetch API works just fine. But this course introduces Axios as a means to make network requests.<br>
You can learn more about Axios at:
* [Axios Documentation](https://axios-http.com/docs/intro)
* [Axios GitHub](https://github.com/axios/axios)
* [Axios npm](https://www.npmjs.com/package/axios)

To get started, install the "axios" npm package into the "front-end" part of our Full Stack React project.<br>
<pre>
front-end/$ <code>npm install axios</code>
</pre>

The next video will take a look at how to make http requests from our front-end code to our Express back-end.
