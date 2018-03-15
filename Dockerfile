FROM node:8

COPY package.json /app/
COPY build/server /app/build/server
COPY build/static /app/build/static
COPY build/shared /app/build/shared
COPY node_modules /app/node_modules
COPY bin/_run-docker /app/bin/
COPY build/screenshots.xpi /app/build/xpi/screenshots.xpi
ENV NODE_ICU_DATA="/app/node_modules/full-icu"
RUN cd app && npm install

CMD /app/bin/_run-docker
