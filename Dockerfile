FROM node:7

COPY package.json /app/
COPY locales /app/locales
COPY build/server /app/build/server
COPY build/static /app/build/static
COPY build/shared /app/build/shared
COPY node_modules /app/node_modules
COPY bin/_run-docker /app/bin/
COPY build/screenshots.xpi /app/build/xpi/screenshots.xpi
RUN cd app && npm install

CMD /app/bin/_run-docker
