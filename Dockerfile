# Start your image with a node base image
FROM node:18-alpine

# The /app directory should act as the main application directory
WORKDIR /app

# Copy the app package.json and package-lock.json file
COPY nex/package*.json ./

# Install node packages in the /app directory
RUN npm install

# Copy the entire contents of the NexArtifacts-main directory to the /app directory in the image
COPY nex/ .

# Install serve globally
RUN npm install -g serve

# Build the app
RUN npm run build

# Expose port 3000 if your app listens on that port
EXPOSE 3000

# Start the app using serve command
CMD ["serve", "-s", "build"]
