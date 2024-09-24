![Postgres](https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

# Elixir Exchange

A web platform that allows users to discover, share, and save drink recipes. Whether you're searching for classic cocktails, experimenting with mocktails, or creating your own signature drinks, Elixir Exchange brings together a community of drink enthusiasts to explore, rate, and review their favorite elixirs.

## Table of Contents

- [Features](#features)
- [Future Development](#future-development)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
- [API Integrations](#api-integrations)
- [Contributing](#contributing)
- [License](#license)

## Features

- **User Authentication**: Create an account or use social login (Google, GitHub) to manage your profile, save favorite recipes, and submit your own drink creations.
- **Recipe Submission**: Share your favorite drink recipes by submitting ingredients, instructions, and photos. Support for image uploads via Cloudinary. type (cocktail, mocktail), or occasion (e.g., party, summer drinks).
- **Favorites & Bookmarks**: Save drink recipes to your personal favorites, stored in your profile and accessible even when logged out.
- **Drink Inspiration**: Explore a randomly featured drink each day.
- **Third-Party Recipes**: Browse a wide catalog of pre-existing cocktails from the CocktailDB API.


## Future Development

- **Nutritional Analysis**: Discover the nutritional content of your favorite drinks using the Edamam API.

## Tech Stack

- **Frontend**: React (TypeScript), CSS (Tailwind or Bootstrap)
- **Backend**: Node.js, Express
- **Database**: PostgreSQL
- **Deployment**: Render
- **APIs**:
  - **CocktailDB**: To fetch pre-existing cocktail recipes.

## Getting Started

To get a local copy of **Elixir Exchange** up and running, follow these steps:

### Prerequisites

- Node.js (v20+)
- PostgreSQL (v12+)

### Installation

1. Clone the repository:

    ```bash
    git clone https://github.com/RubenDguez/ElixirExchange.git
    ```

2. Navigate to the project directory:

    ```bash
    cd elixir-exchange
    ```

3. Set up environment variables by creating a `.env` file in the root directory with the following keys:

    ```plaintext
    DB_NAME='elixir_exchange_db'
    DB_USER='postgres'
    DB_PASSWORD='your db password'
    JWT_SECRET_KEY='your-super-generated-key'
    ```

4. Install dependencies:

    ```bash
    npm install
    npm run render-build
    ```

5. Start the development server:

    ```bash
    npm run start:dev
    ```

6. Access the app at `http://localhost:3000`.

## API Integrations

- **CocktailDB API**: Supplies a large collection of pre-existing cocktail recipes for users to browse.

## Contributing

We welcome contributions to improve **Elixir Exchange**. To contribute:

1. Fork the repository.
2. Create a feature branch:

    ```bash
    git checkout -b feature-name
    ```

3. Commit your changes:

    ```bash
    git commit -m "Add feature name"
    ```

4. Push the branch:

    ```bash
    git push origin feature-name
    ```

5. Open a pull request and describe your changes.

## License

**Elixir Exchange** is licensed under the MIT License. See the [LICENSE](LICENSE) file for more information.
