FROM node:10.12.0@sha256:00a7fb3df8e94ed24f42c2920f132f06e92ea5ed69b1c5e53c4bb3d20e85a3e2

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
