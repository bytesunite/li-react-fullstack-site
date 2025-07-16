# Chapter 2 - Creating a Node.js Back-End
## Lesson 4 - Route Parameters in Express

Back in Chapter 1 we learned about using React Router to gain access to a what is known as a "url parameter". If you remember, we were able to provide a url "/articles/learn-react" and grab the value after "/articles/" so that we could use "learn-react" to filter out a specific article.

Express also supports url parameters.<br>
In the last lesson we saw how to make a POST request and send JSON data {"name":"Shaun"} along with the request and access it inside a post() endpoint via "req.body.name".

So how would Express gain access to a name if we provided it as part of a url, such as "/hello/Shaun"?

Believe it or not Express uses the same syntax as we saw in React. So let's create a get() endpoint to demonstrate this. The request object, which is the first parameter of the callback, contains information about the request. The request object has a *params* object to gain access to url parameters. The segment ":name" in the url will be the property in the request's params object (req.params.name); You can use any url parameter id you want and this will be how to access it. For example, ":id" would be "req.params.id".

[src/server.js]
<pre><code>
...
get('/hello/:name', (req, res) => {
  res.send('Hello, ' + req.params.name);
})
...
</code></pre>

After making this change, restart your server.<br> 
Later in the course you will learn how to configure your development environment so saving a file will automatically restart the server.

Go to Postman and make a GET request to "/hello/Shaun" and you should see a response of "Hello, Shaun". Likewise if you send a request to "/hello/Express" it will return "Hello, Express".

