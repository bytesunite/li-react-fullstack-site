# Chapter 6 - Hosting a Full-Stack React Application
## Lesson 3 - Define Environment Variables

We need to make sure we are connecting to Atlas using the correct IP address. Currently we are still pointing to our local installation of Mongo Community Edition.

So we can specify a environment variable or fallback to our local version if the Atlas DB can't be found. To get the connection string you can go back to Atlas and click on "database" under Deployment in the main navigation. Then click on the "connect" button next to your cluster name, then click on "drivers", then you can scroll down in the instructions to find your connection string to copy and paste in your terminal.

We can copy the connection string, but we will use backticks to insert the username and password that will be stored in environment variables rather than hard coded into our server file. You can also choose to move the database name into environment variables but the instructor simply demonstrates the user/password in environment variables.

back-end/src/server.js
<pre><code>...
async function connectToDB() {
  const uri = !process.env.MONGODB_USERNAME 
  ? 'mongodb://127.0.0.1:27017'
  : `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}$@cluster0.zplzm.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

}
</code></pre>

After updating this our App will connect to Atlas when available otherwise it will use the local MongoDB Community Edition.

Next, we will add a start script to the back-end directory package.json. The "dev" is only used for development, not meant for production.

back-end/package.json
<pre><code>...
scripts: {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "npx nodemon src/server.js",
  "start": "node src/server.js"
}
...
</code></pre>


Now, in the "back-end" directory, create a file named "app.yaml". This is specific to Google cloud that informs it which version of node your app is built for. This example specifies node version 20.

back-end/app.yaml
<pre><code>runtime: nodejs20
</code></pre>

Additionally, create a file "prod-env.yaml", which is where you will provide your environment variables for MongoDB. Replace the user/pass with your details.
Make sure you don't publish this file by adding it to .gitignore.

back-end/prod-env.yaml
<pre><code>env_variables: 
  MONGODB_USERNAME: full-stack-react-server
  MONGODB_PASSWORD: jZ89sns94s49idsn9
</code></pre>

Add "prod-env.yaml" to your .gitignore file.

react-fullstack-site/.gitignore
<pre><code>...
back-end/credentials.json
back-end/dist
.env
back-end/prod-env.yaml
</code></pre>

