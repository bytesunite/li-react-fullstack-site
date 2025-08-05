# Chapter 6 - Hosting a Full-Stack React Application
## Deploying a Full-Stack Application

One last stop to deploy your app is to download the [gcloud CLI](https://cloud.google.com/sdk/docs/install). If you are using CodeSpaces it is typically a version of Ubuntu so you will need to determine your target environment.

Once you install it you should be able to open a terminal and type `gcloud --version` to verify it is installed.

On a side note, when you created a Firebase account, you also created a Google Cloud account behind the scenes. If you go to `https://console.cloud.google.com` you should be able to find the Firebase account.

Back in your hosting environment terminal you can use the gCloud CLI to login to your Google cloud via a browser. You type `gcloud auth login` which opens a web browser to complete the signin. It should be the same account you created for your Firebase account. It returns a verification code you copy and paste back in your terminal

<pre><code>$ gcloud auth login
Go to the following link in your browser, and complete the sign-in prompts:
https://accounts.google.com/o/oauth2...

Once finished, enter the verification code provided in your browser: 4sl48fjieafejl

You are logged in as [your account name here]
Your current project is [None]. You can change this setting by running:
  $ gcloud config set project PROJECT_ID
</code></pre>

If all went well, when you login and get the verification code then enter it into the gCloud CLI it should provide a response letting you know you are logged in as a specific user. It also provide a command for you. You will find the project ID from the Google Cloud Console.

<pre><code>$ gcloud config set project full-stack-react-934cb
Updated property [core/project]
</code></pre>

If all went well it should let you know the property ws updated.

Now back in the terminal you can type a gcloud command to deploy.
If it goes well it will prompt you for a region such as *[18]"us-east1*.

<pre><code>gcloud app deploy
Please enter your numeric choice: 18
</code></pre>

Sadly you will get an ERROR because Google Cloud wants a billing account. And that sucks. So if you want to continue you go to the the Google Cloud Console and click on the "billing" tab and enter your info.

If you did decide to provide billing, you run the same deploy command. It will attempt to load files into Google cloud. This will take a few minutes. The end result is a url is provided to you. Open the url in a browser to view your hosted application.

<pre><code>gcloud app deploy
Do you want to continue: Y
Beginning deployment of service ...
</code></pre>

If you own a domain you can use the url provided by Google cloud and configure your domain to point to it.

If you decided to continue, the next step is to quickly shut this down your google cloud account to avoid any costs. The next lesson shows how to shut this down.
