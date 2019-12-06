# Advent Of Code
This project will contain my advent of code submitions along with a nice nodejs wrapper to run them

# How to run

## Prerequisites 

* You must have [node](https://nodejs.org/en/download/) installed globally to run.  
* You must know (or be able to get) your [session ID](#How-to-get-your-session-Id) from advent of code
  * This will allow you to download 'Part 2' of the descriptions


## Running

Clone the repo 

```
git clone https://github.com/GeorgeLee134/advent-of-code.git
```

Install dependencies

```
cd 'advent-of-code'
npm i
```

Create a `.env` file and input your session id in that, it should end up looking like this

```
SESSION_VALUE='your session id goes here'
```

Run the app
```
npm run start
```

Or

```
node server.js
```

Create

That's it!


# How to get your session Id

Goto advent of code and login, using your favourite webdev tool look at your cookies; There should be one there called session, copy that value.





![DOG](https://raw.github.com/GeorgeLee134/advent-of-code/master/DOG.gif)