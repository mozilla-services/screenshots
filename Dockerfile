FROM node:8.11.4@sha256:cd8ebd022c01f519eb58a98fcbb05c1d1195ac356ef01851036671ec9e9d5580

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
