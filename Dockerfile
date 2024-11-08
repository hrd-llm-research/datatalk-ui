# Base image for pulling the latest official Node.js image from Docker Hub
FROM node:latest

# Create directory name inside container '-p' flag ensure that directory is created if it doesn't already exist.
RUN mkdir -p /app

# Set working directory inside container
WORKDIR /app

# Copy the package.json and yarn.lock files to install dependencies
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy current local directory to /app which current directory in container
COPY . .

# Install all dependencies in package.json
RUN yarn install

# Used for applications that need to be compiled before run
RUN yarn build

# Expose the port on which your NextJS application will run (change as per your application)
EXPOSE 3000

# Run application when the container starts
CMD ["yarn", "start"]