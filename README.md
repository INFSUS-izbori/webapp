# Election Management Web Application

This web application provides a platform for managing political candidates and parties for an election. Users can view, create, edit, and delete candidates and parties. The application features a responsive user interface built with React and Tailwind CSS, and it communicates with a backend API to handle data persistence.

## Table of Contents

-   [Features](#features)
-   [Technology Stack](#technology-stack)
-   [Project Structure](#project-structure)
-   [Getting Started](#getting-started)
    -   [Prerequisites](#prerequisites)
    -   [Installation](#installation)
    -   [Running the Application](#running-the-application)
-   [Available Scripts](#available-scripts)
-   [API Endpoints](#api-endpoints)
-   [Key Components](#key-components)
-   [Design Principles](#design-principles)

## Features

-   **Candidate Management:**
    -   View a list of all candidates with details like OIB, name, image, description, associated party, and creation date.
    -   Create new candidates with OIB, name, image, description, and party affiliation.
    -   Edit existing candidate details.
    -   Delete candidates.
    -   Search candidates by name or OIB.
    -   Image upload and preview for candidate photos.
    -   OIB input restricted to 11 numeric characters.
-   **Party Management:**
    -   View a list of all parties with details like name, description, date of establishment, logo, and creation date.
    -   Create new parties with name, description, date of establishment, and logo.
    -   Edit existing party details.
    -   Delete parties.
    -   View party details, including a list of associated candidates.
    -   Search parties by name.
    -   Search candidates within a party's detail page.
    -   Image upload and preview for party logos.
-   **User Interface:**
    -   Responsive design for various screen sizes.
    -   User-friendly navigation.
    -   Toast notifications for success and error messages.
    -   Styled forms and tables for a clean user experience.
    -   Date formatting for better readability (Mon DD, YYYY).
-   **Independent Candidates:** Candidates can be marked as "Nezavisan" (Independent) if not affiliated with any party.

## Technology Stack

-   **Frontend:**
    -   React 19
    -   React Router DOM for navigation
    -   Vite as the build tool and development server
    -   Tailwind CSS for styling
    -   Axios for HTTP requests
    -   ESLint for code linting

## Project Structure

The project follows a standard React application structure:

```
webapp/
├── .gitignore
├── eslint.config.js
├── index.html
├── package.json
├── README.md
├── vite.config.js
├── public/
│   └── vite.svg
└── src/
    ├── App.jsx                 # Main application component with routing
    ├── index.css             # Global styles and Tailwind CSS imports
    ├── main.jsx                # Entry point of the React application
    ├── assets/                 # Static assets like images (if any)
    ├── components/             # Reusable UI components
    │   ├── Base64Image.jsx
    │   ├── ImageInput.jsx
    │   ├── Navbar.jsx
    │   └── ToastMessage.jsx
    ├── controllers/            # Services to interact with the backend API
    │   ├── candidate.controller.js
    │   └── party.controller.js
    ├── models/                 # Data models/classes
    │   ├── Candidate.js
    │   └── Party.js
    └── views/                  # Page components
        ├── CandidateEditPage.jsx
        ├── CandidatesListPage.jsx
        ├── PartyDetailPage.jsx
        ├── PartyEditPage.jsx
        └── PartyListPage.jsx
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   Node.js (v18.x or later recommended)
-   npm (usually comes with Node.js) or yarn
-   A running instance of the backend API service. Ensure the `API_URL` constants in `src/controllers/*.controller.js` point to the correct backend endpoints (currently `http://localhost:3000/api/...`).

### Installation

1.  **Clone the repository (if applicable):**

    ```bash
    git clone https://github.com/INFSUS-izbori/webapp.git
    cd webapp
    ```

2.  **Install dependencies:**
    Open your terminal in the `webapp` directory and run:
    ```bash
    npm install
    ```
    or if you prefer yarn:
    ```bash
    yarn install
    ```

### Running the Application

Once the dependencies are installed, you can start the development server:

```bash
npm run dev
```

or with yarn:

```bash
yarn dev
```

This will start the Vite development server, typically at `http://localhost:5173` (the port might vary if 5173 is in use). Open this URL in your web browser to see the application.

## Available Scripts

In the `package.json` file, you can find several scripts:

-   `npm run dev`: Starts the development server with Hot Module Replacement (HMR).
-   `npm run build`: Builds the application for production to the `dist` folder.
-   `npm run lint`: Lints the project files using ESLint.
-   `npm run preview`: Serves the production build locally to preview it.

## API Endpoints

The application interacts with a backend API. The base URLs are defined in the controller files:

-   **Candidates:** `http://localhost:3000/api/candidates`
    -   `GET /`: Fetch all candidates.
    -   `GET /{id}`: Fetch a single candidate by ID.
    -   `POST /`: Create a new candidate.
    -   `PUT /{id}`: Update an existing candidate.
    -   `DELETE /{id}`: Delete a candidate.
-   **Parties:** `http://localhost:3000/api/parties`
    -   `GET /`: Fetch all parties.
    -   `GET /{id}`: Fetch a single party by ID.
    -   `POST /`: Create a new party.
    -   `PUT /{id}`: Update an existing party.
    -   `DELETE /{id}`: Delete a party.

Ensure your backend service exposes these endpoints.

## Key Components

-   **`Navbar.jsx`**: Provides navigation links to the "Candidates" and "Parties" pages.
-   **`ImageInput.jsx`**: A reusable component for uploading images, converting them to Base64, and displaying a preview. Used for candidate photos and party logos.
-   **`Base64Image.jsx`**: Displays an image from a Base64 string.
-   **`ToastMessage.jsx`**: Shows success or error notifications to the user.
-   **List Pages (`CandidatesListPage.jsx`, `PartyListPage.jsx`)**: Display items in a table, include search functionality, and provide links to create, edit, view, or delete items.
-   **Edit Pages (`CandidateEditPage.jsx`, `PartyEditPage.jsx`)**: Forms for creating new or editing existing candidates/parties. Include input validation and image handling.
-   **Detail Page (`PartyDetailPage.jsx`)**: Shows detailed information about a party and lists its affiliated candidates.

## Design Principles

-   **Model-View-Controller (MVC) like structure:**
    -   **Models (`src/models/`)**: Define the structure of data (Candidate, Party).
    -   **Views (`src/views/`, `src/components/`)**: React components responsible for the UI.
    -   **Controllers (`src/controllers/`)**: Services that handle business logic and API interactions, separating concerns from the UI components.
-   **Component-Based Architecture:** Leverages React's component model for building a modular and maintainable UI.
-   **Reusable Components:** Common UI elements like image inputs and toast messages are built as reusable components.
-   **State Management:** Primarily uses React's `useState` and `useEffect` hooks for managing component state and side effects. Custom hooks (`useCandidateFormLogic`, `usePartyFormLogic`) are used to encapsulate form logic.
-   **Styling:** Utilizes Tailwind CSS for a utility-first CSS framework, allowing for rapid UI development and customization. Global styles and base component styles are defined in `src/index.css`.
