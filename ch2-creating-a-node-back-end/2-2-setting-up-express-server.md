# Chapter 2 - Creating a Node.js Back-End
## Lesson 2 - Setting up an Express Server

So let's get started setting up the back-end for the app using Node.js and Express.

First, create a folder named "back-end" at the same level as the previous "front-end" folder. This will help keep our project directory organized and help illustrate separation of concerns (front-end and back-end). In practice, you can always find ways to combine these but it requires additional setup and the instructor choses not to show how to do this.<br>
NOTE: "website" is used to indicate the top level of your repository or website.

<pre>
  website/$ <code style="color:gray">mkdir back-end</code>
  website/$ <code style="color:gray">ls</code>
  <samp>back-end    front-end</samp></pre>

Next, setup a new self contained project for the back-end. Then install *Express*.

1. Open the terminal and change directories to the new "back-end" directory

    <pre>
    website/$ <code style="color:gray">cd back-end</code>
    website/back-end/$</pre>

2. Initialize the project. This will create a *package.json* file to manage details about the project, such as its name & dependencies for the back-end project. By specifying the "-y" flag it tells the package manager to initialize the project without asking questions.<br>

    <pre>
    website/back-end/$ <code style="color:gray">npm init -y</code></pre>


3. After initializing the project the next step is to install Express. Node does not automatically come with Express so you will need to install it.

    <pre>
    website/back-end/$ <code style="color:gray">npm install express</code></pre>


Create a new sub-directory named "src" within the "back-end" folder. This is not required but is helps keep the business logic separate from other files such as the configuration, etc.

  <pre>
  website/backend/$ <code style="color:gray">mkdir src</code>
  website/backend/$ <code style="color:gray">ls</code>
  <samp>src</samp></pre>

NOTE: If you find that Source Control is showing hundreds of new files waiting to be committed, it is due to a missing ".gitignore" file. You must tell your new project not to track the "node_modules" directory.<br>
For an example, see the course repository for branch 02_02_end, specifically the .gitignore file. [.gitignore](https://github.com/LinkedInLearning/react-creating-and-hosting-a-full-stack-site-5948186/blob/02_02_end/.gitignore)

Create a new file "server.js" in the new folder you just created (backend/src). Within the file a new Express app will be built.

1. Import express (WARNING: Node uses require() by default, not import)
2. Call the imported "express" function to create a new Express app & assign it to a variable
3. Create a simple endpoint with the get() method. This represents a GET request to a given url. The first argument is a url string, the second is a callback which receives request & response objects for use in the callback.
4. Inside the get() callback, use the response object's "send()" method to return a value when a GET request is made to "/hello". In this case we are returning a simple string "Hello!".
5. Finally the "listen()" method will start the server and specify which port is used. The method uses a port number and a callback. The callback in this example is used to print details about the server to the console when the application is running.

[backend/src/server.js]
<pre><code>
import express from 'express';   // OR const express = require('express');

const app = express();

app.get('/hello', (req, res)=>{
  res.send('Hello!');
});

app.listen(8000, ()=> {
  console.log('Server is listening on port 8000');
})
</code></pre>

This is our first Express server, so lets fire up the application using Node.js, via the command line. What you will likely see is an Error message warning about the "import" statement. Node uses a different module system than what you may be familiar with in client-side JavaScript.
<pre>
website/back-end/$ <code style="color:gray">node src/server.js</code>
<samp style="color:red">Warning: To load an ES module, set "type": "module" in the package.json or use the .mjs extension.</samp>
</pre>

To fix this error, go into the "package.json" file and look for a property named "type" ("type": "commonjs") change it to "type": "module", then save the file.

[back-end/package.json]
<pre><code>
{
  "name": "back-end",
  "version": "1.0.0"
  "main": "index.js",
  <span style="color:gray">"type": "module",
...
</code></pre>


With this correction, start the server and then navigate to <code>localhost:8000/hello</code> and you should see a single message displayed on the screen, "Hello!".

<pre>
back-end/$ <code style="color:gray">node src/server.js</code></pre>

When you are ready to stop the server, go back to the terminal and press `CTRL + C`. You can always start it again from the terminal with `node src/server.js` from the "back-end" directory.
