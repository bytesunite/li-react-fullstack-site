# Chapter 5 - Adding User Authentication with Firebase Auth
## Lesson 8 - Adding Firebase Auth to Node.js

This lesson takes a detour to the backend to address how we can use Firebase Auth to protect requests made to the server. The front-end is verifying if a user is logged in but requests made directly to the server is NOT checking if a user is authorized/signed in. In other words, ANYONE could sneak around our front end with something like Postman and make requests directly to our server endpoints without any authorization. We need to make sure an authorized person is making requests to the server. People that are not logged in should not be able to make requests to the server to make upvotes, add comments, or any other unwanted activity.

To provide Firebase protection on the backend, we can use "Firebase Admin" package. This is both a powerful and dangerous package to use at it has full access to your Firebase projects.

Go to the console, if your backend server is running you will have to stop it first. Then install the Firebase Admin package from within your "back-end" directory.

<pre><code>back-end/$ npm install firebase-admin</code></pre>

Then, open your server file and make changes to allow only authenticated users to access your server enpoints. 
- import "admin" from "firebase-admin"

back-end/server.js
<pre><code>...
import admin from 'firebase-admin';
</code></pre>

Before we continue we have generate some credentials for our server. You can think of this as a username and password that our server can use to prove that it is who it says it is. To do this we need to go back to our Firebase console. 

In the top left of your Firebase project, there is an icon that looks like a gear to to right of the "Project Overview" text, click it, then select "Project Settings".<br>
Then click on the "Service Accounts" tab in the main window. A "Service Account" is a way we can programmically authenticate the admin for your server to make sure people are who they say they are. Select "node.js" for the Admin SDK and some code will be displayed that you can copy and paste into your Node server.

Example of generated Firebase code
<pre><code>var admin = require('firebase-admin');

var serviceAccount = require("path/to/serviceAccessKey.json");

admin.initialzeApp({
  credential: admin.credential.cert(serviceAccount);
});
</code></pre>

Under the code is a button "Generate new private key". When you click this a warning is displayed letting you know it is important to keep it confidential & NEVER store it in a public repository. Only after you have read the warning should you then click the "Generate Key" button. For example, you should NOT post this to your GitHub account as it will give EVERYONE access to your Firebase admin (a very bad thing!).<br>
Once you click "Generate Key", it downloads a JSON file to your downloads folder on you computer.

Move the generated JSON from your downloads folder to your back-end directory. The JSON has multiple properties (type, project_id, private_key_id, etc.)


Example generated JSON from course video (snippet). Keep this private!
<pre><code>{
  "type": "service account",
  "project_id": "full-stack-react-934cb",
  "private_key_id": "5de39sd9rjese8jdes320feoji454j345",
  "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBghdhdsue0G09"
  "client_email": "firebase-adminsdk-bmlr@full-stack-react-934cb.iam.gser"
  "client_id: "113848945403554",
  "auth_uri": "https://accounts.google.com/o/oauth2/auth",
  "token_uri": "https://oauth2.googleapis.com/token",
  "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/cert",
  "client_x590_cert_url": "https://www.googleapis.com/robot/v1/metadata/x",
  "universe_domain": "googleapis.com"
}
</code></pre>

Go ahead and rename this to "credentials.json". Then you will want to update your ".gitignore" file to make sure this does become part of a Git commit.

Example .gitcommit
<pre><code>.DS_Store
node_modules
.tmp
npm-debug.log
back-end/credentials.json
</code></pre>

Save this file, you should see the file is grayed out now in your file explorer in VSCode.

Now go back to your Firebase console and copy the JavaScript code that you will paste into your server code, and modify it.
-  import the 'fs' module to read the credentials file synchronously, parse it as JSON 
-  replace "serviceAccount" with the variable "credentials" in the cert() method of admin.credential.

back-end/server.js (snippet)
<pre><code>...
import fs from 'fs';

const credentials = JSON.parse(
  fs.readFileSync('./credentials.json')
)

admin.initialzeApp({
  credential: admin.credential.cert(credentials);
});
...
</code></pre>


Go ahead and fire up your server. If all went well no errors will display and your server is ready to go using Firebase Admin.
