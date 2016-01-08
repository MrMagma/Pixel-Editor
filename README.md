# Pixel Editor

## About

This project is an online pixel art editor made using React and JSX with the goal of simplifying my own game development workflow and hopefully those of others as well. This project was also begun as a way for me to learn one of the top web frameworks around and make an decently large app. The Flux architecture has been used extensively in this project and has proven to lend itself very well to my requirements.

## Setup

The `dist/` folder contains pre-built versions of all files and allows the project to be used right away by simply opening `index.html` from the root directory in your browser. If you make any changes to the code they will need to be built to take effect. Follow the steps below to get things set up for building.

1. If you do not have Node.js installed then download it from [here](https://nodejs.org/en/download/).
2. Open a command prompt in the project directory.
3. If you do not already have gulp installed globally I would highly recommend doing so. To install gulp type `npm install -g gulp` into your command prompt and press enter or return.
4. In your command prompt type `npm install` and press enter or return depending upon your keyboard. Now wait for the project dependencies to install.
5. Once the dependencies have finished installing run `gulp build` from your command prompt to build your changes into the project.
6. Congratulations! Your changes are now built.
