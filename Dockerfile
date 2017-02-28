FROM node:7

COPY package.json /app/
COPY build/server /app/build/server
COPY build/static /app/build/static
COPY build/shared /app/build/shared
COPY node_modules /app/node_modules
COPY bin/_run-docker /app/bin/
COPY build/pageshot.xpi /app/build/xpi/pageshot.xpi
RUN cd app && npm install

CMD /app/bin/_run-docker
