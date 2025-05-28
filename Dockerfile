# Stage 1: Build
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json* ./
RUN npm install

# Copy the rest of the source code
COPY . .

# Build the app
RUN npm run build

# Stage 2: Serve using Vite preview
FROM node:18-alpine

WORKDIR /app

# Install Vite globally
RUN npm install -g vite

# Copy built files from builder
COPY --from=builder /app /app

# Expose the default preview port
EXPOSE 4173

# Serve the app using Vite's built-in preview server
CMD ["vite", "preview", "--host"]
