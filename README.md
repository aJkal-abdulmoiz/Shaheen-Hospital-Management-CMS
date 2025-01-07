# Hospital-Management-System

## Table of Contents
1. [Semester Project](#semester-project)
2. [Group Members](#group-members)
3. [Project Overview](#project-overview)
4. [GitHub Configuration(CI/CD)](#github-configuratio-(ci/cd))
5. [Slack Configuration](#slack-configuration)
6. [Email Configuration](#email-configuration)
7. [Docker Configuration](#docker-configuration)
    - [Frontend: React User Interface](#frontend-react-user-interface)
    - [Frontend: Admin Interface](#frontend-admin-interface)
    - [Backend: CMS-Backend](#backend-cms-backend)
8. [Docker-compose.yml](#docker-composeyml)
    - [Setup Instructions](#setup-instructions)
9. [CI/CD Using GitLab](#cicd-using-gitlab)
    - [Build and Push](#build-and-push)
    - [Pull and Deploy](#pull-and-deploy)
10. [Conclusion](#conclusion)

## Semester Project


## Group Members:
- Abdul Moiz (221028)
- Touseef Hanif (220995)
- Amman Ahmed Khan (221036)

## Project Overview
This project demonstrates the successful implementation of a comprehensive Hospital Management System using the MERN stack. By leveraging Docker for containerization and GitLab CI/CD pipelines, we have achieved a robust DevOps workflow that ensures continuous integration and deployment. The integration of Jenkins for CI/CD with GitHub webhooks, Slack, and email notifications further enhances the automation and monitoring capabilities of the system. This project showcases the effective application of modern DevOps practices to streamline development, deployment, and maintenance processes, ultimately leading to a more efficient and reliable software delivery pipeline.



## GitHub Configuration(CI/CD)
1. Go to Jenkins and add Credentials.
2. Create a Freestyle Project job.
3. Click the Build Now icon to see commits applying CI/CD (continuous delivery).
4. Go to GitHub and add webhooks for automatically triggering any changes.
5. Triggered Automatically applying CI/CD (continuous deployment).

## Slack Configuration
1. Set up and get credentials from Slack.
2. Add Slack credentials to Jenkins.
3. Add members to Slack.
4. Set up Slack notifications in Jenkins.
5. Slack notifications build successfully.

## Email Configuration
1. Set up email credentials.
2. Email notifications build successfully.
## Docker Configuration
## Frontend: React User Interface
### Dockerfile (Frontend)
```Dockerfile
# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5173 (default Vite port for dev server)
EXPOSE 5173

# Start the development server (this is for development purposes)
CMD ["npm", "run", "dev"] 
```
## Commands for Frontend
1. Build the Docker Image

```
docker build -t react-user-interface .
```
2. Run Locally
```
docker run -it -p 5173:5173 react-user-interface
Visit http://localhost:5173.
```
3. Tag the image
```
docker tag react-user-interface abdulmoiz833/react-user-interface:latest
```
4. Push to docker hub
```
docker login
docker push abdulmoiz833/react-user-interface:latest
```
## Frontend: Admin Interface
### Dockerfile (Admin interface)
```Dockerfile
# Use the official Node.js image as the base image
FROM node:18

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application files
COPY . .

# Expose port 5174 (default Vite port for dev server)
EXPOSE 5174

# Start the development server (this is for development purposes)
CMD ["npm", "run", "dev"]
```
## Commands for Admin Interface
1. Build the docker image
```
docker build -t admin-interface .
```
2. Run Locally
```
docker run -it -p 5174:5174 admin-interface
Visit http://localhost:5174.
```
3. Tag the image
```
docker tag admin-interface abdulmoiz833/admin-interface:latest
```
4. push to docker hub
```
docker login
docker push abdulmoiz833/admin-interface:latest
```

## Backend: CMS-Backend
### Dockerfile (Backend)
```Dockerfile
# Use Node.js 20 as the base image
FROM node:20

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies (force rebuild for bcrypt)
RUN npm install --build-from-source

# Copy the rest of the application
COPY . .

# Expose the backend port
EXPOSE 4000

# Set environment variables from .env file
ENV PORT=4000
ENV MONGO_URI="mongodb://mongodb:27017/name of you collection"
ENV FRONTEND_URL_ONE=http://localhost:5173
ENV FRONTEND_URL_TWO=http://localhost:5174
ENV JWT_SECRET_KEY="your_token"
ENV JWT_EXPIRES="1d"
ENV COOKIE_EXPIRE=7

# Start the application
CMD ["npm", "start"]
```
## Commands For Backend
1. Build the docker image
```
docker build -t cms-backend .
```
2. Run Locally
```
docker run -it -p 4000:4000 cms-backend
Verify by visiting http://localhost:4000.
```
3. Tag the name
```
docker tag cms-backend abdulmoiz833/cms-backend:latest
```
4. Push to docker hub
```
docker login
docker push abdulmoiz833/cms-backend:latest
```
## Docker-compose.yml
### Setup Instructions
1. Set Up a MongoDB Docker Container
```
docker run -d --name mongodb -p 27017:27017 mongo
```
2. pdate the Connection String In your Dockerfile, replace localhost with the name of the MongoDB container (mongodb) in the MONGO_URI.
```
MONGO_URI="mongodb://mongodb:27017/name of you collection"
```
3. Connect MongoDB with Your Node.js App Update your server.js (or equivalent entry point file) to connect to MongoDB:
```
import mongoose from 'mongoose';

const connectDatabase = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`MongoDB connected: ${connection.connection.host}`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

connectDatabase();
```
4. Create a Docker Network If you're running your backend and MongoDB as separate containers, ensure they're in the same Docker network:
```
docker network create hospital-network
docker network connect hospital-network mongodb
docker network connect hospital-network cms-backend
```
5. Run Your backend container
```
docker run -it -p 4000:4000 --network hospital-network cms-backend
```
6. Run Your frontend container
```
docker run -it -p 5173:5173 --network hospital-network react-user-interface
```
7. Verify Connection Access the logs of the backend container to verify MongoDB connection:
```
docker logs cms-backend
```
8. Optional: Persist MongoDB Data (Volume Mounting) To ensure MongoDB data persists across container restarts, mount a volume:
```
docker run -d --name mongodb -p 27017:27017 -v mongodb-data:/data/db mongo
```
9. Using docker-compose.yml Run everything using Docker Compose
```
docker-compose up
```
This will start all three services (backend, frontend, and MongoDB) and ensure they are connected through the hospital-network.

10. Shut Down Services
```
docker-compose down
```
## CI/CD Using GitLab
1. Imported Project from GitHub.
2. Added a new `.gitlab-ci.yml` file and the pipeline script according to the project:
    1. Build Docker compose image.
    2. Push Docker compose image.
    3. Pull Docker compose image.
    4. Deploy it.

### Build and Push
Pushed to Docker Hub:
- Build Completed

### Pull and Deploy
Deployed on Localhost Server:
- Deploy Completed

## Conclusion
Successfully implemented a Hospital Management System with CI/CD pipelines using GitLab and Jenkins, enhancing automation and monitoring..
