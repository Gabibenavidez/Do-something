# Do Something

🌟 Do Something is a web application built with React and Vite that helps you discover and organize various activities to do. It allows you to explore different types of activities and add them to your to-do list.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [API Consuming](#api-consuming)
  - [Hooks](#hooks)
  - [Custom Hooks](#custom-hooks)
  - [Data Fetching](#data-fetching)
  - [Error Handling](#error-handling)

## Features

✨ Browse and search for different activities
✨ Add activities to your to-do list
✨ Remove activities from your list
✨ Filter activities by type or number of participants
✨ User authentication and login

## Installation

To run the project locally, follow these steps:

1. Clone the repository: `git clone https://github.com/Gabibenavidez/Do-something.git`
2. Navigate to the project directory: `cd Do-something`
3. Install the dependencies: `npm install`

## Usage

1. Start the development server: `npm run dev`
2. Open your browser and visit: `http://localhost:5173`

## Technologies

🚀 React: JavaScript library for building user interfaces
🚀 Vite: Next-generation frontend tooling
🚀 React Router: Library for handling routing in a React application
🚀 Formik: Form library for React applications
🚀 Yup: JavaScript schema validation library
🚀 SCSS: Styling and layout
🚀 Axios: HTTP client for making API requests
🚀 LocalStorage: Browser storage for persisting user data

## API Consuming

The project consumes data from an external API to fetch the activities. It utilizes various techniques and patterns to handle API requests and manage the data.

### Hooks

🎣 React hooks are used extensively throughout the project to manage state and side effects. The `useState` hook is used to store and update the application's state, while the `useEffect` hook is used to perform side effects such as fetching data from the API.

### Custom Hooks

The project includes custom hooks that encapsulate specific functionalities related to API consuming.

- `useActivities`: This custom hook handles the API requests related to activities. It provides functions to fetch activities, add activities to the to-do list, and remove activities from the list.

- `useUser`: This custom hook handles user-related API requests, such as user authentication and login. It provides functions to authenticate users and login with credentials.

### Data Fetching

🌐 Axios, an HTTP client, is used to make API requests to fetch data from the external API. The Axios library provides a simple and efficient way to handle asynchronous HTTP requests and manage responses.

The custom hooks mentioned above utilize Axios to make the API requests. The fetched data is then processed and used to populate the UI and provide the necessary functionality for users to interact with the application.

### Error Handling

❗ Error handling is an important aspect of consuming APIs. The project includes error handling mechanisms to gracefully handle API errors and display relevant error messages to the users.

The `ErrorContext`, a custom React context, is used to manage and propagate errors throughout the application. It provides a centralized place to store and retrieve error messages, ensuring consistent error handling across components.
