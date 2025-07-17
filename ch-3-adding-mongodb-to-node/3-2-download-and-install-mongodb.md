# Chapter 3 - Adding MongoDB to Node.js
## Lesson 2 - Downloading and installing MongoDB

To use MongoDB we first have to install it to the local environment or Codespace.

Installing MongoDB varies widely based on the operating system you are using. There is a "Community Edition" and a newer cloud based service called "MongoDB Atlas". This course uses the community edition of MongoDB.

Download and Install [MongoDB Community Edition](https://www.mongodb.com/try/download/community)

The instructor provides a link to documentation to install MongoDB v6.0, however he shows you the current version is 7.0 and selects this in the top left of the page to. To match the instruction videos it is suggested to install the same version as the instructor, MongoDB version 7.0. 

As of July 2025 the current version is 8.0. Ultimately it is up to you to decide which version to install on your system.

[install MongoDB Community](https://www.mongodb.com/docs/v6.0/administration/install-community/)

The instructor says to follow the instructions on the MongoDB website for your operating system.

To provide a better example than instructor provides, you can see how I installed MongoDB Community Edition v8.0 on macOS using Homebrew. MongoDB 8.0 supports macOS 11 or later. The installation should install:
* The *mongod* server
* The *mongos* shared cluster query router
* The MongoDB Shell, *mongosh*

Before installing you can check to see if you already have MongoDB installed a couple ways. You can open a terminal and type `brew list` to see a list of installed packages and you should see "mongodb-community". Another way is to type `mongod --version` and it should display the version of MongoDB installed on your system, such as "db version v8.0.10". If you do, great, you can skip the install instructions below.

1. Go to [MongoDB install documentation](https://www.mongodb.com/docs/manual/administration/install-community/)
2. Install the Xcode command-line tools. This is required by Homebrew if you are using Homebrew to install MongoDB on macOS.<br>
Open a terminal and type `xcode-select --install`
3. If you do not have Homebrew installed on mac you will need to do this first. You can check if you have Homebrew installed by typing `brew -v` to see the version of Homebrew installed. If you don't, go to the following page, which provides a terminal command to install Homebrew.<br>
[install Homebrew on macOS](https://brew.sh/#install)<br>
The command to install Homebrew on macOS looks like `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`
4. Install MongoDB with Homebrew using the macOS terminal as follows
    1. If you have already performed the following command for a previous installation of MongoDB you can skip this step.<br>
    `brew tap mongodb/brew`
    2. update Homebrew<br>
    `brew update`
    3. install MongoDB
    `brew install mongodb-community@8.0
5. To run MongoDB, i.e. the mongod process, as a macOS service:<br>
`brew services start mongod-community@8.0<br>
And to stop the service you can type:<br>
`brew services stop mongod-community@8.0

Additional details are provided in the documentation to run mongodb as a background process and configure MongoDB.


After you have installed MongoDB the instructor shows you how to run the MongoDB daemon, which is a process that runs in the background. He does this by typing "mongod" in the terminal.<br>
NOTE: Based on your operating system and preference you can start MongoDB different ways. For example to run MongoDB as a macOS service you would run `brew services start mongod-community` or whatever your brew formulae has identified as your mongodb installation<br>
The instructor starts MongoDB as a background process.<br>
`/$ mongod`

In another terminal connect to the database via a MongoDB shell, known as *mongosh*.<br>
`/$ mongosh`

For documentation on how to use *mongosh* you can see the [mongosh documentation](https://www.mongodb.com/docs/mongodb-shell/)

The *db* command tells you which database you are currently using. This should return "test" which is the default database.<br>
<pre>
/$ mongosh
test> db
test
test>
</pre> 


The *use* command will let you switch to another database. The instructor creates a db named "full-stack-react-db".<br>
<pre>
/$ mongosh
test> <code>use full-stack-react-db</code>
<samp>
switched to db full-stack-react-db
</samp>
full-stack-react-db>
</pre>

The *show dbs* command lists available databases.<br>
<pre>
/$ mongosh
test> <code>use full-stack-react-db</code>
<samp>
switched to db full-stack-react-db
</samp>
full-stack-react-db> <code>show dbs</code>
<samp>
admin
config
full-stack-react-db
local
</samp>
full-stack-react-db>
</pre>

Next, lets create what is known as a "collection", for "articles" in the db. The *insertMany()* method accepts an array of objects. To do this, open up the "server.js" file and copy the array of articles from the "articleInfo" variable and paste it into the *insertMany()* method. <br>
The full command uses "db", followed by the collection name "articles", followed by the method "insertMany()" that includes the data you want to insert.<br>
The press ENTER. You should see "acknowledged: true" and 3 ObjectIds with the id of each one.

<pre>
full-stack-react-db> db.articles.insertMany([
  { name: 'learn-node', upvotes: 0, comments: []},
  { name: 'learn-react', upvotes: 0, comments: []}
  { name: 'mongodb', upvotes: 0, comments: []}
])
</pre>

A MongoDB "collection" is similar to a "table" in SQL-based databases.

The "find({})" command is used on a collection, "articles" in this case, to see a list of documents we inserted.<br>
Optionally you can add ".pretty()" onto the end for a prettier display `db.articles.find({}).pretty()`
<pre>
full-stack-react-db> <code>db.articles.find({})</code>
<samp>
[
  {
    _id: ObjectId('238928320973aueiafej`),
    name: 'learn-node',
    upvotes: 0,
    comments: []
  },
    {
    _id: ObjectId('238289323aueifsfej`),
    name: 'learn-react',
    upvotes: 0,
    comments: []
  },
    {
    _id: ObjectId('2389323843293thjpeiafej`),
    name: 'mongodb',
    upvotes: 0,
    comments: []
  }
]
</samp>
</pre>


The *findOne()* method is a way to filter out a single item/document matching the given criteria.<br>
For example, if you wanted to find an item/document in the "articles" collection with a "name" of "learn-node", the command would be as follows:<br>
<pre>
full-stack-react-db> <code>db.articles.findOne({name: 'learn-node'})</code>
<samp>
  {
    _id: ObjectId('238928320973aueiafej`),
    name: 'learn-node',
    upvotes: 0,
    comments: []
  },
</samp>
</pre>

A MongoDB "collection" is similar to a "table" in SQL-based databases.<br>
A MongoDB database stores data as BSON "documents". BSON is a binary representation of JSON. MongoDB documents are composed of field-and-value pairs. For example <samp>{field1: value1, field2: value2 }</samp>

Using *find()* we can filter out multiple documents that match the given criteria. In this case the value must match exactly, it would NOT be able to match part of a value like "learn-".<br>
For example if we wanted to find all articles with 0 upvotes.<br>
<pre>
full-stack-react-db> <code>db.articles.find({upvotes:0})</code>
<samp>
[
  {
    _id: ObjectId('238928320973aueiafej`),
    name: 'learn-node',
    upvotes: 0,
    comments: []
  },
    {
    _id: ObjectId('238289323aueifsfej`),
    name: 'learn-react',
    upvotes: 0,
    comments: []
  },
    {
    _id: ObjectId('2389323843293thjpeiafej`),
    name: 'mongodb',
    upvotes: 0,
    comments: []
  }
]
</samp>
</pre>

MongoDB has many built-in capabilities. The instructor does not show how to query multiple documents for part of a string so I'll show a quick example. For example, what if you wanted to match all documents that had a name that included "learn-"? To do this you could use a nested object that uses a regular expression for the value of "name". The syntax uses `$regex` along with the expression to match.<br>
<pre>
full-stack-react-db> <code>db.articles.find({name: {$regex: 'learn-'}})</code>
<samp>
[
  {
    _id: ObjectId('238928320973aueiafej`),
    name: 'learn-node',
    upvotes: 0,
    comments: []
  },
    {
    _id: ObjectId('238289323aueifsfej`),
    name: 'learn-react',
    upvotes: 0,
    comments: []
  }
]
</samp>
</pre>

NOTE: If you ever want to close the MongoDB shell, you can type `quit()` and press enter.<br>
Don't do this quite yet because we explore MongoDB further in the next lesson.
