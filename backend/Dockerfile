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
ENV MONGO_URI="mongodb://mongodb:27017/MERN_STACK_HOSPITAL_MANAGEMENT_SYSTEM"
ENV FRONTEND_URL_ONE=http://localhost:5173
ENV FRONTEND_URL_TWO=http://localhost:5174
ENV JWT_SECRET_KEY="hf2uhyf89ewhfih289hf289hf892h89hf92"
ENV JWT_EXPIRES="1d"
ENV COOKIE_EXPIRE=7

# Start the application
CMD ["npm", "start"]
