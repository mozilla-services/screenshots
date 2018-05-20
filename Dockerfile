FROM node:8.11.2@sha256:ceb6e9e47ec034664e795d7b7e45f288e2b47a5a51cc6015dc7d672252900788

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
