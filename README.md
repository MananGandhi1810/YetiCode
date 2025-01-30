# YetiCode: Revolutionizing Software Development

YetiCode is a web application designed to significantly reduce development time and the number of bugs in your projects. We leverage the power of AI-driven micro-tools to provide developers with seamless integration, code analysis, security scanning, and automated testing capabilities.

**Core Features:**

-   **Instant Code Insights:** Receive AI-generated README files, best practices, and real-time code reviews for improved code clarity and maintainability.
-   **Enhanced Security:** Identify vulnerabilities and security risks in your codebase before they become a major concern.
-   **Smarter Testing:** Automatically generate and run tests with AI assistance, covering a wider range of scenarios and edge cases.
-   **Automated Updates:** Receive real-time alerts on every push, providing constant monitoring and immediate insights into your application.

**Tech Stack:**

-   **Frontend:** Next.js, Tailwind CSS, Lucide React
-   **Backend (Hosting):** Node.js, Express.js, Prisma (ORM), PostgreSQL, Redis, Docker, Docker Compose, Pusher (Real-time communication), Resend (Email delivery), Github API
-   **Backend (Processing):** Flask, Python 3.12, Google Gemini API, Redis

**Setup Guide:**

1. **Clone the Repository:** Clone this repository to your local machine.
2. **Environment Variables:** Ensure you have properly configured environment variables in the `.env` files. The `.env.example` files provide guidance. You need to obtain credentials from the necessary services including GitHub, Redis, Google AI Platform, and optionally, Pusher and Resend.
3. **Database Setup:** Set up a PostgreSQL database and ensure your `DATABASE_URL` is correctly set. Ensure you create a schema named "public".
4. **Redis Setup:** Set up a Redis instance and configure the `REDIS_URL` variable.
5. **Google Gemini API key:** Get a Gemini API key from Google AI Platform and set the `GEMINI_API_KEY` environment variable.
6. **Start Services:**
    - Navigate to the backend directory: `cd hosting-backend`. Run `npm install`, and then execute `docker-compose up -d` to start the backend services (PostgreSQL, Redis, Python and NodeJS servers).
    - Navigate to the frontend directory: `cd ../frontend`. Execute `npm install` and `npm run dev` to start the frontend in development mode.
    - Navigate to the webhook directory: `cd ../webhook`. Execute `npm install` and `npm run dev` to start the webhook service.

**Workflows (GitHub Actions):**

Two GitHub Actions workflows (`express.yaml` and `python.yaml`) are included. These workflows allow for automatic building and publishing of Docker images to GitHub Container Registry when commits with the '[backend]' or '[all]' tag are pushed to the main branch. This sets up CI/CD for your backend services.

**Project Structure:**

The repository is organized into three main parts:

-   **frontend:** Contains the Next.js frontend code.
-   **backend:** Contains the main backend API written in Python.
-   **webhook:** Contains the webhook service written in NodeJS, which receives events from Github.
-   **hosting-backend:** Contains the NodeJS service which hosts all projects.

**Contribution:**

Contributions are welcome! Please open issues or submit pull requests.
