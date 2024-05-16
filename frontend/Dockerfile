# FROM node:20

# WORKDIR /app/frontend

# COPY package*.json ./
# COPY tsconfig.json ./

# RUN npm install

# COPY . .

# EXPOSE 5173

# CMD ["npm", "run", "dev"]

FROM node:20
WORKDIR /var/app/
COPY package.json /var/app/package.json
RUN npm install

COPY . .

CMD ["npm", "run" , "dev"]