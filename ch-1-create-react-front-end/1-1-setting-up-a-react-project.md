# Chapter 1 - Creating a React Front-End
## Lesson 2 - Setting Up a React Project

The quickest way to create a new React app is using what is known as a "generator". This course uses Vite (pronounced veet, French for "fast").

[Vite website](https://vite.dev)

The instructor created a new repository to act as the project root directory. Then using Vite a new React project is created. In the code examples below "website" will be used to represent the root project directory. It is suggested when taking the course to use the same versions of NPM packages as the instructor. This will help you see what the instructor is showing you & help prevent breaking changes made by new releases.

The instructor uses Visual Studio Code. A new terminal is opened to create a new React project using Vite.

Create a new project using Vite version 5.5.2.<br>
You will prompted for a project name, framework, language, etc.

<pre>
fullstack/$ <code>npm create vite@5.5.2</code>
<samp>
Project name: front-end
Select a framework: React
Select a variant: JavaScript

Scaffold project...
Done. Now run:
&nbsp;&nbsp;cd front-end
&nbsp;&nbsp;npm install
&nbsp;&nbsp;npm run dev
</samp>
</pre>

To install the dependencies, follow the instructions to change to the project directory "front-end". From this directory, install dependencies & start the server. Then open a browser to the url provided.

<pre>
website/$ <code>cd front-end</code>
website/front-end/$ <code>npm install</code>
...
website/front-end/$ <code>npm run dev</code>
<samp>Vite v5.4.6
&nbsp;&nbsp;Local: http://localhost:5173</samp></pre>

If you open a web browser to the provided url you should see the default React app that Vite generated for you: A "Vite + React" heading with a couple of animated logos and an interactive counter that increments when you click the button.

Before moving on, the instructor demonstrates the "Hot Module Reloading (HMR) feature. This allows you to modify your files, save them, and immediately see changes in the web browser.

In your new "front-end" project directory navigate to "src/App.jsx" and modify the file and save it. Then navigate back to the browser and you should see the changes you made.

Go ahead leave everything as is except modify line 25 by adding some extra text "Just did!"

[src/App.jsx]<br>
<pre><code>
...
Edit &lt;code>src/App.jsx&lt;/code> and save to test HMR. Just did!
...
</code></pre>

After saving the file go back to the browser and you should see this change without having to restart Vite's server or refresh the page in the browser.

NOTE: If you need to stop the server running in the terminal you can press Ctrl + C inside the terminal. And to start it again open a terminal to the project directory "front-end" & run the same command we did before: `npm run dev`.

