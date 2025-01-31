# Use Node.js 18 Alpine as the base image
FROM node:18-alpine

# Set working directory
WORKDIR /app

# Copy all files to the working directory
COPY . .

# Install dependencies
RUN npm i -g pnpm
RUN pnpm ci

# Build the application
RUN npm run build

# Expose the port the app runs on
EXPOSE 3005

# Set environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Start the application
CMD ["npm", "start"]