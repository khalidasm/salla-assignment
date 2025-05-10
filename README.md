# SALLA ASSIGNMENT

## Project Structure

The project is organized as a monorepo with the following packages:
- `stencil-components`: Core Stencil components with Tailwind CSS integration
- `react-app`: React application using the Stencil components
- `vue-app`: Vue application using the Stencil components

## Getting Started

1. Clone the repository:
```bash
git clone [repository-url]
cd salla-assignment
```

2. Install dependencies:
```bash
npm install
```

3. Build the Stencil components:
```bash
npm run build
```

4. Start the development servers:

To run both React and Vue applications simultaneously:
```bash
npm run dev
```

To run only the Stencil components development server:
```bash
npm run dev:stencil
```

## Available Scripts

- `npm run dev`: Starts both React and Vue applications concurrently
- `npm run dev:stencil`: Starts the Stencil components development server
- `npm run preview`: Starts the React and Vue applications in preview mode
- `npm run build`: Builds the Stencil components and React application
- `npm run test`: Runs tests for the Stencil components

## Development

### Stencil Components
The Stencil components are located in the `packages/stencil-components` directory. These components are built with Tailwind CSS integration.

### React Application
The React application is located in the `packages/react-app` directory. It demonstrates how to use the Stencil components in a React environment.

### Vue Application
The Vue application is located in the `packages/vue-app` directory. It demonstrates how to use the Stencil components in a Vue environment.

## Notes

Note: The original API endpoint (https://checkout.free.beeceptor.com/) was replaced due to rate limiting issues.