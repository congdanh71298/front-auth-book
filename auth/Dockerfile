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

# Expose port 4000
EXPOSE 4000

# Start the authentication service
CMD ["npm", "start"]
