# Use an official Node.js runtime as the base image
FROM node:22

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (if available)
COPY . .

# Install dependencies
RUN npm install
RUN npm install -g typescript
RUN npm run build

# Expose the port the app runs on
EXPOSE 3001

RUN ls -la
RUN ls -la ./src
# Command to run the application
CMD ["npm", "start"]