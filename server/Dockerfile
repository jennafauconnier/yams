FROM node:18

WORKDIR /app/server

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install -g nodemon
RUN npm install

# Copy the rest of the application code
COPY . .

# Expose port 3000
EXPOSE 3000

# Use nodemon to run the application
ENTRYPOINT ["nodemon", "index.js"]
CMD ["npm", "start"]
