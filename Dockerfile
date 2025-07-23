FROM node:20
RUN apt-get update && apt-get install libvips-dev -y
ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY ./package.json ./package-lock.json /usr/src/app/
RUN npm install -g node-gyp
ENV PATH /usr/src/app/node_modules/.bin:$PATH
RUN npm config set fetch-retry-mintimeout 2000000 && npm config set fetch-retry-maxtimeout 12000000 && npm install
WORKDIR /usr/src/app
COPY . /usr/src/app
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
  