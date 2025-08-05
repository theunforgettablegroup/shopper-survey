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