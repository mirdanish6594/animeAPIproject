# Anime Search Project

This project allows users to search for information about anime using the Jikan API. Users can enter the name of an anime, and the application will fetch and display relevant details.

### Prerequisites

- Node.js and npm
- [Vercel CLI](https://vercel.com/docs/cli) (for deployment)

### Installation

1.  Clone the repository to your local machine:
    ```bash
    git clone [https://github.com/your-username/anime-search-project.git](https://github.com/your-username/anime-search-project.git)
    ```

2.  Navigate to the project directory:
    ```bash
    cd anime-search-project
    ```

3.  Install project dependencies:
    ```bash
    npm install
    ```

### Usage (Local Development)

1.  Start the development server:
    ```bash
    npm run dev
    ```
    This will use `nodemon` to automatically restart the server on file changes.

2.  Open your web browser and go to `http://localhost:3000`.

### Deployment to Vercel

This project is configured for easy deployment on Vercel.

1.  Log in to Vercel from your terminal:
    ```bash
    vercel login
    ```

2.  Deploy the project to production:
    ```bash
    vercel --prod
    ```

Vercel will automatically detect the configuration and deploy your application.

### API Used

This project utilizes the [Jikan API v4](https://docs.api.jikan.moe/), a RESTful API for MyAnimeList.
