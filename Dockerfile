FROM node:0.12.7

RUN apt-get -y update && apt-get install -y git && git clone https://github.com/mozilla-services/pageshot.git

ENV DB_HOST db:5432
ENV DB_USER postgres
ENV DB_NAME postgres

CMD /pageshot/bin/run-server

#CMD which bash

