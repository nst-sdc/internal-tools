# Internal Tools Platform

A comprehensive platform for managing and submitting various types of entries including GSoC profiles, projects, and competition details. This application allows users to submit their information and view all submissions in a centralized dashboard.


## 🔍 Project Overview

This platform is designed to collect and display various submission types including:
- Google Summer of Code (GSoC) profiles
- Project submissions
- Competition entries

The system provides a user-friendly interface for submitting entries and a centralized dashboard for viewing all submissions with filtering capabilities.

## Project Structure

```
internal-tools/
├── public/              # Static assets
├── server.js            # Express server and MongoDB connection
├── src/
│   ├── assets/          # CSS and other assets
│   ├── components/      # Vue components
│   │   ├── ui/          # UI component library
│   │   └── *Card.vue    # Submission cards
│   ├── layouts/         # Layout templates
│   ├── lib/             # Utilities and API helpers
│   ├── pages/           # Page components
│   ├── router/          # Vue Router configuration
│   ├── stores/          # State management
│   ├── App.vue          # Root Vue component
│   └── main.ts          # Application entry point
├── package.json         # Project dependencies
├── vite.config.ts       # Vite configuration
└── ...                  # Other configuration files
```

### Key Files and Directories

- **Components**
  - `CompetitionSubmissionCard.vue`: Displays competition submission details
  - `GSoCSubmissionCard.vue`: Displays GSoC profile details
  - `ProjectSubmissionCard.vue`: Displays project submission details
  - `ui/`: Core UI components library

- **Pages**
  - `HomePage.vue`: Landing page
  - `SubmissionsPage.vue`: Displays all submissions with filtering
  - `SubmitCompetitionDetailsPage.vue`: Form for competition submissions
  - `SubmitGoogleSummerOfCodeDetailsPage.vue`: Form for GSoC profiles
  - `SubmitProjectDetailsPage.vue`: Form for project submissions

- **Backend**
  - `server.js`: Express server setup with MongoDB connection
  - `lib/api.ts`: API client for frontend-backend communication

##  Technology Stack

- **Frontend**:
  - Vue 3 (Composition API)
  - TypeScript
  - Vite
  - Vue Router
  - Tailwind CSS
  - Auto Form (form generation)

- **Backend**:
  - Node.js
  - Express
  - MongoDB with Mongoose

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)

### Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/nst-sdc/internal-tools.git
   cd internal-tools
   ```

2. Install dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the project root with the following content:
   ```
   MONGODB_URI=mongodb://localhost:27017/projectsDb
   PORT=3000
   ```
   (Adjust MongoDB URI as needed)

### Development

1. Start MongoDB (if running locally):
   ```sh
   mongod
   ```

2. Start the development server:
   ```sh
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

### Production

1. Build the project:
   ```sh
   npm run build
   ```

2. Start the production server:
   ```sh
   node server.js
   ```

## 💾 Database

The application uses MongoDB to store all submissions. The main collection is `submissions` with the following schema:

```javascript
{
  type: String,          // Type of submission: 'gsoc-profile', 'project', 'competition'
  data: Object,          // The submission data - structure varies by type
  createdAt: Date,       // Automatically generated timestamp
  updatedAt: Date        // Automatically generated timestamp
}
```

### Submission Types and Data Structures

1. **GSoC Submissions**:
   ```javascript
   {
     name: String,
     githubEmail: String,
     collegeEmail: String,
     githubId: String,
     organizations: [
       {
         name: String,
         projects: [
           {
             name: String,
             githubLink: String,
             prs: [
               {
                 prLink: String,
                 status: String // 'Open', 'Merged', or 'Closed'
               }
             ]
           }
         ]
       }
     ]
   }
   ```

2. **Project Submissions**:
   ```javascript
   {
     name: String,
     email: String,
     projectName: String,
     projectDescription: String,
     projectLink: String,
     projectGithubLink: String
   }
   ```

3. **Competition Submissions**:
   ```javascript
   {
     name: String,
     email: String,
     competitionName: String,
     description: String,
     competitionUrl: String,
     teamMembers: [
       {
         name: String,
         email: String
       }
     ]
   }
   ```

##  API Endpoints

The application provides the following API endpoints:

- **POST `/api/submit/:type`**
  - Submit a new entry
  - Parameters:
    - `:type` - The type of submission (`gsoc-profile`, `project`, `competition`)
  - Body: The submission data

- **GET `/api/submissions`**
  - Get all submissions
  - Optional query parameters for filtering

## 👥 Contributing

### Development Workflow

1. **Fork and clone the repository**:
   ```sh
   git clone https://github.com/nst-sdc/internal-tools.git
   cd internal-tools
   ```

2. **Create a new branch**:
   ```sh
   git checkout -b feature/your-feature-name
   ```

3. **Make your changes**:
   - Follow the code style guidelines
   - Add appropriate comments
   - Update documentation as needed

4. **Test your changes**:
   ```sh
   npm run dev
   ```

5. **Commit your changes**:
   ```sh
   git add .
   git commit -m "feat: add your feature description"
   ```

6. **Push to your fork**:
   ```sh
   git push origin feature/your-feature-name
   ```

7. **Create a Pull Request**:
   - Go to the original repository
   - Click on "New Pull Request"
   - Select your fork and branch
   - Provide a clear description of your changes

### Code Style

- Follow the existing code style
- Use TypeScript types for all new components and functions
- Use Vue's Composition API for new components
- Write meaningful comments and documentation

### Pull Request Process

1. Ensure your PR has a clear title and description
2. Update documentation if applicable
3. Make sure all tests pass
4. Address any review comments promptly

##  Data Integrity and Updates

When making changes to the application, it's important to maintain data integrity, especially during updates. Follow these guidelines:

### Schema Changes

When modifying the data structure:

1. **Create migration scripts**:
   - Place migration scripts in the `scripts/migrations` directory
   - Document the purpose of each migration script

2. **Handle data conversion**:
   - Include code to convert existing data to the new format
   - Test migration with a copy of production data

3. **Backward compatibility**:
   - Ensure that the application can still read older data formats
   - Use type guards to handle different data structures

Example of handling schema changes in code:

```typescript
function handleLegacyData(submission: any) {
  // Convert legacy data format to current format
  if (!submission.data.email && submission.data.userEmail) {
    submission.data.email = submission.data.userEmail;
  }
  return submission;
}
```

### Database Backups

Before any major update:

1. **Create a database backup**:
   ```sh
   mongodump --db projectsDb --out backups/$(date +%Y-%m-%d)
   ```

2. **Store backups securely**:
   - Keep multiple backup versions
   - Consider off-site backups for added security

3. **Document restoration process**:
   ```sh
   mongorestore --db projectsDb backups/YYYY-MM-DD/projectsDb
   ```

### Testing Updates

1. **Create a test environment** that mirrors production
2. **Use real data samples** (anonymized if necessary)
3. **Verify all CRUD operations** before deploying

## 🔧 Troubleshooting

Common issues and solutions:

1. **MongoDB Connection Issues**:
   - Verify MongoDB is running: `ps -ef | grep mongo`
   - Check connection string in `.env` file
   - Ensure network connectivity to database server

2. **Form Submission Errors**:
   - Check browser console for JavaScript errors
   - Verify API endpoint status in Network tab
   - Ensure form data structure matches expected schema

3. **Data Not Displaying**:
   - Check data retrieval in browser Network tab
   - Verify data loading state in Vue DevTools
   - Check for type errors in console



---

© 2025 Internal Tools Platform
