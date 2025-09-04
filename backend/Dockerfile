
FROM node:18-slim AS base

# Set working directory
WORKDIR /app

# Install deps in a separate layer for caching
COPY package*.json ./

# Install all dependencies
RUN npm install

# Copy the rest of the backend code
COPY . .

# Build the TypeScript project
RUN npm run build

# Expose backend port
EXPOSE 5000

# Start the backend (production)
CMD ["node", "dist/index.js"]
