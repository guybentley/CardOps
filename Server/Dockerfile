FROM node:current-alpine

LABEL org.opencontainers.image.title="CardOps cards API" \
      org.opencontainers.image.description="image containing the CardOps cards API" \
      org.opencontainers.image.authors="Guy Bentley"

      #create a directory in the container image for app code
      RUN mkdir -p /usr/src/CardOps

      #insert the app code
      COPY . /usr/src/CardOps

      #Set working directortyu context
      WORKDIR /usr/src/CardOps

      RUN npm install

      #Command for container to execute
      ENTRYPOINT [ "npm", "start" ]