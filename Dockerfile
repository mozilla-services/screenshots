FROM node:0.12.7

COPY package.json build/server/ build/static/ build/shared/ /app/
COPY node_modules/ /app/
COPY build/mozilla-pageshot.xpi /app/build/xpi/mozilla-pageshot.xpi
COPY build/mozilla-pageshot.update.rdf /app/build/xpi/mozilla-pageshot.update.rdf
RUN cd app && npm install

CMD /app/bin/_run-docker
