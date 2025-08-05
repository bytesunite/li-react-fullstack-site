# Chapter 6 - Hosting a Full-Stack React Application
## Lesson 2 - Setting up hosting for MongoDB

Currently our site is using MongoDB Community Edition on our local computers. For a hosted solution the instructor suggests using [MongoDB Atlas](https://cloud.mongodb.com), which provides a free database hosting solution.

Once you create an account and login, you click on "Create Organization". Then enter a name and select the "free" tier. For example, the instructor called his organization "Linkedin Learning".

Then, click on the "New Project" button. 
- Provide a name such as "Full-stack React". You can leave the "tags" section blank. and click "next".
- Leave the "Add Members and Set Permissions" blank, and click "Create Project"
- You are then presented an interface to "create a new cluster", click on this.
- Now you will configure your cluster
  - Make sure you select the "free cluster". 
  - You can name the cluster whatever you want or leave the default name of "cluster0". 
  - Leave the "automate security setup" checked
  - Leave "preload sample dataset" unchecked
  - You can leave the default provider as AWS or select any other one
  - You can select the region closest to you. If you click on the different providers you can see if one is closer than the other.
  - You can leave the tag section empty
  - Click "Create Deployment" at the bottom

After creating your project & cluster a popup will let you setup a database user.
- A username and password is automatically generated, but you can create your own. The instructor creates a username "full-stack-react-server" and provide a password. <br>
- Go back to VSCode and create a new file in your *back-end* directory named ".env". (Also double check that .env is in your .gitignore)

back-end/.env
<pre><code>MONGODB_USERNAME=full-stack-react-server
MONGODB_PASSWORD=37ns94hueYnp
</code></pre>

Make sure you add ".env" to your ".gitignore" file in your React project.

react-fullstack-site/.gitignore
<pre><code>...
back-end/credentials.json
back-end/dist
.env
</code></pre>

Now go back to MongoDB atlas and click "Create User".

It should provide you with confirmations that the connection IP address is done & the create database user is also done. Click the "Choose a Connection method" button to continue.

Click on the "Shell" button. It provides instructions on how to connect to MongoDB Atlas. You can select your operating system at the top and it will provide details to setup your machine to connect.<br>
For example, on Mac it will show you how to use Homebrew to install "mongosh" and then provide a command to execute in your terminal to connect, which includes the username and password you specified for your database user earlier.
If you are using Codespaces you will need to determine which operating system it is using. The instructor has a Codespace running Ubuntu 20.04 so he selects this to get instructions. You can copy the command and paste it into your terminal.<br>
WARNING: If you get an error when using Codespaces it is because it uses you own IP address you are using to connect to Atlas instead of your CodeSpace url.<br>
Click on the "Done" button.

From the main menu go to "Network Access" and click "Add IP Address". You can add the IP address for you specific server. However, the instructor shows you can also setup a temporary IP address to test it. By clicking "allow access from anywhere" is not the safest so it is auto deleted after a specified time frame. The instructor sets the timeframe for 1 week and and clicks "Confirm".
It takes a moment to set this up so make sure it is "active" before you go back to environment.<br>

Now try the command again in your terminal if the previous attempt failed. This time it should be successful. MongoDB is permitting any IP temporarily.

If successful you should see the MongoDB shell waiting for your command. You can type "use" and provide the database name we've been using "full-stack-react-db. Then we can insert some data into it.

<pre><code>test> use full-stack-react-db
full-stack-react-db> db.articles.insertMany([{
  name: 'learn-node',
  upvotes: 0,
  upvoteIds: [],
  comments: [],
},
{
  name: 'learn-react',
  upvotes: 0,
  upvoteIds: [],
  comments: [],
},
{
  name: 'mongodb',
  upvotes: 0,
  upvoteIds: [],
  comments: [],
},
])
</code></pre>

Then click ENTER to create the document. If successful it should display acknowledged: true<br>
Now press Ctrl+C twice to exit Mongo Shell in the terminal.

In the next video we will show how to update our app to use the correct connection to Atlas.
