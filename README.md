# Web Engineering MAS2023 - Flashcards

This project is part of the Web Engineering course MAS2023 and aims to develop a flashcard application. The application allows users to create, manage, and review flashcards.

The application was developed using React, Vite, TypeScript and HMR (Hot Module Replacement), along with some ESLint rules.

## Table of Contents

- [Web Engineering MAS2023 - Flashcards](#web-engineering-mas2023---flashcards)
  - [Table of Contents](#table-of-contents)
  - [Participants](#participants)
  - [Installation](#installation)
  - [Skripts](#skripts)
  - [Login](#login)
  - [Expanding the ESLint configuration](#expanding-the-eslint-configuration)

## Participants

- Guillaume Fricker
- Benjamin Thormann
- Jvan Fadda

## Installation

1. Clone repository:

    ```sh
    git clone <repository-url>
    cd <repository-name>
    ```

2. Install dependencies:

   ```sh
   pnpm i
   ```

## Skripts

- `pnpm run dev`: Starts both the client and the server in development mode.
- `pnpm run dev:client`: Starts the client in development mode.
- `pnpm run dev:server`: Starts the server in development mode.
- `pnpm run build`: Build project..
- `pnpm run preview`: Preview the built version of the project.
- `pnpm run lint`: Executes ESLint to check the code.

## Login

| Username | Password | Role   |
|----------|----------|--------|
| admin    | admin-pw | Admin  |
| player   | user-pw  | Player |

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
   parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
   },
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list
