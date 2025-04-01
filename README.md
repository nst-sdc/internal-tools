# SDC Internal Tools

A full-stack web application built with Vue 3, Express, and MongoDB for internal tools management.

## Overview

This application provides a modern and responsive user interface built with Vue 3 and Tailwind CSS, backed by an Express server and MongoDB database. It allows for submission and retrieval of various types of data through a flexible schema design.

## Features

- **Vue 3 Frontend**: Modern SPA with Vue 3, Vue Router, and Pinia for state management
- **Tailwind CSS**: Utility-first CSS framework for responsive design
- **Express Backend**: RESTful API server built with Express.js
- **MongoDB**: NoSQL database for storing flexible document structures
- **Full-stack TypeScript**: Type safety across the entire application
- **Form Validation**: Using Vee-Validate and Zod for robust form validation
- **Component Library**: Custom UI components built with Radix Vue

## Project Structure

```
sdc-internal-tools/
├── src/                    # Frontend source code
│   ├── assets/             # Static assets (images, CSS)
│   ├── components/         # Reusable Vue components
│   ├── layouts/            # Page layout components
│   ├── lib/                # Utility functions and helpers
│   ├── pages/              # Page components
│   ├── router/             # Vue Router configuration
│   ├── stores/             # Pinia state management
│   ├── App.vue             # Root component
│   └── main.ts             # Entry point
├── public/                 # Public assets
├── server.js               # Express server and API routes
├── vite.config.ts          # Vite configuration
├── tailwind.config.js      # Tailwind CSS configuration
└── package.json            # Dependencies and scripts
```

## API Endpoints

| Endpoint            | Method | Description                            |
| ------------------- | ------ | -------------------------------------- |
| `/api/submit/:type` | POST   | Submit a new entry with specified type |
| `/api/submissions`  | GET    | Retrieve all submissions               |

## Prerequisites

- Node.js (v16 or higher)
- MongoDB (local or remote)
- npm or yarn

## Getting Started

### Environment Setup

Create a `.env` file in the root directory with the following variables:

```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/projectsDb
```

### Installation

```sh
# Install dependencies
npm install
```

### Development

```sh
# Run both backend and frontend in development mode
npm run dev

npm run dev:client   # Frontend only
```

### Production

```sh
# Build the frontend
npm run build

# Start the production server
npm start
```

## Linting and Formatting

```sh
# Lint and fix issues
npm run lint

```