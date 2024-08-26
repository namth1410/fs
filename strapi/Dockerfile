FROM node:18-alpine

# Installing dependencies for sharp compatibility
RUN apk update && apk add --no-cache \
  build-base gcc autoconf automake \
  zlib-dev libpng-dev nasm bash vips-dev git

ARG NODE_ENV=development
ENV NODE_ENV=${NODE_ENV}

# Set environment variables directly if needed, or use a .env file in the container
# ENV HOST=${HOST}
# ENV PORT=${PORT}
# ENV APP_KEYS=${APP_KEYS}
# ENV API_TOKEN_SALT=${API_TOKEN_SALT}
# ENV ADMIN_JWT_SECRET=${ADMIN_JWT_SECRET}
# ENV TRANSFER_TOKEN_SALT=${TRANSFER_TOKEN_SALT}
# ENV DATABASE_CLIENT=${DATABASE_CLIENT}
# ENV DATABASE_HOST=${DATABASE_HOST}
# ENV DATABASE_PORT=${DATABASE_PORT}
# ENV DATABASE_NAME=${DATABASE_NAME}
# ENV DATABASE_USERNAME=${DATABASE_USERNAME}
# ENV DATABASE_PASSWORD=${DATABASE_PASSWORD}
# ENV DATABASE_SSL=${DATABASE_SSL}
# ENV JWT_SECRET=${JWT_SECRET}

# Build-time arguments
ARG NODE_ENV=development
ARG HOST
ARG PORT
ARG APP_KEYS
ARG API_TOKEN_SALT
ARG ADMIN_JWT_SECRET
ARG TRANSFER_TOKEN_SALT
ARG DATABASE_CLIENT
ARG DATABASE_HOST
ARG DATABASE_PORT
ARG DATABASE_NAME
ARG DATABASE_USERNAME
ARG DATABASE_PASSWORD
ARG DATABASE_SSL
ARG JWT_SECRET

WORKDIR /opt/
COPY package.json ./
RUN npm install -g node-gyp
RUN npm config set fetch-retry-maxtimeout 600000 -g && npm install
ENV PATH /opt/node_modules/.bin:$PATH

WORKDIR /opt/app
COPY . .
RUN chown -R node:node /opt/app
USER node
RUN ["npm", "run", "build"]
EXPOSE 1337
CMD ["npm", "run", "develop"]
