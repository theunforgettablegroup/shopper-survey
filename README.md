# Shopper Questionnaire App

## Overview

The Shopper Questionnaire App is a mobile-first web application built with Next.js and React. It allows users to answer a series of questions to determine their shopper profile. The app is designed to be user-friendly and visually appealing, inspired by the color scheme and design of [The Yellow Brick Road](https://theunforgettablegroup.com/the-yellow-brick-road).

## Features

- Interactive questionnaire to assess shopper profiles
- Results page displaying the user's shopper profile
- Responsive design for optimal viewing on mobile devices
- Custom theme based on the provided website

## Project Structure

```
shopper-questionnaire-app
├── src
│   ├── pages
│   │   ├── index.tsx        # Main entry point for the questionnaire
│   │   └── results.tsx      # Displays results of the questionnaire
│   ├── components
│   │   ├── Question.tsx      # Component for rendering questions
│   │   └── ProfileCard.tsx    # Component for displaying shopper profiles
│   ├── styles
│   │   └── theme.ts          # Theme and styling constants
│   └── types
│       └── index.ts          # TypeScript interfaces for data structures
├── public
│   └── favicon.ico           # Favicon for the application
├── package.json              # npm configuration file
├── tsconfig.json             # TypeScript configuration file
└── README.md                 # Project documentation
```

# Prerequisites

Before you begin, ensure you have the following installed and set up:

1. **Node.js (via nvm recommended):**
   - Install [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm)
   - Use nvm to install the required Node.js version (see `package.json` for the version used in this project):
     ```
     nvm install
     nvm use
     ```

2. **Docker Desktop:**
   - Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)
   - Make sure Docker Desktop is running before starting Supabase locally.

3. **Supabase CLI:**
   - Install globally with:
     ```
     npm install -g supabase
     ```

4. **npm (Node Package Manager):**
   - Comes with Node.js, but ensure you have it available:
     ```
     npm -v
     ```

## Environment Variables Setup

Before running the app, you need to configure environment variables for Supabase:

1. In the project root, create a `.env.local` file (and optionally a `.env` file for shared settings).
2. Go to your Supabase project dashboard and navigate to **Project Settings > API**.
3. Copy the following values from the Supabase console:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
4. Paste them into your `.env.local` file like this:
   ```env
   SUPABASE_URL=your-supabase-url
   SUPABASE_ANON_KEY=your-anon-key
   ```
5. Save the file. The app will now use these credentials to connect to Supabase.

---

## Installation

1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the project directory:
   ```
   cd shopper-questionnaire-app
   ```
3. Install dependencies:
   ```
   npm install
   ```

## Running Supabase Locally

To run Supabase locally and ensure your database is up-to-date and seeded:

1. **Install Supabase CLI** (if not already installed):

   ```
   npm install -g supabase
   ```

2. **Start Supabase locally**:

   ```
   supabase start
   ```

   This will start Supabase services (database, API, etc.) locally.

3. **Run database migrations**:

   ```
   supabase db push
   ```

   This applies all migrations in the `supabase/migrations` directory to your local database.

4. **Seed the database**:

   ```
   npm run seed:questions
   ```

   This will run the script in `scripts/seedQuestions.ts` to populate initial data.

5. **Connect your app to local Supabase**:
   Ensure your environment variables (e.g., `SUPABASE_URL`, `SUPABASE_ANON_KEY`) are set to use the local instance. Refer to Supabase docs for details.

---

## Running the Application

To start the development server, run:

```
npm run dev
```

The application will be available at `http://localhost:3000`.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License. See the LICENSE file for details.
