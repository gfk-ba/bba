FROM node:10.15

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY Source/package.json ./

COPY Config/Backend/.env.prod ./.env
COPY Config/Database/ormconfig.prod ./ormconfig.json

RUN npm install
RUN npm install -g nodemon
RUN npm install bcrypt@latest --save

# Bundle app source
COPY ./Source .

EXPOSE 3001

CMD [ "nodemon" ]