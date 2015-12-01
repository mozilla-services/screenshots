FROM node:0.12.7

COPY . /pageshot
COPY build/mozilla-pageshot.xpi /pageshot/build/xpi
COPY build/mozilla-pageshot.update.rdf /pageshot/build/xpi
RUN cd pageshot && npm install

CMD /pageshot/bin/run-server
