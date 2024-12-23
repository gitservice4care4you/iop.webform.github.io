FROM node:20-alpine

# Create app directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy app source code
COPY . .

# Build the app
RUN npm run build

COPY .next ./.next

# Expose the port the app runs on
EXPOSE 3000

# Start the app
CMD [ "npm", "run","dev" ]
