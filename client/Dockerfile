FROM node:12.2.0-alpine

# Set working directory
WORKDIR /client

# Add `/app/node_modules/.bin` to $PATH
ENV PATH /client/node_modules/.bin:$PATH

# Install and cache app dependencies
COPY package.json /client/package.json
RUN npm install
RUN npm install react-scripts@3.4.0 -g --silent

# start app
CMD ["npm", "start"]