# My NPM Workspace

This is a monorepo setup using npm workspaces that contains two main packages: `docs` and `policygen`.

## Packages

### Docs

The `docs` package is an Astro Starlight site that serves as the documentation for the project. It includes:

- **Main Entry Point**: Located at `packages/docs/src/index.astro`, this file defines the structure and content of the documentation site using Astro syntax.
- **Configuration**: The `packages/docs/package.json` file lists the dependencies specific to the Astro site and any scripts for building or serving the site.
- **Astro Configuration**: The `packages/docs/astro.config.mjs` file contains the configuration settings for the Astro project, specifying input and output directories, as well as any integrations or plugins used.

### Policygen

The `policygen` package is a CLI tool designed to generate policies. It includes:

- **Main Entry Point**: Located at `packages/policygen/src/index.ts`, this file contains the logic for generating policies and may include functions for parsing input and outputting generated policies.
- **Configuration**: The `packages/policygen/package.json` file lists the dependencies required for the CLI tool and any scripts for building or running the tool.
- **TypeScript Configuration**: The `packages/policygen/tsconfig.json` file specifies the compiler options, including target, module, and any type definitions needed for the policygen package.

## Setup Instructions

1. Clone the repository:
   ```
   git clone <repository-url>
   cd my-npm-workspace
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. To run the Astro documentation site:
   ```
   cd packages/docs
   npm run dev
   ```

4. To use the policygen CLI tool:
   ```
   cd packages/policygen
   npm run start
   ```

## Usage Guidelines

- For documentation, navigate to the Astro site in your browser after running the development server.
- For the policygen CLI tool, refer to the command line interface for available commands and options.

This workspace is structured to facilitate easy development and maintenance of both the documentation site and the CLI tool.