<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.15.2/css/all.css" integrity="sha384-vSIIfh2YWi9wW0r9iZe7RJPrKwp6bG+s9QZMoITbCckVJqGCCRhc+ccxNcdpHuYu" crossorigin="anonymous">

[<img src="https://img.shields.io/badge/Linkedin-kathesama-blue?style=for-the-badge&logo=linkedin">](https://www.linkedin.com/in/kathesama)
<br>
![IntellijIdea](https://img.shields.io/badge/Made%20for-IntellijIdea-1f425f.svg?style=for-the-badge)
![ReactJS](https://img.shields.io/badge/-ReactJS-blue?logo=react&logoColor=white&style=for-the-badge)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)
![YARN](https://img.shields.io/badge/YARN-%23000000.svg?style=for-the-badge&logo=yarn&logoColor=white)
<br>
[![GitHub issues](https://img.shields.io/github/issues/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)](https://github.com/kathesama/react-typescript-prettier-eslint-with-husky/issues)
[![GitHub forks](https://img.shields.io/github/forks/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)](https://github.com/kathesama/react-typescript-prettier-eslint-with-husky/network)
[![GitHub stars](https://img.shields.io/github/stars/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)](https://github.com/kathesama/react-typescript-prettier-eslint-with-husky/stargazers)
<br>
![GitHub last commit](https://img.shields.io/github/last-commit/kathesama/react-typescript-prettier-eslint-with-husky?color=red&style=plastic)
![GitHub version commits](https://img.shields.io/github/commits-since/kathesama/react-typescript-prettier-eslint-with-husky/V2.0.0.svg?color=yellow&style=plastic)
![GitHub top language](https://img.shields.io/github/languages/top/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)
<br>
![Maintaned](https://img.shields.io/badge/Maintained%3F-yes-green.svg?style=plastic)

[comment]: <> (![OWASP]&#40;https://img.shields.io/badge/OWASP%3F-yes-green.svg?style=plastic&#41;)

[comment]: <> (![CleanCode]&#40;https://img.shields.io/badge/CleanCode%3F-yes-green.svg?style=plastic&#41;)
[![GitHub license](https://img.shields.io/github/license/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)](https://github.com/kathesama/react-typescript-prettier-eslint-with-husky/blob/main/LICENSE)
![GitHub repo size](https://img.shields.io/github/repo-size/kathesama/react-typescript-prettier-eslint-with-husky?style=plastic)
<br>

# Initial seed for a react project

Steps to run this project

1. Clone this repo
   > git clone https://github.com/kathesama/react-typescript-prettier-eslint-with-husky.git
2. Run install
   > npm install

Then go to _.git/hooks/commit-msg_, find the main function and replace it:

> const commitMsgFilePath = process.argv[2];

with:

> const commitMsgFilePath = path.resolve(process.env.PWD, process.argv[2].substring(1));

-> This fixes _Error: ENOENT: no such file or directory, open 'X:\.git\COMMIT_EDITMSG'_

**Note**: This project uses _git-commit-msg-linter_ package, this one add a nice pattern for work in commit messages<br>

```
correct format: <type>[scope]: <subject>

  type:
    feat     A new feature.
    docs     Documentation only changes.
    style    Changes that do not affect the meaning of the code
              (white-space, formatting, missing semi-colons, etc).
    refactor A code change that neither fixes a bug nor adds a feature.
    test     Adding missing tests or correcting existing ones.
    chore    Changes to the build process or auxiliary tools and
              libraries such as documentation generation.
    perf     A code change that improves performance.
    ci       Changes to your CI configuration files and scripts.
    build    Changes that affect the build system or external dependencies
              (example scopes: gulp, broccoli, npm).
    temp     Temporary commit that won't be included in your CHANGELOG.

  scope:
    Optional, can be anything specifying the scope of the commit change.
    For example $location, $browser, $compile, $rootScope, ngHref, ngClick, ngView, etc.
    In App Development, scope can be a page, a module or a component.

  subject:
    Brief summary of the change in present tense. Not capitalized. No period at the end.
```

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
