FROM node:8.11.2@sha256:bba8a9c445fefc3e53fb2dfdfa755b0c119ae9f9999637e3b96ea37fae89d5d0

COPY package.json /app/
COPY build/server /app/build/server
COPY build/static /app/build/static
COPY build/shared /app/build/shared
COPY node_modules /app/node_modules
COPY bin/_run-docker /app/bin/
COPY build/screenshots.xpi /app/build/xpi/screenshots.xpi
RUN cd app && npm install
ENV NODE_ENV ${NODE_ENV:-production}

CMD /app/bin/_run-docker
