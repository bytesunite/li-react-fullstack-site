# Chapter 6 - Hosting a Full-Stack React Application
## Lesson 1 - Preparing an App for Release

In Chapter 5 we added authentication to our app using a 3rd party called Firebase. 

At this point we have a full stack React app:
- React handles the front end UI and routing
- Node and Express builds a backend API to handle http requests
- MongoDB persists data in our app
- Firebase Auth (3rd party service) implements user authentication

The final step is to prepare our application and deploy it to a hosting provider.

### Front-end build
So far we have be running `npm run dev` which starts up a local development server to run our front end.<br>
When preparing your React front-end for production, a "build" process is run. This build process will bundle your React front end project into 3 files. This includes your main HTML page, CSS styles, and JavaScript. The end result is what is known as a "bundle".
- index.html
- index.css
- index.js

From within the "front-end" directory, stop the server if it is running, then run the following command to build your project for development. This should create, what is known as a "bundle", and a new "dist" directory should be created in your project directory.

<pre><code>front-end/$ npm run build</code></pre>

Take the "dist" folder is your production bundle. Move this folder to your "back-end" directory. Then add the "dist" folder to your `.gitignore` file in your main project directory.

full-stack-react-site/.gitignore
<pre><code>...
.tmp
back-end/credentials.json
back-end/dist
</code></pre>

After saving this file, you should see the "dist" folder within your "back-end" directory turn gray in VSCode. This grayed out filename helps indicate that Git will ignore these files and not track them.

Now, we have to make sure our Express server can find and serve the files in the newly added "dist" folder. To do this we need to open up our "server.js" file and make some adjustments.

But before we can load files we need to address the fact that Node uses "require()" by default rather than "import". So we need to write a workaround. Underneath the imports at the top of the file you can write the following.

back-end/src/server.js
<pre><code>...
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
</code></pre>

With this in place we can create a GET route to match all routes that do NOT start with "/api".

Use a regular expression to match all requests that do NOT match our API endpoints (endpoints that start with `/api`). We can create a new GET request using a regular expression.

The regular expression `/^(?\/api).+/` basically means we want to find all endpoints that do NOT start with `/api`; 
- `^` means the beginning of the string 
- `(?!)` is a "Negative Lookahead" which means in current position the pattern that follows it must NOT match.
- `(?!\/api)` here "\api" combined with the previous rules tells it NOT to match the endpoints that start with the "/api" pattern. The backlash simply escapes the forward slash that is used to define a regular expression.
- `.+` represents one or more characters

back-end/src/server.js
<pre><code>...
app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
})

...

// Our API routes
app.get('/api/articles/:name', async (req, res) => {
  ...
});
...
</code></pre>

We also need to add middleware for static content. Add this above the previous endpoint.

back-end/src/server.js
<pre><code>...
app.use(express.static(path.join(__dirname, '../dist')));

app.get(/^(?!\/api).+/, (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
})
</code></pre>

What we just did was make it possible for our Express server to load files for our front end. We no longer need to run our front end separately a server at port 5173. Instead our front end is now joined with our backend and served on the same port as the server.

Go ahead and start the back-end server and go to "http://localhost:8000/" and you should be able to use your React the same way as you did before. 

<pre><code>back-end/$ npm run dev</code></pre>

If all went well you should now be able to use the website, but you are now using the same server & more specifically the same port for your front end and back end.


### Using Environment Variables
The next thing we need to do is replace the hard coded port number with an environment variables. Most hosting platforms want to be able to tell your app which port to use.

Above your start function, create a PORT variable to use the environment variable for the port. Then update your start function to use PORT rather than the hard coded 8000 value.

back-end/src/server.js
<pre><code>...
const PORT = process.env.PORT || 8000;

async function start() {
  await connectToDB();
  app.listen(PORT, function(){
    console.log('Server is running on port' + PORT);
  })
}

start();
</code></pre>
