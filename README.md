# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Zach's notes about the project not in code comments

Some decisions taken were to use `fetch` for simplicity of getting started, and to use MaterialUI
as they have already made the effort to ensure components are well styled, responsive, and accessible.
The app was easy to make fully keyboard-navigable and responsive as a result.

Styled-components was added even though MaterialUI already has much (if not all) of the needed functionality
because I wanted to treat them as separate libraries with different purposes. This is more of a mental choice
than a technical requirement, but this sort of delineation often helps when deciding to adopt a new library or not.

## Available Scripts

### `npm install`

Installs dependencies

### `npm run start`

Starts the app at localhost:3000

### `npm run test`

Runs Jest unit tests in watch mode
