FROM node:0.12.7

COPY package.json /app/
COPY build/server /app/build/server
COPY build/static /app/build/static
COPY build/shared /app/build/shared
COPY node_modules /app/node_modules
COPY bin/_run-docker /app/bin/
COPY build/mozilla-pageshot.xpi /app/build/xpi/mozilla-pageshot.xpi
COPY build/mozilla-pageshot.update.rdf /app/build/xpi/mozilla-pageshot.update.rdf
RUN cd app && npm install

CMD /app/bin/_run-docker
