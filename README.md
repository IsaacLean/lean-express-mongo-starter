# Lean Express/Mongo Starter
This codebase can help you kickoff your next Express & MongoDB project.

## Features
### Main Dependencies
* [Express](https://expressjs.com)
* [Mongoose](http://mongoosejs.com)
* [MongoDB](https://mongodb.com)

### Easy Setup
Run ```npm install``` to download and install almost all the dependencies you need to run the project. With this command alone you'll be able to run most of the application, but if you want to run the examples that require a database you'll need to install MongoDB.

After MongoDB is installed, run the daemon ```mongod``` alongside the application to get database-dependent functionality working.

### Convenient Development
Simply run ```npm run watch``` to start the application.

While it's running with the watch script, any changes you do to your JavaScript will trigger the application to restart so you don't need to manually do it yourself.

Use [ESLint](https://eslint.org) and [Prettier](https://prettier.io) to avoid bugs and keep your code formatting clear and consistent.

Debug with [Chrome DevTools](https://developer.chrome.com/devtools) by running ```npm run debug```.

### Testing
Test your code with [Mocha](https://mochajs.org) and [Chai](http://chaijs.com). Test how your application works with HTTP with [SuperTest](https://github.com/visionmedia/supertest).

### Ready for Customization
The configurations are designed to be as clean and minimal as possible, giving you an easier time reading, understanding, and customizing the codebase.

### Heroku
If you want to to deploy to [Heroku](https://heroku.com), checkout the ```heroku``` branch.