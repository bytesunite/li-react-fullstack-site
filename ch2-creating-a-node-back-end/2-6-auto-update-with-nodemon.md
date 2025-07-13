# Chapter 2 - Creating a Node.js Back-End
## Lesson 6 - Automatically updating with Nodemon

Our node server has to be restarted by hand every time we modify the server file. Back in chapter 1 our React app was immediately responding to updates as soon as the file was changed. React's Hot Module Reloading(HMR) improved the development experience. 

One package, named "Nodemon", can provide automatic reloading to improve the development experience with Node. This is pronouced many ways and there is no right way because even the author finds it funny by not providing a correct pronunciation. You may hear people call it "Node Mon" for Node monitoring, "Node Daemon/No Deamon" which caters to the tech term or sinister term "Demon". Feel free to call it what you want. The instructor uses "Node Daemon".

Use npm to install *nodemon* in your back-end project and use the "--save-dev" flag to make sure this package is only used during development. Nodemon is not something you want in a production environment.

<pre>
back-end/$ <code style="color:gray">npm install --save-dev nodemon</code>
</pre>

After installing this, you should be able to look in "package.json" and see nodemon listed under "devDependencies". Starting the server is done in slightly a different way. Rather than invoking it with *node*, you use *npx*, which is used to run a command from a local or remote package.<br>
SEE: [npx command documentation](https://docs.npmjs.com/cli/v9/commands/npx?v=true)

Start the Express server.
<pre>
back-end/$ npx nodemon src/server.js
</pre>

Go to Postman and make some requests to make sure you can still interact with your Express server.<br>
Then, change something in "src/server.js" file (like change "Success" to "Hooray" in the endpoint response) and save it.<br> 
As soon as you save the file the terminal output is as following, indicating an automatic restart of your Express server:
<pre><samp>
[nodemon] restarting due to changes...
[nodemon] starting &#96;node src/server.js/&#96;
</samp></pre> 

Go back to Postman without restarting the server to see if changes are reflected by sending a new request and watch for the changes you made. (the server should detect changes and automatically restart).

Go ahead and change the file back to say 'Success' if you modified the post() endpoint.

One additional step we can take is to create a new script. This allows us to use "npm run &lt;name>" to assign a name to a command. By doing this is can help us tryinig to remember to use "npx" instead of npm. Open the "package.json" file and go the the "Scripts" section.<br>
NOTE: If you leave a trailing comma after adding this script and nothing follows it, you will get an error as invalid JSON.

[package.json]
<pre><code>
...
"scripts": {
  "test": "echo \"Error: no test specified\" && exit 1",
  "dev": "npx nodemon src/server.js"
}
</code></pre>

Save the file. Now you can start your server with nodemon using:

<pre>
back-end/$ <code>npm run dev</code>
</pre>

This is much easier to start our server than trying to remember "npx nodemon".
