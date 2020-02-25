#FROM node:6

FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

# COPY sdsmain.js .
# COPY sdsmodules.js .
# COPY app.log .

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./
# Install Node Package Manager for the JavaScript runtime environment Nodejs
RUN npm install
# If you are building your code for production
# RUN npm install --only=production
# Bundle app source
COPY . .
EXPOSE 4000
CMD node mysql.js
# CMD [ "npm", "start" ]