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

# Expose port 4001
EXPOSE 4001

# Start the books service
CMD ["npm", "start"]
