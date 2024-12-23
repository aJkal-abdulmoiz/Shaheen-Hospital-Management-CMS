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
