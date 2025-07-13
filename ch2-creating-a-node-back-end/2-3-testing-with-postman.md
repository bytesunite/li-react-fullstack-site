# Chapter 2 - Creating a Node.js Back-End
## Lesson 3 - Testing an Express Server with Postman

Postman is a free piece of software that is helpful testing back-end APIs. In other words, Postman gives you the ability to make server requests and gain insights into details of the server request & response. This is useful when testing how your app/API responds to various request methods and data.

[Postman downloads](https://www.postman.com/downloads)

After Postman is installed, open it up. The main interface has a "+" icon in the top left of the main screen. Clicking this will open up an interface to make a request. It provides the ability to provide the http method and a url. Additionally it has the ability to provide data with the request, tests, and more.

If you shut down the server after the last lesson, start it up again.
<pre>
back-end/$ <code style="color:gray">node src/server.js</code>
<samp>Server is running on port 8000</samp>
</pre>

Now lets test our server by making a request using Postman:

1. Open Postman and click the "+" icon on the main screen. This will provide an interface to create a new request.

2. Leave the method as is (GET), and enter in the url that we created in our Express server. Enter "http://" followed by "localhost:8000/hello".<br>
NOTE: If you are using Codespaces, go to VSCode and select the "PORTS" tab from the integrated terminal and change the visibility of your codespace to "public". Then copy the url into Postman.

3. Click the *Send* button and you should see details of the response at the bottom of the screen. It will give you feedback such as "200 ok" when the request was successful. Additionally in the "body" tab, you will see the response, "Hello!".

So what happens if we use Postman to send a POST request?<br>
Change "GET" to "POST", using the same url, and click the "Send" button. What you should see is an error "404 Not Found" with a response of an html file with an error message "Cannot POST /hello".<br>
This tells us that we do not have an endpoint that matches a POST request to the same url ..."/hello".

Open "src/server.js" and modify the server to accept a POST request by creating a new endpoint with the *post()* method. Also modify the existing *get()* endpoint response to show it is a GET request.

[back-end/src/server.js]
<pre><code>
import express from 'express';

const server = express();

server.get('/hello', (req, res)=>{
  res.send('Hello from a GET endpoint!');
})

server.post('/hello', (req, res) => {
  res.send('Hello from a POST endpoint!');
})

server.listen(8000, ()=>{
  console.log('Server listening on port 8000');
});
</code></pre>

Resart your server to see the changes we made.
1. Go to the console where the server is running and press `CTRL + C`
2. Start the server back up with `node src/server.js`

Now go back to Postman and click "Send" to resend a POST request. The results should be the text "Hello from a POST endoint!".<br>
If you change the request type to GET, and click "Send" you should get "Hello from a GET endpoint!".

Before moving on let's explain a request body, which is a way to send data to the server. Sending data to the server is common when submitting an HTML form with user-entered content. In Postman, under the request interface is a tabbed interface with a "Body" tab. This provides a way to send data with the request. One option is "raw" and a toggle to select "JSON", which allows us to type in some data along with the request.<br>
Inside the endpoint you can access the data via the *request* object's *body* property.

Let's update an enpoint to try this out.
1. In your server modify the response for the post() endpoint
<pre><code>
...
app.post('/hello', (req, res) => {
  res.send('Hello, ' + req.body.name + ' from a POST endpoint!');
})
...
</code></pre>

Stop and start the server after making these changes.

Back in Postman:
1. Select the POST method
2. Use the same url to "/hello"
3. Under the "Body" tab select "raw" and "JSON". Type in the following JSON content in the window:
<pre><code>
{
  "name": "Shaun"
}
</code></pre>
4. Click the "Send" button.

Your app will FAIL. It does not work as expected. Instead, you will see, "TypeError: Cannot read properties of undefined (reading 'name')". What does this mean? With an basic understanding of JavaScript you can understand that Express is telling us it can't find a "name" property. Let's see how to fix this.

Stop the server and update "server.js".<br>
There is one more piece that is needed for this to work. Right now JSON data is being sent as part of the POST request but the Express server isn't parsing this incoming JSON payload correctly.<br>
To fix this we need help from the *use()* function, to add what is known as "middleware" to the Express app. The line `app.use(express.json())` is used to parse the incoming request JSON payload, making it available in "req.body".

[src/server.js]
<pre><code>
import express from 'express';

const app = express();

app.use(express.json())

app.get('/hello', (req, res)=>{
  res.send('Hello from a GET endpoint!');
})

app.post('/hello', (req, res) => {
  res.send('Hello, ' + req.body.name + ' from a POST endpoint!');
})

app.listen(8000, ()=>{
  console.log('Server listening on port 8000');
});
</code></pre>

So let's try this again.<br>
Start up the server, then go to Postman and click the "Send" button to send the same POST request to "/hello" with raw JSON of {"name": "Shaun"} and it should succeed this time. A response should be "Hello, Shaun from a POST endpoint!".<br>
Feel free to change the JSON data to whatever you want such as {"name": "Bob"} and you should get the value we set for name in the response.

In this lesson we learned
- how to setup different endpoints
- use Postman to test different method & endpoints, and send data
- how to accept data in an endpoint from a request
- introduced Express use() method to add middleware (more later). 

The instructor doesn't explain the *use()* method very well. The short answer is Express is essentially a series of "middleware functions". The *use()* function provides a way to call a "middleware" function, which has access to the request and response object. To learn more go to [express middleware](https://expressjs.com/en/guide/using-middleware.html)
