# syntax=docker/dockerfile:1

# Use the official Node.js image as the base image
ARG NODE_VERSION=22.13.1
FROM node:${NODE_VERSION}-slim AS base

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json for dependency installation
COPY --link package.json package-lock.json ./

RUN npm install -g npm@11.2.0

# Install dependencies using npm ci for deterministic builds
RUN --mount=type=cache,target=/root/.npm \
    npm ci --production

# Copy the application source code
COPY --link . .

# Build the application

RUN npm run build


# Use a minimal Node.js image for the final stage
FROM node:${NODE_VERSION}-slim AS final

# Set the working directory
WORKDIR /app

# Copy the built application and dependencies from the build stage
COPY --from=base /app .

# Set environment variables
ENV NODE_ENV=production
ENV PORT=3000

# Expose the application port
EXPOSE 3000

# Run the application
CMD ["npm", "start"]