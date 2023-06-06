# Base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY ./package*.json ./

# Install dependencies
RUN npm install

# Copy the source code
COPY ./ .

# Expose port 3000
EXPOSE 3000

# Start the authentication service
CMD ["npm", "start"]
