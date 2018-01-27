# Contributing

Thanks for your interest in contributing to this project! Any contributions from the community are always welcome. Please note that by contributing to Codework, you agree to respect this project's [code of conduct](CODE_OF_CONDUCT.md).

## Bugs, Features, and Feedback

You can use this project's [issue tracker](https://github.com/letscodework/codework/issues) to report bugs, request features, leave feedback, or ask questions. Please just take a quick look through the other issues first to see if a similar one already exists. Also, please try to make your issues as descriptive, clear, and organized as possible. This will go a long way in helping us understand and respond to them. Little things like spacing, indentation, and syntax highlighting can make a big difference!

## Pull Requests

If you'd like to contribute to this project, that's great! You can check out the [issue tracker](https://github.com/letscodework/codework/issues) to see if there's an open issue that you want to work on, or open a new one if there's something else you want to do.

Before you start developing, let's first have a discussion about the issue and your proposed solution. It would suck for you to do any amount of work only to find out it won't be accepted. Once an approach sounds good to everyone, go nuts!

A typical pull request workflow will usually look something like this:

- Choose an existing issue or open a new one.
- Discuss and validate your proposed approach.
- Fork the repository.
- Create a new feature branch based off of the master branch.
- Get to work!
- When you think you're done, verify there are no errors (linting, testing, or building).
- Submit a pull request and reference any related issues.

For more info, check out [*How to Contribute to an Open Source Project on GitHub*](https://egghead.io/courses/how-to-contribute-to-an-open-source-project-on-github). Please do your best to keep your pull request's scope focused and commit history streamlined.

## Project Overview

This project was started using the [vue-cli webpack template](http://vuejs-templates.github.io/webpack/).

The frontend is powered by [Vue](https://vuejs.org/). Styles are written in [Sass (SCSS)](http://sass-lang.com/). Routing is handled by [vue-router](https://router.vuejs.org/en/). [Vuex](https://vuex.vuejs.org/en/intro.html) is used for state management.

The backend uses [Firebase](https://firebase.google.com/).

The folder structure is defined by [vue-cli webpack template](http://vuejs-templates.github.io/webpack/structure.html). Other notable tooling is [Babel](http://babeljs.io/) for the ability to write nextgen JavaScript, and [ESLint](https://eslint.org/) + [stylelint](https://stylelint.io/) for checking the code style.

This project uses additional libraries as necessary for tasks like date handling, parsing Markdown, and more. Those aren't listed in this guide in order to keep the length reasonable, but you can find them in the project's [`package.json`](package.json) file.

## Development Workflow

All development will probably start by forking your own copy of the repository and running `git clone https://github.com/YOUR_GITHUB_USERNAME/codework.git` to clone it to your computer.

After cloning your repo, you'll first want to navigate into the folder and run `yarn install` to download the project's dependencies. We recommend using [Yarn](https://yarnpkg.com/en/), but [npm](https://www.npmjs.com/) works, too.

Once you have the dependencies, you can make use of the npm scripts available to you via the [vue-cli webpack template](http://vuejs-templates.github.io/webpack/commands.html) or others in the [`package.json`](package.json) file.

## Thanks

A very big thank you goes out to those of you who contribute to Codework. Happy hacking!
