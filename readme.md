# Running the Project with Docker

This project utilizes Docker for containerized deployment of its backend and frontend services. Follow the steps below to build and run the project using Docker Compose.

## Prerequisites

- Ensure Docker and Docker Compose are installed on your system.
- Backend service requires Python 3.9 and dependencies specified in `requirements.txt`.
- Frontend service uses Node.js version 22.13.1.

## Environment Variables

- Backend: No specific environment variables are required.
- Frontend: Ensure the `.env.local` file is present in the `./frontend` directory for environment-specific configurations.

## Build and Run Instructions

1. Navigate to the project's root directory.
2. Build and start the services using Docker Compose:

   ```bash
   docker-compose up --build
   ```

3. Access the services:
   - Backend: [http://localhost:8000](http://localhost:8000)
   - Frontend: [http://localhost:3000](http://localhost:3000)

## Exposed Ports

- Backend: 8000
- Frontend: 3000

## Notes

- The backend service is built from the `./backend` directory and uses `uvicorn` to serve the application.
- The frontend service is built from the `./frontend` directory and serves the application using Node.js.

For further details, refer to the respective `Dockerfile` and `docker-compose.yml` files.